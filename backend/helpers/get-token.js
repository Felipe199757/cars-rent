const getToken = (request) =>{
    const authHeader = request.headers && request.headers.authorization;

    const token = authHeader.split(" ")[1]

    return token
}

module.exports = getToken