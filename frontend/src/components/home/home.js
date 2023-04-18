import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/authContext';
import Card from '../card';
import ContactButton from './contactButton';
import Logo from './logo';
import '../../components.css';

function Home() {
  const auth = useAuth();
  return (
    <Logo>
      <Card
        txtcolor='black'
        header={!auth.auth ? 'WELCOME TO THE BADDEST BANK' : `WELCOME, ${auth.auth?.displayName}`}
        text={!auth.auth ? 'Bank At Your Own Risk!' : null}
        body={
          !auth.auth ? (
            <>
              <p>Keep Track Of Your Bag</p>
              <p>Let's Put You ON.</p>
              <div className='btn-container'>
                <Link
                  className='btn btn-info btn-lg'
                  role='button'
                  to='../createaccount'
                >
                  Create Account
                </Link>
                <Link
                  className='btn btn-info btn-lg'
                  role='button'
                  to='../login'
                >
                  Log In
                </Link>
              </div>
            </>
          ) : (
            <Link
              className='btn btn-info btn-lg'
              role='button'
              to='../dashboard'
            >
              Go To Account
            </Link>
          )
        }
      />
      <ContactButton />
    </Logo>
  );
}

export default Home;