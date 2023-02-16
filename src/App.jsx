import { useState } from "react";
import "./App.css";

function App() {
  const [tags, setTags] = useState([]);

  const [textDirty, setTextDirty] = useState(false);
  const [textError, setTextError] = useState("Поле не может быть пустым");

  const onBlur = () => {
    if (text) {
      setTextDirty(false);
    } else {
      setTextDirty(true);
    }
  };

  const deleteTag = (delIndex) => {
    const filtered = tags.filter((tag, index) => {
      if (index === delIndex) {
        return false;
      }
      return true;
    });
    setTags(filtered);
  };

  const [text, setText] = useState("");

  const addTags = () => {
    if(tags.find(item => item.text === text)) {
      alert('Тег с таким названием уже добавлен.')
    }
    
    if (!tags.find(item => item.text === text) && text) {
      setTags([
        ...tags,
        {
          text: text,
        },
      ]);
      
      setText("");
    }
  };

  const textHandler = (e) => {
    if(e.target.value) {
      setTextDirty(false)
    }
    setText(e.target.value)
  }

  const Tags = tags.map((tag, index) => {
    return (
      <span key={index} className="tag">
        {tag.text}
        <button className="delete" onClick={(e) => deleteTag(index)}>
          x
        </button>
      </span>
    );
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="main">
          <input
            className={`inp ${textDirty && 'errInp'}`}
            placeholder="Введите текст"
            value={text}
            onChange={(e) => textHandler(e)}
            onBlur={onBlur}
          ></input>
          <button
            className={`addButton ${!text && "disButton"}`}
            onClick={addTags}
            disabled={!text}
          >
            Отправить
          </button>
        </div>
        </form>
        {textDirty && (
          <div style={{ color: "red" }} className="errorDiv">
            {textError}
          </div>
        )}
        <div className="tags">{Tags}</div>
    </>
  );
}

export default App;
