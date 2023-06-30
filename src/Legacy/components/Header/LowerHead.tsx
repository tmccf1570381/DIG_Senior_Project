import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSort, faSliders, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { VariableContext } from "../../App";

export default function LowerHead(){
    const [, setPopup, , , tagArray, , , , , condition, setCondition ] = useContext(VariableContext);

    return(
      <section>
        {/* タグフィルタ */}
        <label className="icon">
            <FontAwesomeIcon icon={faSliders}/>
        </label>
        <select id="fil" onChange={e=>setCondition({...condition, fil:e.currentTarget.value})}>
            <option value="" >-- select --</option>
            { tagArray.map((e, ind) => <option key={ind} value={e}>{e}</option>) }
        </select>
        <label className="icon-end"></label>

        {/* お気に入りフィルタ */}
        <label className="icon2">
            <input type="checkbox" style={{visibility:"hidden",width:0,margin:0}} onClick={()=>{setCondition(prev => ({...prev, favorite:!prev.favorite}))}} />
            <FontAwesomeIcon  className="star" icon={faStar} />
        </label>

        {/* ソート */}
        <label className="icon2">
            <input type="checkbox" style={{visibility:"hidden",width:0,margin:0}} onClick={()=>{setCondition(prev => ({...prev, order:!prev.order}))}}/>
            <FontAwesomeIcon className="star" icon={faSort}/>
        </label>

        {/* 記事追加 */}
        <label className="icon2">
            <FontAwesomeIcon className="star" icon={faSquarePlus} onClick={()=>{setPopup(true)}} />
        </label>
      </section>
    )
}