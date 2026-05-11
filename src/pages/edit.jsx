import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../menu/sandwich";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:3000/api/course/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, start_date, end_date })
            });
            
            if (!response.ok) throw new Error('Erro ao atualizar curso');
            
            alert('Curso atualizado com sucesso!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="text-center mb-4">Editar Curso</h1>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Nome do curso</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Descrição</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="3"
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Data de início</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={start_date}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Data de término</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={end_date}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary" disabled={saving}>
                                            {saving ? 'Salvando...' : 'Salvar alterações'}
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}