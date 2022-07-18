const {
    config
} = require('./src/config/index');

const {
    speechToText
} = require('./src/routes/index');

const fastify = require('fastify')();


// Create an endpoint to convert speech to text.
fastify.post('/speech-to-text', async (request, reply) => {
    const xApiKey = request.headers["x-api-key"]
    if (xApiKey !== config.xApiKey) {
        reply.statusCode = 401
        console.log("Authorization failed")
        reply.send({
            data: null,
            success: false,
            message: "Authorization failed"
        })
        return
    }
    
    const { audioFile } = await request.file();
    const text = await speechToText(audioFile);
    reply.send({ text });

    if (text.code === 200) {
        console.log("Transcription success")
        reply.send({
            data: text,
            success: true,
            message: "Transcription success"
        })
    } else {
        reply.statusCode = 400
        console.log("It's not possible to generate a transcription")
        reply.send({
            data: null,
            success: false,
            message: "It's not possible to generate a transcription"
        })
        return
    }
})


const start = async () => {
    try {
        await fastify.listen(config.httpPort, config.host)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
