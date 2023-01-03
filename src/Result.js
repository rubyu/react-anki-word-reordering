import './App.css';
function Result(props) {

  return (
    <div id="result">
      <div id="expected">
        {props.correctAnswer.map((x, i)=>{
          return <span key={"result-item-expected-" + i}>{x}</span>
        })}
      </div>
      <div id="actual">
        {props.result.map((x, i)=>{
          return <span className={x.isCorrectAnswer ? "good" : "bad"} key={"result-item-actual-" + i}>{x.value}</span>
        })}
      </div>
    </div>
  );
}

export default Result;
