import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

function Contact() {
  return (
    <>
      <h1 className='contact-text'>Contact Support</h1>
      <div className='contact-buttons'>
        <a
          className='btn btn-light large contact-link'
          role='button'
          href='mailto:007danielwinston@gmail.com'
          target='_blank'
          rel='noreferrer'
        >
          <h4>Email</h4>
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </>
  );
}

export default Contact;