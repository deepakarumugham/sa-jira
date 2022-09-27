import React from 'react';
import Axios from 'axios';
//import AsyncSelect from 'react-select/async';

class TicketForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        selectedState: 'NEW',
        assignee: '',
        userList: [],
        selectedUser: '',
        stateOptions: props.dropdowns
      };
      
      
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInput(event) {
        const {target} = event;
        const {name, value} = target;
        this.setState({
            [name]: value
          });
    }

    handleSelection(value) {
        this.setState({
            selectedState: value
        })
    }

    handleUserSelection(target) {
        this.setState({
            assignee: target.value,
            selectedUser: target.label
        })
    }


    componentDidMount() {
        this.setState({isLoading: true});
        Axios.get(process.env.REACT_APP_SERVER_BASE_URL + "/users").then((resp) => {
            console.log("resp.data[0]: " + JSON.stringify(resp.data[0]));
            this.setState({ userList: resp.data,
                            selectedUser: resp.data[0].name,
                            assignee: resp.data[0]._id
                          });
        }).catch(error => {
            console.log(error.response)
        });;   ;
        
    }    
  
    async handleSubmit() {
      const {title, description, selectedState, assignee} = this.state;
      await Axios.post(process.env.REACT_APP_SERVER_BASE_URL + "/tickets", {
          title: title,
          description: description,
          status: selectedState,
          assignee: assignee
      }, {'Content-Type': 'application/json'});

    }
  
    render() {
      const {selectedState, stateOptions, userList, selectedUser} = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
        <div>
            <div className='row'>
                <label>
                    Title
                </label>
                <input name="title" type="text" onChange={this.handleInput} value={this.state.title}/>
            </div>
            <div className='row'>
                <label>
                Description
                </label>
                <input  name="description"  type="text" onChange={this.handleInput} value={this.state.description}/>
            </div>
            <div className='row'>
                <label>
                Status
                </label>
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
            <div className='row'>
                <label>
                Assignee
                </label>
                <select 
                        value={selectedUser}
                        onChange={(e) => this.handleUserSelection(e.target)}>
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
            <div className='row btnSub'>
                <input type="submit" value="Submit" />
            </div>          
          </div>
        </form>
      );
    }
  }

export default TicketForm;