import { useContext, useState } from "react"
import "./EditSkill.css"
import { VariableContext } from "../../App";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas-463310277.us-east-1.elb.amazonaws.com:3456" : "http://localhost:3456";

type props ={
    setEditFlag:React.Dispatch<React.SetStateAction<number>>,
    setSkill:React.Dispatch<React.SetStateAction<any>>
}

export default function EditSkill({setEditFlag, setSkill}:props){
    const [newSkill, setNewSkill] = useState({skill:"",date:"",comment:""})
    const [, , , , , userData, ] = useContext(VariableContext);

    const updates = (e:any) => {
        setNewSkill({...newSkill,[e.currentTarget.name]:e.currentTarget.value})
    }

    const skillSubmmit = async () => {
        const res = await fetch(fetchURL+`/new-skill`, {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...newSkill,"user-id":userData[0]["user-id"]})}).then(e=>e.json());
        console.log(res);
        setSkill(res);
        setEditFlag(0);
    }
    
    return (
      <div className="popUpBack">
        <section>
            <h1>✨Add New Skill✨</h1>
            {/* 資格名 */}
            <input list="tags" name="skill" placeholder="certification" onChange={(e:any)=>{updates(e)}}/>
            <datalist id="tags">
              <option value="dummy"></option>
              <option value="dummy2"></option>
              <option value="dummy3"></option>
            </datalist>
            {/* 合格日*/}
            <input type="date" name="date" placeholder="date of announcement" onChange={(e:any)=>{updates(e)}} required/>
            {/* コメント */}
            <input type="text" name="comment" placeholder="comment" onChange={(e:any)=>{updates(e)}}/>
            {/* ボタン */}
            <div className="buttonArea">
              <button onClick={skillSubmmit}>UPDATE</button>
              <button onClick={()=>{setEditFlag(0)}}>CLOSE</button>
            </div>
        </section>
      </div>
    )
}