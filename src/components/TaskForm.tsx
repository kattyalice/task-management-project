import React, { useState } from 'react';
import { TaskStatus } from '../types';
import type { NewTask } from '../types';

interface Props {
    initialValues?: NewTask;
    onSubmit: (task: NewTask) => void;
}

export function TaskForm({ initialValues, onSubmit }: Props){
    const [title, setTitle] = useState(initialValues?.title || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [status, setStatus] = useState(initialValues?.status || TaskStatus.Todo);
    const [priority, setPriority] = useState(initialValues?.priority || 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, status, priority });
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
                <option value={TaskStatus.Todo}>Todo</option>
                <option value={TaskStatus.InProgress}>In Progress</option>
                <option value={TaskStatus.Done}>Done</option>
            </select>
            <input
                type="number"
                placeholder="Priority"
                value={priority}
                min={1}
                onChange={e => setPriority(Number(e.target.value))}
            />
            <button type="submit">Save</button>
        </form>
    );
}