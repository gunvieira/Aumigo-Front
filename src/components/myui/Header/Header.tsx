import Acesso from "@/components/myui/Acesso/Acesso.tsx";


export default function Header() {
    return (
        <div className="flex flex-row justify-between bg-gray-800 ">
            <div>
                <img src="/logo.svg" alt="Logo" className="h-10 w-auto"  />
            </div>
            <Acesso/>

        </div>
    )
}