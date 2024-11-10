import React from "react";
import _ from "lodash";

/*constructing default frame that apply for any publication*/
const Publication = ({ publication, onChangePublicationShelf }) => {
  //image that appear when there is no cover available
  const defaultCoverImage =
    "https://i.imgur.com/83u3YNq.jpg";

  //what happen when changing shelf
  const changePublicationShelf = (e) => {
    let category = e.target.value;
    onChangePublicationShelf(publication.id, category);
  };

  return (
    !_.isEmpty(publication) && (
      <div className="publication">
        <div className="publication-top">
        {/*getting cover image from API or "default Cover Image" if no cover available*/}
          <div
            className="publication-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                publication.imageLinks ? publication.imageLinks.thumbnail : defaultCoverImage
              }")`,
            }}
          />
          {/*Create drop-down list with options to change between shelves*/}
          <div className="publication-shelf-changer">
            <select value={publication.shelf} onChange={changePublicationShelf}>
              <option value="move" disabled>Move it to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="wantToRead">Want to Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {/*getting publication title from API*/}
        <div className="publication-title">{publication.title}</div>
        {/*getting publication author or authors from API or write "no available author"*/}
        <div className="publication-authors">
          {_.isArray(publication.authors) ? (
            publication.authors.map((author) => (
              <div key={author}>
                <span>{author}</span>
              </div>
            ))
          ) : (
            <span>no available author</span>
          )}
        </div>
      </div>
    )
  );
};

export default Publication;
