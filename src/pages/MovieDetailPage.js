import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './MovieDetailPage.css'; // Styles for this page

export default function MovieDetailPage() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (e) {
                console.error("Failed to fetch movie details:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id]); // Re-run if the ID changes

    if (loading) return <p className="status-message">Loading details...</p>;
    if (!movie) return <p className="status-message error">Movie not found.</p>;

    // Format data as required by the assignment
    const releaseDate = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString()
        : "N/A";
    
    const runtime = movie.runtime ? `${movie.runtime} minutes` : "N/A";

    return (
        <div className="movie-detail-container">
            <Link to="/" className="back-link">⬅ Back to Movie List</Link>
            <h1>{movie.title}</h1>
            <p className="detail-tagline"><em>{movie.tagline}</em></p>
            
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            
            <div className="details-grid">
                <p><strong>Release Date:</strong> {releaseDate}</p>
                <p><strong>Runtime:</strong> {runtime}</p>
                <p><strong>Status:</strong> {movie.status}</p>
                <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
            </div>
        </div>
    );
}