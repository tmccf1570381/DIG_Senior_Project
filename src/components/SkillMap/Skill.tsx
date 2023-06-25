import { useContext } from "react";
import { VariableContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

type props ={
    setEditFlag:React.Dispatch<React.SetStateAction<number>>
}

// const deleteSkill = async(skills:props["skills"],ind:number)=>{
//     const res = await fetch(fetchURL+"/skill", {method: "DELETE", headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({"user-id":skills["user-id"],skill:skills.skill[ind].skill})}).then(e=>e.json());
//     console.log(res)
// }

export default function Skill ({setEditFlag}:props){
    const [, , , , , userData, ] = useContext(VariableContext);

    return (
        <section className="right">        
        <article>
            <h2>
                Experience
                <FontAwesomeIcon className="skillEdit" icon={faPen} onClick={()=>{setEditFlag(1)}} />
            </h2>
            <div className="skillTable">
                <div className="skillhead">
                    <span>開発経験</span>
                    <span>自信</span>
                    <span>経験年数</span>
                </div>
                {userData.explain.map((e, ind)=>(
                <div key={ind}>
                    <span><li>{e.experience}</li></span>
                    <span style={{textAlign:"center"}}>{"🦀".repeat(e.confidence)}</span>
                    <span style={{textAlign:"center"}}>{e.period}</span>
                    <div className={String(ind)}  onClick={(e)=>{}}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            ))}
            </div>
        </article>

        <article>
            <h2>
            Certification
            <FontAwesomeIcon className="skillEdit" icon={faPen} onClick={()=>{setEditFlag(1)}} />
            </h2>
            <div className="skillTable">
                <div className="skillhead">
                    <span>資格名</span>
                    <span>難易度</span>
                    <span>取得日</span>
                </div>
                {userData.skill.map((e, ind)=>(
                <div key={ind}>
                    <span><li>{e.skill}</li></span>
                    <span style={{textAlign:"center"}}>{"💙".repeat(e.level)}</span>
                    <span style={{textAlign:"center"}}>{e.date}</span>
                    <div className={String(ind)}  onClick={(e)=>{}}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            ))}
            </div>
        </article>
        </section>
    )
}