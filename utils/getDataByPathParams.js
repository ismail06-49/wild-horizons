
export const getDataByPathParams = (data, locationType, loactionName) => {
    return data.filter((destination) => {
            return destination[locationType].toLocaleLowerCase() === loactionName.toLocaleLowerCase()
        })
}


