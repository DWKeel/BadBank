function AllData(){
    const ctx = React.useContext(UserContext);

    return (
      <Card
      bgcolor="info"
      txtcolor="white"
      header={(<h3>All Data</h3>)}
      body= {JSON.stringify(ctx)}
      />
    );
}
