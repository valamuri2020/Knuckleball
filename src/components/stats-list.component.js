import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ListStyles from './stats-list.component.css'

const Stats = props => (
    <tr className="list">
        <td className="username">{props.stats.username}</td>
        <td className="goalsScored">{props.stats.goalsScored}</td>
        <td className="headers">{props.stats.headers}</td>
        <td className="assists">{props.stats.assists}</td>
        <td className="date">{props.stats.date.substring(0,10)}</td>
         <td>
         <Link to={"/edit/"+props.stats._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStats(props.stats._id) }}>delete</a>
        </td> 

    </tr>
)
export default class StatsList extends Component {
    constructor(props){
        super();

        this.deleteStats = this.deleteStats.bind(this);

        this.state = {
            stats: []
        };

    }

    componentDidMount(){
        axios.get('http://localhost:5000/stats/')
            .then(res => {
                this.setState({stats: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteStats(id){
        axios.delete('http://localhost:5000/stats/' + id)
            .then(res => console.log(res.data));
        this.setState({
            stats: this.state.stats.filter (element => element._id !== id)
        })
    
    
    }
    StatsList(){
        return this.state.stats.map(currentstat => {
                return <Stats stats = {currentstat} deleteStats = {this.deleteStats} key = {currentstat._id}/>
        });
    }
    render(){
            return (
                <div>
                    <h3>Your Stats</h3>
                    <table className = "table">
                        <thead className = "thead-light">
                            <tr>
                                <th>Username</th>
                                <th>Goals Scored</th>
                                <th>Headers</th>
                                <th>Asssists</th>
                                <th>Date</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.StatsList()}
                        </tbody>
                    </table>
                </div>
            )
    }
}