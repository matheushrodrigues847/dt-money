import { Container } from './styles'
import { Balance } from './Balance'
import Income from '../../assets/icons/income.svg'
import Outcome from '../../assets/icons/outcome.svg'
import Total from '../../assets/icons/total.svg'
import { useTransaction } from '../../hooks/useTransactionContext'

export function Summary(){
    const { transactions } = useTransaction();

    const result = transactions.reduce((acc, transaction) =>{
        if(transaction.type === 'deposit'){
            acc.deposit += transaction.amount
            acc.total += transaction.amount
        }else{
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        }
  
        return acc
    },{
        deposit: 0,
        withdraw: 0,
        total: 0
    })

    return(
        <Container>
            <Balance text="Entrada" src={Income} value={result.deposit.toString()}/>
            <Balance text="Saida" src={Outcome} value={result.withdraw.toString()} hifen={'-'}/>
            <Balance text="Total" src={Total} value={result.total.toString()} background="#33cc95" color="#ffffff"/>
        </Container>
    );
}