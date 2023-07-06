import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NewValContext } from "../App2";
import { useContext, useState } from "react";
// const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


type props={
    arr:
    {id:number,title:string,"post-date":string,tag:string,url:string,"user-id":number,"zamas":number,"first-name":string ,"last-name":string, review:string[], doctype:string},
    setModify: 
    React.Dispatch<React.SetStateAction<{id: number; title: string; "post-date": string; tag: string; url: string; "user-id": number; zamas: number; "first-name": string; "last-name": string; review: string[]; doctype: string}>>,
    setLoad:React.Dispatch<React.SetStateAction<boolean>>,
}  

export default function Card({arr, setModify, setLoad}:props){
    const [rule, setRule, goodList, , , , user] = useContext(NewValContext);

    const ZAMAS = async (e:any) => {
        setLoad(true);
        // await fetch(fetchURL+"/good", {method: "POST", headers: {'Content-Type': 'application/json'},
        await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/goods", {method: "POST", mode: 'cors', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": Number(e.currentTarget.id), "user-id":user})}).then(e=>e.json());
        setRule((prev:any)=>({...rule, zamas:!rule.zamas}));
        setLoad(false);
    };

    const deletePost = async () => {
        setLoad(true);
        // await fetch(fetchURL+"/posted", {method: "DELETE", headers: {'Content-Type': 'application/json'},
        await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/posts", {method: "DELETE", mode: 'cors', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...arr})}).then(e=>e.json()); 
        setRule((prev:any)=>({...rule, zamas:!rule.zamas}));
        setLoad(false);
    };

    return (
        <>
        <article id={String(arr.id)} className="new-card">
            <section className="new-card-head">
                <label id={String(arr.id)} onClick={ZAMAS}>
                    {goodList.indexOf(arr.id) !== -1
                    ? <FontAwesomeIcon className="new-icon yellow" icon={faStar} />
                    : <FontAwesomeIcon className="new-icon" icon={faStar} /> }
                    <span>{arr.zamas}</span>
                </label>
                <h3>{arr.title}</h3>
                <figure>
                    <img src={`./systemImages/${arr.doctype}.png`} alt="document" />
                </figure>
            </section>

            <section className="new-card-body">
                <div>
                    <nav>tags</nav>
                    <span>{`#${arr.tag}`}</span>
                </div>
                <div className="new-card-parallel">
                    <div>
                        <nav>posted date</nav>
                        <span>{arr["post-date"]}</span>
                    </div>
                    <div>
                        <nav>posted by</nav>
                        <span>{`${arr["first-name"]} ${arr["last-name"]}`}</span>
                    </div>
                </div>
                <div>
                    <nav>review comment</nav>
                    <span className="new-review">{arr.review[0]}</span>
                </div>
            </section>

            <div className="new-card-button">
                <a href={arr.url} target="_blank" rel="noopener noreferrer">
                    <button>VIEW</button>
                </a>
                    <button className="new-edit-icon" onClick={()=>{setModify(arr)}}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="new-dust-icon" id={`${arr.id}`} onClick={deletePost}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
            </div>
        </article>
        </>
    )
}