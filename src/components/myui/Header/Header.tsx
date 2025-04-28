import Acesso from "@/components/myui/Acesso/Acesso.tsx";
import NavBar from "@/components/myui/NavBar/NavBar.tsx";
import Logo from "@/components/myui/Logo/Logo.tsx";

export default function Header() {
    return (
        <header className="flex flex-col my-2 w-full max-w-screen-xl mx-auto px-4  ">
            <div className="flex flex-row justify-between items-center py-2 ">
                <div className="flex flex-row w-95 justify-between items-center">
                    <Logo/>
                    <NavBar/>
                </div>
                <Acesso/>
            </div>
        </header>
    )
}