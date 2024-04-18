import { useState, useEffect } from 'react'

function Recorder() {
    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
    }, [isRecording])

    const handleRecorder = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

            if(!isRecording){
                // console.log("RECORD")
                recognition.start()
                recognition.onresult = async function (event) {
                    const transcript = event.results[0][0].transcript
                    // console.log(transcript)
                    // console.log('STOP')
                    recognition.stop()
                    setIsRecording(!isRecording)
                }
            }
        setIsRecording(!isRecording)
    }
    return (
        <></>
    )
}

export default Recorder