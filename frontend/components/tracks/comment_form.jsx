import React from 'react';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { body: "", track_id: this.props.trackId};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.state);
    this.props.createComment(comment)
    .then(()=>{this.setState({body: ''})})
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render () {
    if (this.props.currentUser) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className='comment-form-input'>
            <div className='form-avatar'>
              <img className="form-avatar-img"
                src={this.props.currentUser.imageUrl}></img>
            </div>
            <input
              className='comment-textfield'
              type="text"
              value={this.state.body}
              placeholder={"Write a comment"}
              onChange={this.update('body')}
              required
              />
          </div>
        </form>
      )
    } else { return ""}
  }
}

export default CommentForm;
