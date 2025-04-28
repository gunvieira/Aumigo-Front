import Header from "@/components/myui/Header/Header.tsx";
import Fotos from "@/components/myui/Banner/Banner2.tsx";

export default function Home() {
    return (
        <>

                <Header/>



            <section className="gap-3 bg-radial from-teal-300/50 from-50% to-teal-300/10 p-5">

                    <div className=" flex flex-col w-full max-w-screen-xl mx-auto px-4 gap-3">
                        <Fotos/>


                    </div>
            </section>
        </>
    );
}
