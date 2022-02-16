function CreateAccount(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
    function validate(field, label){
      if (!field) {
        setStatus('Error: Enter ' + label);
        return false;
      }
  
      if (label="password" && field.length<8) {
        setStatus('Error: Password must be at least 8 characters');
        return false;
      }
  
      return true;
  
    }
  
    function handleCreate(){
      console.log(name,email,password);
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      ctx.users.push({name,email,password,balance:0,deposit:[],withdrawal:[]});
      setShow(false);
    }    
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="info"
        txtcolor="white"
        header={(<h3>Create Account</h3>)}
        status={status}
        body={show ? (  
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email Address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password (8 Character Min.)<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-dark" onClick={handleCreate} disabled={!name && !email && !password}>Create Account</button>
                </>
              ):(
                <>
                <h4>Success</h4>
                <button type="submit" className="btn btn-dark" onClick={clearForm}>Add Another Account</button>
                </>
              )}
      />
    )
}