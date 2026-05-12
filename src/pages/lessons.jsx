//Este módulo corresponde às aulas de cada curso
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../menu/sandwich";

export default function Lessons() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [newLesson, setNewLesson] = useState({
        title: '',
        status: 'draft',
        video_url: ''
    });
    const [submitting, setSubmitting] = useState(false);

    // Estado para edicao
    const [editingLesson, setEditingLesson] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editVideoUrl, setEditVideoUrl] = useState('');
    const [editing, setEditing] = useState(false);

    // Diferencial: API Externa (RandomUser)
    const [instrutor, setInstrutor] = useState(null);
    const [loadingInstrutor, setLoadingInstrutor] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Nao informada';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data invalida';
        return date.toLocaleDateString('pt-BR');
    };

    const fetchRandomInstrutor = async () => {
        setLoadingInstrutor(true);
        try {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            const user = data.results[0];
            setInstrutor({
                nome: `${user.name.first} ${user.name.last}`,
                foto: user.picture.medium,
                pais: user.location.country,
                email: user.email,
                telefone: user.phone
            });
        } catch (error) {
            console.error('Erro ao buscar instrutor:', error);
        } finally {
            setLoadingInstrutor(false);
        }
    };

    useEffect(() => {
        fetchCourseAndLessons();
        fetchRandomInstrutor();
    }, [id]);

    const fetchCourseAndLessons = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            navigate('/login');
            return;
        }
    
        try {
            const listRes = await fetch(`http://localhost:3000/api/course/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        
            if (!listRes.ok) throw new Error('Erro ao buscar cursos');
        
            const allCourses = await listRes.json();
            const foundCourse = allCourses.find(c => c.id == id);
        
            if (!foundCourse) throw new Error(`Curso com ID ${id} nao encontrado`);
        
            setCourse(foundCourse);
        
            const lessonsRes = await fetch(`http://localhost:3000/api/lesson/course/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        
            if (lessonsRes.ok) {
                const lessonsData = await lessonsRes.json();
                setLessons(lessonsData);
            }
        } catch (err) {
            console.error('Erro:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLesson = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:3000/api/lesson/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newLesson.title,
                    status: newLesson.status,
                    video_url: newLesson.video_url || '',
                    course_id: parseInt(id)
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao criar aula');
            }
            
            const data = await response.json();
            setLessons([...lessons, data.lesson]);
            setShowLessonForm(false);
            setNewLesson({ title: '', status: 'draft', video_url: '' });
            alert('Aula criada com sucesso!');
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        if (!confirm('Tem certeza que deseja excluir esta aula?')) return;
        
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:3000/api/lesson/${lessonId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error('Erro ao deletar aula');
            
            setLessons(lessons.filter(lesson => lesson.id !== lessonId));
            alert('Aula excluida com sucesso!');
        } catch (err) {
            alert(err.message);
        }
    };

    const startEdit = (lesson) => {
        setEditingLesson(lesson);
        setEditTitle(lesson.title);
        setEditStatus(lesson.status);
        setEditVideoUrl(lesson.video_url || '');
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditingLesson(null);
        setEditing(false);
    };

    const saveEdit = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:3000/api/lesson/${editingLesson.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editTitle,
                    status: editStatus,
                    video_url: editVideoUrl
                })
            });
            
            if (!response.ok) throw new Error('Erro ao atualizar aula');
            
            setLessons(lessons.map(lesson => 
                lesson.id === editingLesson.id 
                    ? { ...lesson, title: editTitle, status: editStatus, video_url: editVideoUrl }
                    : lesson
            ));
            
            alert('Aula atualizada com sucesso!');
            cancelEdit();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <>
                <Menu />
                <div className="container mt-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p>Carregando curso...</p>
                </div>
            </>
        );
    }

    if (error || !course) {
        return (
            <>
                <Menu />
                <div className="container mt-5">
                    <div className="alert alert-danger text-center">
                        {error || 'Curso nao encontrado'}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                            Voltar para Dashboard
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <button className="btn btn-secondary mb-3" onClick={() => navigate('/dashboard')}>
                    Voltar
                </button>
                
                {/* Dados do Curso */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h1 className="card-title">{course.name}</h1>
                        <p className="card-text">{course.description || 'Sem descricao'}</p>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <strong>Inicio:</strong> {formatDate(course.start_date)}
                            </div>
                            <div className="col-md-6">
                                <strong>Termino:</strong> {formatDate(course.end_date)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIFERENCIAL: API EXTERNA - Instrutor Convidado */}
                <div className="card mb-4 border-warning shadow-sm">
                    <div className="card-header bg-warning text-dark">
                        <h4 className="mb-0">Instrutor Convidado Especial</h4>
                    </div>
                    <div className="card-body">
                        {loadingInstrutor ? (
                            <div className="text-center">
                                <div className="spinner-border spinner-border-sm text-warning me-2" />
                                <span>Buscando instrutor internacional...</span>
                            </div>
                        ) : instrutor ? (
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <img 
                                    src={instrutor.foto} 
                                    alt={instrutor.nome}
                                    className="rounded-circle border border-3 border-warning shadow-sm"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{instrutor.nome}</h5>
                                    <p className="mb-1 text-muted">
                                        <i className="bi bi-geo-alt"></i> {instrutor.pais}
                                    </p>
                                    <p className="mb-0 text-muted small">
                                        <i className="bi bi-envelope"></i> {instrutor.email}
                                    </p>
                                </div>
                                <div className="text-end">
                                    <span className="badge bg-warning text-dark">
                                        International Guest
                                    </span>
                                    <button 
                                        className="btn btn-sm btn-outline-warning mt-2 d-block"
                                        onClick={fetchRandomInstrutor}
                                    >
                                        <i className="bi bi-arrow-repeat"></i> Sugerir outro
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-muted">
                                Nao foi possivel carregar o instrutor.
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Secao de Aulas */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Aulas do Curso</h2>
                    <button className="btn btn-primary" onClick={() => setShowLessonForm(!showLessonForm)}>
                        {showLessonForm ? 'Cancelar' : '+ Nova Aula'}
                    </button>
                </div>
                
                {/* Formulario de criacao de aula */}
                {showLessonForm && (
                    <div className="card mb-4 border-primary shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Criar nova aula</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleCreateLesson}>
                                <div className="mb-3">
                                    <label className="form-label">Titulo da aula *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newLesson.title}
                                        onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={newLesson.status}
                                        onChange={(e) => setNewLesson({...newLesson, status: e.target.value})}
                                    >
                                        <option value="draft">Rascunho</option>
                                        <option value="published">Publicado</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">URL do Vídeo (opcional)</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        value={newLesson.video_url}
                                        onChange={(e) => setNewLesson({...newLesson, video_url: e.target.value})}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success" disabled={submitting}>
                                        {submitting ? 'Salvando...' : 'Salvar Aula'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowLessonForm(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Lista de aulas */}
                {lessons.length === 0 ? (
                    <div className="alert alert-info text-center">
                        Nenhuma aula cadastrada ainda.
                    </div>
                ) : (
                    <div className="list-group">
                        {lessons.map((lesson, index) => (
                            <div key={lesson.id} className="list-group-item">
                                {editing && editingLesson?.id === lesson.id ? (
                                    <div>
                                        <div className="mb-2">
                                            <label className="form-label">Titulo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                value={editStatus}
                                                onChange={(e) => setEditStatus(e.target.value)}
                                            >
                                                <option value="draft">Rascunho</option>
                                                <option value="published">Publicado</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">URL do Vídeo</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                value={editVideoUrl}
                                                onChange={(e) => setEditVideoUrl(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-success btn-sm" onClick={saveEdit}>
                                                Salvar
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                                <h5 className="mb-0">{index + 1}. {lesson.title}</h5>
                                                <span className={`badge ${lesson.status === 'published' ? 'bg-success' : 'bg-secondary'}`}>
                                                    {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
                                                </span>
                                            </div>
                                            {lesson.video_url && (
                                                <a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                                    Assistir vídeo
                                                </a>
                                            )}
                                        </div>
                                        <div>
                                            <button 
                                                className="btn btn-outline-warning btn-sm me-1"
                                                onClick={() => startEdit(lesson)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDeleteLesson(lesson.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
