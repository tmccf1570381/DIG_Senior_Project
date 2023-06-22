/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import UpperHead from "./Header/UpperHead";
import LowerHead from "./Header/LowerHead";
import { VariableContext } from "../App";
const fetchURL = process.env.NODE_ENV === "production" ? "http://dig-alb-3456-1025820283.us-east-1.elb.amazonaws.com:3456" : "http://localhost:3456";


export default function Header () {
  const [condition, setCondition] = useState({fil: "", order :"desc", keyWord: ""});
  const [, , , setPostedArray, , , ] = useContext(VariableContext);

  useEffect(()=>{
    (async () => {
      let fetchData = await fetch(fetchURL+"/posted").then(e=>e.json());
      let key = new RegExp(condition.keyWord.toLocaleLowerCase());
      let data = fetchData.filter((e:any)=> key.test(e.title.toLocaleLowerCase())||key.test(e.tag.toLocaleLowerCase()));
      if (condition.fil !== "") {
          let newData = data.filter((e:{tag:string}) => e.tag === condition.fil);
          condition.order === "asc" && newData.reverse();
          setPostedArray(newData);
          newData = null;
      }else{
          condition.order === "asc" && data.reverse();
          setPostedArray(data);
      };
      fetchData = null;
      data = null;
    })();
  },[condition]);

  return (
    <header>
      <img src="./systemImages/zamas.png" alt="zamas" className="zamas" />
      <UpperHead condition={condition} setCondition={setCondition}/>
      <LowerHead condition={condition} setCondition={setCondition}/>
    </header>
  );
};
