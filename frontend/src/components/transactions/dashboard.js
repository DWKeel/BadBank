import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/authContext';
import { transactionsAPI } from '../../services/index.js';
import Card from '../card';
import TransactionList from './transactionList';
import ContactButton from '../home/contactButton';
import '../../components.css';

function Account() {
  const auth = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState('loading');

  const getTransactions = async () => {
    const response = await transactionsAPI.all(auth.auth?.uid);
    setTransactions(response.data);
  };

  const getBalance = async () => {
    const response = await transactionsAPI.balance(auth.auth?.uid);
    setCurrentBalance(response.data.balance);
  };

  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  return (
    <>
      <Card
        className='balance-card'
        bgcolor='light'
        txtcolor='black'
        header={`Welcome, ${auth.auth?.displayName}`}
        title={`Your balance is $${currentBalance}.`}
      />
      <h4>Recent Transactions</h4>
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

export default Account;