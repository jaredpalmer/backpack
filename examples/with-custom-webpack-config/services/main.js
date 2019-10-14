import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  const thing = await Promise.resolve({ one: 'two' }) // async/await!
    .catch(e => res.json({ error: e.message }));
  return res.json({ ...thing, hello: 'world' }); // object-rest-spread!
});

const port = process.env.PORT || 3000;

app.listen(port, err => {
  if (err) {
    console.error(err);
  }

  if (__DEV__) {
    // webpack flags!
    console.log('> in development');
  }

  console.log(`> listening on port ${port}`);
});
