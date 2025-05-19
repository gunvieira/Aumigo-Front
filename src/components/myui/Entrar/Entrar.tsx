import { FaUserPlus } from "react-icons/fa";


export default function TelaLogin() {
    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center px-4">
            {/* flex flex-col w-full items-center max-w-screen-xl mx-auto px-4*/}
            <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6">Entrar</h1>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="senha" className="block text-sm font-medium  mb-1">Senha</label>
                    <div className="flex flex-col justify-between items-end">
                        <input
                            type="password"
                            id="senha"
                            placeholder="Senha"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <a href="#" className="text-xs  ml-2 whitespace-nowrap">Esqueci a senha</a>
                    </div>
                </div>

                <div className="flex items-center mt-4 mb-6">
                    <input type="checkbox" id="lembrar" className="mr-2" />
                    <label htmlFor="lembrar" className="text-sm ">Mantenha-me conectado</label>
                </div>

                <div className="flex gap-2">
                    <button className="bg-[#4EC9B0] text-white px-4 py-2 rounded w-full hover:bg-[#3ba491] transition">
                        Entrar
                    </button>
                    <button className="bg-[#4EC9B0] text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-[#3ba491] transition">
                        Cadastre-se <FaUserPlus size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
