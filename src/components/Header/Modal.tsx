import React, { useState, useContext, useRef } from "react";
import "./Modal.css";
import { VariableContext } from "../../App";
const fetchURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3456";
console.log(fetchURL);

export default function Modal () {
    const [, setPopup,, setPostedArray, , userData, ] = useContext(VariableContext);
    const [postData, setPostData] = useState({title:"", tag: "", url: "", comment: ""});
    const htmlRef = useRef<HTMLDivElement>(null);
    const today = new Date(); 

    const newPost = async () => {
      const {comment, ...newData} = {
          ...postData,
          "post-date": `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
          "user-id": userData[0]["user-id"]
      };
      const response = await fetch(fetchURL+`/posted`, {method: "POST", headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({posted:newData,comment})}).then(e=>e.json());
      setPostedArray(response);
      setPopup(false);
    };

    return (
      <div className="popUpBack" ref={htmlRef} onClick={(e)=>{(e.target===htmlRef.current) && setPopup(false)}}>
        <section>
            <h1>✨NEW Article✨</h1>
            {/* タイトル */}
            <input type="text" name="title" placeholder="Title" value={postData.title} onChange={(e:any)=>setPostData({...postData ,[e.target.name]:e.target.value})} required/>
            {/* タグ */}
            <input list="tags" name="tag" placeholder="Tag" value={postData.tag} onChange={(e:any)=>setPostData({...postData ,[e.target.name]:e.target.value})}/>
            <datalist id="tags">
              <option value="dummy"></option>
              <option value="dummy2"></option>
              <option value="dummy3"></option>
            </datalist>
            {/* コメント */}
            <input type="text" name="comment" placeholder="review comment" onChange={(e:any)=>setPostData({...postData ,[e.target.name]:e.target.value})}/>
            <input type="url" name="url" placeholder="URL" value={postData.url} onChange={(e:any)=>setPostData({...postData ,[e.target.name]:e.target.value})} />
            {/* ボタン */}
            <div className="buttonArea">
              <button onClick={newPost}>POST</button>
              <button onClick={() => {setPopup(false)}}>CLOSE</button>
            </div>
        </section>
      </div>
    );
};
