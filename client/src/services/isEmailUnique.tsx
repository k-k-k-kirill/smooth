import axios from 'axios'

const isEmailUnique = async (email: string) => {
    let isEmailUnique = true

    if(email) {
       await axios.get(`http://localhost:3000/user/email/unique/${email}`).then((res) => {
            isEmailUnique = res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    return isEmailUnique
}

export default isEmailUnique