import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieListPage.css'; // We will add styles here soon

const MovieListPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // This function fetches data from our backend
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data);
            } catch (e) {
                console.error("Failed to fetch movies:", e);
                setError("Could not load movie data. Please try again later.");
            } finally {
                setLoading(false); // Stop loading screen
            }
        }
        fetchMovies();
    }, []); // The empty array [] means this effect runs only once

    if (loading) return <p className="status-message">Loading movies...</p>;
    if (error) return <p className="status-message error">{error}</p>;

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card-link">
                    <div className="movie-card">
                        <h2>{movie.title}</h2>
                        <p className="tagline">{movie.tagline || 'No tagline available.'}</p>
                        <p className="rating">
                            ⭐ <strong>{parseFloat(movie.vote_average).toFixed(1)} / 10</strong>
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MovieListPage;