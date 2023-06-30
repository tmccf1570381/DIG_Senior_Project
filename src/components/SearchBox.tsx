import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NewValContext } from "../App2";
import { useContext } from "react";

export default function SearchBox (){
    const [rule, setRule, , ] = useContext(NewValContext)

    return (
        <>
            <div className="new-search" >
                <div className="new-head-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <input type="text" value={rule.keyword} id="keyword" className="new-input" placeholder="Search Knowledge!"
                 onChange={(e:any) => setRule(prev => ({...prev, keyword:e.target.value}))} />
            </div>
        </>
    )
}