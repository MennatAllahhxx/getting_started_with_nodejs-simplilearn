const express = require('express')
const app = express();
const port = 3000;

//parse the json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

let movies = [
    {
        id: '1',
        title: 'inception',
        director: 'christopher nolan',
        release_date: '2010-07-16'
    },
    {
        id: '2',
        title: 'the irishman',
        director: 'martin scorsese',
        release_date: '2019-09-27'
    }
];

//get movies
app.get('/movies', (req, res) => {
    res.json(movies)
});

//add movie
app.post('/movies', (req, res) => {
    const movie = req.body;
    console.log(movie);
    movies.push(movie);
    res.send('Movie is added to the list');
});

//get movie by id
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie);
            return;
        }
    }
    res.status(404).send('movie is not found');
})

//remove movie from the list
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;

    movies = movies.filter(movie => movie.id !== id );
    res.send('movie is deleted')
})

//set the server to listen at port
app.listen(port, () => console.log(`server listening at port ${port}`));