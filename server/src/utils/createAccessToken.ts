import jwt from 'jsonwebtoken'

const createAccessToken = (user_id: number) => {
    const token = jwt.sign({ user: user_id }, process.env.LOGIN_SECRET!, {
        expiresIn: "1d"
    })

    return token
}

export default createAccessToken