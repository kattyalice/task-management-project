import { useEffect } from 'react';
import { useTasksContext } from '../context/TaskProvider';
import { fetchTasks } from '../api/tasks';
import { Link } from 'react-router-dom';
import '../index.css';

export function Dashboard() {
  // 🔎 DEBUG LINE — this tells us if Dashboard is ever reached
  console.log("AUTH CHECK: Dashboard rendered");

  const { state, dispatch } = useTasksContext();

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: 'LOAD_START' });
      try {
        const tasks = await fetchTasks();
        dispatch({ type: 'LOAD_SUCCESS', payload: tasks });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        dispatch({ type: 'SET_ERROR', payload: message });
      }
    };
    loadTasks();
  }, [dispatch]);

  if (state.loading) return <p>Loading tasks...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Link to="/tasks/new" className="create-link">
        Create New Task
      </Link>

      {state.tasks.length === 0 ? (
        <p className="empty-message">
          No tasks yet — click “Create New Task” to add one!
        </p>
      ) : (
        <ul className="task-list">
          {state.tasks.map(task => (
            <li key={task.id} className="task-item">
              <strong>{task.title}</strong> — {task.status} — Priority: {task.priority}
              <br />
              <Link to={`/tasks/${task.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}