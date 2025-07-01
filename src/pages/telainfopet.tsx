import Header from "@/components/myui/Header/Header.tsx";

import Footer from "@/components/myui/Footer/Footer.tsx";
import {PaginaDetalhesPet} from "@/components/myui/infoPets/InfoPets.tsx";

export default function TelaInfoPets() {
    return (
        <>
            <Header/>
            <PaginaDetalhesPet/>
            <Footer/>
        </>
    );
}
