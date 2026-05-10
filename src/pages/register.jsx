//Este módulo cria a tela de cadastro de novos usuários, associado à API User
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false
});

    const validatePassword = (senha) => {
        setPasswordErrors({
            minLength: senha.length >= 8,
            hasUpperCase: /[A-Z]/.test(senha),
            hasNumber: /[0-9]/.test(senha),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
        });
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordTouched(true);
        validatePassword(newPassword);

    
        if (newPassword.length < 8) {
            setPasswordError('A senha deve ter no mínimo 8 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const isPasswordValid = () => {
        return Object.values(passwordErrors).every(Boolean);
    };
    //Função para enviar os dados e fazer as APIs
    const handleSubmit = async (e) => {
        e.preventDefault(); //Para a página não recarregar
        console.log('>>> CLICOU NO BOTÃO');
        console.log('>>> Dados:', { name, email, password });
        setLoading(true);
        setError('');
        
        try {
            //A API linka diretamente com o projeto Ensino.API
            const response = await fetch('http://localhost:3000/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({name, email, password})
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
                            <h1 className="card-title text-center mb-4">Criar uma conta</h1>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Seu nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                
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
                                        className={`form-control ${password && !isPasswordValid() ? 'is-invalid' : ''}`}
                                        placeholder="mínimo 8 caracteres"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    {passwordError && (
                                        <div className="invalid-feedback">
                                            {passwordError}
                                        </div>
                                    )}
                                     {/* Lista de requisitos */}
                                    {password && (
                                        <div className="mt-2 small">
                                        <p className="mb-1">A senha deve conter:</p>
                                        <ul className="list-unstyled">
                                            <li className={passwordErrors.minLength ? 'text-success' : 'text-muted'}>
                                                {passwordErrors.minLength ? '✅' : '❌'} No mínimo 8 caracteres
                                            </li>
                                            <li className={passwordErrors.hasUpperCase ? 'text-success' : 'text-muted'}>
                                                {passwordErrors.hasUpperCase ? '✅' : '❌'} Pelo menos 1 letra maiúscula
                                            </li>
                                            <li className={passwordErrors.hasNumber ? 'text-success' : 'text-muted'}>
                                                {passwordErrors.hasNumber ? '✅' : '❌'} Pelo menos 1 número
                                            </li>
                                            <li className={passwordErrors.hasSpecialChar ? 'text-success' : 'text-muted'}>
                                                {passwordErrors.hasSpecialChar ? '✅' : '❌'} Pelo menos 1 caractere especial
                                            </li>
                                        </ul>
                                    </div>
                                    )}
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={loading || password.length < 8}
                                >
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-3">
                                Já tem conta? <a href="/login">Faça login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}