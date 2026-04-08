export const handleResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}