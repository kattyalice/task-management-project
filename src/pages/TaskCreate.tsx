import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasksContext } from '../context/TaskProvider';
import type { NewTask } from '../types';
import { createTask } from '../api/tasks';

export function TaskCreate() {
  const { dispatch } = useTasksContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [priority, setPriority] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask: NewTask = { title, description, status, priority };
      const created = await createTask(newTask);
      dispatch({ type: 'ADD_TASK', payload: created });
      navigate('/dashboard');
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={e => setStatus(e.target.value as any)}>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="number" value={priority} min={1} onChange={e => setPriority(Number(e.target.value))} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}