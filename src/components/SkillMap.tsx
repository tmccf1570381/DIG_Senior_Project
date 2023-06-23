/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./SkillMap.css"
import EditSkill from "./SkillMap/EditSkill.tsx";
import UserProfile from "./SkillMap/UserProfile.tsx";
import Skill from "./SkillMap/Skill.tsx";
import { VariableContext } from "../App.tsx";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


export default function SkillMap() {
    const [, , , , , userData, ] = useContext(VariableContext);
    const [skill, setSkill] = useState({"user-id":0, "first-name":"","last-name":"",skill:[{skill:"",date:""}],"16person":"","team":"","position":"",})
    const [editFlag, setEditFlag] = useState(0); 
    
    useEffect(()=>{
      (async () =>{
        // const data = await fetch(fetchURL+`/user-list/${10004}`).then(e=>e.json());
        const data = await fetch(fetchURL+`/user-list/${userData[0]["user-id"]}`).then(e=>e.json());
        setSkill(data);
      })();
    },[]);

    return (
      <>
        {editFlag===1 && <EditSkill setEditFlag={setEditFlag} setSkill={setSkill}/>}
        <div className="container">
          {/* // 左側コンテンツ */}
          <UserProfile skills={skill}/>
          {/* // 右側コンテンツ */}
          <Skill skills={skill} setEditFlag={setEditFlag}/>
        </div>
      </>
    );
}
