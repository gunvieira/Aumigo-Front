
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import MyInput from "@/components/myui/Input/Input.tsx";

import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";

export default function TelaEndereco() {
    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center ">
            <div className=" shadow-lg rounded-md p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700">Cadastre-se</h1>

                <MyInput
                    id="Rua"
                    type="name"
                    label="Rua"
                    placeholder="Nome"
                />

                <MyInput
                    id="nome"
                    type="text"
                    label="CPF"
                    placeholder="CPF"
                />

                <MyInput
                    id="Celular"
                    type="text"
                    label="Celular"
                    placeholder="Celular"
                />

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

                </div>

                <div className="flex gap-3 items-center justify-center">

                    <BotaoEntrar to = "/casdastro"
                                 className="items-center"
                                 icon={<FaRegArrowAltCircleRight size={14} />}
                    >
                        Continuar
                    </BotaoEntrar>
                </div>
            </div>
        </div>
    );
};

