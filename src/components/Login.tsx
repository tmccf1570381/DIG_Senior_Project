import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import SignUp from "./SignUp";
import { NewValContext } from "../App2";
import { Auth } from 'aws-amplify';
import Loading from "./Loading";

export default function Login(){
    const [, , , , , setUser, , setCognito, setSrc, setUserInfo] = useContext(NewValContext);
    const [formValues, setFormValues] = useState({"user-id":"", password:""});
    const [createAccount , setCreateAccount] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
      setLoad(false);
    },[])

    async function signIn() {
      setLoad(true);
      if(formValues["user-id"]!=="" && formValues["password"] !== ""){
        if(!isNaN(Number(formValues["user-id"]))){
          try {
            const user = await Auth.signIn(String(formValues["user-id"]), formValues["password"]);
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
              await Auth.completeNewPassword(user, formValues["password"]);
            };
            const res = await fetch(`https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/s3/user-id?user-id=${user.username}`).then(e=>e.json());
            const updates = await fetch(`https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/updates/user-id?user-id=${user.username}`).then(e=>e.json());
            res.src && setSrc(res.src);
            setUserInfo(updates[0]);
            setCognito(1);
            setUser(user.username)
          } 
          catch (error) {
            alert("IDまたはパスワードが間違っています")
          };
        }else{
          alert("UserIDに数値以外の文字が入力されています")
        }
      }else{
        alert("UserIDまたはパスワードが入力されていません")
      }
      setLoad(false);
    }

  return (
    <>
    {createAccount === 0
      ?
      <>
      {load && <Loading />}
      <section className="formContainer">
        <article>
            <nav>
                <h1>Zamas</h1>
            </nav>
            <section>
                <p>USER ID：</p>
                <input type="text" pattern="^[0-9]+$" name="user-id" placeholder="user id  (※number only)" value={formValues["user-id"]} 
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}/>
                <p>PASSWORD：</p>
                <input type="password" pattern="^[a-zA-Z0-9]+$" name="password" placeholder="password" value={formValues.password} 
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} onKeyPress={e=>e.code==="Enter" && signIn()}/>
                <button onClick={signIn} >LOGIN</button>
                <div className="signup" onClick={()=>setCreateAccount(1)}><span>~create NEW account~</span></div>
            </section>
        </article>
      </section>
      </>
      : <>
        <SignUp setCreateAccount={setCreateAccount} createAccount={createAccount}/>
        </>
  }
    </>
  );
};
