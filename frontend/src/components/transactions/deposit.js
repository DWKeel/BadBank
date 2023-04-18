import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/authContext';
import { transactionsAPI } from '../../services';
import Card from '../card';
import TransactionList from './transactionList';
import ContactButton from '../home/contactButton';
import '../../components.css'

function Deposit() {
  const auth = useAuth();
  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState('');
  const [currentBalance, setCurrentBalance] = useState('loading');
  const [isValid, setIsValid] = useState(false);
  const [transactions, setTransactions] = useState([])

  const getTransactions =  async () => {
    const response = await transactionsAPI.all(auth.auth.uid);
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

  function handleChange(event) {
    setDeposit(Number(event.target.value));
    if (deposit < 0) {
      alert('Deposit Amount Must Be A Valid Number');
      setDeposit('');
      return setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  async function handleDeposit() {
    let newBalance = currentBalance + deposit;
    setCurrentBalance(newBalance);
    const response = await transactionsAPI.deposit(date, deposit, newBalance, auth.auth.uid);
    setCurrentBalance(response.data.updateBalance.balance)
    await getTransactions();
    
    setShow(false);
    setDeposit('');
    setIsValid(false);
  }

  function clearForm() {
    setDeposit('');
    setShow(true);
  }

  return (
    <>
      <Card
        className='deposit-withdraw-card'
        bgcolor='light'
        txtcolor='black'
        header='Make A Deposit'
        title={`BALANCE: $${currentBalance}.`}
        body={
          show ? (
            <>
              Deposit Amount
              <br />
              <input
                type='number'
                className='form-control'
                id='deposit'
                placeholder='Enter Amount'
                value={deposit}
                onChange={handleChange}
              />
              <br />
              <input
                type='submit'
                className='btn btn-dark'
                onClick={handleDeposit}
                disabled={!isValid}
              />
            </>
          ) : (
            <>
              <div className='deposit-withdraw-card'>
                <h5>Deposit Received.</h5>
                <button
                  type='submit'
                  className='btn btn-dark'
                  onClick={clearForm}
                >
                  Make Another Deposit
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

export default Deposit;