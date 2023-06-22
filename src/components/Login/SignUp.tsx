import React, { useState } from "react";
import "./SignUp.css";
const fetchURL = process.env.NODE_ENV === "production" ? "http://dig-alb-3456-1025820283.us-east-1.elb.amazonaws.com:3456" : "http://localhost:3456";

const hash = async (password:string) => {
  const encoder = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', encoder);
  const hashArray = Array.from(new Uint8Array(hash))
  return (hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
};

const SignUp = ({setSignupFlag}:{setSignupFlag:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [inputData, setInputData] = useState({"user-id": "", "first-name": "", "last-name": "",  password: ""});

  const submit = () => {
    (async () => {
      const hashPass = await hash(inputData.password);
      const response = await fetch(fetchURL+"/singnup", { method: "POST",headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...inputData, password: hashPass})})
        .then((e) => e.json()).catch(() => false);
      switch(response){
        case 1:
            alert("entering id is already used...");
            break;
        case 2:
            alert("Congratulation!! your account have created.");
            setSignupFlag(false);
            break;}
    })();
  };

  return (
    <>
        <section className="signupFormContainer">
            <article>
                <nav>
                    <h1>SingUp Form</h1>
                </nav>
                <section>
                        <p>USER ID<span></span></p>
                        <input type="text" pattern="^[0-9]+$" minLength={4} maxLength={15} name="user-id"
                        placeholder="user id  (※number only)" value={inputData["user-id"]} required
                        onChange={(e) =>setInputData({...inputData,[e.target.name]: e.target.value})}/>
                        <p>FIRST NAME</p>
                        <input type="text" name="first-name" placeholder="lirst name" value={inputData["first-name"]}
                        onChange={(e) => setInputData({...inputData,[e.target.name]: e.target.value})}/>
                        <p>LAST NAME</p>
                        <input type="text" name="last-name" placeholder="last name" value={inputData["last-name"]}
                        onChange={(e) => setInputData({...inputData, [e.target.name]: e.target.value})}/>
                        <p>PASSWORD</p>
                        <input type="password"  pattern="^[a-zA-Z0-9]+$" minLength={4} maxLength={15} name="password"
                        placeholder="password"  value={inputData.password}  autoComplete="on"
                        onChange={(e) => setInputData({...inputData,[e.target.name]: e.target.value})}/>
                        <div className="sinupButton">
                            <button onClick={submit} >SUBMIT</button>
                            <button onClick={() => {setSignupFlag(false)}}>CLOSE</button>
                        </div>                    
                </section>
            </article>
        </section>
        </>
  );
};

export default SignUp;