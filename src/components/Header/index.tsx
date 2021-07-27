import Logo from '../../assets/icons/logo.svg'
import { useTransaction } from '../../hooks/useTransactionContext'
import { Container, Content } from './styles';

interface HeaderProps{
    newTransactionModal: ()=>void;
}

export function Header({newTransactionModal}: HeaderProps){
    const data = useTransaction();
    console.log(data)
    return(
        <Container>
            <Content>
                <img src={Logo} alt="dt money" />
                <button type="button" onClick={newTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    );
}