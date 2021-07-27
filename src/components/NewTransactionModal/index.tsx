import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/icons/close.svg'
import incomeImg from '../../assets/icons/income.svg'
import outcomeImg from '../../assets/icons/outcome.svg'
import { FormEvent, useState } from 'react'
import { useTransaction } from '../../hooks/useTransactionContext'

// const colors = {
//   red: "#e52e4d",
//   green: "#33cc95",
// };

// //anotacao de colchete
// console.log("???"+colors['green']);

interface NewTransactionModalProps{
  isOpen: boolean,
  onCloseModal: () => void
}


Modal.setAppElement('#root');

export function NewTransactionModal({isOpen, onCloseModal}: NewTransactionModalProps){
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  
  const [type, setType] = useState('deposit')

  const { createTransaction } = useTransaction();
  
  async function handleFormTransaction(event: FormEvent){
    event.preventDefault();
    
    await createTransaction({
      title,
      category,
      amount,
      type
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onCloseModal()
  }
  
  return(
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onCloseModal} className="react-modal-close">
        <img src={closeImg} alt="close-icone" />
      </button>
      <Container onSubmit={handleFormTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type="button" 
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
  
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}