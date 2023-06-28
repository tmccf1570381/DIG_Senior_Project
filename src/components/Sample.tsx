import { useEffect, useState } from "react"
// import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AdminInitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';
const fetchURL = process.env.NODE_ENV === "production" ? "https://dig-zamas.com:3456" : "http://localhost:3456";

// const COGNITO_API_VERSION = '2016-04-18';
// const REGION = 'us-east-1';
// const COGNITO_USER_POOL_ID = process.env.USER_POOL_ID!;
// const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID!;
// const MY_USERNAME = process.env.MY_USERNAME!;
// const MY_PASSWORD = process.env.MY_PASSWORD!;

export default function Sample(){
    const [src, setSrc] = useState("");
    useEffect(()=>{
        (async () => {
            const res = await fetch(fetchURL+"/aws/10002").then(e=>e.json());
            console.log(String(res.src));
            
            setSrc(res.src);
        })();
    },[])
    


    // const getIdToken = async () => {
    //     const client = new CognitoIdentityProviderClient({
    //         apiVersion: COGNITO_API_VERSION,
    //         region: REGION,
    //     });

    //     const params = {
    //       UserPoolId: COGNITO_USER_POOL_ID,
    //       ClientId: COGNITO_CLIENT_ID,
    //       AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    //       AuthParameters: {
    //         USERNAME: MY_USERNAME,
    //         PASSWORD: MY_PASSWORD,
    //       },
    //     };

    //     // const response = await client.send(new AdminInitiateAuthCommand(params));
    //     // const idToken = response.AuthenticationResult?.IdToken!;
    //     // console.log(idToken);
    // }
    // getIdToken()

  
    return (
        <>
            <div style={{fontSize:"500%",fontWeight:"bold"}}>Coming Soon!</div>
            <img src={`data:image/png;base64,${src}`} alt="" />
        </>
    )
}