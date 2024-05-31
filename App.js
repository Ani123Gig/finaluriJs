import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/movies" component={Movies} />
                <Route path="/movie/:id" component={MovieDetails} />
            </Switch>
        </Router>
    );
}

export default App;
