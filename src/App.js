import React, { useState, useEffect } from 'react';
import './App.css';
import MapView from './components/map/MapView';
import LoginPage from './components/auth/LoginPage';
import Header from './components/Header';
import AuthService from './services/AuthService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(1);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const response = AuthService.validateToken(token);
    if (response.isValid) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      {!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> :
        <div>
          <Header 
            setIsAuthenticated={setIsAuthenticated}
            selectedStateId={selectedStateId}
            setSelectedStateId={setSelectedStateId} />
          <MapView selectedStateId={selectedStateId}/>
        </div>}
    </div>
  );
}

export default App;
