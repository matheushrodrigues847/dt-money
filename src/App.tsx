import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';

import{ useState } from 'react'
import { TransactionsProvider } from './hooks/useTransactionContext';

export function App() {
  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);

  function handleOpenModal(){
    setIsNewTransactionModal(true);
  }

  function handleCloseModal(){
    setIsNewTransactionModal(false);
  }


  return (
    <TransactionsProvider>
      <Header newTransactionModal={handleOpenModal}/>
      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModal} onCloseModal={handleCloseModal}/>
      <GlobalStyle />
    </TransactionsProvider>
  );
}

// import styled from 'styled-components'

//deve ser usado como um componente
// const Title = styled.h1`
//   color: #8257e6;

//   p{ 
//     color: #dd0f0f;
//   }
//`