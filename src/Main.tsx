import React, { useState } from "react"
import SkillMap from "./components/SkillMap.tsx";
import Header from "./components/Header.tsx";
import List from "./components/List.tsx";


export default function Main(){
    const [page, setPage] = useState(1)
    return (
        <>
        <Header setPage={setPage}/>
        <main>
            {
                (()=>{
                    switch(page){
                        case 1:
                            return <List />
                        case 2:
                            return <SkillMap />
                        case 3:
                            return <div>comming soon!</div>
                    }
                })()
            }
        </main>
        </>
    )
}