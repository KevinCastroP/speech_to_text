const fastify = require('fastify')();


// Create an endpoint to convert speech to text.
fastify.post('/speech-to-text', async (request, reply) => {
    const { speech } = request.body;
    const text = await speechToText(speech);
    reply.send({ text });
});

async function speechToText(speech) {
    const url = 'https://api.wit.ai/speech?v=20200501';
    const headers = {
        'Content-Type': 'audio/wav'
    };
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: speech
    });
    const json = await response.json();
    return json.text;
}