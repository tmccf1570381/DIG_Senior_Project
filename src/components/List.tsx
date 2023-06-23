import React, { useContext } from "react";
import "./List.css";
import { VariableContext } from "../App";
import Modal from "./Header/Modal.tsx";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


const List= () => {
  const [popup, , postedArray, setPostedArray] = useContext(VariableContext);
  const files = ["express", "css", "git", "html", "Java","TypeScript", "Knex", "React", "javaScript","AWS"]
  const upZamas = async (e:any) => {
    const res = await fetch(fetchURL+"/good", {method: "POST", headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"g-id": Number(e.currentTarget.className)})}).then(e=>e.json());
    setPostedArray(res);
  };
  
  return (
    <>
    {popup && <Modal />}
    { postedArray.map((e,ind) => (
        <article className="article" key={ind}>
          {/* カード表 */}
          <div className="front">
           <figure>
            {files.includes(e.tag)
            ?<img src={`./images/${e.tag}.svg`} alt="articleIcon" />
            :<img src={`./images/${"溺れる人のピクトグラム"}.svg`} alt="articleIcon" />}
           </figure>
           <div className="content">
           <table>
                <thead>
                    <tr><th colSpan={2}>{e.title}</th></tr>
                </thead>
                <tbody>
                    <tr><th>post-date</th><td>{e["post-date"]}</td></tr>
                    <tr><th>posted by</th><td>{`${e["first-name"]} ${e["last-name"]}`}</td></tr>
                    <tr><th>tag</th><td>{e["tag"]}</td></tr>
                    <tr><th>zamas</th><td>
                        {e.zamas > 10 && `⭐️`}{e.zamas > 30 && `⭐️`}{e.zamas > 60 && `⭐️`}{e.zamas >= 100 && `⭐️`}{`⭐️ ${e["zamas"]}`}
                    </td></tr>
                </tbody>
             </table>
           </div>
          </div>

          {/* カード裏 */}
          <div className="back">
            <img className={String(e.id)} src="./systemImages/edit.png" alt="icon" onClick={e=>console.log(e.target)}/>
            <h3>review comment</h3>
            <section>
                <ul>
                    {e.review.map((obj,ind) => <li key={"R"+ind}>{obj}</li>)}
                </ul>
            </section>
            <div>
                <a href={e.url} target="_blank" rel="noopener noreferrer"><button>LINK</button></a>
                <button className={String(e.id)} onClick={(e)=>upZamas(e)}>ZAMAS</button>
            </div>
          </div>
       </article>
    ))}
    </>
  );
};

export default List;
