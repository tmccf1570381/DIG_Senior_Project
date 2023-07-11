import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faStar, } from "@fortawesome/free-solid-svg-icons";

export default function Ranking({e,ind}:{ind:number,e:{"user-id": number, "first-name": string, "last-name": string, zamas: number, src:string}}){
    return (
        <>
        <article className="ranking">
            <div className="ranking-front">
                <h3>{`第${ind+1}位`}</h3>
                <FontAwesomeIcon className="star-icon" icon={faStar}/>
                <h4>×{`${e.zamas}`}</h4>
            </div>
            <div className="ranking-back">
                <figure className="ranking-icon">
                    {e.src !== ""
                    ?<img src={`data:image/png;base64,${e.src}`} alt="icon" />
                    :<img src="./systemImages/edit.png" alt="icon" />
                    }
                </figure>
                <h3>{`${e["first-name"]} ${e["last-name"]}`}</h3>
            </div>
        </article>
        </>
    )
}