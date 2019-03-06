import React from 'react';
import axios from 'axios';
import '../css/MessageBoardApp.css';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import SearchCommentsForm from './SearchCommentsForm';

/* Your task:
  1. pass comments down to CommentList (using props)
  2. create a commentItem component
  3. render a single CommentItem with the data from the first comment (aka comments[0])
   
  */

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://hans-express.herokuapp.com/api/comments')
      .then(response => this.setState({ comments: response.data }));
  }

  handleDelete = id => {
    axios
      .delete(`https://hans-express.herokuapp.com/api/comments/${id}`)
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => console.error(error));
  };

  handleAddComment = commentText => {
    console.log('Hello');
    axios
      .post('https://hans-express.herokuapp.com/api/comments', { text: commentText })
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response && error.response.status === 400) alert('Please enter a comment text');
      });
  };

  handleSearchSubmit = searchTextValue => {
    axios
      .get(`https://hans-express.herokuapp.com/api/comments?filter=${searchTextValue}`)
      .then(response => this.setState({ comments: response.data }))
      .catch(error => {
        if (error.response && error.response.status === 404) alert("That comment doesn't exist");
      });
  };

  render() {
    return (
      <div className="message-board-app">
        <SearchCommentsForm onSearchSubmit={this.handleSearchSubmit} />
        <CommentList comments={this.state.comments} onDelete={id => this.handleDelete(id)} />
        <AddCommentForm onAddComment={this.handleAddComment} />
      </div>
    );
  }
}

export default MessageBoardApp;
