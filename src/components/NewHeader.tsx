import { useContext, useEffect, useState } from "react"
import "./NewHeader.css"
import SearchBox from "./SearchBox"
import { NewValContext } from "../App2";
import { Auth, Storage } from 'aws-amplify';

export default function NewHeader({src}:{src:string}){
    const [,,,,, setUser, user, setCognito] = useContext(NewValContext);
    const [open, setOpen] = useState(false)

    async function signOut() {
        setUser(0);
        try {
            await Auth.signOut();
            setCognito(0);
            alert("ログアウトしました")
        }catch (error) {
            alert("エラーが発生しました")
        }
    };

    async function uploadPict() {
        Storage.get('10002.png')
        .then(result => console.log(result))
        .catch(e=>e)
    };

    return(
        <>
            <section className="new-header">
                <div>
                    <img src="./systemImages/zamas.png" alt="tittle" style={{maxHeight:"85%",cursor:"pointer"}} />
                </div>
                <SearchBox />

                <figure className="new-prof" >
                    <label onClick={()=>{setOpen(prev => !prev)}} style={{cursor:"pointer"}}>
                    {src !== "" 
                    ? <img src={`data:image/png;base64,${src}`} alt="profile" onClick={uploadPict}/>
                    : <img src="./systemImages/else.png" alt="profile" />}
                    </label>
                </figure>
                <nav className={open ? "nav-head nav-head-off" : "nav-head"}>
                        <li onClick={signOut}>Logout</li>
                        <li onClick={()=>setCognito(prev => {return prev === 1 ? 2 : 1})}>Setting</li>
                </nav>
            </section>
        </>
    );
}