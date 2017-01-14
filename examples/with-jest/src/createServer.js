import express from 'express'

export default () => {
  const app = express()

  app.get('/', async (req, res) => {
    try {
      const thing = await Promise.resolve({ one: 'two' }) // async/await!
      return res.json({...thing, hello: 'world'}) // object-rest-spread!
    } catch (e) {
      return res.json({ error: e.message })
    }
  })

  return app
}
