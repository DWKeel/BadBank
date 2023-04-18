import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/authContext';
import { transactionsAPI } from '../../services';
import Card from '../card'
import ContactButton from '../home/contactButton';
import TransactionList from './transactionList';
import '../../components.css'

function Withdraw() {
  const auth = useAuth();
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState('');
  const [currentBalance, setCurrentBalance] = useState('loading');
  const [isValid, setIsValid] = useState(false);
  const [transactions, setTransactions] = useState([])

  const getTransactions =  async () => {
    const response = await transactionsAPI.all(auth.auth?.uid);
    setTransactions(response.data);
  }

  const getBalance = async () => {
    const response = await transactionsAPI.balance(auth.auth.uid);
    setCurrentBalance(response.data.balance)
  }

  useEffect(() => {
    getTransactions(); 
    getBalance()
  }, [])

  let today = new Date();
  let date = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;

  const handleChange = (event) => {
    setWithdraw(Number(event.target.value));
    if (withdraw < 0) {
      alert('Withdrawal Amount Must Be A Valid Number');
      setWithdraw('');
      return setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  async function handleWithdraw() {
    if (withdraw > currentBalance) {
      alert('Insufficient Funds');
      setWithdraw('');
      return setIsValid(false);
    }
    let newBalance = currentBalance - withdraw;
    setCurrentBalance(newBalance);
    const response = await transactionsAPI.withdraw(date, withdraw, newBalance, auth.auth.uid);
    setCurrentBalance(response.data.updateBalance.balance)
    await getTransactions();
  
    setShow(false);
    setWithdraw('');
    setIsValid(false);
  }

  function clearForm() {
    setWithdraw('');
    setShow(true);
  }


  return (
    <>
      <Card
        bgcolor='light'
        txtcolor='black'
        header='Withdraw Funds'
        title={`BALANCE: $${currentBalance}.`}
        body={
          show ? (
            <>
              Withdrawal Amount
              <br />
              <input
                type='number'
                className='form-control'
                id='withdraw'
                placeholder='Enter Amount'
                value={withdraw}
                onChange={handleChange}
              />
              <br />
              <input
                type='submit'
                className='btn btn-dark'
                onClick={handleWithdraw}
                disabled={!isValid}
              />
            </>
          ) : (
            <>
            <div className='deposit-withdraw-card'>
              <h5>Withdraw Processed.</h5>
              <button
                type='submit'
                className='btn btn-dark'
                onClick={clearForm}
              >
                Make Another Withdrawl
              </button>
              </div>
            </>
          )
        }
      />
      <table className='transaction-list'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <TransactionList transactions={transactions} />
        </tbody>
      </table>
      <ContactButton />
    </>
  );
}

export default Withdraw;