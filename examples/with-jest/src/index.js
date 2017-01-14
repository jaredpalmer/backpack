import createServer from './createServer'

const port = process.env.PORT || 3000
const app = createServer()

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  }

  if (__DEV__) { // webpack flags!
    console.log('> in development')
  }
  console.log(`> listening on port ${port}`)
})



