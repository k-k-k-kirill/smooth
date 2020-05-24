import jwt from 'jsonwebtoken'

const createRefreshToken = (user_id: number) => {
    const token = jwt.sign({ user: user_id }, process.env.REFRESH_SECRET!, {
        expiresIn: "7d"
    })

    return token
}

export default createRefreshToken