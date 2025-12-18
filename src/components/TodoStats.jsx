// src/components/TodoStats.jsx
import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import { FiCheckCircle, FiClock, FiTrendingUp, FiActivity } from "react-icons/fi";

function TodoStats({ todos }) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const priorityCounts = {
        high: todos.filter(t => t.priority === "high").length,
        medium: todos.filter(t => t.priority === "medium").length,
        low: todos.filter(t => t.priority === "low").length
    };

    return (
        <Card className="mb-4 enhanced-card">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
                <FiActivity className="me-2" />
                <strong>Statistics</strong>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={3} className="mb-3">
                        <div className="stat-card">
                            <FiCheckCircle size={24} className="text-success mb-2" />
                            <h3>{total}</h3>
                            <small>Total Tasks</small>
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="stat-card">
                            <FiTrendingUp size={24} className="text-primary mb-2" />
                            <h3>{completed}</h3>
                            <small>Completed</small>
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="stat-card">
                            <FiClock size={24} className="text-warning mb-2" />
                            <h3>{pending}</h3>
                            <small>Pending</small>
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="stat-card">
                            <div className="mb-2">
                                <h3>{completionRate}%</h3>
                            </div>
                            <small>Completion Rate</small>
                        </div>
                    </Col>
                </Row>
                
                <div className="mt-3">
                    <div className="d-flex justify-content-between mb-1">
                        <small>Progress</small>
                        <small>{completionRate}%</small>
                    </div>
                    <ProgressBar 
                        now={completionRate} 
                        variant={completionRate > 70 ? "success" : completionRate > 30 ? "warning" : "danger"} 
                    />
                </div>
                
                <div className="mt-4">
                    <h6>Priority Distribution</h6>
                    <div className="d-flex gap-2 flex-wrap">
                        <span className="priority-badge priority-high">
                            High: {priorityCounts.high}
                        </span>
                        <span className="priority-badge priority-medium">
                            Medium: {priorityCounts.medium}
                        </span>
                        <span className="priority-badge priority-low">
                            Low: {priorityCounts.low}
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TodoStats;
