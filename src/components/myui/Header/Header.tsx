import Acesso from "@/components/myui/Acesso/Acesso.tsx";
import NavBar from "@/components/myui/NavBar/NavBar.tsx";
import Logo from "@/components/myui/Logo/Logo.tsx";

export default function Header() {
    return (
        <div className="shadow-sm/5 ">
        <header className="flex flex-col my-0 w-full max-w-screen-xl mx-auto px-4 pt-1 ">
            <div className="flex flex-row justify-between items-center py-3 ">
                <div className="flex flex-row w-98 justify-between items-center">
                    <Logo/>
                    <NavBar/>
                </div>
                <Acesso/>
            </div>
        </header>
        </div>
    )
}