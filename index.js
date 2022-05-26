const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const options = {
}

let newRec = {
  title: 'Fernandos food',
  level: 'Easy Peasy',
  ingredients: ['Fernando'],
  cuisine: 'Asian',
  dishType:'breakfast',
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  creator: 'Fernando',
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRec).then((responseDB) => {
      console.log('Fernando recipe', responseDB)
      return Recipe.insertMany(data);
    }).then(() => {
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100}
      )
    })
    .then((recipe) => {
      console.log(`The ${recipe.title} has been updated`);
    })
    .then((deleted) => {
      return Recipe.deleteOne({ 
        title: "Carrot Cake"
      })
    })
    .then((deleted) => {
      console.log(`Oh no! ${deleted.title} is no longer available`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close());
  })