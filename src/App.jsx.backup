// src/App.jsx - LARGER LOGO, COMPACT HEADER
import React from 'react';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/todoStyles.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="App">
      <Container className="mt-4"> {/* Reduced top margin */}
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white py-3"> {/* Reduced vertical padding */}
            <div className="d-flex align-items-center justify-content-center">
              {/* Large Logo */}
              <img 
                src={logo} 
                alt="Apollo Technologies Logo" 
                className="me-3"
                style={{ 
                  height: '70px',  // Increased logo size
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
              {/* App Title - Compact */}
              <div className="text-center">
                <h1 className="h3 mb-1">📝 Apollo Todo</h1> {/* Smaller heading */}
                <p className="small mb-0">Click tasks to mark complete</p> {/* Smaller text */}
              </div>
            </div>
          </Card.Header>
          
          <Card.Body>
            <TodoList />
          </Card.Body>
          
          <Card.Footer className="text-muted text-center py-2"> {/* Compact footer */}
            <small className="fs-6">
              Built by <strong>Apollo Technologies US</strong> • 
              AI-assisted development
            </small>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default App;