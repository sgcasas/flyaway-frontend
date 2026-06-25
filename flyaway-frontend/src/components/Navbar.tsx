import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/client'

function Navbar() {
    const isLoggedIn = !!localStorage.getItem('token')
    const [username, setUsername] = useState('')

    useEffect(() => {
      async function loadUsername() {
        if (!isLoggedIn) {
          return
        }
        const response = await api.get("/users/current")
        setUsername(response.data.username)
      }
      loadUsername()
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('bookingIds')
        window.location.href = '/login'
    }

    return (
    <nav style={{ display: 'flex', gap: '16px', padding: '12px' }}>
        <Link to="/">Búsqueda</Link>
        {isLoggedIn ? (
            <>
            <Link to="/reservations">Mis Reservas</Link>
            {username && <span>{username}</span>}
            <button onClick={handleLogout}>Cerrar sesión</button>
            </>
        ) : (
            <>
            <Link to="/register">Registro</Link>
            <Link to="/login">Login</Link>
            </>
        )}
    </nav>
  )
}

export default Navbar