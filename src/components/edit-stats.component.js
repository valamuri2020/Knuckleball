import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'


export default class EditStats extends Component{
    constructor(props){
        super();
        this.state = {
            username: '',
            goalsScored: 0,
            headers: 0,
            assists: 0,
            date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangegoalsScored = this.onChangegoalsScored.bind(this);
        this.onChangeHeaders = this.onChangeHeaders.bind(this);
        this.onChangeAssists = this.onChangeAssists.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        axios.get('http://localhost:5000/stats/'+ this.props.match.params.id +'/')
        .then(response => {
                this.setState({
                    username: response.data.username,
                    goalsScored:  response.data.goalsScored,
                    headers:  response.data.headers,
                    assists: response.data.assists,
                    date: new Date(response.data.date)
                })
        })
        .catch(function (error) {
            console.log(error);
        })
      
      
        axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  
    }


    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        })
    }
    onChangegoalsScored(e) { this.setState({
            goalsScored: e.target.value,
        })
    }
    onChangeHeaders(e){
        this.setState({
            headers: e.target.value,
        })
    }

    onChangeAssists(e){
        this.setState({
            assists: e.target.value,
        })
    }
    onChangeDate(date){
        this.setState({
            date: date,
        })
    }

    onSubmit(e){
        e.preventDefault();

        const stats = {
            username: this.state.username,
            goalsScored: this.state.goalsScored,
            headers: this.state.headers,
            assists: this.state.assists,
            date: this.state.date
        }

        console.log(stats);
         
         axios.post('http://localhost:5000/stats/update/' +this.props.match.params.id, stats)
          .then(res => console.log(res.data));

         window.location = '/'; 
    }
      render(){
        return (
            <div>
              <h3>Edit Statistics</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <select ref="userInput"
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}>
                      {
                        this.state.users.map(function(user) {
                          return <option 
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                      }
                  </select>
                </div>
                <div className="form-group"> 
                  <label>Goals Scored: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.goalsScored}
                      onChange={this.onChangegoalsScored}
                      />
                </div>
                <div className="form-group">
                  <label>Assists </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.assists}
                      onChange={this.onChangeAssists}
                      />
                </div>
                <div className="form-group">
                  <label>Headers </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.headers}
                      onChange={this.onChangeHeaders}
                      />
                </div>
                <div className="form-group">
                  <label>Date: </label>
                  <div>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  </div>
                </div>
        
                <div className="form-group">
                  <input type="submit" value="Edit Log" className="btn btn-primary" />
                </div>
              </form>
            </div>
            )
    }
}

