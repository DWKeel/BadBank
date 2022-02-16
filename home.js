function Home(){
    return (
      <Card
        bgcolor="info"
        txtcolor="white"
        header={(<h3>Bad Bank</h3>)}
        title="Welcome to The Bad Bank"
        text="Bank At Your Own Risk!"
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      /> 
    );  
}