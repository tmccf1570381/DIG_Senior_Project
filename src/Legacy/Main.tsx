import React, { useState } from "react"
import SkillMap from "./components/SkillMap.tsx";
import Header from "./components/Header.tsx";
import List from "./components/List.tsx";
import Card from "./NEW/Card.tsx";

import Sample from "./components/Sample.tsx";

export default function Main(){
    const [page, setPage] = useState(1)
    return (
        <>
        <Header page={page} setPage={setPage}/>
        <main>
            {
                (()=>{
                    switch(page){
                        case 1:
                            return <List />
                        case 2:
                            return <SkillMap />
                        case 3:
                            return <Sample />
                    }
                })()
            }
        </main>
        </>
    )
}