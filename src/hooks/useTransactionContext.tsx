import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { api } from "../services/api";


interface TransactionsType{
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    data: Date
}

interface TransactionsProviderProps{
    children: ReactNode;
}

type TransactionInput = Omit<TransactionsType, 'id' |'data'>;

interface TransactionsContextData{
    transactions: TransactionsType[];
    createTransaction: (transactionInput: TransactionInput)=> Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransaction] = useState<TransactionsType[]>([]);
    

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            data: new Date()
        })
        console.log(transactionInput.type)
        const data = response.data;

        setTransaction([...transactions, data.transactions])
    }

    useEffect(()=>{
        api.get('transactions')
            .then(response => setTransaction(response.data.transactions))

    },[]);

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransaction(){
    const context = useContext(TransactionsContext);

    return context;
}
