const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // We just installed this

const app = express();
const PORT = 3001; // The backend runs on port 3001 in development

// --- Load Movie Data at Startup ---
let movies = [];
try {
    const dataPath = path.join(__dirname, 'movies_metadata.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    // Filter out entries that don't have a valid id and title
    movies = JSON.parse(rawData).filter(movie => movie.id && movie.title);
    console.log(`✅ Successfully loaded ${movies.length} movies.`);
} catch (error) {
    console.error("🚨 CRITICAL ERROR: Could not load 'movies_metadata.json'.", error);
    process.exit(1); // Exit if we can't load the data
}

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON bodies in requests

// --- API Endpoints ---

// 1. GET /api/movies -> Returns a simplified list of all movies
app.get('/api/movies', (req, res) => {
    console.log("➡️  Request received for /api/movies");
    // Map the data to only include fields needed for the list page
    const movieList = movies.map(({ id, title, tagline, vote_average }) => ({
        id,
        title,
        tagline,
        vote_average,
    }));
    res.json(movieList);
});

// 2. GET /api/movies/:id -> Returns all details for a single movie
app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;
    console.log(`➡️  Request received for /api/movies/${movieId}`);
    const movie = movies.find(m => m.id.toString() === movieId);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`🚀 Express server is running on http://localhost:${PORT}`);
});