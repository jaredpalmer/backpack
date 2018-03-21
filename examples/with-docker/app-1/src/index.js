import os from 'os'

import Express from 'express'
import fetch from 'node-fetch'

const { PORT = 8080 } = process.env

const App = () => {
  const app = Express()
  app.set('json spaces', 2)

  const bytesToGb = bytes => bytes / Math.pow(1024, 3)

  app.use(async (req, res) => {
    const self = {
      arch: os.arch(),
      cpus: os.cpus().length,
      hostname: os.hostname(),
      memory: {
        free: `${bytesToGb(os.freemem())} gb`,
        total: `${bytesToGb(os.totalmem())} gb`,
      },
      platform: os.platform(),
      release: os.release(),
    }

    let other = null

    try {
      const response = await fetch('http://app-2:8080')
      other = await response.json()
    } catch (e) {
      console.error(e, e.stack)
    }

    res.json({ self, other })
  })

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
