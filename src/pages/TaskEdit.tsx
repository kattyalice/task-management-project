import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../context/TaskProvider';
import type { Task, NewTask } from '../types';
import { updateTask } from '../api/tasks';
import { TaskForm } from '../components/TaskForm';

export function TaskEdit() {
  const { id } = useParams();
  const { state, dispatch } = useTasksContext();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id === id);

  const [initialValues, setInitialValues] = useState<NewTask | undefined>(undefined);

  useEffect(() => {
    if (task) {
      setInitialValues({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleSubmit = async (data: NewTask) => {
    if (!id) return;
    try {
      const updated = await updateTask(id, data);
      dispatch({ type: 'UPDATE_TASK', payload: updated });
      navigate('/dashboard');
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  if (!task) return <p>Task not found</p>;
  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}