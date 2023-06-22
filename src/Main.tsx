import React from "react"
import SkillMap from "./components/SkillMap.tsx";
import Header from "./components/Header.tsx";
import List from "./components/List.tsx";
import Test from "./components/Test.tsx";


export default function Main(){
    return (
        <>
        <Header />
        <main>
            {false
            ? <SkillMap />
            : <Test />
            // : <List />
            }
        </main>
        </>
    )
}