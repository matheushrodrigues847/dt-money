import { Container } from './style'
import { useTransaction } from '../../hooks/useTransactionContext'

interface TransactionsType{
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    data: Date
}

export function TransactionTable(){
    const lista = useTransaction();

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.transactions.length!==0?(
                        lista.transactions.map((item: TransactionsType)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td className={item.type}>{new Intl.NumberFormat('pt-BR',{
                                        style: 'currency',
                                        currency: 'BRL'
    
                                    }).format(item.amount)}</td>
                                    <td>{item.category}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(item.data))}</td>
                                </tr>
                            );
                        })
                    ):(
                        <tr>
                            <td>Carregando..</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Container>
    );
}