import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_LIST } from '../utils/mutations';


function List(props) {
  const [formState, setFormState] = useState({ name: '', description: '', image: '', price: '' });
  const [add_post, { error }] = useMutation(ADD_LIST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await add_post({
        variables: { name: formState.name, description: formState.description, image: formState.image, price: formState.price },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/list">← Add Posting</Link>

      <h2>List Posting</h2>
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
    </div>
  );
}

export default List;