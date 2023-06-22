import { createContext } from "react";
import { IUserData } from "../services/logUser.service";

interface IPropContext {
    cryptoData: any[],
    logUser: ({email, password, username, type_log}: IUserData) => any,
    user: {username: string, email: string, id: string},
    setAllCryptos: (value: any[]) => void,
    allCryptos: any[],
    setWallet: (value: any[]) => void,
    wallet: any[]
}

export const CryptoContext = createContext({} as IPropContext)