import axios from '../axios/instance'

const isEmailUnique = async (email: string) => {
    let isEmailUnique = true

    if(email) {
       await axios.get(`user/email/unique/${email}`).then((res) => {
            isEmailUnique = res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    return isEmailUnique
}

export default isEmailUnique