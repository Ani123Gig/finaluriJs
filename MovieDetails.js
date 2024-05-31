import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetails({ match }) {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchMovie = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`http://localhost:5000/movies/${match.params.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMovie(data);
        };
        fetchMovie();
    }, [match.params.id]);

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>{movie.director}</p>
            <p>{movie.teaser}</p>
            {/* other fields */}
        </div>
    );
}

export default MovieDetails;
