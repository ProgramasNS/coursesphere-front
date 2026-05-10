//Este módulo lista hierarquicamente cada uma das páginas
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Create from './pages/create';
import Lessons from './pages/lessons';

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; //Chave token para a verificação abaixo. É o mesmo token das APIs
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/courses/new' element={<Create/>}/>
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}  //Verifica se o usuário está autenticado antes de ir navegar o dashboard.
          />
          <Route 
          path="/courses/:id" 
          element={isAuthenticated ? <Lessons /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;