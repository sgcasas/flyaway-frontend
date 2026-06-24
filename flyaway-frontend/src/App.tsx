import FlightSearch from './pages/FlightSearch.tsx'
import Login from './pages/Login.tsx'
import MyReservations from './pages/MyReservations.tsx'
import Register from './pages/Register.tsx'
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FlightSearch />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App