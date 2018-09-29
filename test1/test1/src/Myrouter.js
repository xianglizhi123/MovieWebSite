import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {Router} from 'react-router-dom';
import history from './history'
import App from "./App";
import login from "./LoginForm";
import movieList from "./MovieList";
import playVideo from "./playVideo";
const MyRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={login}/>
            <Route exact path='/app' component={App}/>
            <Route exact path='/movieList' component={movieList}/>
            <Route exace path='/playVideo' component={playVideo}/>
        </Switch>
    </Router>
)
export default MyRouter;