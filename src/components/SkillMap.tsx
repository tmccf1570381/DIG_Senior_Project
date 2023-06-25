/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./SkillMap.css"
import EditSkill from "./SkillMap/EditSkill.tsx";
import EditExp from "./SkillMap/EditExp.tsx";
import UserProfile from "./SkillMap/UserProfile.tsx";
import Skill from "./SkillMap/Skill.tsx";

export default function SkillMap() {
    const [editFlag, setEditFlag] = useState(0); 

    return (
      <>
        {editFlag === 1 && <EditSkill setEditFlag={setEditFlag} />}
        {editFlag === 2 && <EditExp setEditFlag={setEditFlag} />}
        <div className="container">
          {/* // 左側コンテンツ */}
          <UserProfile />
          {/* // 右側コンテンツ */}
          <Skill setEditFlag={setEditFlag}/>
        </div>
      </>
    );
}
