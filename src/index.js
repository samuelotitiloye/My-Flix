import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';
// import {connect} from 'react-redux';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('ADD_GENRE', fetchGenre);
}

// axios client side get request
function* fetchMovies (){
    try {
        console.log('hit fetch movies');
        const movieResponse = yield axios.get('/api/movies')
        // yield axios.get('/')
        yield dispatch ({type:'SET_MOVIES', payload:movieResponse.data});
        console.log('end of fetch movies request');
    }catch(error){
        console.log(error);
    }
} 

//create axios genre get request
function* fetchGenre  () {
    try {
        console.log('hit fetch genre');
        const genreResponse = yield axios.get('/api/genre')
        //yeild axios
        yield dispatch ({type:'SET_TAGS', payload:genreResponse.data});
        console.log('end of fetch genre reques');  
    }catch(error){
        console.log(error);
    }
}

// axios client side post movies request
// function* postMovies (){
//     try {
//         console.log('hit post movies');
//         const postResponse = yield axios.post('/api/movies', action.payload);
//         //trigger the get request function
//         yield dispatch({type:'ADD_MOVIES'});
//         console.log('end of postMovies request');   
//     } catch (error) {
//         console.log(error);
//     }
// }


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
