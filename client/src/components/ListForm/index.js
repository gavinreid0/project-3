import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_LIST } from "../../utils/mutations";
import { ADD_LISTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ListForm = () => {
  const [listText, setListText] = useState("");

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

      setListText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "listText" && value.length <= 280) {
      setListText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="formList">
      <h3>Got some heat you wanna sell?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Product Name:</label>
              <input
                placeholder="name your product"
                name="name"
                type="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="description">Description:</label>
              <input
                placeholder="description"
                name="description"
                type="description"
                id="description"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="imgdesc">Image:</label>
              <input
                placeholder="image"
                name="image"
                type="imagedesc"
                id="image"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="price">Price:</label>
              <input
                placeholder="price"
                name="price"
                type="price"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end">
              <button type="submit">Submit</button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your lists. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ListForm;
