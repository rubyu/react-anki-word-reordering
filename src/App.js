import './App.css';
import Editor from "./Editor";
import Preview from "./Preview";
import Result from "./Result";
import React, {useEffect, useState} from "react";

function App() {
  function getSentence() {
    const elm = document.getElementById("sentence");
    console.assert(elm !== null);
    return elm.innerText;
  }
  const sentence = getSentence();
  console.log("sentence:", sentence);

  const [orderingResult, setOrderingResult] = useState(null);

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
  function getResult(givenAnswer) {
    console.assert(correctAnswer.length === givenAnswer.length);
    return givenAnswer.map((x, i) => {
      return {
        "isCorrectAnswer": toWord(x) === correctAnswer[i],
        "value": toWord(x)
      }
    });
  }
  function finalizeOrdering() {
    console.assert(correctAnswer.length - epState.preview.length <= 1);
    const givenAnswer = epState.editor.length === 0 ? epState.preview : epState.preview.concat(epState.editor);
    const result = getResult(givenAnswer);
    setOrderingResult(result);
  }
  useEffect(() =>{
    const s = isCorrectAnswer() ? sentence : getCurrentAnswer();
    if (epState.editor.length > 0) return;
    finalizeOrdering();
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
      {orderingResult === null ?
        <>
          <Preview state={epState} setState={setEpState} toWord={toWord} previewToEditor={previewToEditor} />
          <Editor state={epState} setState={setEpState} toWord={toWord} editorToPreview={editorToPreview} />
        </>
        :
        <Result result={orderingResult} correctAnswer={correctAnswer} />
      }
    </div>
  );
}

export default App;
