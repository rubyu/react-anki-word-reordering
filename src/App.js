import './App.css';
import Editor from "./Editor";
import Preview from "./Preview";
import {useEffect, useState} from "react";

function App() {
  function getSentence() {
    const elm = document.getElementById("sentence");
    console.assert(elm !== null);
    return elm.innerText;
  }
  const sentence = getSentence();
  console.log("sentence:", sentence);

  function setHiddenInput(s) {
    const elm = document.querySelector("#hidden-input input");
    console.assert(elm !== null);
    elm.value = s;
    console.log("input.value:", s);
  }
  function finalizeInput() {
    const elm = document.querySelector("#hidden-input input");
    console.assert(elm !== null);
    const key = {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true
    };
    const evt = new KeyboardEvent("keypress", key);
    elm.dispatchEvent(evt);
    console.log("keypress(Enter) sent to input");
  }

  function cleanup(s){
    return s.trim().replace(/\s+/g, " ");
  }
  function getPeaces(sentence) {
    let s = cleanup(sentence);
    s = s.replace(/(\w{2,})([,.!?])/g, "$1 $2");
    return s.split(" ");
  }
  const correctAnswer = getPeaces(sentence);
  console.log("correctAnswer:", correctAnswer);

  function toWord(i) {
    return correctAnswer[i];
  }

  const [epState, setEpState] = useState(() => {
    const n = correctAnswer.length;
    const e = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    const p = [];
    return {
      "editor": e,
      "preview": p
    }
  });
  console.log("epState:", epState);

  function isCorrectAnswer() {
    return epState.editor.length === 0 &&
        JSON.stringify(correctAnswer) === JSON.stringify(epState.preview);
  }
  function getCurrentAnswer() {
    return epState.preview.map(i => toWord(i)).join(" ").replace(/(\w{2,}) ([,.!?])/g, "$1$2");
  }

  useEffect(() =>{
    const s = isCorrectAnswer() ? sentence : getCurrentAnswer();
    setHiddenInput(s);
    if (epState.editor.length > 0) return;
    finalizeInput();
  }, [epState]);

  function editorToPreview(i) {
    const e = epState.editor.filter(x => x !== i);
    const p = epState.preview.concat([i]);
    setEpState({
      "editor": e,
      "preview": p
    });
  }
  function previewToEditor(i) {
    const e = epState.editor.concat([i]);
    const p = epState.preview.filter(x => x !== i);
    setEpState({
      "editor": e,
      "preview": p
    });
  }

  return (
    <div id="app">
      <Preview state={epState} setState={setEpState} toWord={toWord} previewToEditor={previewToEditor} />
      <Editor state={epState} setState={setEpState} toWord={toWord} editorToPreview={editorToPreview} />
    </div>
  );
}

export default App;
