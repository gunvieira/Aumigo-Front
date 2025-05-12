import Header from "@/components/myui/Header/Header.tsx";
import {ListaDePets} from "@/components/myui/ListadePets/ListaDePets.tsx";



export default function Adotar() {
    return (
        <>
            <Header />
            <section className="p-5 font-dosis">
                <div className="flex flex-col w-full items-center max-w-screen-xl mx-auto px-4 gap-6">
                    <ListaDePets/>
                    </div>
            </section>
        </>

    )
}