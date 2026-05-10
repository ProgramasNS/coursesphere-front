//Este módulo cria a página de login do usuário, associado à API User
import { useState } from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        if (newPassword.length < 8) {
            setPasswordError('A senha deve ter no mínimo 8 caracteres');
        } else {
            setPasswordError('');
        }
    };
    //Função para enviar os dados e fazer as APIs
    const handleSubmit = async (e) => {
        e.preventDefault(); //Para a página não recarregar
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login');
            }
            //Lugar de geração dos tokens
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            //Vai para a página de dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Entrar com sua conta</h1>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="••••••"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-3">
                                Não tem conta? <a href="/register">Registre-se</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}