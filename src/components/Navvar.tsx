import "./Navvar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faStar, faPlus, faClockRotateLeft, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { NewValContext } from "../App2";
import Ranking from "./Ranking";
import { useContext, useState } from "react";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


export default function Navvar(){
    const [rule, setRule, , tag, URLS, ,user] = useContext(NewValContext);
    const [input, setInput] = useState({title:"", tag:"", url:"", doctype:"", comment:"" })
    const [tab, setTab] = useState(2);
    const today = new Date(); 

    const handler = (e:any) => {
        setInput(prev => ({...prev, [e.target.id]:e.target.value}));
    }
    const postData = async () => {
        switch(Object.values(input).indexOf("")){
            case -1:
                if (URLS.indexOf(input.url)!==-1){
                    alert("そのアドレスは既に共有されています")
                }else{
                    const {comment, ...posted} = {...input,"user-id":user,
                    "post-date": `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`};
                    await fetch(fetchURL+"/posted", {method: "POST", headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({posted, comment})}).then(e=>e.json());
                    setRule({...rule, zamas:!rule.zamas});
                    setInput({title:"", tag:"", url:"", doctype:"", comment:"" });
                }
                break;
            default:
                alert("入力されていない項目があります")
                break;
        }
    }

    return(
        <>
            <section className="major-item">
                <label className={tab === 1 ? `major-item-list post-color` : `major-item-list`}>
                    <input type="radio" name="navvar" style={{display:"none"}}  onClick={()=>{setTab(1)}}/>
                    <FontAwesomeIcon className="new-icon-nav" icon={faPlus}/>
                </label>
                <label className={tab === 2 ? `major-item-list post-color` : `major-item-list`}>
                    <input type="radio" name="navvar" style={{display:"none"}} defaultChecked onClick={()=>{setTab(2)}}/>
                    <FontAwesomeIcon className="new-icon-nav" icon={faFilter}/>
                </label>
                <label className={tab === 3 ? `major-item-list post-color` : `major-item-list`}>
                    <input type="radio" name="navvar" style={{display:"none"}} onClick={()=>{setTab(3)}}/>
                    <FontAwesomeIcon className="new-icon-nav" icon={faRankingStar}/>
                </label>
            </section>

            {
                (()=>{
                    switch(tab){
                        case 1:
                            return (
                                <section className="minor-item">
                                    <h3>🎉 新規投稿</h3>
                                    <h4 className="new-post-tittle">ナレッジ</h4>
                                    <input type="text" placeholder="tittle" id="title" value={input.title} onChange={(e)=>{handler(e)}} />
                                    <h4 className="new-post-tittle">リンク</h4>
                                    <input type="text" placeholder="link" id="url" value={input.url}  onChange={(e)=>{handler(e)}}/>
                                    <h4 className="new-post-tittle">タグ</h4>
                                    <select name="tag" id="tag" value={input.tag} onChange={(e)=>{handler(e)}}>
                                        <option value="">-- choose one --</option>
                                        {tag[0].map((e:any) => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                    <h4 className="new-post-tittle">ファイルタイプ</h4>
                                    <select name="doctype" id="doctype" value={input.doctype}  onChange={(e)=>{handler(e)}} >
                                        <option value="">-- choose one --</option>
                                        <option value="powerpoint">PowerPoint</option>
                                        <option value="word">Word</option>
                                        <option value="excel">Excel</option>
                                        <option value="onedrive">Ondrive</option>
                                        <option value="sharepoint">SharePoint</option>
                                        <option value="slack">Slack</option>
                                        <option value="teams">Teams</option>
                                        <option value="web">Webサイト</option>
                                        <option value="else">その他</option>
                                    </select>
                                    <h4 className="new-post-tittle">コメント</h4>
                                    <textarea id="comment" value={input.comment} style={{width:"16vw",height:"10vh",resize:"none"}} onChange={(e)=>{handler(e)}} ></textarea>
                                    <div className="new-post-area">
                                        <button onClick={postData}>POST</button>
                                    </div>
                                </section>
                            )

                        case 2:
                            return (
                                <section className="minor-item">
                                <h3>📁 ファイル</h3>
                                <select name="" id="" value={rule.doc} onChange={e=>setRule({...rule,doc:e.currentTarget.value})}>
                                        <option value="">-- choose one --</option>
                                        <option value="powerpoint">PowerPoint</option>
                                        <option value="word">Word</option>
                                        <option value="excel">Excel</option>
                                        <option value="pdf">PDF</option>
                                        <option value="onedrive">Ondrive</option>
                                        <option value="sharepoint">SharePoint</option>
                                        <option value="slack">Slack</option>
                                        <option value="teams">Teams</option>
                                        <option value="web">Webサイト</option>
                                        <option value="else">その他</option>
                                </select>
                                <h3>📍 個人設定</h3>
                                <div className="minor-item-row">
                                    <label className="select-tag">
                                        <input type="checkbox" defaultChecked={rule.favorite} name="favorite" onClick={()=>{setRule({...rule,favorite: !rule.favorite})}}/>
                                        <span><FontAwesomeIcon className="new-icon-nav" icon={faStar}/> お気入り</span>
                                    </label>
                                </div>
                                <div className="minor-item-row">
                                    <label className="select-tag">
                                        <input type="checkbox" name="history" defaultChecked={rule.own} onClick={()=>{setRule({...rule,own: !rule.own})}}/>
                                        <span><FontAwesomeIcon className="new-icon-nav" icon={faClockRotateLeft}/> 投稿履歴</span>
                                    </label>
                                </div>
                                <h3>🏷️ タグ</h3>
                                <div className="minor-item-row">
                                        <label className="select-tag">
                                            <input type="radio" name="tagsort" defaultChecked value="" onClick={e=>setRule({...rule,tag:e.currentTarget.value})}/>
                                            <span>-- ALL --</span>
                                        </label>
                                    </div>
                                {tag[0].map((e,ind)=>{
                                    return(
                                    <div key={ind} className="minor-item-row">
                                        <label className="select-tag">
                                            <input type="radio" name="tagsort" value={e} onClick={e=>setRule({...rule,tag:e.currentTarget.value})}/>
                                            <span>#{e}</span>
                                            <span className="minor-item-row-num">{tag[1][ind]}</span>
                                        </label>
                                    </div>
                                    )
                                })}
                            </section>
                            )

                        case 3:
                            return (
                                <section className="minor-item">
                                    <h3>🏆 ランキング</h3>
                                    {[...Array(7)].map((e,ind)=>
                                        <Ranking key={ind} />
                                    )
                                    }
                                </section>
                            )
    

                        default:
                            return <></>
                    }
                })()
            }
        </>
    )

}