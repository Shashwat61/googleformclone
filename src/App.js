import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  
  return (
    <div className="">
      <Main/>
    </div>
  );
}

export default App;
