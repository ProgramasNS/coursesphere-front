//Este módulo cria novos cursos, sendo integrado ao método POST da API Course
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../menu/sandwich";

export default function Create() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        if (start_date > end_date) {
            setError('A data de início não pode ser maior que a data final!');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        
        console.log('Token:', token);

        if (!token) {
            console.log('Token não encontrado!');
            navigate('/login');
            return;
        }
        if (!validate()) return;
        try {
            const response = await fetch('http://localhost:3000/api/course/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, description, start_date, end_date})
            });

            console.log('Status HTTP:', response.status);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido');
                    navigate('/login');
                    return;
                }
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            localStorage.setItem('course', data.course);
        } catch (err) {
            console.error("Erro completo:", err);
            setError(err.message);
            setLoading(false);
        } finally {
            setLoading(false);
            navigate('/dashboard');
        }
    }
    return (
        <>
            <Menu/>
            <div className="container p-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4 p-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h1 className="card-title text-center mb-4">Criar novo curso</h1>
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                                )}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label text-center">Nome do curso</label>
                                                <input
                                                type='text'
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Descrição do curso</label>
                                                <textarea
                                                className="form-control"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
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
                                            <button 
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            >Enviar</button>
                                        </form>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}