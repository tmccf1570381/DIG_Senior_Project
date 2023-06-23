import React, { useEffect, useState } from "react";
import "./App.css";
import Main from './Main.tsx';
import Login from "./components/Login";
// const fetchURL = process.env.NODE_ENV === "production" ? "http://dig-alb-3456-1025820283.us-east-1.elb.amazonaws.com:3456" : "http://localhost:3456";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

type props={
  postedArray:
  {id:number,title:string,"post-date":string,tag:string,url:string,pict:string,"p-user-id":number,"zamas":number,"first-name":string ,"last-name":string, review:string[]}[],
  userData:
  {"user-id":number,"first-name":string,"last-name":string, record: number[]}[],
  props:[
  popup:boolean,
  setPopup:React.Dispatch<React.SetStateAction<boolean>>,
  postedArray:props["postedArray"],
  setPostedArray:React.Dispatch<React.SetStateAction<props["postedArray"]>>,
  tagArray:string[],
  userData:props["userData"],
  setUserData:React.Dispatch<React.SetStateAction<props["userData"]>>
]};
export const VariableContext = React.createContext<props["props"]>([false, ()=>{}, [], ()=>{}, [], [], ()=>{}]);

export default function App() {
  const [postedArray, setPostedArray] = useState([{id:0,title:"","post-date":"",tag:"",url:"",pict:"","p-user-id":0,"zamas":0,"first-name":"test" ,"last-name":"test",review:[""]}]);
  const [userData, setUserData] = useState([{"user-id":0,"first-name":"dummy","last-name":"yummy",record:[0]}]);
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
      {userData[0]["user-id"] === 0  
      ? <Login />
      : <Main />
    }
    </VariableContext.Provider>
    </>
  )
}
