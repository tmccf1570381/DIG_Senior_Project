import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";

type props = {
    condition:{fil: string, order :boolean, keyWord: string},
    setCondition:React.Dispatch<React.SetStateAction<props["condition"]>>
}

export default function UpperHead({condition, setCondition}:props){
    return (
        <section className="search">
            <input type="search" placeholder="You can get keyphrase!" value={condition.keyWord} onChange={e=>setCondition({...condition, keyWord: e.currentTarget.value})} />
            <FontAwesomeIcon icon={faSearch}/>
        </section>
    )
    
}