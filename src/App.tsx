import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TaskCreate } from './pages/TaskCreate';
import { TaskDetail } from './pages/TaskDetail';
import { TaskEdit } from './pages/TaskEdit';

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks/new" element={<TaskCreate />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
      <Route path="/tasks/:id/edit" element={<TaskEdit />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}