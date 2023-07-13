import { useContext, useState } from "react"
import "./NewHeader.css"
import SearchBox from "./SearchBox"
import { NewValContext } from "../App2";
import { Auth } from 'aws-amplify';
import Loading from "./Loading";

export default function NewHeader({src}:{src:string}){
    const [,,,,, setUser, user, setCognito] = useContext(NewValContext);
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)

    async function signOut() {
        setLoad(true)
        try {
            setUser(0);
            setCognito(0);
            await Auth.signOut();
            alert("ログアウトしました")
        }catch (error) {
            alert("エラーが発生しました")
        }
        setLoad(false)
    };

    return(
        <>
            {load && <Loading />}
            <section className="new-header">
                <div>
                    <img src="./systemImages/zamas.png" alt="tittle" style={{maxHeight:"85%",cursor:"pointer"}} onClick={()=>setCognito(1)}/>
                </div>
                <SearchBox />

                <figure className="new-prof" >
                    <label onClick={()=>{setOpen(prev => !prev)}} style={{cursor:"pointer"}}>
                    {src !== "" 
                    ? <img src={`data:image/png;base64,${src}`} alt="profile"/>
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