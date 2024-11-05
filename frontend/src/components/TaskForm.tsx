import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { createTask } from '../store/taskSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup.date().required(),
});

const TaskForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: TaskFormData) => {
    dispatch(createTask(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={register} />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea name="description" ref={register} />
      {errors.description && <p>{errors.description.message}</p>}

      <input type="date" name="dueDate" ref={register} />
      {errors.dueDate && <p>{errors.dueDate.message}</p>}

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
