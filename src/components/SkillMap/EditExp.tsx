import { useContext, useState } from "react"
import "./EditSkill.css"
import { VariableContext } from "../../App";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

type props ={
    setEditFlag:React.Dispatch<React.SetStateAction<number>>,
}

export default function EditExp({setEditFlag}:props){
    const [newExp, setNewExp] = useState({experience:"", period:"", confidence:1})
    const [, , , , , userData, setUserData] = useContext(VariableContext);

    const updates = (e:any) => {
        setNewExp({...newExp,[e.currentTarget.name]:e.currentTarget.value})
    }

    const skillSubmmit = async () => {
        const res = await fetch(fetchURL+`/explain`, {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...newExp,"user-id":userData["user-id"]})}).then(e=>e.json());
        setUserData(res);
        setEditFlag(0);
    }
    
    return (
      <div className="popUpBack3">
        <section>
            <h1>🦀Add New Explain🦀</h1>
            <input type="text" name="experience" placeholder="experience" onChange={(e:any)=>{updates(e)}}/>
            <input type="text" name="period" placeholder="period" onChange={(e:any)=>{updates(e)}}/>
            <input type="number" name="confidence" min="1" max="5" placeholder="min 1 ~ max 5" onChange={(e:any)=>{updates(e)}} required/>
            {/* ボタン */}
            <div className="buttonArea">
              <button onClick={skillSubmmit}>UPDATE</button>
              <button onClick={()=>{setEditFlag(0)}}>CLOSE</button>
            </div>
        </section>
      </div>
    )
}