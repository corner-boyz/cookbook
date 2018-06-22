const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('api/ingredients', (req, res) => {
  // This is just here temporarily to test the server
  let ingredients = ['Tomato', 'Lettuce', 'Avocado'];
  res.json(ingredients);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}!`);
});

