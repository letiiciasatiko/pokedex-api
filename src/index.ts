import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function (request: Request, response: Response) {
    const selectedPokemon = request.query.pokemon;

    if (!selectedPokemon) {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                const results = data.results.map((pokemon: any) => ({
                    name: pokemon.name
                }));
                response.render('index', { results, pokemon: null });
            });
    } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                const moves = data.moves.map((move: any) => move.move.name);
                response.render('index', { results: [], pokemon: { name: selectedPokemon, moves } });
            });
    }
});

app.listen(3000, function () {
    console.log('Server is running');
});
