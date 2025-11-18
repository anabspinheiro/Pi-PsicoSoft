import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Employee from './pages/Employee'
import './App.css'
import Home from './pages/Home'
import { Login } from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'


// O componente App agora só configura o Router
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;