import './assets/Index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login ';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';


function App() {
  const [user,setUser] = useState(null);
  const [load, setLoad] = useState(true)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
      setUser(user);
      setLoad(false);
    })
    return ()=> unsub();
  },[])
  if(load){
    <div>Loading...</div>
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to = "/dashboard"/>:<Login/>} />
          <Route path="/dashboard" element={user ? <Dashboard user={user}/> : <Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
