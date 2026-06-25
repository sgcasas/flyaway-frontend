import { useState } from 'react'
import api from '../api/client'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email || !firstName || !lastName || !password) {
            setError('No se pueden tener campos vacíos')
            return
        }
        const username = email
        try {
            await api.post('/users/register', {username, email, firstName, lastName, password})
            setError('')
            setSuccess('Registro exitoso')
            console.log('exito')
            setTimeout(() => navigate('/login'), 1500)
        } catch (err: any) {
            setError(typeof err.response.data === 'string' ? err.response.data : err.response.data.detail)
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
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="FirstName"
            />
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="LastName"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            />
            <button type="submit">Registrarse</button>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </form>
    )
}

export default Register