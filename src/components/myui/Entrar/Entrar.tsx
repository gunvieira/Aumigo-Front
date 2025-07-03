import React from 'react';
import { FaUserPlus } from "react-icons/fa";
import MyInput from "@/components/myui/Input/Input.tsx";
import Checkbox from "@/components/myui/CheckBox/CheckBox.tsx";
import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";


const TelaLogin: React.FC = () => {
    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center ">
            <div className=" shadow-lg rounded-md p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700">Entrar</h1>

                <MyInput
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                />

                <div className="mb-2">
                    <MyInput
                        id="senha"
                        type="password"
                        label="Senha"
                        placeholder="Senha"
                        className="mb-0"
                    />
                    <div className="flex justify-end">
                        <a href="/" className="text-xs text-emerald-600 hover:text-emerald-700 transition">
                            Esqueci a senha
                        </a>
                    </div>
                </div>

                <div className="mt-4 mb-8">
                    <Checkbox
                        id="lembrar"
                        label="Mantenha-me conectado"
                    />
                </div>

                <div className="flex gap-3">

                        <BotaoEntrar to="/processos" className="w-full">
                            Entrar
                        </BotaoEntrar>

                    <BotaoEntrar to = "/cadastro"
                        className="w-full"
                        icon={<FaUserPlus size={14} />}
                    >
                        Cadastre-se
                    </BotaoEntrar>
                </div>
            </div>
        </div>
    );
};

export default TelaLogin;
