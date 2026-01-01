// src/App.jsx - Enhanced version (Updated Header & Footer)
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodos } from './hooks/useLocalStorage';
import { exportToCSV } from './utils/exportUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/todoStyles.css';
import './styles/enhanced.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiPlus, FiTrash2, FiDownload } from 'react-icons/fi';
// Logo import removed

function App() {
    const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo(newTodo.trim(), priority);
            setNewTodo('');
            setPriority('medium');
        }
    };

    return (
        <div className="App">
            <Container className="mt-4">
                <Card className="shadow-lg">
                    <Card.Header className="bg-primary text-white py-3">
                        {/* Header with White Text */}
                        <div className="text-center">
                            <h1 className="mb-0" style={{ color: "#ffffff", fontSize: "2.2rem", fontWeight: "bold" }}>
                                📝 My Todo App
                            </h1>
                            <p className="mb-0" style={{ color: "#ffffff", fontSize: "1rem", opacity: 1, fontWeight: "600" }}>
                                Manage tasks with stats, priority & export
                            </p>
                        </div>
                    </Card.Header>
                    
                    <Card.Body>
                        {/* Statistics */}
                        <TodoStats todos={todos} />
                        
                        {/* Add Todo Form */}
                        <Card className="mb-4 enhanced-card">
                            <Card.Header className="bg-secondary text-white">
                                <strong>Add New Task</strong>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Task Description</Form.Label>
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        value={newTodo}
                                                        onChange={(e) => setNewTodo(e.target.value)}
                                                        placeholder="What needs to be done?"
                                                        required
                                                    />
                                                    <Button type="submit" variant="primary">
                                                        <FiPlus /> Add Task
                                                    </Button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Priority</Form.Label>
                                                <Form.Select 
                                                    value={priority} 
                                                    onChange={(e) => setPriority(e.target.value)}
                                                >
                                                    <option value="low">Low Priority</option>
                                                    <option value="medium">Medium Priority</option>
                                                    <option value="high">High Priority</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <Button 
                                    variant="outline-primary" 
                                    onClick={() => exportToCSV(todos)}
                                    disabled={todos.length === 0}
                                    className="me-2"
                                >
                                    <FiDownload className="me-1" />
                                    Export CSV
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={clearCompleted}
                                    disabled={todos.filter(t => t.completed).length === 0}
                                >
                                    <FiTrash2 className="me-1" />
                                    Clear Completed ({todos.filter(t => t.completed).length})
                                </Button>
                            </div>
                            <div>
                                <span className="text-muted">
                                    Total: {todos.length} | 
                                    Completed: {todos.filter(t => t.completed).length} | 
                                    Pending: {todos.filter(t => !t.completed).length}
                                </span>
                            </div>
                        </div>
                        
                        {/* Todo List */}
                        <Card className="enhanced-card">
                            <Card.Header className="bg-info text-white">
                                <strong>Your Tasks ({todos.length})</strong>
                            </Card.Header>
                            <Card.Body>
                                {todos.length === 0 ? (
                                    <div className="text-center py-4">
                                        <h5 className="text-muted">No tasks yet</h5>
                                        <p className="text-muted">Add your first task using the form above!</p>
                                    </div>
                                ) : (
                                    <TodoList 
                                        todos={todos}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                        
                        {/* Updated Footer */}
                        <div className="text-center mt-4 text-muted">
                            <small>
                                Built by Apollo Technologies US Inc.
                            </small>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default App;