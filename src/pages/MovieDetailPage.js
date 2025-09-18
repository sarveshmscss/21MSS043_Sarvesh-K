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

    // ✅ CORRECTED DATE FORMATTING LOGIC
    let releaseDate = "N/A";
    if (movie.release_date) {
        const parts = movie.release_date.split('/'); // e.g., "30/10/95" -> ["30", "10", "95"]
        if (parts.length === 3) {
            const [day, month, year] = parts;
            // Convert two-digit year '95' to four-digit year '1995'
            const fullYear = parseInt(year, 10) + (parseInt(year, 10) > 30 ? 1900 : 2000);
            
            // Create a new Date object. Note: month is 0-indexed in JS (0=Jan, 1=Feb, etc.)
            const dateObject = new Date(fullYear, month - 1, day);

            // Check if the created date is valid before trying to format it
            if (!isNaN(dateObject.getTime())) {
                releaseDate = dateObject.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }
        }
    }
    
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