import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: 0,
    stars: []
  });
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .then(response => console.log('response', response.data))
      .catch(err => console.log(err))
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        console.log(response);
        setMovie(response.data)
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='movie-card'>
      <p>Fill out the form here to update a movie, if adding more then one star, seperate each star with a comma followed by a space</p>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={movie.title}
          onChange={handleChange} />{''}
          <br/>
        <input
          type='text'
          name='director'
          placeholder='Director'
          value={movie.director}
          onChange={handleChange} />
          <br/>
        <input
          type='text'
          name='metascore'
          placeholder='Metascore'
          value={movie.metascore}
          onChange={handleChange} />
          <br/>
        <input
          type='text'
          name='stars'
          placeholder='Stars'
          value={movie.stars}
          onChange={handleChange} />
          <br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
