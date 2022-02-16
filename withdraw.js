function Withdraw(){
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
  
      let a = Math.abs(amount);
      let b = Math.abs(ctx.users[0].balance);
      if (a > b) {
        setStatus('Error: Withdrawal Amount Exceeds Current Balance. Please Enter New Amount');
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
      ctx.users[0].balance -= Number(amount);
   
  
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
        header={(<h3>Withdraw</h3>)}
        status={status}
        body={show ? (  
                <>
                Account Balance: ${balance}
                <label readOnly={false} onChange={e => setBalance()}> </label> <br/><br/>
                
                Withdrawal Amount<br/>
                <div className="input-group">
                  <span className="input-group-addon" >$</span>
                  <input type="text" className="form-control" id="amount" placeholder="Enter Withdraw Amount" value={amount} onChange={e => {
                    validate(e.currentTarget.value);
                    validateNan(e.currentTarget.value);
                    setAmount(e.currentTarget.value);}} /><br/>
                </div> <br/>
                <button type="submit" className="btn btn-dark" disabled={amount.length<1 || isNaN(amount)} onClick={handleDeposit}>Withdraw</button>
                </>
              ):(
                <>
                <h4>Success</h4>
                Withdrawn: ${amount}<br/>
                New Current Balance: ${ctx.users[0].balance} <br/><br/>
                <button type="submit" className="btn btn-dark" onClick={clearForm}>Withdraw Again</button>
                </>
              )}
      />
    )
}