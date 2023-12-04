const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('views', (path.join(__dirname), 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.render("index")
})

app.get('/beers', (req, res) => {
   punkAPI
     .getBeers()
     .then(beersfromApi => {
        console.log('Beers from the database', {beersfromApi})
        res.render("beers", {data: beersfromApi});
     })
     .catch(error => console.log(error))
  
});

app.get('/random-beer', (req, res) => {

  punkAPI
    .getRandom()
    .then((responsefromApi => {
      console.log('Random beer from the database', responsefromApi);
      res.render("random-beer", {data: responsefromApi})
    }))
    .catch(err => console.log(err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));