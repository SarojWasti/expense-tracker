import './assets/Index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login ';
import Dashboard from './Dashboard';
import { auth } from './services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {
  const [user,load] = useAuthState(auth);
  if(load){
    return(
      <div>Loading....</div>
    );
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
