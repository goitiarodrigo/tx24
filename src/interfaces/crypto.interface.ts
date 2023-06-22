export interface ICryptoInfo {
    abbreviation: string,
    current_price: number,
    id: number,
    image: string,
    name: string,
    old_price: number,
    previous_day_price: number
}

export interface ICrypto {
    data: ICryptoInfo
}