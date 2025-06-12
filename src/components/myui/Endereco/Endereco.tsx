
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import MyInput from "@/components/myui/Input/Input.tsx";

import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";

export default function TelaEndereco() {
    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center ">
            <div className=" shadow-lg rounded-md p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700">Cadastre-se</h1>

                <MyInput
                    id="CEP"
                    type="text"
                    label="CEP*"
                    placeholder="CEP"
                />


                <MyInput
                    id="Endereço"
                    type="text"
                    label="Endereço*"
                    placeholder="Endereço"
                />

                <div className="flex flex-row gap-5">
                <MyInput
                    id="Número"
                    type="text"
                    label="Número*"
                    placeholder="Número"
                />


                <MyInput
                    id="complemento"
                    type="text"
                    label="Complemento"
                    placeholder="Complemento"
                />
                </div>


                <div className="mb-2">
                    <MyInput
                        id="bairro"
                        type="text"
                        label="Bairro"
                        placeholder="Bairro"
                    />

                </div>

                <div className="flex flex-row gap-5">
                    <MyInput
                        id="cidade"
                        type="text"
                        label="Cidade*"
                        placeholder="Cidade"
                    />


                    <MyInput
                        id="uf"
                        type="text"
                        label="UF*"
                        placeholder="UF"
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

