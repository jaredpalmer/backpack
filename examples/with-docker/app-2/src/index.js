import os from 'os'

import Express from 'express'

const { PORT = 8080 } = process.env

const App = () => {
  const app = Express()
  app.set('json spaces', 2)

  const bytesToGb = bytes => bytes / Math.pow(1024, 3)

  app.use((req, res) => res.json({
    arch: os.arch(),
    cpus: os.cpus().length,
    hostname: os.hostname(),
    memory: {
      free: `${bytesToGb(os.freemem())} gb`,
      total: `${bytesToGb(os.totalmem())} gb`,
    },
    platform: os.platform(),
    release: os.release(),
  }))

  return app
}

const app = App()

app.listen(PORT, err => {
  if (err) {
    console.error(err)
  }

  if (__DEV__) { // webpack flags!
    console.log('> in development')
  }

  console.log(`> listening on port ${PORT}`)
})
