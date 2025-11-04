import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types';

type State = {
    tasks: Task[];
    loading: boolean;
    error?: string;
}

type Action =
    | { type: 'LOAD_START' }
    | { type: 'LOAD_SUCCESS'; payload: Task[] }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_ERROR'; payload?: string };

const initialState: State = { tasks: [], loading: false };

function taskReducer(state: State, action: Action): State {
    switch (action.type){
        case 'LOAD_START': return { ...state, loading: true, error: undefined };
        case 'LOAD_SUCCESS': return { ...state, loading: false, tasks: action.payload };
        case 'ADD_TASK': return { ...state, tasks: [action.payload, ...state.tasks] };
        case 'UPDATE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
        case 'DELETE_TASK': return { ... state, tasks: state.tasks.filter(t => t.id !== action.payload) };
        case 'SET_ERROR': return { ...state, loading: false, error: action.payload };
        default: return state;
    }
}

// Export typed context and hooks:
export const TaskContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function useTasksContext() {
    const cntxt = React.useContext(TaskContext);
    if (!cntxt) throw new Error('useTasksContext must be used within TaskProvider');
    return cntxt;
}

export function TaskProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);
        return (
            <TaskContext.Provider value={{ state, dispatch }}>
                {children}
            </TaskContext.Provider>
        );
}