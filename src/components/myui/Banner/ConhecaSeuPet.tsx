

export default function ConhecaSeuPet() {
    return (
        <section className="p-5 font-dosis">
            <div className="flex flex-col w-full items-center max-w-screen-xl mx-auto px-4 gap-6">
                <div>
                    <h1 className="text-3xl text-shadow-md leading-tight text-gray-800 font-bold font-dosis">
                        Conheça melhor seu novo Aumigo!
                    </h1>
                </div>
                <div className="flex flex-row">
                    <img
                        src="/GatoDesenho.png"
                        alt="Gato com fundo decorativo"
                        className="w-[300px] h-auto object-contain"
                    />
                    <div>
                        <h1>Titulo </h1>Titulo
                        <p>Leais, carinhosos e sempre prontos para te receber com festa! Os cães adoram estar por perto, seja para um passeio, uma brincadeira ou só para ficar juntinho no sofá. São companheiros perfeitos para quem quer uma amizade cheia de energia e amor incondicional.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}