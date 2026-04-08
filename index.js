import http from 'node:http';
import { getDestinations } from './database/db.js';
import { handleResponse } from './utils/handelResponse.js';
import { getDataByPathParam } from './utils/getDataByPathParam.js';

const PORT = 8000;

const server = http.createServer(async (req, res) => {

    const destinations = await getDestinations()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
    console.log(queryObj)

    if (req.url === '/api' && req.method === 'GET') {
        handleResponse(res, 200, destinations)
    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split('/').pop()
        const filteredData = getDataByPathParam(destinations,'continent', continent )
        handleResponse(res, 200, filteredData)
    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop()
        const filteredData = getDataByPathParam(destinations,'country', country )
        handleResponse(res, 200, filteredData)
    } else {
        handleResponse(res, 404, {
            error: 'not found',
            message: 'The requested route does not exist'
        })
    }
})

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))