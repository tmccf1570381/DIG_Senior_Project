import { useEffect, useState } from "react"
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";


export default function Sample(){
    const [src, setSrc] = useState("");
    useEffect(()=>{
        (async () => {
            const res = await fetch(fetchURL+"/aws/10002").then(e=>e.json());
            console.log(String(res.src));
            
            setSrc(res.src);
        })();
    },[])

    return (
        <>
            <div style={{fontSize:"500%",fontWeight:"bold"}}>Coming Soon!</div>
            <img src={`data:image/png;base64,${src}`} alt="" />
        </>
    )
}