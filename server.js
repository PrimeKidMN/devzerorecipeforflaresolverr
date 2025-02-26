const fastify = require('fastify')({ logger: true });
const fetch = require('node-fetch');

// Declare a route to proxy krunker.io
fastify.get('/', async (request, reply) => {
  const response = await fetch('http://localhost:8191/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://krunker.io' })
  });

  const data = await response.json();
  const content = data.solution?.response;

  reply
    .header('Content-Type', 'text/html')
    .send(content);
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000);
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
