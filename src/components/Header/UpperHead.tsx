import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { VariableContext } from "../../App";
import { useContext } from "react";

export default function UpperHead(){
    const [, , , , , , , , , condition, setCondition] = useContext(VariableContext);

    return (
        <section className="search">
            <input type="search" placeholder="You can get keyphrase!" value={condition.keyWord} onChange={e=>setCondition({...condition, keyWord: e.currentTarget.value})} />
            <FontAwesomeIcon icon={faSearch}/>
        </section>
    )
    
}