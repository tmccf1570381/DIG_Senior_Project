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
                                    return (
                                        <>
                                        <h3>異動歴⇨</h3>
                                        <li className="listcont">{"2023/04 デジタル変革推進室"}</li>
                                        <li className="listcont">{"2020/04 品質保証部"}</li>
                                        <li className="listcont">{"2019/04 コーポレートIT部"}</li>
                                        </>
                                    )
                                case "position":
                                    return(
                                        <>
                                        <h3>{skills["position"]}</h3>
                                        </>
                                    )
                                case "character":
                                    return (
                                        <>
                                            <h3 style={{marginBottom:"1vh"}}>{skills["16person"]}</h3>
                                            <hr />
                                            <p style={{margin:"0",backgroundColor:"lightgray"}}>何かを成し遂げようとしている時、ルールなどない！</p>
                                            <hr />
                                            <a href="https://www.16personalities.com/ja/%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD%E3%83%86%E3%82%B9%E3%83%88" target="_blank" rel="noreferrer">
                                                <img src="https://www.16personalities.com/static/images/system/logo.svg" style={{maxWidth:"80%",marginTop:"1.5vh",}} alt="test" />
                                            </a>
                                        </>
                                    )
                            }
                        })()
                    }
                </article>

            </div>
        </section>
    );
}