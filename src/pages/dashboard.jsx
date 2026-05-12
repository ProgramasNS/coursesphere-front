//Esta página é diretamente integrada com as APIs get do model Course para listar cursos

import Menu from "../menu/sandwich";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const toggleDetails = (courseId) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
        } else {
            setExpandedCourse(courseId);
        }
    };

    const deleteCourse = async (courseId) => {
        const token = localStorage.getItem('token');
    
        if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    
        try {
            const response = await fetch(`http://localhost:3000/api/course/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        
            if (!response.ok) {
                throw new Error('Erro ao excluir curso');
            }
        
            // Remove o curso da lista local (atualiza a tela)
            setCourses(courses.filter(course => course.id !== courseId));
            alert('Curso excluído com sucesso!');
        
        } catch (err) {
            console.error('Erro:', err);
            alert('Erro ao excluir curso');
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        console.log('Token:', token);

        if (!token) {
            console.log('Token nao encontrado');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/course/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Status HTTP:', response.status);

            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token invalido');
                    navigate('/login');
                    return;
                }
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Cursos:', data);
            setCourses(data);
            
        } catch (err) {
            console.error('Erro completo:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <>
                <Menu />
                <div className="container mt-5 text-center">
                    <p>Carregando cursos...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Meus Cursos</h1>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/courses/new')}
                    >
                        + Novo Curso
                    </button>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {courses.length === 0 ? (
                    <div className="alert alert-info">
                        Voce ainda nao tem nenhum curso. Clique em "Novo Curso" para comecar
                    </div>
                ) : (
                    <div className="row">
                        {courses.map((course) => (
                            <div key={course.id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{course.name}</h5>

                                        <p className="card-text text-muted">
                                            <small>Inicio: {new Date(course.start_date).toLocaleDateString('pt-BR')}</small>
                                        </p>

                                        {expandedCourse === course.id && (
                                            <div className="mt-3 pt-3 border-top">
                                                <p className="card-text">
                                                    <strong>Descrição:</strong><br />
                                                    {course.description || 'Sem descrição'}
                                                </p>
                                                <p className="card-text">
                                                    <small>Término: {new Date(course.end_date).toLocaleDateString('pt-BR')}</small>
                                                </p>
                                            </div>
                                        )}

                                        <div className="mt-2">
                                            <button 
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => toggleDetails(course.id)}
                                            >
                                                {expandedCourse === course.id ? 'Menos detalhes' : 'Mais detalhes'}
                                            </button>

                                            <button 
                                                className="btn btn-outline-primary btn-sm ms-2"
                                                onClick={() => navigate(`/courses/${course.id}`)}
                                            >
                                                Ver aulas
                                            </button>
                                            <button 
                                            className="btn btn-outline-warning btn-sm ms-2"
                                            onClick={() => navigate(`/courses/edit/${course.id}`)}
                                            >
                                                <i className="bi bi-pencil"></i> Editar
                                            </button>
                                            <button 
                                            className="btn btn-outline-danger btn-sm mt-2 ms-2"
                                            onClick={() => deleteCourse(course.id)}
                                            >
                                            <i className="bi bi-trash"></i> Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}