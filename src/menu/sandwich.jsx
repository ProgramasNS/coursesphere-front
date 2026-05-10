//Esta página corresponde ao menu sanduíche que será usado na maior parte das telas (exceto login e registro)
import {Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Menu() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
            <div className="container">
                <Link className="font-custom navbar-brand" to="/dashboard">
                    CouseSphere
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                            >
                                Início
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/courses/new"
                                onClick={() => setIsOpen(false)}
                            >
                                Novo Curso
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}