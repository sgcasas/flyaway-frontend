import api from '../api/client'
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault()
        if (!email || !password) {
            setError('No se pueden tener campos vacíos')
            return
        }
        try {
            const response = await api.post('/auth/login', {email, password})
            localStorage.setItem('token', response.data.token)
            setError('')
            window.location.href = '/'
        } catch (err: any) {
            setError(err.response.data.detail)
        }
    }
    return (
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                <button type="submit">Iniciar sesión</button>
                {error && <p>{error}</p>}
            </form>
        )
}

export default Login