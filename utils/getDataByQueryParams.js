export const getDataByQueryParams = (data, QueryObj) => {
    const { name, country, continent } = QueryObj
    
    if (name) {
        data = data.filter(destination =>
            destination.name.toLowerCase() === name.toLowerCase()
        )
    }

    if (country) {
        data = data.filter(destination =>
            destination.country.toLowerCase() === country.toLowerCase()
        )
    }

    if (continent) {
        data = data.filter(destination =>
            destination.continent.toLowerCase() === continent.toLowerCase()
        )
    }

    return data
}