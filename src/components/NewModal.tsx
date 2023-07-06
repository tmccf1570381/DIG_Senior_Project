import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "./NewModal.css";
import { NewValContext } from "../App2";
// const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


type props={
    modify: {id:number,title:string,"post-date":string,tag:string,url:string,"user-id":number,"zamas":number,"first-name":string ,"last-name":string, review:string[]},
    setModify: React.Dispatch<React.SetStateAction<{id: number; title: string; "post-date": string; tag: string; url: string; "user-id": number; zamas: number; "first-name": string; "last-name": string; review: string[]; doctype: string}>>,
}  

export default function NewModal({modify ,setModify}:props){
    const [comment, setComment] = useState([""]);
    const [, setRule, , tag, , , ] = useContext(NewValContext)

    useEffect(()=>{
        (async ()=>{
            setComment(modify.review);
        })();
    },[]);

    const handler = (e:any) => {
        const replace = [...comment];
        replace[Number(e.target.id)]=e.target.value;
        setComment(replace);
    };

    const handler2 = (e:any) =>{
        setModify(prev=>({...prev,[e.target.id]:e.target.value}));
    };

    const reviewUpdate = async () => {
        // await fetch(fetchURL+"/review", {method: "POST", headers: {'Content-Type': 'application/json'},
        await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/reviews", {method: "POST", mode: "cors", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...modify, review:comment})}).then(e=>e.json());
        setModify(prev=>({...prev,id:0}));
        setRule(prev=>({...prev, zamas: !prev.zamas}))
    };

    return (
        <section className="new-modal">
            <article className="new-modal-article">
                <div style={{display:"flex"}}>
                    <div className="new-modal-L">
                        <h4>ナレッジ</h4>
                        <input type="text" id="title" onChange={(e)=>{handler2(e)}} value={modify.title} />
                    </div>
                    <div className="new-modal-R">
                        <h4>タグ</h4>
                        <select name="tag" id="tag" value={modify.tag} onChange={(e)=>{handler2(e)}}> 
                            <option value="">-- choose one --</option>
                            {tag[0].map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                </div>
                <h4>コメント</h4>
                <div className="new-modal-cmment-area">
                    {comment.map((e,ind)=><input key={ind} id={String(ind)} type="text" value={e} onChange={(e)=>{handler(e)}}/>)}
                    <div style={{display:"flex"}}>
                        <button className="addRow" onClick={()=>{setComment(prev=>[...prev,""])}}><FontAwesomeIcon icon={faCommentDots}/></button>
                    </div>
                </div>
                <div className="new-modal-button-area">
                    <button onClick={()=>setModify(prev=>({...prev,id:0}))}>CLOSE</button>
                    <button onClick={reviewUpdate}>UPDATE</button>
                </div>
            </article>
        </section>
    )
}