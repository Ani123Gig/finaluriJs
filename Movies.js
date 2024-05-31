import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/movies', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMovies(data);
        };
        fetchMovies();
    }, []);

    return (
        <div>
            {movies.map((movie) => (
                <Link key={movie._id} to={`/movie/${movie._id}`}>
                    <h2>{movie.title}</h2>
                </Link>
            ))}
        </div>
    );
}

export default Movies;
