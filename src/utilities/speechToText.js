// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();


async function speechToText(audioFile, wordToSearch) {
    try {
        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
            content: fs.readFileSync('audios/wav/test.wav').toString('base64'),
        };

        const recognitionMetadata = {
            interactionType: 'DISCUSSION',
            microphoneDistance: 'NEARFIELD',
            recordingDeviceType: 'SMARTPHONE',
            recordingDeviceName: 'Pixel 2 XL',
            industryNaicsCodeOfAudio: 519190,
        };

        const config = {
            encoding: 'LINEAR16',
            // sampleRateHertz: 44100,
            languageCode: 'en-US',
            metadata: recognitionMetadata,
        };

        const request = {
            config: config,
            audio: audio,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');

        const amountOfWords = await countWords(transcription);
        const wordToFound = await searchWord(transcription, wordToSearch);

        return ({
            code: 200,
            result: transcription,
            words: amountOfWords,
            wordFound: {
                word: wordToFound.wordFounded,
                repetitions: wordToFound.amountOfRepetition
            }
        })
    } catch (error) {
        console.log(error)
        return ({
            code: 400,
            result: null
        })
    }
}

async function countWords(transcription) {
    // Counts the amount of words in the transcription
    const words = transcription.split(' ');
    return words.length;
}

async function searchWord(transcription, wordToSearch) {
    // Searches for a word in the transcription and return the amount of times it was found
    const words = transcription.split(' ');
    const wordFounded = words.includes(wordToSearch);
    const amountOfRepetition = transcription.match((/wordToSearch/gi).length);
    return {wordFounded, amountOfRepetition};
}


module.exports = {
    speechToText
}