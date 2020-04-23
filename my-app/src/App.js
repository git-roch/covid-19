import React from 'react';
import logo from './yt2.svg';
import './scss/App.css';
import fetchSearchList from './Request';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer'
import ErrorMsg from './ErrorMsg'
import error from './ne.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      showVideoPlayer: false,
      videoDetails: {},
      vidInfo: {},
      class2: 'nope'
    }
  }
  playVideo = async (...videoDetails) => { 
    let res = await fetchSearchList('videos', videoDetails[0]);
    console.log(res.items);
    this.setState({ showVideoPlayer : true , videoDetails, vidInfo: res.items, class2: 'side' })
    console.log("a");
    
    
  }
  
  closeVideoPlayer = () => { 
    this.setState({showVideoPlayer : false, class2: 'nope'})
  }
  
  handleClick = async () => {
    let str = document.getElementById("search-box").value;
    let res = await fetchSearchList('search', str);
    res = res.items;
    console.log(res);
    this.setState({ videoList: res , showVideoPlayer : false}) 
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" />
          <div className="Search">
            <input type="search" id="search-box" placeholder="Search" /> &nbsp;
            <i className="search-button" type="button" onClick={this.handleClick} />
          </div>
        </header>
        <body>
          {
            this.state.showVideoPlayer &&
            <VideoPlayer
            vid_id={this.state.videoDetails[0]}
            title={this.state.videoDetails[1]}
            channelName ={this.state.videoDetails[2]} 
            vidStats = {this.state.vidInfo}
            closeVideoPlayer = {this.closeVideoPlayer} />
          }
          { 
            this.state.videoList !== undefined ? 
            <VideoList a_list={this.state.videoList} playVideo={this.playVideo} side={this.state.class2} /> 
            : <ErrorMsg msg = 'An error has occured' src = {error}/>
          }
        </body>
      </div>
    );
  }
}

export default App;
