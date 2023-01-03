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

  function cleanup(s){
    return s.trim().replace(/\s+/g, " ");
  }
  function getPeaces(sentence) {
    let s = cleanup(sentence);
    s = s.replace(/(\w{2,})([,.!?])/g, "$1 $2");
    return s.split(" ");
  }
  const expected = getPeaces(sentence);
  console.log("expected:", expected);

  function toWord(i) {
    return expected[i];
  }

  const [epState, setEpState] = useState(() => {
    const n = expected.length;
    const e = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    const p = [];
    return {
      "editor": e,
      "preview": p
    }
  });
  console.log("epState:", epState);

  const [orderingResult, setOrderingResult] = useState(null);
  console.log("orderingResult:", orderingResult);

  function getResult(actual) {
    console.assert(expected.length === actual.length);
    return actual.map((x, i) => {
      return {
        "isCorrectAnswer": toWord(x) === expected[i],
        "value": toWord(x)
      }
    });
  }
  function finalizeOrdering() {
    console.assert(expected.length - epState.preview.length <= 1);
    const actual = epState.editor.length === 0 ? epState.preview : epState.preview.concat(epState.editor);
    const result = getResult(actual);
    setOrderingResult(result);
  }
  useEffect(() =>{
    if (epState.editor.length > 1) return;
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
        <Result result={orderingResult} expected={expected} />
      }
    </div>
  );
}

export default App;
