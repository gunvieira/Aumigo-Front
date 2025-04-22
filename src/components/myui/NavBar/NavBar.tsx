import {BotaoGhost} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function NavBar() {
    return (
       <>
           <div className="flex flex-row gap-3 mx-2 my-2">
               <BotaoGhost>Home</BotaoGhost>
               <BotaoGhost>Adotar</BotaoGhost>
               <BotaoGhost>Quem Somos</BotaoGhost>
               <BotaoGhost>Ajudar</BotaoGhost>
           </div>
       </>
    )
}