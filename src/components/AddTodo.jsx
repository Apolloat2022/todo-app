// src/components/AddTodo.jsx
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';

const AddTodo = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Please enter a task');
      return;
    }
    
    if (inputValue.length > 100) {
      setError('Task must be less than 100 characters');
      return;
    }
    
    onAdd(inputValue);
    setInputValue('');
    setError('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="todoInput">
        <Form.Label className="fw-bold">Add New Task</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter a new task..."
            value={inputValue}
            onChange={handleInputChange}
            maxLength={100}
            className={error ? 'is-invalid' : ''}
          />
          <Button 
            variant="primary" 
            type="submit"
            disabled={!inputValue.trim()}
          >
            <FaPlus /> Add Task
          </Button>
        </InputGroup>
        {error && (
          <Form.Text className="text-danger">
            {error}
          </Form.Text>
        )}
        <Form.Text className="text-muted">
          {inputValue.length}/100 characters
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default AddTodo;