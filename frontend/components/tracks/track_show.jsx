import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../nav/header_container';
import CommentFormContainer from '../tracks/comment_form_container';
import CommentIndexItem from './comment_index_item'

class TrackShow extends React.Component {

  componentDidMount(){
    this.props.fetchTrack(this.props.trackId);
    this.props.fetchTracks();
  }

  header (){
    let track=this.props.track
    let currentUser=this.props.currentUser

    return (
      <div className='page'>
        <Header
          currentuser={currentUser}
          />
        <div className='main-show'>
          <div className='track-show-header'>

            <div className='track-show-content'>

                <div className='play-show-button'>

                </div>

                <div className='track-show-info'>

                  <div className='track-show-artist-box'>
                    <Link
                      className=''
                      to={`/${track.owner_id}`}>
                      <span className='track-show-artist'>
                        {track.artist_name}
                      </span>
                    </Link>

                  </div>

                  <div className='track-show-title'>
                    <Link
                      className=''
                      to={`/${track.owner_id}/${track.id}`}>
                      <span className=''>
                        {track.title}
                      </span>
                    </Link>
                  </div>
                </div>

            </div>

            <div className='track-show-date'>
              2 days ago
            </div>

            <div className='track-show-waveform'>

            </div>


            <div className='track-show-thumb-box'>
              <img className="track-show-thumb"
                src={track.imageUrl}></img>
            </div>

          </div>

          <div className="track-comments">

            <div className='track-show-comment-form'>
              <CommentFormContainer
                trackId={track.id}/>
            </div>

            <div className='comment-index'>

              <div className='track-owner'>
                <div className='artist-avatar-box'>
                  <img className="artist-avatar"
                    src={track.imageUrl}></img>
                </div>
                <div>
                  {track.artist_name}
                </div>
              </div>
              <div className='comments'>
                <div className='comments-title'>
                  Comments
                </div>
                {this.comments()}
              </div>

            </div>


          </div>
        </div>
    </div>
    )
  }

  comments (){
    let track=this.props.track
    if (track.comments) {
      return (
          <ul className='comments'>
            {
              track.comments.map( comment => (
                <CommentIndexItem
                  key={comment.id}
                  comment={ comment } />
              ))
            }
          </ul>
      )
    }
  }

  render (){
    const content = this.props.track ? this.header() : null

    return (
      <div className='page-show'>
        { content }
      </div>
    )
  }
}

export default TrackShow;

// const content = this.props.track ?
// <TrackShowItem
//   track={this.props.track}
//   currentUser={this.props.currentUser}/> : null

// return (
//   <div className='track-show'>
//     { content }
//   </div>
// )
