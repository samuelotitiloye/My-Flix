const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
// const pool = require('../server/modules/pool');
// const movieRouter = require('./modules/router/router')
// bring in my routes from Router.js
const router = require('./router/router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api', router) // this has been moved to it's own component


/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});




//this will update our details page
// app.put('/api/update', (req, res) => {
//     console.log('we are updating');
//     const queryText = `UPDATE "movies" SET "title"=$1, "description"=$2
//     WHERE "id"=$3 RETURNING "id", "title", "description", "poster";`;
//     const updateName = [req.body.title, req.body.description, req.body.id];
//     pool.query(queryText, updateName)
//         .then(result => {
//             console.log('returning the result of the update!!!!!!!!!!!', result.rows);
//             res.send(result.rows)
//         })
// })

// app.use('/api/movies', movieRouter);
// app.get('/api/movies', (req, res) => {
//     console.log('selecting movies');
//     //query request to the database -  store
//     const queryText = 'SELECT *  FROM movies ORDER BY "id";'
//     pool.query(queryText)
//         .then((result) => {
//             console.log(result.rows);
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('error completing SELECT movies query', error);
//             res.sendStatus(500);
//         });
// });

// app.use('/api/genres', genreRouter);
// app.get('/api/genres', (req, res) => {
//     console.log('getting genres');
//     //qeury request to the database 
//     const queryText = 'SELECT * FROM "genres";';
//     pool.query(queryText)
//         .then((result) => {
//             console.log(result.rows);
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('error completing SELECT genre query', error);
//             res.sendStatus(500);
//         });
// });

//this will get a single movie and detail then display on the details page
// app.get('/api/movieDetail/', (req, res) => {
//     console.log('getting details');
//     //qeury request to the database 
//     const queryText = `SELECT "genres"."name" 
//     FROM "movies" 
//     JOIN "movie_genre" 
//     ON "movies"."id" = "movie_genre"."movie_id"
//     JOIN "genres" 
//     ON "movie_genre"."genre_id" = "genres"."id"
//     WHERE "movies"."id"=$1;`;
//     pool.query(queryText, [req.query.id])
//         .then((result) => {
//             console.log(result.rows);
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('error completing SELECT details query', error);
//             res.sendStatus(500);
//         });
// });
