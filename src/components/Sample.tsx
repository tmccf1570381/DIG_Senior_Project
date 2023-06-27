import { useEffect, useState } from "react"
import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AdminInitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

const COGNITO_API_VERSION = '2016-04-18';
const REGION = 'ap-northeast-1';
const COGNITO_USER_POOL_ID = process.env.USER_POOL_ID!;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID!;
const MY_USERNAME = process.env.MY_USERNAME!;
const MY_PASSWORD = process.env.MY_PASSWORD!;

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