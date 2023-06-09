import React, { useState } from 'react';
  import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
  import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
  import {useEffect} from 'react';

  const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);
  const appId = 'd02a25cb-6a95-4f91-bf7f-c19edf494b6b';
  const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
  SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
  
  const VoiceAssistent = (props) => {
    const [micState, setmicState] = useState('off');
    
    const listenContinuously = () => { SpeechRecognition.startListening({continuous:true, language:'en-IN',}); setmicState('on')  } 
    const stopListening = ()=> { SpeechRecognition.stopListening({continuous: true}); setmicState('off')  }  
    
    const utterance = new SpeechSynthesisUtterance();
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();  
    utterance.voice = voices[7]
    
    const instructions = props.instructions
    const [instructionsCounter, setInstructionsCounter] = useState(0)
    const [order, setOrder] = useState('');

    
    const listItems = instructions && instructions.map((inst) =>
    <li>{inst}</li>)
    
    const [message, setMessage] = useState('');
    const waitSome = async (ml) =>{
      await delay(ml)
    }


    const startReading = async() =>{
      props.openPopup();
      var instText = instructions[0]
      setInstructionsCounter(1)
      utterance.text = instText
      speechSynthesis.speak(utterance);
      let sentences = 1 > instText.replace(/[^.]/g, "").length ? 1 : instText.replace(/[^.]/g, "").length
      let commas = instText.replace(/[^,]/g, "").length
      
        await delay(instText.length * 70 +  sentences * 700 + commas * 350);
        listenContinuously();
    
  }


    const read_Next_Instruction = async (action) =>{
      resetTranscript()
      let toContinue = true
      let counter = 0
      var instText = "invalid action"
      if(action ==="next"){
        if(instructionsCounter == instructions.length){
          instText = instText + ".No more instructions. To finish the reading say finish"
        }else{
        counter = instructionsCounter
        instText = instructions[counter]
        setInstructionsCounter(instructionsCounter + 1)
        }
      }else if(action === "again"){
        counter = instructionsCounter-1
        instText =  instructions[counter]
      }else if(action === "backward" && instructionsCounter >= 2){
        counter = instructionsCounter-2
        instText =  instructions[counter]
        setInstructionsCounter(instructionsCounter - 1)
      }else if(action === "finish"){
        instText = "The reading is over, hope you enjoyed Audio Chef."
        setInstructionsCounter(0)
        toContinue = false
      }
      if(counter == instructions.length && toContinue){
        // instText = instText + ".No more instructions. To finish the reading say finish"
      }
      
      stopListening()
      
      utterance.text = instText
      speechSynthesis.speak(utterance);
      let sentences = 1 > instText.replace(/[^.]/g, "").length ? 1 : instText.replace(/[^.]/g, "").length
      let commas = instText.replace(/[^,]/g, "").length
      if(toContinue){
        await delay(instText.length * 70 +  sentences * 700 + commas * 350);
        listenContinuously();
      }      
    }

    const {
      transcript,
      resetTranscript,
      listening,
      browserSupportsSpeechRecognition,
      isMicrophoneAvailable
    } = useSpeechRecognition();
    
    if(listening && micState ==="off"){
      stopListening()
    }
    
    if(transcript != order){
        setOrder(transcript);
    }
    useEffect(() =>{
      if(transcript.includes("next")){
        read_Next_Instruction("next");
      }else if(transcript.includes("again")){
        read_Next_Instruction("again")
      }else if(transcript.includes("back") || transcript.includes("beck")){
        read_Next_Instruction("backward")
      }else if(transcript.includes("finish") || transcript.includes("finnish")){
        read_Next_Instruction("finish")
      }
    },[transcript]);

    if (!browserSupportsSpeechRecognition) {
      return <span>No browser support</span>
    }
  
    if (!isMicrophoneAvailable) {
      return <span>Please allow access to the microphone</span>
    }
    
  return (
    <div className="container">
    <button onClick={startReading} className='start'>START READING!</button>


  </div>
  );
}; 



export default VoiceAssistent