import { useState , useRef, useEffect } from "react";

export function PostCreator(){
  const [createPost, setCreatePost] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  function postEditor(){
    setCreatePost(true);
  }

  function postCreator(e){
    if(mediaFiles.length > 0) return;
    if(e.target.classList.contains('create-post-overlay')) setCreatePost(false);
  }

  return (
    <>
      {createPost && <CreatePost mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} postCreator={postCreator} />}
      <div onClick={postEditor} className="post-creator">
        <div className="app-icon">
          <img src="../../public/icons/my-feed.svg" alt="My Feed" />
        </div>
      </div>
    </>
  );
}

function CreatePost({mediaFiles, setMediaFiles, postCreator}){
  const [fontSize, setFontSize] = useState(16);
  const inputField = useRef(null);
  const fontSizeField = useRef(null);
  const fileInput = useRef(null);

  const addMedia = () => fileInput.current.click();

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(prev => [...prev, ...files]);
    e.target.value = "";
  }

  const removeFile = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  }

  const writePost = () => {
    const postText = inputField.current.textContent;
    if(inputField && postText.length > 0){
      inputField.current.classList.remove('empty');
    } else {
      inputField.current.classList.add('empty');
    }
  }

  const adjustFontSize = () => {
    const size = fontSizeField.current.value;
    if(size > 9){
      setFontSize(size);
      document.documentElement.style.setProperty('--adjust_FontSize', `${size}px`);
    }
  }

  const inputSize = (e) => {
    if(e.target.value > 64) e.target.value = 64;
  }

  const enterSize = (e) => {
    if(e.key === 'Enter' && e.target.value !== ''){
      adjustFontSize();
    }
  }

  return (
    <div onClick={postCreator} className="create-post-overlay">
      <div className="create-post">
        <div className="create-post_header">
          <p>Anything goes</p>
        </div>
        <div ref={inputField} onInput={writePost} contentEditable className="create-post_box empty">

        </div>
        <div className="prev-media">
          {mediaFiles.map((file, i) => {
            const url = URL.createObjectURL(file);
            return(
              <div className="media" key={i}>
                <i onClick={() => removeFile(i)} key={`${file}_${i}`} className="bi bi-x"></i>
                <img className="file" key={`${file}-${i}`} src={url} alt={file.name} />
              </div>
            )
          })}
        </div>
        <div className="post-actions">
          <div className="post-extras">
            <div className="add-media">
              <i onClick={addMedia} className="bi bi-image"></i>
              <input
                ref={fileInput}
                onChange={handleFiles}
                type="file"
                id="fileInput"
                accept="image"
                multiple
              />
              <div className="media-label">
                <p>Add a photo <br /> or a video</p>
              </div>
            </div>
            <div className="adjust-font-size">
              <label htmlFor="adjFontSize">
                Adjust font size
              </label>
              <div className="input-wrapper">
                <button onClick={adjustFontSize}><i className="bi bi-fonts"></i></button>
                <input ref={fontSizeField} onInput={inputSize} onKeyDown={enterSize} id="adjFontSize" type="number" placeholder={`${fontSize}px`} />
              </div>
            </div>
          </div>

          <button className="submit-post">POST</button>
        </div>
      </div>
    </div>
  )
}