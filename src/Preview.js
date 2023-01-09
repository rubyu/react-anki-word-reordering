import './App.css';
function Preview(props) {

  return (
    <div id="preview">
      <div id="preview-inner">
        {props.state.preview.map((i)=>{
          return <span onClick={() => props.previewToEditor(i)} key={"preview-item-" + i}>{props.toWord(i)}</span>
        })}
      </div>
    </div>
  );
}

export default Preview;
