import React, { useEffect, useState } from "react";
import "./App.css";
import Main from './Main.tsx';
import Login from "./components/Login";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

type props={
  postedArray:
  {id:number,title:string,"post-date":string,tag:string,url:string,"user-id":number,"zamas":number,"first-name":string ,"last-name":string, review:string[]}[],
  userData:
  {"user-id":number, "first-name":string, "last-name":string,skill:{skill:string,date:string,level:number}[],explain:{experience:string,period:string,confidence:number}[],career:{career: string, "date-c": string}[],"16person":string,supple:string,team:string,role:string},
  props:[
  popup:boolean,
  setPopup:React.Dispatch<React.SetStateAction<boolean>>,
  postedArray:props["postedArray"],
  setPostedArray:React.Dispatch<React.SetStateAction<props["postedArray"]>>,
  tagArray:string[],
  userData:props["userData"],
  setUserData:React.Dispatch<React.SetStateAction<props["userData"]>>
]};
export const VariableContext = React.createContext<props["props"]>([false, ()=>{}, [], ()=>{}, [], 
{"user-id":0,"first-name":"string","last-name":"string",skill:[{skill:"",date:"",level:0}],explain:[{experience:"",period:"",confidence:0}],career:[{career: "", "date-c": ""}],"16person":"",supple:"",team:"",role:""}, ()=>{}]);

export default function App() {
  const [postedArray, setPostedArray] = useState([{id:0,title:"","post-date":"",tag:"",url:"","user-id":0,"zamas":0,"first-name":"test" ,"last-name":"test",review:[""]}]);
  const [userData, setUserData] = useState({"user-id":0,"first-name":"","last-name":"",skill:[{skill:"",date:"",level:0}],explain:[{experience:"",period:"",confidence:0}],career:[{career: "", "date-c": ""}],"16person":"",supple:"",team:"",role:""});
  const [tagArray, setTagArrat] = useState([""])
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const postdata = await fetch(fetchURL+"/posted").then(e=>e.json());
      setPostedArray(postdata);
      const tagArray = postdata.filter((e:any)=> e.tag !== "").map((e:any)=>e.tag)//;
      setTagArrat(tagArray.filter((e:any, ind:number) => tagArray.indexOf(e) === ind));
    };
    getData();
  }, []);

  return (
    <>
    <VariableContext.Provider value={[popup, setPopup, postedArray, setPostedArray, tagArray, userData, setUserData]}>
      {userData["user-id"] === 0  
      ? <Login />
      : <Main />
    }
    </VariableContext.Provider>
    </>
  )
}
