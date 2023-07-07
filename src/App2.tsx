import Navvar from "./components/Navvar";
import "./App.css"
import NewHeader from "./components/NewHeader";
import Card from "./components/Card";
import React, { useEffect, useState, createContext } from "react";
import Login from "./components/Login";
import NewModal from "./components/NewModal";
import { Amplify, Auth } from 'aws-amplify';
import Loading from "./components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faAnglesLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
// const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

// UseContext用型定義
type props={
    post:
    {id:number,title:string,"post-date":string,tag:string,url:string,"user-id":number,"zamas":number,"first-name":string ,"last-name":string, review:string[]},
    prop:[
        rule: {keyword: string, tag: string, doc: string, favorite: boolean, own: boolean, zamas: boolean},
        setRule: React.Dispatch<React.SetStateAction<{keyword: string, tag: string, doc: string, favorite: boolean, own: boolean, zamas: boolean}>>,
        goodList:number[],
        tag:any[][],
        URLS:string[],
        setUser:React.Dispatch<React.SetStateAction<number>>,
        user:number,
        setCognito:React.Dispatch<React.SetStateAction<number>>,
    ]
};
export const NewValContext = createContext<props["prop"]>([{keyword : "", tag :"", doc :"", favorite :false, own:false, zamas: false}, ()=>{}, [], [[],[]], [], ()=>{}, 0, ()=>{}]);

// メイン関数
export default function App2(){
    const [post, setPost] = useState([{id:0,title:"","post-date":"",tag:"",url:"","user-id":0,"zamas":0,"first-name":"test" ,"last-name":"test",review:[""],doctype:""}]);
    const [viewArray, setViewArray] = useState(post);
    const [rule, setRule] = useState({keyword :"", tag :"", doc :"", favorite :false, own :false, zamas: false});
    const [goodList ,setGoodList] = useState([0]);
    const [tag, setTag] = useState([[],[]]);
    const [user, setUser] = useState(0);
    const [modify ,setModify] = useState(post[0]);
    const [cognito, setCognito] = useState(0);
    const [load, setLoad] = useState(false);
    const [src, setSrc] = useState("");
    const [userInfo, setUserInfo] = useState({"user-id": 0, "first-name": "","last-name": "","mail": "","16id": 0,"role": ""})
    
    // ナレッジソート関数
    const sortFunc = (arr:any) => {
        let key = new RegExp(rule.keyword.toLocaleLowerCase());
        arr = rule.keyword === "" 
        ? arr : arr.filter((e:any)=> key.test(e.title.toLocaleLowerCase())||key.test(e.tag.toLocaleLowerCase())||key.test(e.review[0].toLocaleLowerCase()));
        arr = rule.tag === "" ? arr : arr.filter((e:any) => e.tag === rule.tag);
        arr = rule.doc === "" ? arr : arr.filter((e:any)  => e.doctype === rule.doc);
        arr = rule.own !== true ? arr : arr.filter((e:any) => Number(e["user-id"]) === Number(user));
        arr = rule.favorite !== true ? arr : arr.filter((e:any) => goodList.indexOf(e.id)!==-1);
        setViewArray(arr);
    }

    const handler = (e:any) => {
        setUserInfo(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const UpdataUserInfo = async () => {
        const update = await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/goods", {method: "POST", mode: 'cors', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)}).then(e=>e.json());
    }

    //データ取得
    useEffect(()=>{
        (async () => {
            // let sortArray = await fetch(fetchURL+"/posted").then((e) => e.json()).catch(() => false);
            let sortArray = await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/posts").then((e) => e.json()).catch(() => false);
            const tagArray = sortArray.map((e:props["post"])=>e.tag);
            const tags = [...new Set(tagArray)].reduce((init,val)=>{return {...init as {}, [String(val)]:tagArray.filter((i:any)=>i===val).length}}, {})
            setTag([Object.keys(tags as {}) as [],Object.values(tags as {})]);
            setPost(sortArray);
            sortFunc(sortArray);
            // const zamas:any = await fetch(fetchURL+`/good/${user}`).then((e) => e.json()).catch(() => false);
            const zamas:any = await fetch(`https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/good/user-id?user-id=${user}`).then((e) => e.json()).catch(() => false);
            setGoodList(zamas.favorite);
        })();
    },[rule.zamas,user]);

    // ナレッジソート
    useEffect(()=>{
        let sortArray = [...post];
        sortFunc(sortArray)
    },[rule]);

    // ユーザー認証情報確認
    useEffect(()=>{
        (async()=>{
            // await fetch(fetchURL+"/params").then((e) => e.json())
            await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/params").then((e) => e.json())
            .then(e=>{
                Amplify.configure(e);
                Auth.configure();
            }).catch(() => false);
            const data = await Auth.currentSession().then(e=>e).catch(err=>err);
            if (data !=="No current user"){
                setSrc("");
                const res = await fetch(`https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/s3/user-id?user-id=${data.accessToken.payload.username}`).then(e=>e.json());
                res.src && setSrc(res.src);
                const updates = await fetch(`https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/updates/user-id?user-id=${data.accessToken.payload.username}`).then(e=>e.json());
                setUserInfo(updates[0]);
                setCognito(1);
                setUser(data.accessToken.payload.username)
            }else{
                setCognito(0);
                setUser(0);
            };
            // const res = await fetch(fetchURL+`/aws/${user}`).then(e=>e.json());
        })();
    },[user]);

    return(
        <NewValContext.Provider value={[rule, setRule, goodList, tag, post.map(e=>e.url), setUser, user, setCognito]}>
            { cognito === 0
            ?<Login/>
            :<>
                {load && <Loading />}
                <NewHeader src={src}/>
                <main className="new-main">
                    <Navvar />
                    {cognito === 2 &&
                    <section className="new-content-area">
                        {viewArray.map((e) => 
                            <React.Fragment key={e.id} >
                                {modify.id !== 0 && <NewModal modify={modify} setModify={setModify}/>}
                                <Card key={e.id} arr={e} setModify={setModify} setLoad={setLoad}/>
                            </React.Fragment>
                        )}
                    </section>
                    }
                    {cognito === 1 &&
                    <section className="new-profile-area">
                        <section className="profile-left">
                            <figure>
                            {src !== "" 
                                ? <img src={`data:image/png;base64,${src}`} alt="profile"/>
                                : <img src="./systemImages/else.png" alt="profile" />}
                                <FontAwesomeIcon className="profile-photo-icon" icon={faCamera} />
                            </figure>
                        </section>
                        <section className="profile-right">
                            <article>
                                <h3><FontAwesomeIcon className="profile-update" icon={faRotate} />基本情報の更新</h3>
                                <div>
                                    <div className="profile-name-area">
                                        <div>
                                            <p>first name</p>
                                            <input type="text" name="first-name" value={userInfo["first-name"]} onChange={handler} />
                                        </div>
                                        <div>
                                            <p>last name</p>
                                            <input type="text" name="last-name" value={userInfo["last-name"]} onChange={handler}/>
                                        </div>
                                    </div>
                                    <p>Mail</p>
                                    <input type="text" name="mail" value={userInfo.mail} onChange={handler}/>
                                    <p>Personality</p>
                                    <div className="personality-area">
                                        {userInfo["16id"]
                                        ? <img id={"#"+String(userInfo["16id"])} src={`./systemImages/${userInfo["16id"]}.png`} alt="persona" />
                                        : <img src="./systemImages/else.png" alt="profile" />}

                                        <input type="checkbox" id="check_input" defaultChecked style={{display:"none"}}/>
                                        <label id="check_btn" htmlFor="check_input">
                                            <FontAwesomeIcon style={{padding:"0.5vw", margin:"0 0.5vw",borderRadius:"5px",backgroundColor:"gray"}} icon={faAnglesLeft} />
                                        </label>
                                        {[...Array(16)].map((e,ind)=>ind+1).map(e => {
                                                return <img key={"#"+String(e)} id={String(e)} src={`./systemImages/${String(e)}.png`} alt="persona" 
                                                onClick={(e:any) => setUserInfo(prev=>({...prev,"16id":Number(e.target.id)}))} className={userInfo["16id"] === Number(e) ? "persona-icon icon-green" :"persona-icon"} />
                                        })}
                                    </div>
                                </div>
                            </article>
                            <article>
                                <h3><FontAwesomeIcon className="profile-update" icon={faRotate} />パスワードの変更</h3>
                                <div>
                                    <p>NEW Password</p>
                                    <input type="password" name="confirm1" />
                                    <p>NEW Password (Confirm)</p>
                                    <input type="password" name="confirm1" />
                                </div>
                            </article>
                        </section>

                    </section>
                    }
                </main>
                {}
            </>
            }

        </NewValContext.Provider>
    )
}
