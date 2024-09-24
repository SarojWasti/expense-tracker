import './assets/Index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login ';
import TestRedirect from './components/TestRedirect';
import Signup from './components/Signup';
import Dashboard from './Dashboard';

function App() {

  return (
    <>
      <Router>
        <Routes>{/*
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<TestRedirect />} />
          <Route path="/signup" element={<Signup/>}/>*/}
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
