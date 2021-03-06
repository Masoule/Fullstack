import React from 'react';
import PlayButtonContainer from './play_button_container'

class Player extends React.Component {
  constructor(props) {
    super(props);
    let currentTrack = this.props.currentTrack || null;

    this.timeConvert=this.timeConvert.bind(this)
    this.trackDuration=this.trackDuration.bind(this)
    this.trackTime=this.trackTime.bind(this)
    this.seek=this.seek.bind(this)
    this.handleVolume=this.handleVolume.bind(this)
    this.state = {
      duration: "0:00",
      trackTime: "0:00",
      progress: 0,
      volume: 1,
    }
  }

  componentDidMount() {
    this.audioPlayer.onloadedmetadata = () => {
      if (this.props.playing) {
        this.audioPlayer.play()
      } else {
        this.audioPlayer.pause()
      }
    }

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.progressBar.setAttribute("value", this.audioPlayer.currentTime / this.audioPlayer.duration);
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.playing !== nextProps.playing) {
      if(nextProps.playing) {
        this.audioPlayer.play();
      }
      else {
        this.audioPlayer.pause()
      }
    }
  }

  timeConvert (time) {
    let seconds = Number(time);
    let hr = Math.floor(seconds / 3600);
    let min = ("0" + Math.floor(seconds % 3600 / 60)).slice(-2);
    let sec = ("0" + Math.floor(seconds % 3600 % 60)).slice(-2);
    return hr > 0 ? `${hr}:${min}:${sec}` : `${min}:${sec}`;
  }

  trackDuration() {
    if(this.audioPlayer && this.props.currentTrack) {
      let duration = this.timeConvert(this.audioPlayer.duration);
      this.setState({ duration});
    }
  }

  trackTime() {
    if(this.audioPlayer) {
      let progress = this.audioPlayer.currentTime/this.audioPlayer.duration;
      let trackTime = this.timeConvert(this.audioPlayer.currentTime);
      this.setState({ trackTime, progress });
      return trackTime;
    }
  }

  seek(e){
    let progress = e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth;
    let trackTime = progress * this.audioPlayer.duration;
    this.audioPlayer.currentTime = trackTime;
    trackTime = this.timeConvert(trackTime);
    this.setState({ trackTime, progress });
  }

  trackInfo () {
    let track = this.props.currentTrack
    if (!track) {
      return (
        <div className='track-info-box'></div>
      )
    } else {
      return (
        <div className='track-info-box'>
          <div className='track-info-thumb-box'>
            <img className="track-info-thumb"
              src={track.imageUrl}></img>
          </div>
          <div className='track-content'>
            <div className='track-header'>
              <div className='player-track-info'>
                <div className='track-artist'>
                  {track.artist_name}
                </div>

                <div className='track-title'>
                  {track.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handleVolume(e){
    this.audioPlayer.volume = e.target.value;
    this.setState( { volume: e.target.value } );
  }

  volumeIcon() {
    if (this.state.volume < 0.1) {
      return <i className="fa fa-volume-off" aria-hidden="true"></i>
    } else if (this.state.volume > 0.5) {
      return <i className="fa fa-volume-up" aria-hidden="true"></i>
    } else {
      return <i className="fa fa-volume-down" aria-hidden="true"></i>
    }
  }

  renderVolume() {
    let volumeIcon = this.volumeIcon();
    return (
      <div className="volume">
        <div className="volume-container">
          <div className="volume-icon">
            {volumeIcon}
          </div>
          <input
            id="volume"
            className="volume-slider"
            value={this.state.volume}
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={this.handleVolume}
            />
        </div>
      </div>
    )
  }

  render() {
    let src = (this.props.currentTrack) ? this.props.currentTrack.trackUrl : ''
    return(
      <div className='player'>
        <div className='player-box'>

          <div className='player-progress'>
            <audio
              id="audioPlayer"
              src={src}
              ref={(audioPlayer) => { this.audioPlayer = audioPlayer}}
              onCanPlayThrough={this.trackDuration}
              onTimeUpdate={this.trackTime}
            />

            <div className='player-play-pause'>
              <PlayButtonContainer
                track={this.props.currentTrack}/>
            </div>

            <p id="time"
              className="player-track-time">
              {this.state.trackTime}
            </p>

            <div className='progress-slider'
              onClick={this.seek}>
              <progress
                ref={(p) => this.progressBar = p}
                id="progressBar"
                value="0"
                max="1">
              </progress>
            </div>

            <p id='duration'
              ref={(p) => this.durationP = p}
              className="player-track-duration">
              {this.state.duration}
            </p>
          </div>

          {this.renderVolume()}

          {this.trackInfo()}
        </div>
      </div>
    );
  }

}

export default Player;
