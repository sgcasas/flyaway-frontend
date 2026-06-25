import { useState, useEffect } from 'react'
import api from '../api/client'

function MyReservations() {
  const [reservations, setReservations] = useState<any[]>([])

  useEffect(() => {
    async function loadReservations() {
        const stored = localStorage.getItem('bookingIds')
        const ids = stored ? JSON.parse(stored) : []
        const results = []
        for (const id of ids) {
            const bookingRes = await api.get(`/flights/book/${id}`)
            const booking = bookingRes.data

            const searchRes = await api.get('/flights/search', {
            params: { flightNumber: booking.flightNumber }
            })
            const match = searchRes.data.items[0]

            results.push({ ...booking, airlineName: match ? match.airlineName : 'Desconocida' })
        }
        setReservations(results)
    }
    loadReservations()
  }, [])

  return (
    <div>
        <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Aerolínea</th>
                        <th>Fecha de salida</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((flight) =>(
                        <tr key={flight.id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.airlineName}</td>
                            <td>{flight.estDepartureTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default MyReservations