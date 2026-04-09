import http from 'node:http';
import { getDestinations } from './database/db.js';
import { handleResponse } from './utils/handelResponse.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js';

const PORT = 8000;

const server = http.createServer(async (req, res) => {

    const destinations = await getDestinations()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        let filteredData = getDataByQueryParams(destinations, queryObj)

        handleResponse(res, 200, filteredData)
        console.log(queryObj)
    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations,'continent', continent )
        handleResponse(res, 200, filteredData)
    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations,'country', country )
        handleResponse(res, 200, filteredData)
    } else {
        handleResponse(res, 404, {
            error: 'not found',
            message: 'The requested route does not exist'
        })
    }
})

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))