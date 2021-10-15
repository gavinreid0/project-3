import React from 'react';
import { Link } from 'react-router-dom';

const ListList = ({
  lists,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!lists.length) {
    return <h3>No Lists Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {lists &&
        lists.map((list) => (
          <div key={list._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${list.listAuthor}`}
                >
                  {list.listAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this list on {list.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this list on {list.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{list.listText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/lists/${list._id}`}
            >
              Join the discussion on this list.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ListList;
