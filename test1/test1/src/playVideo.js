import React, { Component } from 'react';
import { Player } from 'video-react';
import './playVideo.css'
import video from './static/TEST.mkv';
class PlayVideo extends Component{
    constructor(){
        super();
        this.state={
            videoName:''
        }
    }
    componentWillMount(){
        this.setState({videoName:this.props.location.videoName})
    }
    render(){
        return(
            <div className={'videoFrame'}>
                <video controls="controls" src={video} width={'400px'} height={'300px'}></video>
            </div>
        )
    }
}
export default PlayVideo;