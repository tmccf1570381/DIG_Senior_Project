import React, { useEffect, useState } from "react";
import { Auth } from 'aws-amplify';
import Loading from "./Loading";

const SignUp = ({setCreateAccount, createAccount}:{setCreateAccount:React.Dispatch<React.SetStateAction<number>>, createAccount:number}) => {
  const [inputData, setInputData] = useState({"first-name": "", "last-name": "",  password: "", mail: ""});
  const [token, setToken] = useState({id:"",token:""});
  const [load, setLoad] = useState(false);
  const key = new RegExp("[A-Z]");

  useEffect(()=>{
    setLoad(false);
  },[]);

  const SignUp = async () => {
    setLoad(true);
    if(inputData.mail!=="" && inputData.password!=="" && inputData["first-name"]!=="" && inputData["last-name"]!==""){
      if(inputData.password.length < 6){
        alert("パスワードは６文字以上にしてください")
      }else if(!key.test(inputData.password)){
        alert("パスワードには大文字を１文字以上設定してください")
      }else{
        const {password, ...sendArr} = inputData;
        const newID = await fetch("https://0x2lz8helk.execute-api.us-east-1.amazonaws.com/dev/users", {method: "POST", mode: 'cors', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(sendArr)}).then(e=>e.json());
        setToken(prev => ({...prev, id:String(newID.id)}));
        try {
          const { user } = await Auth.signUp({ username: String(newID.id), password: password, attributes: { email:inputData.mail }});
          setInputData({"first-name": "", "last-name": "",  password: "", mail: ""});
          setCreateAccount(2);
        } catch (error) {
          alert(`error signing up:${error}`);
        }
      }
    }else{
        alert("入力されていない項目があります")
    };
    setLoad(false);
  };

  const Vertificate = async () => {
    setLoad(true);
    const res = await Auth.confirmSignUp(token.id, token.token).catch(e=>e);
    switch(res){
      case "SUCCESS":
        setCreateAccount(0);
        break
      default:
        alert("認証コードが間違っています");
        break
    };
    setLoad(false);
  };

  const handler = (e:any) => {
    setInputData({...inputData,[e.target.name]: e.target.value});
  };

  return (
      <>
        <section className="formContainer container-orange">
          <article>
              <nav>
                  <h1>SingUp Form</h1>
              </nav>
              <section>
              {createAccount === 1 
              ?
              <>
              {load && <Loading/>}
               <p>FIRST NAME：</p>
                      <input type="text" name="first-name" placeholder="first name" value={inputData["first-name"]}
                      onChange={(e) => setInputData({...inputData,[e.target.name]: e.target.value})} onKeyPress={e=>e.code==="Enter" && SignUp()}/>
                      <p>LAST NAME：</p>
                      <input type="text" name="last-name" placeholder="last name" value={inputData["last-name"]}
                      onChange={(e) => setInputData({...inputData, [e.target.name]: e.target.value})} onKeyPress={e=>e.code==="Enter" && SignUp()}/>
                      <p>PASSWORD：</p>
                      <input type="password" name="password" placeholder="includes uppercase and lowercase"  value={inputData.password}  autoComplete="on"
                      onChange={(e) => setInputData({...inputData,[e.target.name]: e.target.value})} onKeyPress={e=>e.code==="Enter" && SignUp()}/>
                      <p>MAIL：</p>
                      <input type="mail" name="mail" placeholder="mail  (※toyota address)" value={inputData.mail} required onChange={handler} onKeyPress={e=>e.code==="Enter" && SignUp()}/>
                      <div className="signup2">
                          <button className="" onClick={() => {setCreateAccount(0)}}>CLOSE</button>
                          <button className="" onClick={SignUp} >SIGNUP</button>
                      </div>               
                </>
              : 
                <>
                {load && <Loading/>}
                <div className="confirmbox">
                  <div style={{fontSize:"2.2vmin"}}>
                    <h3 style={{marginBottom:"0"}}>ご登録頂いたメールアドレスに</h3>
                    <h3 style={{marginTop:"0"}}>認証コードを送信いたしました。</h3>
                    <h3 style={{marginBottom:"0"}}>ご確認の上、以下へ入力ください。</h3>
                  </div>
                  <div style={{display:"flex", flexFlow:"column"}}>
                    <input type="number" min={0} value={token.token} onChange={(e)=>setToken(prev=>({...prev,token:e.target.value}))} onKeyPress={e=>e.code==="Enter" && Vertificate()}/>
                    <button onClick={Vertificate}>confirm</button>
                  </div>
                </div>
                </>
              } 
                          
              </section>
          </article>
        </section>
      </>
  );
};

export default SignUp;