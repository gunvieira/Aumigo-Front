import Acesso from "@/components/myui/Acesso/Acesso.tsx";
import NavBar from "@/components/myui/NavBar/NavBar.tsx";


export default function Header() {
    return (
        <div className="flex flex-row justify-between bg-gray-800 mx-8 my-8 ">
            <div>
                <img src="/logo.svg" alt="Logo" className="h-10 w-auto"  />
            </div>
            <NavBar/>
            <Acesso/>

        </div>
    )
}