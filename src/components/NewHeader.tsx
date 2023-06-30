import { useContext, useEffect, useState } from "react"
import "./NewHeader.css"
import SearchBox from "./SearchBox"
import { NewValContext } from "../App2";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

export default function NewHeader(){
    const [src, setSrc] = useState("");
    const [,,,,,,user] = useContext(NewValContext);

    useEffect(()=>{
        (async ()=>{
            const res = await fetch(fetchURL+`/aws/${user}`).then(e=>e.json());
            res.src && setSrc(res.src);
        })();
    },[]);

    return(
        <>
            <section className="new-header">
                <div>
                    <img src="./systemImages/zamas.png" alt="tittle" style={{maxHeight:"85%"}}/>
                </div>
                <SearchBox />
                <figure className="new-prof">
                    {src !== "" 
                    ? <img src={`data:image/png;base64,${src}`} alt="profile" />
                    : <img src="./systemImages/else.png" alt="profile" />}
                </figure>
            </section>
        </>
    );
}