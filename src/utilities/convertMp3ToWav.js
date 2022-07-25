const Mp32Wav = require('mp3-to-wav')
fs = require('fs')


async function convertMp3ToWav(fileName, content) {
    // Convert MP3 file to WAV format
    return new Promise((resolve, reject) => {
        try {
            const Mp3FilePath = `audios/mp3/${fileName}`

            fs.writeFileSync(Mp3FilePath, content, function (err) {
                if (err) return console.log(err)
                console.log('MP3 file saved.')
            })

            const audioFile = new Mp32Wav(Mp3FilePath, 'audios/wav/').exec();


            audioFile.then((result) => {
                console.log('WAV file created.', result)
                resolve({
                    path: 'audios/wav/'
                })
            }).catch((err) => {
                console.log('WAV file error.', err)
                reject(err)
            })

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    convertMp3ToWav
}