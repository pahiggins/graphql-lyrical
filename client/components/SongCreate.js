import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }
  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries:[{ query }]
    }).then(() => hashHistory.push("/"));
  }
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            placeholder="Get creative..."
          />
        </form>
      </div>
    );
  }
}

// Mutation
const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);