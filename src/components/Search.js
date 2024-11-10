import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as PublicationsAPI from "../PublicationsAPI";
import Publication from "./Publication";

//used axios to cancel in progress requests when the user changes his request very quickly
import axios from "axios";


/*constructing default frame for Search page*/

//default state 
class Search extends Component {
  state = {
    query: "",
    publications: [],
  };

  //used to cancel requests when user changes search value very quickly
  cancelRequest = null;

  //use search value in API & catch if there is an error
  getSearchedPublications = async (searchText) => {
    try {
      const searchedPublications = await PublicationsAPI.search(
        searchText,
        this.cancelRequest
      );
      if (searchedPublications.error) {
        return [];
      } else if (searchedPublications) {
        const updatedPublications = this.updateShelvesInPublications(searchedPublications);
        return updatedPublications;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //updating the page with cache data coming from API
  updateShelvesInPublications(searchedPublications) {
    const { publications } = this.props;
    const updatedPublications = searchedPublications.map((searchedPublication) => {
      publications.forEach((homePublication) => {
        if (homePublication.id === searchedPublication.id) {
          searchedPublication.shelf = homePublication.shelf;
        }
      });
      if (!searchedPublication.shelf) searchedPublication.shelf = "none";
      return searchedPublication;
    });
    return updatedPublications;
  }

  //to cancel requests when user changes search value very quickly
  cancelOrInitializeRequest = () => {
    if (this.cancelRequest !== null) {
      this.cancelRequest.cancel(
        "This request was cancelled due to another request coming quickly after it"
      );
    }
    this.cancelRequest = axios.CancelToken.source();
  };

  //to handle requests with each change happen in search value
  handleQueryChange = async (event) => {
    const searchQuery = event.target.value;
    this.setState({ query: searchQuery });
    this.cancelOrInitializeRequest();
    if (searchQuery === "") {
      this.setState({ publications: [] });
    } else if (searchQuery) {
      const searchedPublications = await this.getSearchedPublications(searchQuery);
      if (searchedPublications && searchedPublications.length > 0) {
        this.setState({ publications: searchedPublications });
      } else {
        this.setState({ publications: [] });
      }
    }
  };

  /*constructing default frame for Search results*/
  render() {
    const { onChangePublicationShelf } = this.props;
    const { publications } = this.state;
    return (
      <div className="search-publications">
        <div className="search-publications-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-publications-input-wrapper">
            <input
              value={this.state.query}
              onChange={this.handleQueryChange}
              placeholder="Search by title"
            />
          </div>
        </div>
        <div className="search-publications-results">
          <ol className="publications-grid">
            {publications.length === 0 ? (
              <div>
              <h3>you can use any of these search terms</h3>,
              <span>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</span>
              </div>
            ) : (
              publications.map((publication) => (
                <li key={publication.id}>
                  <Publication publication={publication} onChangePublicationShelf={onChangePublicationShelf} />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
