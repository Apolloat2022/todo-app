import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    };

    return [storedValue, setValue];
}

export function useTodos() {
    const [todos, setTodos] = useLocalStorage("todos", []);
    
    const addTodo = (text, priority = "medium", category = "general") => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
            priority,
            category
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, updates) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        setTodos
    };
}
