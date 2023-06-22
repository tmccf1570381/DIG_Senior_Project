type props ={
    skills:{
    "user-id":number, 
    "first-name":string, 
    "last-name":string,
    skill:{skill:string,date:string}[],
    "16person":string,
    "team":string,
    "position":string,}
}

// {/* 左側コンテンツ */}
export default function UserProfile({skills}:props){
    return(
    <section className="left">
        <figure>
            <img src="./systemImages/hoshi52.png" alt="profile" />
            <h2>{`${skills["first-name"]} ${skills["last-name"]}`}</h2>
        </figure>
        <tr>
            <th>🖌️posted</th>
            <td>3</td>
            <th>⭐️zamas</th>
            <td>10</td>
        </tr>
        <div>
            <h3>~team~</h3>
            <p>{skills["team"]}</p>
            <h3>~position~</h3>
            <p>{skills["position"]}</p>
            <h3>~16Personalities~</h3>
            <p>{skills["16person"]}</p>
        </div>
    </section>
    );
}