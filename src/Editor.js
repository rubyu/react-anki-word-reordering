import './App.css';

function Editor(props) {


  return (
    <div id="editor">
      {props.state.editor.map((i)=>{
        return <span onClick={() => props.editorToPreview(i)} key={"editor-item-" + i}>{props.toWord(i)}</span>
      })}
    </div>
  );
}

export default Editor;
