/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Navigation from "./Header/Navigation";
import UpperHead from "./Header/UpperHead";
import LowerHead from "./Header/LowerHead";
import { VariableContext } from "../App";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


export default function Header ({page, setPage}:{page:number, setPage:React.Dispatch<React.SetStateAction<number>>}) {
  const [condition, setCondition] = useState({fil: "", order: true, favorite: false, keyWord: ""});
  const [, , , setPostedArray, , userData, ] = useContext(VariableContext);

  useEffect(()=>{
    (async () => {
      let fetchData = await fetch(fetchURL+"/posted").then(e=>e.json());
      let key = new RegExp(condition.keyWord.toLocaleLowerCase());
      let data = fetchData.filter((e:any)=> key.test(e.title.toLocaleLowerCase())||key.test(e.tag.toLocaleLowerCase()));
      let favorite = await fetch(fetchURL+`/good/${userData["user-id"]}`).then(e=>e.json());
      data = condition.favorite ? data.filter((e:any) => favorite.favorite.indexOf(e.id) !== -1) :data;
      
      if (condition.fil !== "") {
          let newData = data.filter((e:{tag:string}) => e.tag === condition.fil);
          condition.order === true && newData.reverse();
          setPostedArray(newData);
          newData = null;
      }else{
          condition.order === true && data.reverse();
          setPostedArray(data);
      };
      fetchData = null;
      data = null;
    })();
  },[condition]);

  return (
    <header>
      <Navigation setPage={setPage} />
      {page === 1 && <UpperHead condition={condition} setCondition={setCondition}/>}
      {page === 1 && <LowerHead condition={condition} setCondition={setCondition}/>}
    </header>
  );
};
