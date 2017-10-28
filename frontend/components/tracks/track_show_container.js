import TrackShow from './track_show';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrack, fetchTracks } from '../../actions/track_actions';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const trackId = ownProps.match.params.trackId;
  const track = state.tracks[trackId];
  // debugger
  return {
    userId,
    trackId,
    track,
  };

};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    fetchTrack: (id) => dispatch(fetchTrack(id)),
    fetchTracks: () => dispatch(fetchTracks()),
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackShow));