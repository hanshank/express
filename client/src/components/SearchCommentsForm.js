import React from 'react';

class SearchCommentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTextValue: '',
    };
  }

  handleSearchChange = event => {
    this.setState({ searchTextValue: event.target.value });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.searchTextValue);
  };

  render() {
    return (
      <nav>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            name="search"
            value={this.state.searchTextValue}
            onChange={this.handleSearchChange}
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default SearchCommentForm;
