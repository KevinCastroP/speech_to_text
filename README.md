# Speech to text APi

# Description

Create an API that receives an MP3 file and transcribes it, runs it through a natural language processor to identify sentiment and provide a word count. The system should look for words configured by a user and create an output of the number of times this word was used, and the time stamp the word was used on the recording.

# Process

When the request is sended to the server, the first thing to do is validate the x-api-key in the request headers, we receive two parameters the audio file and the word to search, we convert the Mp3 file to a WAV file and pass these parameters to the function speechToText to make the transcription process.

## Directory tree

```
├── audios
│   ├── mp3
│   │   └── file.mp3
│   └── wav
│       └── file.wav
├── docs
│   └── speech-to-text.postman_collection.json
├── src
│   ├── config
│   │   └── index.js
│   └── utilities
│       ├── convertMp3ToWav.js
│       └── speechToText.js
├── .dockerignore
├── .envrc
├── .envrc.example
├── .gitignore
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## How to run

Follow the steps below to run the service in your local environment:

- Install the dependencies with ```npm i```

- Enable the Cloud Speech API in the [Google Console Cloud](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com) and extract your credentials json file.

- Set the environment variables in your **.envrc** file and use the ```source .envrc``` command

- Run the server with ```npm run start```

- Import the file speech-to-text.postman_collection.json from folder docs as a new Postman collection, with this file you can make a test. Pass the Mp3 file and the word to search in the body.

- Remember update the x-api-key in the headers

- Send request

Follow the steps below to run the service in a Docker container:

- ```docker build -t speechToText .```
- ```docker run speechToText```
- Send request

## Author

* Kevin Castro
* [LinkedIn](https://www.linkedin.com/in/kevin-brandown-castro-/)
* [Contact](https://kevincastrop.github.io/KC)

