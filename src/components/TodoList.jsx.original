// src/components/TodoList.jsx - CORRECTED VERSION
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const TodoList = () => {
  // Local Storage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Learn React Basics', completed: false },
      { id: 2, text: 'Build Todo Application', completed: false },
      { id: 3, text: 'Style with Bootstrap', completed: false },
      { id: 4, text: 'Add New Features', completed: false },
    ];
  });

  // Filtering
  const [filter, setFilter] = useState('all');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Edit todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Calculate statistics
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      {/* Add New Todo Form */}
      <AddTodo onAdd={addTodo} />
      
      {/* Filter Buttons */}
      <div className="mb-3">
        <ButtonGroup aria-label="Filter tasks">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </Button>
          <Button 
            variant={filter === 'active' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('active')}
          >
            Active ({todos.filter(t => !t.completed).length})
          </Button>
          <Button 
            variant={filter === 'completed' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </Button>
        </ButtonGroup>
      </div>

      {/* Statistics */}
      <Alert variant="light" className="mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <span>
            📊 <strong>Stats:</strong> Showing {filteredTodos.length} of {totalCount} tasks | 
            Done: {completedCount} | Pending: {totalCount - completedCount}
          </span>
          {completedCount > 0 && (
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={clearCompleted}
            >
              Clear Completed ({completedCount})
            </Button>
          )}
        </div>
      </Alert>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <Alert variant={todos.length === 0 ? 'info' : 'warning'} className="text-center">
          {todos.length === 0 ? '🎉 No tasks! Add your first task above.' : `No ${filter} tasks found.`}
        </Alert>
      ) : (
        <ListGroup>
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={deleteTodo}
              onToggle={toggleComplete}
              onEdit={editTodo}
            />
          ))}
        </ListGroup>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 border rounded bg-light">
        <h6>💡 Enhanced Features:</h6>
        <ul className="mb-2">
          <li>💾 <strong>Auto-save:</strong> Tasks saved locally (refresh to test!)</li>
          <li>✏️ <strong>Edit:</strong> Double-click any task to edit</li>
          <li>🔍 <strong>Filter:</strong> Use buttons above to view All/Active/Completed</li>
          <li>✅ <strong>Complete:</strong> Click task once to toggle</li>
          <li>🗑️ <strong>Delete:</strong> Click trash icon</li>
        </ul>
        <small className="text-muted">Data persists between browser sessions</small>
      </div>
    </div>
  );
};

export default TodoList;