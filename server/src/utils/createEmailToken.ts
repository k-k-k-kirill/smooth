import jwt from 'jsonwebtoken'

const createEmailToken = (user_id: number) => {
    const token = jwt.sign({ user: user_id }, process.env.REFRESH_SECRET!, {
        expiresIn: "1h"
    })

    return token
}

export default createEmailToken