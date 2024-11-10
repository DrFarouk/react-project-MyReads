import React, { Component } from "react";
import { Link } from "react-router-dom";
import PublicationShelf from "./PublicationShelf";

/*constructing default frame for Home page*/
class Home extends Component {
  /*getting each shelf's publications*/
  getShelvesFromPublications = (publications) => {
    const currentlyReading = publications.filter((publication) => publication.shelf === "currentlyReading");
    const read = publications.filter((publication) => publication.shelf === "read");
    const wantToRead = publications.filter((publication) => publication.shelf === "wantToRead");
    return [
      /*giving each shelf an ID*/
      {
        id: 1,
        title: "Currently Reading",
        publications: currentlyReading,
      },
      {
        id: 2,
        title: "Read",
        publications: read,
      },
      {
        id: 3,
        title: "Want To Read",
        publications: wantToRead,
      },
    ];
  };

  render() {
    const shelves = this.getShelvesFromPublications(this.props.publications);
    const { onChangePublicationShelf } = this.props;

    return (
      <div className="list-publications">
        <div className="list-publications-title">
          <h1>My Reads</h1>
        </div>
        {/*using each shelf's ID getting publications*/}
        <div className="list-publications-content">
          {shelves.length > 0 &&
            shelves.map((shelf) => (
              <PublicationShelf
                key={shelf.id}
                publications={shelf.publications}
                shelfTitle={shelf.title}
                onChangePublicationShelf={onChangePublicationShelf}
              />
            ))}
        </div>
        {/*buttons to go to search page to be able to Add a publication*/}
        <div className="open-search">          
          <Link to="/search">Add a publication</Link>
        </div>
        <div className="open-search2">
          <Link to="/search">Add a publication</Link>
        </div>
      </div>
    );
  }
}

export default Home;
