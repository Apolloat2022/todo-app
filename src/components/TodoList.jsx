// src/components/TodoList.jsx
import React from 'react';
import { FiCheck, FiX, FiTrash2 } from 'react-icons/fi';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function TodoList({ todos, onToggle, onDelete }) {
    if (!todos || todos.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-muted">No tasks to display</p>
            </div>
        );
    }

    return (
        <ListGroup>
            {todos.map(todo => (
                <ListGroup.Item 
                    key={todo.id}
                    className="d-flex align-items-center justify-content-between todo-item"
                >
                    <div className="d-flex align-items-center">
                        <span 
                            className={`me-3 ${todo.completed ? 'completed-todo' : ''}`}
                            style={{ 
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.7 : 1
                            }}
                        >
                            {todo.text}
                        </span>
                        <Badge 
                            bg={todo.priority === 'high' ? 'danger' : todo.priority === 'medium' ? 'warning' : 'success'}
                            className="ms-2 priority-badge"
                        >
                            {todo.priority}
                        </Badge>
                        {todo.category && todo.category !== 'general' && (
                            <Badge bg="secondary" className="ms-2">
                                {todo.category}
                            </Badge>
                        )}
                    </div>
                    <div className="todo-actions d-flex gap-2">
                        <Button 
                            variant={todo.completed ? 'success' : 'outline-success'} 
                            size="sm"
                            onClick={() => onToggle(todo.id)}
                            className="action-button"
                            title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                            {todo.completed ? <FiCheck /> : <FiX />}
                        </Button>
                        <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => onDelete(todo.id)}
                            className="action-button"
                            title="Delete task"
                        >
                            <FiTrash2 />
                        </Button>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default TodoList;
