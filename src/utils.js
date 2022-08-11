export const checkCapitalLetter = (word) => {
    return word.charAt(0) === word.charAt(0).toUpperCase()
}

export const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/;