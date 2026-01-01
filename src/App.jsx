// src/App.jsx - Modern Cinematic UI
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodos } from './hooks/useLocalStorage';
import { exportToCSV } from './utils/exportUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/todoStyles.css';
import './styles/enhanced.css'; // We'll update this significantly
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiPlus, FiTrash2, FiDownload, FiCheckSquare, FiBarChart2, FiZap } from 'react-icons/fi';

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

    // Calculate stats for dynamic header
    const completedCount = todos.filter(t => t.completed).length;
    const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

    return (
        <div className="App modern-app">
            <Container className="mt-4">
                {/* Main Card with Cinematic Edge */}
                <Card className="shadow-cinematic border-0 overflow-hidden">
                    {/* Dynamic Gradient Header */}
                    <Card.Header className="py-4 px-5 text-white border-0" style={{ 
                        background: `linear-gradient(135deg, 
                            ${completionRate > 70 ? '#0ea5e9' : '#8b5cf6'}, 
                            ${completionRate > 70 ? '#3b82f6' : '#6366f1'}, 
                            #1e40af)` 
                    }}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h1 className="mb-1 display-6 fw-bold">
                                    <FiCheckSquare className="me-2" />My Todo App
                                </h1>
                                <p className="mb-0 opacity-85">
                                    {completionRate}% complete • {todos.length} total tasks
                                </p>
                            </div>
                            <div className="text-end">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <FiZap className="fs-2" />
                                    </div>
                                    <div>
                                        <h5 className="mb-0">Productivity</h5>
                                        <small>Focus on your next priority</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    
                    <Card.Body className="p-0">
                        <div className="px-5 pt-4">
                            {/* Stats Dashboard - Modern Cards */}
                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <FiBarChart2 className="me-2 text-primary fs-4" />
                                    <h4 className="mb-0 fw-semibold">Overview</h4>
                                </div>
                                <TodoStats todos={todos} />
                            </div>
                            
                            {/* Add Task Form - Modern Floating Style */}
                            <Card className="mb-4 border-0 shadow-sm form-card">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3 fw-semibold">Add New Task</h5>
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col md={8}>
                                                <InputGroup className="input-group-modern">
                                                    <Form.Control
                                                        type="text"
                                                        value={newTodo}
                                                        onChange={(e) => setNewTodo(e.target.value)}
                                                        placeholder="What's your next achievement?"
                                                        className="border-0 py-3"
                                                        style={{ backgroundColor: '#f8fafc' }}
                                                        required
                                                    />
                                                    <Button 
                                                        type="submit" 
                                                        variant="primary" 
                                                        className="px-4 py-3 fw-semibold"
                                                        style={{ 
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            border: 'none'
                                                        }}
                                                    >
                                                        <FiPlus className="me-2" /> Add Task
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Select 
                                                    value={priority} 
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="border-0 py-3"
                                                    style={{ backgroundColor: '#f8fafc' }}
                                                >
                                                    <option value="low">📈 Low Priority</option>
                                                    <option value="medium">📊 Medium Priority</option>
                                                    <option value="high">🚨 High Priority</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            
                            {/* Action Buttons - Modern Layout */}
                            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                                <div className="d-flex gap-2">
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={() => exportToCSV(todos)}
                                        disabled={todos.length === 0}
                                        className="px-4 action-button-modern"
                                    >
                                        <FiDownload className="me-2" />
                                        Export CSV
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={clearCompleted}
                                        disabled={completedCount === 0}
                                        className="px-4 action-button-modern"
                                    >
                                        <FiTrash2 className="me-2" />
                                        Clear Completed ({completedCount})
                                    </Button>
                                </div>
                                <div className="text-muted">
                                    <span className="badge bg-light text-dark me-2">
                                        Total: <strong>{todos.length}</strong>
                                    </span>
                                    <span className="badge bg-success me-2">
                                        Done: <strong>{completedCount}</strong>
                                    </span>
                                    <span className="badge bg-warning">
                                        Pending: <strong>{todos.filter(t => !t.completed).length}</strong>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Todo List Section */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="mb-0 fw-semibold">
                                        Your Tasks <span className="badge bg-secondary">{todos.length}</span>
                                    </h4>
                                    <div className="text-muted small">
                                        Click any task to mark complete
                                    </div>
                                </div>
                                
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="p-0">
                                        {todos.length === 0 ? (
                                            <div className="text-center py-5 empty-state">
                                                <div className="mb-3">
                                                    <div className="empty-icon">📝</div>
                                                </div>
                                                <h5 className="text-muted mb-2">No tasks yet</h5>
                                                <p className="text-muted">Add your first task to get started on your journey!</p>
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
                            </div>
                        </div>
                        
                        {/* Modern Footer */}
                        <div className="border-top px-5 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                    <span className="me-3">⚡ Real-time updates</span>
                                    <span className="me-3">📱 Fully responsive</span>
                                    <span>💾 Auto-saves locally</span>
                                </small>
                                <small className="text-muted">
                                    Built by Apollo Technologies US Inc.
                                </small>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default App;