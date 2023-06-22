import { URL } from "../constants"


export const get_crypto_currencies = async (token: string, id: string | number) => {
    try {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response: any = await fetch(`${URL}get_coins/`, header)
        const resp = await response.json()

        const wallet = await get_coin_wallet(token, id)

        if (resp.length > 0 && wallet.success) return {success: true, resp, wallet: wallet.data}
        else return { success: false, error: 'An error has occurred' }

    } catch(error) {
        return { success: false, error }
    }
}

export const get_coin_wallet = async (token: string, id: string | number) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const wallet_resp = await fetch(`${URL}get_coin_wallet/?id=${id}`, header)
    const wallet =  await wallet_resp.json()
    return wallet
}

export const post_transaction = async (token: string, dataBody: any) => {
    try {
        const queryParams: any = {
            body: JSON.stringify(dataBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response: any = await fetch(`${URL}post_transaction/`, queryParams)
        const resp = await response.json()

        if (resp.success) return {success: true, resp}
        else return { success: false, error: 'An error has occurred' }

    } catch(err) {
        const error: any =  err
        return { success: false, error: error.message }
    }
}

export const get_transactions = async (token: string, id: string | number) => {
    try {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response: any = await fetch(`${URL}get_transactions/?id=${id}`, header)
        const resp = await response.json()

        if (resp.success) return {success: true, resp}
        else return { success: false, error: 'An error has occurred' }

    } catch(error) {
        return { success: false, error }
    }
}

export const accredit_balance = async (token: string, dataBody: any) => {
    try {
        const queryParams: any = {
            body: JSON.stringify(dataBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response: any = await fetch(`${URL}accredit_balance/`, queryParams)
        const resp = await response.json()

        if (resp.success) return { success: true, resp}
        else return { success: false, error: 'An error has occurred' }

    } catch(err) {
        const error: any = err
        return { success: false, error: error.message }
    }
}

