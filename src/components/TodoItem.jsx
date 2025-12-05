// src/components/TodoItem.jsx - UPDATED WITH EDIT FUNCTION
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaTrash, FaCheck, FaRegCircle, FaEdit, FaSave } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleClick = () => {
    if (!isEditing) {
      onToggle(todo.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <ListGroup.Item
      action
      onClick={handleClick}
      className="d-flex justify-content-between align-items-center py-3"
      style={{
        cursor: isEditing ? 'default' : 'pointer',
        textDecoration: todo.completed && !isEditing ? 'line-through' : 'none',
        opacity: todo.completed && !isEditing ? 0.7 : 1,
        backgroundColor: todo.completed && !isEditing ? '#f8f9fa' : 'white',
        transition: 'all 0.2s ease'
      }}
    >
      {isEditing ? (
        // EDIT MODE
        <Form onSubmit={handleEditSubmit} className="w-100">
          <InputGroup>
            <Form.Control
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              onBlur={handleEditSubmit}
              maxLength={100}
            />
            <Button 
              variant="outline-success" 
              type="submit"
              disabled={!editText.trim() || editText === todo.text}
            >
              <FaSave />
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </InputGroup>
        </Form>
      ) : (
        // VIEW MODE
        <>
          <div className="d-flex align-items-center flex-grow-1">
            {todo.completed ? (
              <FaCheck className="text-success me-3 fs-5" />
            ) : (
              <FaRegCircle className="text-primary me-3 fs-5" />
            )}
            <div className="flex-grow-1">
              <span className="fs-5">{todo.text}</span>
              <div className="text-muted small mt-1">
                ID: {todo.id} • {todo.completed ? 'Completed' : 'Pending'} • 
                Characters: {todo.text.length}
              </div>
            </div>
          </div>
          
          <div className="d-flex">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleEdit}
              className="me-2"
              title="Edit task"
            >
              <FaEdit />
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={handleDelete}
              title="Delete task"
            >
              <FaTrash />
            </Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );
};

export default TodoItem;