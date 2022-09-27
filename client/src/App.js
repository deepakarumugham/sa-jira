import './App.css';
import React from 'react';
import TicketForm from './components/ticketForm';
import TicketList from './components/ticketList';

const STATUS_FILTERS = [
                  {"id": "closed", "value": "CLOSED"},
                  {"id": "new", "value": "NEW"},
                  {"id": "inprogress", value: "INPROGRESS"},
                  {"id": "all", value: "ALL"}           
                ];

const STATUS_DROPDOWN = [
                    {"id": "closed", "value": "CLOSED"}, 
                    {"id": "new", "value": "NEW"}, 
                    {"id": "inprogress", value: "INPROGRESS"}
                  ];                

function App() {

  return (
    <html>
      <div className="App">
        <div/>
        <div className="formbox">
          <div className="title"> Create a new Ticket</div>
          <TicketForm dropdowns={STATUS_DROPDOWN}/>
        </div>
        <br/>
        <br/>
        <TicketList filters={STATUS_FILTERS}/>
      </div>      
    </html>
    
  );
}

export default App;
