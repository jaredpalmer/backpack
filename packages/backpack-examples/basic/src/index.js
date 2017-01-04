import express from 'express'

const app = express()

app.get('/', async (req, res) => {
  try {
    const thing = await Promise.resolve({ one: 'two' })
    return res.json({...thing, hello: 'world'})
  } catch (e) {
    return res.json({ error: e.message })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`> listening on port ${3000}`)
})
