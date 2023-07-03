import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faStar, } from "@fortawesome/free-solid-svg-icons";

export default function Ranking(){
    return (
        <>
        <article className="ranking">
            <figure className="ranking-icon">
                <img src="./systemImages/edit.png" alt="" />
            </figure>
            <div className="ranking-front">
                <h3>Name</h3>
                <h5>team</h5>
            </div>
            <div className="ranking-back">
                <FontAwesomeIcon icon={faStar}/>
                <h3>×１０</h3>
            </div>
        </article>
        </>
    )
}