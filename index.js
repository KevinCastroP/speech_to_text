const {
    config
} = require('./src/config/index');

const {
    speechToText
} = require('./src/utilities/speechToText');

const {
    convertMp3ToWav
} = require('./src/utilities/convertMp3ToWav');

const fastify = require('fastify')();
const fileUpload = require('fastify-file-upload');
fastify.register(fileUpload)


// Create an endpoint to convert speech to text.
fastify.post('/speech-to-text', async (request, reply) => {
    // Validate x-api-key from headers
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

    const files = request.raw.files;
    // TODO: convert MP3 to WAV
    // const audioFile = await convertMp3ToWav(files.audio.toString());
    const wordToSearch = request.body.searchWord;
    // const text = await speechToText(audioFile, wordToSearch);
    const text = await speechToText(files.audio, wordToSearch);

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
        await fastify.listen({port: config.httpPort, host: config.host})
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
