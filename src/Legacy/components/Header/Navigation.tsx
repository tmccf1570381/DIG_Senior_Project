export default function Navigation ({setPage}:{setPage:React.Dispatch<React.SetStateAction<number>>}) {
    return (
        <>
        <section className="logos">
          <img src="./systemImages/zamas.png" alt="zamas" className="logozamas" />
          <nav>
            <li onClick={()=>{setPage(1)}}>Main</li>
            <li onClick={()=>{setPage(2)}}>SkillMap</li>
            <li onClick={()=>{setPage(3)}}>GAME</li>
          </nav>
        </section>
        </>
    )
}