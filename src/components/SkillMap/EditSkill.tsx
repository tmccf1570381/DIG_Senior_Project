import { useContext, useState } from "react"
import "./EditSkill.css"
import { VariableContext } from "../../App";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

type props ={
    setEditFlag:React.Dispatch<React.SetStateAction<number>>,
}

export default function EditSkill({setEditFlag}:props){
    const [newSkill, setNewSkill] = useState({"skill-cd":0,date:""})
    const [, , , , , userData, setUserData ] = useContext(VariableContext);

    const updates = (e:any) => {
        setNewSkill({...newSkill,[e.currentTarget.name]:e.currentTarget.value})
    }

    const skillSubmmit = async () => {
        const res = await fetch(fetchURL+`/new-skill`, {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...newSkill,"user-id":userData["user-id"]})}).then(e=>e.json());
        setUserData(res);
        setEditFlag(0);
    }
    
    return (
      <div className="popUpBack">
        <section>
            <h1>✨Add New Skill✨</h1>
            {/* 資格名 */}
            <input list="tags" name="skill-cd" placeholder="certification" onChange={(e:any)=>{updates(e)}}/>
            <datalist id="tags">
              <option value="10"></option>
              <option value="11"></option>
              <option value="12"></option>
            </datalist>
            {/* 合格日*/}
            <input type="date" name="date" placeholder="date of announcement" onChange={(e:any)=>{updates(e)}} required/>
            {/* ボタン */}
            <div className="buttonArea">
              <button onClick={skillSubmmit}>UPDATE</button>
              <button onClick={()=>{setEditFlag(0)}}>CLOSE</button>
            </div>
        </section>
      </div>
    )
}