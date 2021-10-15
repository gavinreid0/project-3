import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_LIST } from '../../utils/mutations';
import { ADD_LISTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ListForm = () => {
  const [listText, setListText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addList, { error }] = useMutation(ADD_LIST, {
    update(cache, { data: { addList } }) {
      try {
        const { lists } = cache.readQuery({ query: ADD_LISTS });

        cache.writeQuery({
          query: ADD_LISTS,
          data: { lists: [addList, ...lists] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, lists: [...me.lists, addList] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addList({
        variables: {
          listText,
          listAuthor: Auth.getProfile().data.firstName,
        },
      });

      setListText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'listText' && value.length <= 280) {
      setListText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="listText"
                placeholder="Here's a new list..."
                value={listText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add List
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your lists. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ListForm;
