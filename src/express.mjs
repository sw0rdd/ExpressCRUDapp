import express from 'express'
import logger from 'morgan'

const app = express()

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.static('public'))

app.get('/he', (req, res) => {
  res.send('Hello World!')
})


// Get the port number from the environment or use 3000 as default
export default (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
