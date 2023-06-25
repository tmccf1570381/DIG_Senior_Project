import React, { useContext, useState } from "react";
import "./Login.css";
import { VariableContext } from "../App";
import SignUp from "./Login/SignUp.tsx";
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

export default function Login(){
    const [, , , , , , setUserData] = useContext(VariableContext);
    const [formValues, setFormValues] = useState({"user-id":"", password:""});
    const [signupFlag, setSignupFlag] = useState(false);

    const signIn = () => {
      (async () => {
        let fetchData = await fetch(fetchURL+"/users", {
          method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...formValues, password:formValues.password})})
          .then((e) => e.json()).catch((error) => {return false});
        fetchData ? setUserData(fetchData) : alert("Sigin in failed... please confirm your id and password");
      })();
    };

  return (
    <>
    {!signupFlag 
    ? <>
        <section className="formContainer">
        <article>
            <nav>
                <h1>KMT ZAMAS</h1>
            </nav>
            <section>
                <p>USER ID：</p>
                <input type="text" pattern="^[0-9]+$" name="user-id" placeholder="user id  (※number only)" value={formValues["user-id"]} 
                minLength={4} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}/>
                <p>PASSWORD：</p>
                <input type="password" pattern="^[a-zA-Z0-9]+$" name="password" placeholder="password" value={formValues.password} 
                minLength={4} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
                <button onClick={signIn}>LOGIN</button>
                <p className="textLink" onClick={()=>setSignupFlag(true)}>~ create new accoount ~</p>
            </section>
        </article>
        </section>
    </>
    : <SignUp setSignupFlag={setSignupFlag} />}
    </>
  );
};
