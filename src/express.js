import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import expressLayout from 'express-ejs-layouts'
import methodOverride from 'method-override'
import userRouter from './route/userRoute.js'
import snippetRouter from './route/snippetRoute.js'
import session from 'express-session'
import flash from 'connect-flash'

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB...')
}).catch((err) => {
  console.log('Error connecting to MongoDB', err)
})

app.use(session({
  cookie: {
    maxAge: 86400000, // 24 hours for cookie expiration
    secure: false, // No need for secure cookies in development
    httpOnly: true // Helps mitigate the risk of client side script accessing the protected cookie
  },
  resave: false, // Avoids resaving session if nothing changed
  saveUninitialized: false, // Avoids saving uninitialized sessions
  secret: 'keyboard cat' // A simple secret for session encoding
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash(); 
  res.locals.user = req.session.user;
  console.log('Current user session:', req.session.user); 
  next();
});

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(methodOverride('_method'));

app.use('/users', userRouter);
app.use('/snippets', snippetRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});


// Get the port number from the environment or use 3000 as default
export default (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
