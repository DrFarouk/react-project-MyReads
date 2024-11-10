import React from "react";
import Publication from "./Publication";

/*constructing default frame for each shelf*/
const PublicationShelf = ({ publications, shelfTitle, onChangePublicationShelf }) => {
  return (
    <div className="publicationshelf">
      <h2 className="publicationshelf-title">{shelfTitle}</h2>
      <div className="publicationshelf-publications">
        <ol className="publications-grid">
          {/*to git each shelf's publication from API & map it in a list form*/}
          {publications.length > 0 &&
            publications.map((publication) => (
              <li key={publication.id}>
                <Publication publication={publication} onChangePublicationShelf={onChangePublicationShelf} />
              </li>
            ))
          }
          {/*to show when no publication add*/}
          {publications.length === 0 &&
            (<span>you have no publications in this shelf</span>)
          }
        </ol>
      </div>
    </div>
  );
};

export default PublicationShelf;
