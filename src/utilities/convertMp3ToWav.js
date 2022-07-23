const Mp32Wav = require('mp3-to-wav')
fs = require('fs')


async function convertMp3ToWav(fileToConvert) {
    // Convert MP3 file to WAV format
    try {
        const Mp3FilePath = 'audios/mp3/test1.mp3'

        fs.writeFile(Mp3FilePath, fileToConvert, function (err) {
            if (err) return console.log(err)
            console.log('MP3 file saved.')
        })

        const audioFile = new Mp32Wav(Mp3FilePath, 'audios/wav/test.wav')

        console.log('WAV file created.')
        return audioFile
    } catch (error) {
        console.log(error)
        return null
    }
}


module.exports = {
    convertMp3ToWav
}