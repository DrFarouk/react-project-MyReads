import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as PublicationsAPI from "./PublicationsAPI";

import Home from "./components/Home";
import Search from "./components/Search";

import "./App.css";

/*constructing default state for the app*/
class PublicationsApp extends React.Component {
  state = {
    publications: [],
  };

  componentDidMount() {
    this.getPublications();
  }

  /*getting data from API and changing state*/
  getPublications = async () => {
    const receivedPublications = await PublicationsAPI.getAll();
    this.setState({ publications: receivedPublications });
  };

  updatePublication = async (id, shelfTitle) => {
    await PublicationsAPI.update(id, shelfTitle);
    this.getPublications();
  };

  /*updating data when shelf change*/
  changePublicationShelf = async (publicationId, shelfTitle) => {
    this.updatePublication(publicationId, shelfTitle);
  };

  /*constructing Route for each path in the app*/
  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path="/">
            <Home
              publications={this.state.publications}
              onChangePublicationShelf={this.changePublicationShelf}
            />
          </Route>
          <Route path="/search">
            <Search
              publications={this.state.publications}
              onChangePublicationShelf={this.changePublicationShelf}
            />
          </Route>
        </Router>
      </div>
    );
  }
}

export default PublicationsApp;
