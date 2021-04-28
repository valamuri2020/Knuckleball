import { render } from '@testing-library/react'
import React, {Component} from 'react'
import axios from 'axios'


const channelID = "UCj39_OFjqabRbGRfFwNFlkQ"
const results = 10

let finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${results}`
 
class YouTube extends Component{
    constructor(props){
        super();
        this.state = {
            resulyt: []
        }
    }
    componentDidMount(){
        fetch(finalURL)
        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson)
           const resulyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+ obj.id.videoId)
           this.setState({resulyt})
        })
        .catch((error) => {
            console.error(error)
        })
       
    }

    render(){
        console.log(this.state.resulyt);
        return(
           <div className = "container">
                {
                    this.state.resulyt.map((link, i) => {
                        let frame = <div key={i} style={{position: "relative", left: "16.8%"}} className = "youtube"> <iframe  width="700" height="400" src={link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                        return frame
                        })
                }
           </div>
            
        )
    }
}

export default YouTube

//credits to Hitesh Choudhary for helping me with this part of the app through his youtube videos
