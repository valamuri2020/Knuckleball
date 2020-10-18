import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/navbar.component"
import StatsList from "./components/stats-list.component";
import EditStats from "./components/edit-stats.component";
import CreateStats from "./components/create-stats.component";
import CreateUser from "./components/create-user.component";
import Youtube from "./components/Youtube"
import AppStyle from "./app-styles.css"

function App() {
  return (
    <div>
      
      <Router>
      <Navbar/>
        <div className="container">
        
            <br/>
             <Switch>
              <Route path="/" exact component={Home}/> {/* The exact and Switch make sure that the component only displays if its the exact link and not anything with a '/' in the link*/}        
              <Route path="/allstats" component={StatsList}/>             
              <Route path="/edit/:id" component={EditStats}/>          
              <Route path="/create" component={CreateStats}/>
              <Route path="/user" component={CreateUser}/>
              <Route path="/suggestions" component={Youtube}/>
             </Switch>   
        </div> 
      </Router> 
  </div>
  );
}

const Home = () =>{
  return(
    <div className = "WelcomeMessage"> Welcome to Knuckleball, a super easy app tracker for your soccer stats. Are you a coach? Well, you're in luck! You can make multiple users for each team member and keep track of everyone here at once.</div>  
  )
}


export default App;
