import Navvar from "./Navvar";
import NewHeader from "./NewHeader";
import Card from "./Card";
import React, { useEffect, useState, createContext } from "react";
import Login from "./Login";
import NewModal from "./NewModal";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

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
    ]
};
export const NewValContext = createContext<props["prop"]>([{keyword : "", tag :"", doc :"", favorite :false, own:false, zamas: false}, ()=>{}, [], [[],[]], [], ()=>{},0]);

export default function App2(){
    const [post, setPost] = useState([{id:0,title:"","post-date":"",tag:"",url:"","user-id":0,"zamas":0,"first-name":"test" ,"last-name":"test",review:[""],doctype:""}]);
    const [viewArray, setViewArray] = useState(post);
    const [rule, setRule] = useState({keyword :"", tag :"", doc :"", favorite :false, own :false, zamas: false});
    const [goodList ,setGoodList] = useState([0]);
    const [tag, setTag] = useState([[],[]]);
    const [user, setUser] = useState(0);
    const [modify ,setModify] = useState(post[0])

    const sortFunc = (arr:any) => {
        let key = new RegExp(rule.keyword.toLocaleLowerCase());
        arr = rule.keyword === "" 
        ? arr : arr.filter((e:any)=> key.test(e.title.toLocaleLowerCase())||key.test(e.tag.toLocaleLowerCase())||key.test(e.review[0].toLocaleLowerCase()));
        arr = rule.tag === "" ? arr : arr.filter((e:any) => e.tag === rule.tag);
        arr = rule.doc === "" ? arr : arr.filter((e:any)  => e.doctype === rule.doc);
        arr = rule.own !== true ? arr : arr.filter((e:any) => e["user-id"] === user);
        arr = rule.favorite !== true ? arr : arr.filter((e:any) => goodList.indexOf(e.id)!==-1);
        setViewArray(arr);
    }

    useEffect(()=>{
        (async () => {
            let sortArray = await fetch(fetchURL+"/posted").then((e) => e.json()).catch(() => false);
            const tagArray = sortArray.map((e:props["post"])=>e.tag);
            const tags = [...new Set(tagArray)].reduce((init,val)=>{return {...init as {}, [String(val)]:tagArray.filter((i:any)=>i===val).length}}, {})
            setTag([Object.keys(tags as {}) as [],Object.values(tags as {})]);
            setPost(sortArray);
            sortFunc(sortArray);
            const zamas:any = await fetch(fetchURL+`/good/${user}`).then((e) => e.json()).catch(() => false);
            setGoodList(zamas.favorite);
        })();
    },[rule.zamas,user]);

    useEffect(()=>{
        let sortArray = [...post];
        sortFunc(sortArray)
    },[rule])

    return(
        <NewValContext.Provider value={[rule, setRule, goodList, tag, post.map(e=>e.url), setUser, user]}>
            { user===0
            ?<Login/>
            :<>
                {}
                <NewHeader />
                <main className="new-main">
                    <Navvar />
                    <section className="new-content-area">
                        {viewArray.map((e) => 
                            <React.Fragment key={e.id} >
                                {modify.id !== 0 && <NewModal modify={modify} setModify={setModify}/>}
                                <Card key={e.id} arr={e} setModify={setModify}/>
                            </React.Fragment>
                        )}
                    </section>
                </main>
            </>
            }
        </NewValContext.Provider>
    )
}