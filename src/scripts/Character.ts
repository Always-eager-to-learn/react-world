const toTitleCase = (value: string) => {
    const firstValue = value[0]
    const position = firstValue.charCodeAt(0) - 97
    const distance = 65 + position
    const newTitleValue  = String.fromCharCode(distance)
    const newString = newTitleValue + value.slice(1, value.length)

    return newString
}

export {toTitleCase}