import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute'
import { TaskCreate } from './pages/TaskCreate';
import { TaskDetail } from './pages/TaskDetail';
import { TaskEdit } from './pages/TaskEdit';
import { Callback } from './pages/Callback';

export default function App() {
  return (
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>} />
      <Route path="/tasks/new" element={
        <PrivateRoute>
          <TaskCreate />
        </PrivateRoute> } />
      <Route path="/tasks/:id" element={
        <PrivateRoute>
          <TaskDetail />
        </PrivateRoute> }
        />
      <Route path="/tasks/:id/edit" element={
        <PrivateRoute>
          <TaskEdit />
        </PrivateRoute>} 
        />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}