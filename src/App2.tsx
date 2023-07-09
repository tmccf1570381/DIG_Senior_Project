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
import { faCamera, faRotate, faAnglesRight, faImage, faCircleUser, faKey } from "@fortawesome/free-solid-svg-icons";
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
    const [upload, setUpload] = useState();
    const [preview, setPreview] = useState<string | null | undefined>(undefined);

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

    const prevfile = async (e:any) => {
        const reader = new FileReader();
        setUpload(e.target.files[0]);
        await reader.readAsDataURL(e.target.files[0])
        reader.onload =  (E:any) => {
            setPreview(E.target.result);
        }
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
        const key = new RegExp("[A-Z]");
        const user = await Auth.currentAuthenticatedUser().then(e=>e).catch(err=>err);
        console.log(user);
        if(newPass[1].length < 6){
            alert("パスワードは６文字以上にしてください")
          }else if(!key.test(newPass[1])){
            alert("パスワードには大文字を１文字以上設定してください")
          }else{
            try{
                await Auth.changePassword(user, newPass[0], newPass[1]);
                alert(`パスワードが${newPass[1]}に変更されました`)
                setNewPass(["",""]);
            }catch(error){
                alert(error)
            }
          }

        setLoad(false);
    }

    const uploadPict = async () => {
        const file:any = upload
        const readers = new FileReader()
        readers.readAsDataURL(file)
        readers.onload = async () => {
            const data = await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/s3", {method: "POST", mode: 'cors', headers: {'Content-Type': 'image/png'},
            body: JSON.stringify({file:readers.result,user:user})}).then(e=>e.json());
            console.log(data);
            data.status === 1 && alert("プロフィール画像を更新しました。ページを再読み込みしてください。")
        };
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
        setLoad(true);
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
        setLoad(false);
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
                        <div>
                            <h2 style={{fontSize:"3vmin",margin:"0",marginBottom:"2vh"}}>ユーザー情報の変更</h2>
                            <section className="profile-row">
                                <div className="profile-row-head">
                                    <FontAwesomeIcon className="profile-update" style={{color:"white"}} icon={faImage} />
                                </div>
                                <figure className="profile-photo-before">
                                {src !== "" 
                                    ? <img src={`data:image/png;base64,${src}`} alt="profile"/>
                                    : <img src="./systemImages/else.png" alt="profile" />}
                                    <input type="file" id="files" accept="image/png" style={{display:"none"}} onChange={prevfile}/>
                                    <label className="profile-photo-icon" htmlFor="files"><FontAwesomeIcon icon={faCamera} /></label>
                                </figure>
                                <FontAwesomeIcon icon={faAnglesRight} style={{width:"15%", fontSize:"5vmin"}} />
                                <figure className="profile-photo-after">
                                    {preview
                                        ? <img src={preview} alt="profile"/>
                                        : <img src="./systemImages/else.png" alt="profile" />
                                    }
                                </figure>
                                <div style={{width:"10%"}}></div>
                                <div className="profile-photo-button">
                                    <button className={upload !== undefined ? "" : "hidden-butto"} onClick={uploadPict}><FontAwesomeIcon className="profile-update" icon={faRotate}/></button>
                                </div>
                            </section>
                            <section className="profile-row">
                                <div className="profile-row-head">
                                    <FontAwesomeIcon className="profile-update" style={{color:"white"}} icon={faCircleUser} />
                                </div>
                                <div className="profile-password-area">
                                    <div>
                                        <div>
                                            <h3>First Name</h3>
                                            <input type="text" name="first-name" value={userInfo["first-name"]} onChange={handler}/>
                                        </div>
                                        <div>
                                            <h3>Last Name</h3>
                                            <input type="text" name="last-name" value={userInfo["last-name"]} onChange={handler}/>
                                        </div>
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <div style={{width:"100%"}}>
                                            <h3>Mail</h3>
                                            <input type="text" name="mail" style={{width:"84%",paddingLeft:"2%"}} value={userInfo.mail} onChange={handler}/>
                                        </div>
                                    </div>
                                    <h3>Personality</h3>
                                    <select name="16id" id="doctype" value={userInfo["16id"]}  onChange={(e)=>{setUserInfo(prev => ({...prev, [e.target.name]:Number(e.target.value)}))}} >
                                        <option value="0">-- choose one --</option>
                                        <option value="1">建築家</option>
                                        <option value="2">論理学者</option>
                                        <option value="3">指揮官</option>
                                        <option value="4">討論者</option>
                                        <option value="5">提唱者</option>
                                        <option value="6">仲介者</option>
                                        <option value="7">主人公</option>
                                        <option value="8">運動家</option>
                                        <option value="9">管理者</option>
                                        <option value="10">擁護者</option>
                                        <option value="11">幹部</option>
                                        <option value="12">領事</option>
                                        <option value="13">巨匠</option>
                                        <option value="14">冒険家</option>
                                        <option value="15">起業家</option>
                                        <option value="16">エンターテイナー</option>
                                    </select>
                                    {(userInfo["16id"]!== undefined && userInfo["16id"]!== 0)
                                    ? <img src={`./systemImages/${userInfo["16id"]}.png`} className="personal-icon" alt="profile" />
                                    : <img src="./systemImages/else.png" className="personal-icon" alt="profile" />}
                                </div>
                                <div className="profile-photo-button">
                                    <button onClick={UpdataUserInfo}><FontAwesomeIcon className="profile-update" icon={faRotate} /></button>
                                </div>
                            </section>
                            <section className="profile-row">
                                <div className="profile-row-head">
                                    <FontAwesomeIcon className="profile-update" style={{color:"white"}} icon={faKey} />
                                </div>
                                <div className="profile-password-area">
                                    <h3>Current Password</h3>
                                    <input type="password" value={newPass[0]} name="confirm1" onChange={e=>setNewPass(prev=>[e.target.value,prev[1]])} />
                                    <h3>NEW Password✨</h3>
                                    <input type="password" value={newPass[1]} name="confirm2" onChange={e=>setNewPass(prev=>[prev[0], e.target.value])}/>
                                </div>
                                <div className="profile-photo-button">
                                    <button onClick={ChangePassword}><FontAwesomeIcon className="profile-update" icon={faRotate} /></button>
                                </div>
                            </section>
                        </div>
                    </section>
                    }
                </main>
                {}
            </>
            }

        </NewValContext.Provider>
    )
}
