import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🎬 Movie Database</h1>
        </header>
        <main>
          <Switch>
            {/* This route shows details for a specific movie */}
            <Route path="/movie/:id">
              <MovieDetailPage />
            </Route>
            
            {/* This is the main page that shows the list of all movies */}
            <Route path="/">
              <MovieListPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;