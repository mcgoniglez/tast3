// src/pages/Register.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.username, data.password, data.email);
      // Registration successful, redirect to login page or dashboard
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input name="username" ref={register({ required: true })} />
          {errors.username && <p>Username is required.</p>}
        </div>

        <div>
          <label>Email</label>
          <input name="email" type="email" ref={register({ required: true })} />
          {errors.email && <p>Valid email is required.</p>}
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" ref={register({ required: true })} />
          {errors.password && <p>Password is required.</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
