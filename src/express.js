import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import expressLayout from 'express-ejs-layouts'
import methodOverride from 'method-override'

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB...')
}).catch((err) => {
  console.log('Error connecting to MongoDB', err)
})


app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(methodOverride('_method'));

app.get('/he', (req, res) => {
  res.send('Hello World from docker again again!')
})


// Get the port number from the environment or use 3000 as default
export default (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
