import React from 'react';
import Axios from 'axios';
class TicketList extends React.Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {
          tickets: [],
          userList: [],
          stateOptions: props.filters,
          selectedState: "ALL",
          selectedUser: 'ALL',
          assignee: '',
          isLoading: false
        };

    }

    componentDidMount() {
        console.log(process.env.REACT_APP_SERVER_BASE_URL);        
        this.setState({isLoading: true});
        Axios.get(process.env.REACT_APP_SERVER_BASE_URL + "/tickets").then((resp) => {
            this.setState({
                    tickets: resp.data,
                    isLoading: false
            })
        }).catch(error => {
            console.log(error.response)
        });;   ;
        this.setState({isLoading: true});
        Axios.get(process.env.REACT_APP_SERVER_BASE_URL + "/users").then((resp) => {
            console.log("resp.data[0]: " + JSON.stringify(resp.data[0]));
            this.setState({ userList: resp.data,
                            selectedUser: resp.data[0].name,
                            assignee: resp.data[0]._id,
                            isLoading: false
                          });
        }).catch(error => {
            console.log(error.response)
        });;        
    }

    handleUserSelection(target) {
        this.setState({isLoading: true});
        Axios.get(process.env.REACT_APP_SERVER_BASE_URL + "/tickets?assignee=" + target.value).then((resp) => {
            console.log(resp.data);
            this.setState({
                    tickets: resp.data,
                    assignee: target.value,
                    selectedUser: target.label,
                    isLoading: false,
                    selectedState: 'ALL' //resetting selection
            })
        }).catch(error => {
            console.log(error.response)
        });;   ;        

    }

    handleSelection(value) {
        console.log(value);
        Axios.get(process.env.REACT_APP_SERVER_BASE_URL + "/tickets?status=" + value).then((resp) => {
            console.log(resp.data);
            this.setState({
                    tickets: resp.data,
                    selectedState: value,
                    isLoading: false,
                    selectedUser: 'ALL' //resetting selection
            })
        }).catch(error => {
            console.log(error.response)
        });;   ;
    }
     
    renderTickets() {
        const {isLoading, tickets} = this.state;
        if(isLoading)
            return (<div class="spinner"><div></div><div></div></div>);
        if(!tickets || tickets.length === 0)
        return (<tr>No data for the selected filter in DB</tr>)
        return (tickets.map((item) => {
            return (
                <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>{item.assignee? item.assignee.name: ""}</td>
                </tr>
            )
            }));
    }

    render() {
        const {selectedState, stateOptions, selectedUser, userList} = this.state;
        return (
            <div >
                <div className="row">
                    <div>
                        <label>Status: </label>
                        <select 
                            value={selectedState}
                            onChange={(e) => this.handleSelection(e.target.value)}
                        >
                            {stateOptions.map( (item) => {
                                return (<option key={item.id} value={item.value}>
                                    {item.value}
                                </option>);
                            })}
                        </select>
                    </div>
                    <div className="assignee">
                        <label>Assignee: </label>
                        <select 
                                value={selectedUser}
                                onChange={(e) => this.handleUserSelection(e.target)}>
                                <option value="ALL">ALL</option>  
                                {
                                    userList.map( (item) => {
                                        return (<option label={item.name} key={item._id}>
                                                    {item._id}
                                                </option>
                                                );
                                        })
                                }
                        </select>                        
                    </div>
                </div>
                <div className="row">
                <br/>
                <table>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Assignee</th>
                    </tr>
                </thead>
                <tbody>                    
                    {this.renderTickets()}
                </tbody>
                </table>   
                </div>              
            </div>
        );
    }
}

export default TicketList;