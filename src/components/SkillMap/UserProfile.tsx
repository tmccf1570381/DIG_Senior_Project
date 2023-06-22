import { useState } from "react";

type props ={
    skills:{
    "user-id":number, 
    "first-name":string, 
    "last-name":string,
    skill:{skill:string,date:string}[],
    "16person":string,
    "team":string,
    "position":string,}
}

export default function UserProfile({skills}:props){
    const [cont, setCont] = useState("career")
    return(
        <section className="left">
            <figure>
                <img src="./systemImages/hoshi52.png" alt="profile" />
                <h2>{`${skills["first-name"]} ${skills["last-name"]}`}</h2>
            </figure>
            <table>
                <tbody>
                    <tr>
                        <th>🖌️ post</th>
                        <td>3</td>
                        <th>⭐️</th>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
            <div>
                {/* <h3>~team~</h3>
                <p>{skills["team"]}</p>
                <h3>~position~</h3>
                <p>{skills["position"]}</p>
                <h3>~16Personalities~</h3>
                <p>{skills["16person"]}</p> */}

                <nav className="profhead">
                    <label>
                        <input name="a1" id="career" style={{display:"none"}} type="radio" onChange={e=>setCont(e.target.id)} defaultChecked={true}/>
                        <p>career</p>
                    </label>
                    <label>
                        <input name="a1" id="position" style={{display:"none"}} type="radio" onChange={e=>setCont(e.target.id)}/>
                        <p>position</p>
                    </label>
                    <label>
                        <input name="a1" id="character" style={{display:"none"}} type="radio" onChange={e=>setCont(e.target.id)}/>
                        <p>character</p>
                    </label>
                </nav>
                <article>
                    {
                        (()=>{
                            switch(cont){
                                case "career":
                                    return <li>{skills["team"]}</li>
                                case "position":
                                    return skills["position"]
                                case "character":
                                    return skills["16person"]
                            }
                        })()
                    }
                </article>

            </div>
        </section>
    );
}