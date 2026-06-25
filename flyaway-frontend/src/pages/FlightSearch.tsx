import api from '../api/client'
import { useState } from 'react'

function FlightSearch() {
    const [flightNumber, setFlightNumber] = useState('')
    const [airlineName, setAirlineName] = useState('')
    const [error, setError] = useState('')
    const [flights, setFlights] = useState<any[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [bookingMessage, setBookingMessage] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    
    async function handleBook(flightId: number) {
        try {
        const response = await api.post('/flights/book', { flightId })
        const nuevoId = response.data.id
        const stored = localStorage.getItem('bookingIds')
        const ids = stored ? JSON.parse(stored) : []
        ids.push(nuevoId)
        localStorage.setItem('bookingIds', JSON.stringify(ids))
        setError('')
        setBookingMessage(`Reserva realizada con el ID ${nuevoId}`)
        } catch (err: any) {
            setError(err.response.data.detail)
        }
    }

    async function handleSearch(e:React.FormEvent) {
        e.preventDefault()
        setHasSearched(true)
        try {
            const response = await api.get('/flights/search', {
                params: {
                    flightNumber,
                    airlineName,
                    estDepartureTimeFrom: dateFrom ? new Date(dateFrom).toISOString() : undefined,
                    estDepartureTimeTo: dateTo ? new Date(dateTo).toISOString() : undefined,
                    }
            })
            setError('')
            setFlights(response.data.items)
        } catch (err: any) {
            setError(err.response.data.detail)
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                type="text"
                value={airlineName}
                onChange={(e) => setAirlineName(e.target.value)}
                placeholder="AirlineName"
                />
                <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="FlightNumber"
                />
                <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="DateFrom"
                />
                <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="DateTo"
                />
                <button type="submit">Buscar</button>
                {error && <p>{error}</p>}
            </form>
            {hasSearched && flights.length === 0 && <p>Sin resultados para esa búsqueda</p>}
            {hasSearched && (
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Aerolínea</th>
                        <th>Hora de salida</th>
                        <th>Hora de llegada</th>
                        <th>Sitios disponibles</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) =>(
                        <tr key={flight.id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.airlineName}</td>
                            <td>{flight.estDepartureTime}</td>
                            <td>{flight.estArrivalTime}</td>
                            <td>{flight.availableSeats}</td>
                            <td>
                                <button disabled={!!!localStorage.getItem('token')} onClick={() => handleBook(flight.id)}>
                                    Reservar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {bookingMessage && <p>{bookingMessage}</p>}
        </div>
    )
}

export default FlightSearch