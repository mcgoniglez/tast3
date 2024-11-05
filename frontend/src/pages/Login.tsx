// src/pages/Login.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await signIn(data.username, data.password);
      const session = await user.getSession();
      const token = session.getAccessToken().getJwtToken();
      dispatch(setToken(token));
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input name="username" ref={register({ required: true })} />
          {errors.username && <p>Username is required.</p>}
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" ref={register({ required: true })} />
          {errors.password && <p>Password is required.</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
