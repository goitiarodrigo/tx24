import { URL } from "../constants" 

export interface IUserData {
    email: string,
    password: string,
    username?: string,
    type_log: string
}

export const logUserService = async ({email, password, username, type_log}: IUserData) => {
    try {
        const queryParams: any = {
            body: JSON.stringify({email, password, username}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const resp = await fetch(`${URL}${type_log}/`, queryParams)
        const response = await resp.json()

        if (response.access_token) return { success: true, response }
        else return {success: false, error: response[Object.keys(response)[0]][0]}

    } catch(error) {
        return {success: false, error}
    }
}