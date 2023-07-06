import Navvar from "./components/Navvar";
import "./App.css"
import NewHeader from "./components/NewHeader";
import Card from "./components/Card";
import React, { useEffect, useState, createContext } from "react";
import Login from "./components/Login";
import NewModal from "./components/NewModal";
import { Amplify, Auth } from 'aws-amplify';
import Loading from "./components/Loading";
// const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

// React hooks
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

    useEffect(()=>{
        let sortArray = [...post];
        sortFunc(sortArray)
    },[rule]);

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
                setCognito(1);
                setUser(data.accessToken.payload.username)
            }else{
                setCognito(0);
                setUser(0);
            }
        })()
    },[]);

    return(
        <NewValContext.Provider value={[rule, setRule, goodList, tag, post.map(e=>e.url), setUser, user, setCognito]}>
            { cognito === 0
            ?<Login/>
            :<>
                {load && <Loading />}
                <NewHeader />
                <main className="new-main">
                    <Navvar />
                    <section className="new-content-area">
                        {viewArray.map((e) => 
                            <React.Fragment key={e.id} >
                                {modify.id !== 0 && <NewModal modify={modify} setModify={setModify}/>}
                                <Card key={e.id} arr={e} setModify={setModify} setLoad={setLoad}/>
                            </React.Fragment>
                        )}
                    </section>
                </main>
            </>
            }

        </NewValContext.Provider>
    )
}