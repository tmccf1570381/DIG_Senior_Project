import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSort, faSliders, faSquarePlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import { VariableContext } from "../../App";

type props = {
    condition:{fil: string, order :string, keyWord: string},
    setCondition:React.Dispatch<React.SetStateAction<props["condition"]>>
}

export default function LowerHead({condition, setCondition}:props){
    const [, setPopup, , , tagArray, , ] = useContext(VariableContext);
    return(
      <section>
        {/* お気に入りフィルタ */}
        <label>
            <input type="checkbox" style={{visibility:"hidden",width:0,margin:0}} />
            <FontAwesomeIcon  className="star" icon={faStar} />
        </label>

        {/* タグフィルタ */}
        <label className="icon">
            <FontAwesomeIcon icon={faSliders}/>
        </label>
        <select id="fil" onChange={e=>setCondition({...condition, fil:e.currentTarget.value})}>
            <option value="" >-- select --</option>
            { tagArray.map((e, ind) => <option key={ind} value={e}>{e}</option>) }
        </select>

        {/* ソート */}
        <label className="icon">
            <FontAwesomeIcon icon={faSort}/>
        </label>
        <select name="oreder" id="order" onChange={e=>setCondition({...condition,order: e.currentTarget.value})}>
            <option value="desc" >desc</option>
            <option value="asc">asc</option>
        </select>


        {/* 記事追加 */}
        <label>
            <FontAwesomeIcon className="star" icon={faSquarePlus} onClick={()=>{setPopup(true)}} />
        </label>
      </section>
    )
}