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
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
        setSrc:React.Dispatch<React.SetStateAction<string>>,
        setUserInfo:React.Dispatch<React.SetStateAction<{"user-id": number, "first-name": string,"last-name": string,"mail": string,"16id": number,"role": string}>>,
    ]
};
export const NewValContext = createContext<props["prop"]>([{keyword : "", tag :"", doc :"", favorite :false, own:false, zamas: false}, ()=>{}, [], [[],[]], [], ()=>{}, 0, ()=>{}, ()=>{}, ()=>{}]);

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
    const [userInfo, setUserInfo] = useState({"user-id": 0, "first-name": "","last-name": "","mail": "","16id": 0,"role": ""});
    const [newPass, setNewPass] = useState(["",""]);
    const [upload, setUpload] = useState()
    
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
        setLoad(true);
        try{
            await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/updates", {method: "POST", mode: 'cors', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)});
            alert("ユーザー情報が更新されました")
        }catch(error){
            alert(error)
        }
        setLoad(false);
    }

    const ChangePassword = async () => {
        setLoad(true);
        const user = await Auth.currentAuthenticatedUser().then(e=>e).catch(err=>err);
        console.log(user);
        try{
            await Auth.changePassword(user, newPass[0], newPass[1]);
            alert(`パスワードが${newPass[1]}に変更されました`)
            setNewPass(["",""]);
        }catch(error){
            alert(error)
        }
        setLoad(false);
    }

    const uploadPict = async () => {
        const s3 = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'AKIA25NICGAUOIATSRLE',
                secretAccessKey:'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'
            }
      });
      s3.send(
        new PutObjectCommand({
             Bucket: 'dig-zamas-prof',
             Key: '10046.png',
             Body: upload,
             ContentType: 'image/png',
        })).catch(e=>e);
    };

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
        })();
    },[]);

    return(
        <NewValContext.Provider value={[rule, setRule, goodList, tag, post.map(e=>e.url), setUser, user, setCognito, setSrc, setUserInfo]}>
            { cognito === 0
            ?<Login/>
            :<>
                {load && <Loading />}
                <NewHeader src={src}/>
                <main className="new-main">
                    <Navvar />
                    {cognito === 1 &&
                    <section className="new-content-area">
                        {viewArray.map((e) => 
                            <React.Fragment key={e.id} >
                                {modify.id !== 0 && <NewModal modify={modify} setModify={setModify}/>}
                                <Card key={e.id} arr={e} setModify={setModify} setLoad={setLoad}/>
                            </React.Fragment>
                        )}
                    </section>
                    }
                    {cognito === 2 &&
                    <section className="new-profile-area">
                        <section className="profile-left">
                            <figure>
                            {src !== "" 
                                ? <img src={`data:image/png;base64,${src}`} alt="profile"/>
                                : <img src="./systemImages/else.png" alt="profile" />}
                                <input type="file" id="files" accept="image/png" style={{display:"none"}} onChange={(e:any)=> setUpload(e.target.files[0])}/>
                                <label className="profile-photo-icon" htmlFor="files"><FontAwesomeIcon icon={faCamera} /></label>
                            </figure>
                            <button onClick={uploadPict}>test</button>
                        </section>
                        <section className="profile-right">
                            <article>
                                <h3><FontAwesomeIcon className="profile-update" icon={faRotate} onClick={UpdataUserInfo} />基本情報の更新</h3>
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
                                            <FontAwesomeIcon style={{padding:"0.5vw", margin:"0 0.5vw",borderRadius:"5px",backgroundColor:"gray",color:"white"}} icon={faAnglesLeft} />
                                        </label>
                                        {[...Array(16)].map((e,ind)=>ind+1).map(e => {
                                                return <img key={"#"+String(e)} id={String(e)} src={`./systemImages/${String(e)}.png`} alt="persona" 
                                                onClick={(e:any) => setUserInfo(prev=>({...prev,"16id":Number(e.target.id)}))} className={userInfo["16id"] === Number(e) ? "persona-icon icon-green" :"persona-icon"} />
                                        })}
                                    </div>
                                </div>
                            </article>
                            <article>
                                <h3><FontAwesomeIcon className="profile-update" icon={faRotate} onClick={ChangePassword} />パスワードの変更</h3>
                                <div>
                                    <p>Current Password</p>
                                    <input type="password" value={newPass[0]} name="confirm1" onChange={e=>setNewPass(prev=>[e.target.value,prev[1]])} />
                                    <p>NEW Password</p>
                                    <input type="password" value={newPass[1]} name="confirm2" onChange={e=>setNewPass(prev=>[prev[0], e.target.value])}/>
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
