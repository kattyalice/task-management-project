import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../context/TaskProvider';
import { deleteTask } from '../api/tasks';

export function TaskDetail() {
  const { id } = useParams();
  const { state, dispatch } = useTasksContext();
  const navigate = useNavigate();
  const task = state.tasks.find(t => t.id === id);

  if (!task) return <p>Task not found</p>;

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      navigate('/dashboard');
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due: {task.dueDate}</p>
      <Link to={`/tasks/${task.id}/edit`}>Edit Task</Link>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
}