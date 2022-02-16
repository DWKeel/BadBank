function Deposit(){
    const ctx = React.useContext(UserContext); 
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [balance, setBalance]   = React.useState(ctx.users[0].balance);
    const [amount, setAmount]     = React.useState('');
    
    function clearForm(){
      setAmount('');
      setShow(true);
    }
  
    function validate(amount){
      if (amount <0) {
        setStatus('Error: Cannot Process Negative Numbers');
        return false;
      }
      return true;
    }
  
    function validateNan(amount){
      if (isNaN(amount)) { 
       setStatus('Error: Not A Number. Try Again');
       setTimeout(() => setStatus(''),5000);
       return "Enter A Number";
      }
      return true;
  
    }
    
    function handleDeposit(){
      if (!validate(amount, 'Amount')) return;
      ctx.users[0].balance += Number(amount);
   
  
      ctx.users.push({balance, amount});
      setShow(false);
      setBalance(ctx.users[0].balance)
      setStatus('');
      console.log(ctx.users[0].balance, amount);
    }
  
    return (
      <Card
        bgcolor="info"
        txtcolor="white"
        header={(<h3>Deposit</h3>)}
        status={status}
        body={show ? (  
                <>
                Account Balance: ${balance}
                <label readOnly={false} onChange={e => setBalance()}> </label> <br/><br/>
                
                Deposit Amount<br/>
                <div className="input-group">
                  <span className="input-group-addon" >$</span>
                  <input type="input" className="form-control" id="amount" placeholder="Enter Deposit Amount" value={amount} onChange={e => {
                    validate(e.currentTarget.value);
                    validateNan(e.currentTarget.value);
                    setAmount(e.currentTarget.value);}} /><br/>
                </div> <br/>
                <button type="submit" className="btn btn-dark" disabled={amount.length<1} onClick={handleDeposit}>Deposit</button>
                </>
              ):(
                <>
                <h4>Success</h4>
                Deposited: ${amount}<br/>
                New Current Balance: ${ctx.users[0].balance} <br/><br/>
                <button type="submit" className="btn btn-dark" onClick={clearForm}>Deposit Again</button>
                </>
              )}
      />
    )
}