export default function ConteudoColabore() {
    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4">
            {/* Bloco 1 */}
            <div className="bg-[#D4F2EC] rounded-lg p-6 max-w-md w-full text-center mb-10 shadow-md gap-10">
                <h1 className="text-2xl font-semibold mb-4">Colabore com a nossa missão</h1>
                <p className="text-gray-700 text-sm mb-4">
                    Nosso objetivo é dar visibilidade aos cães e gatos que estão procurando um lar e conectá-los com pessoas que querem ter um bichinho.
                    <br /><br />
                    Ao fazer sua doação, você nos ajuda a continuar esse trabalho!
                    <br />
                    Muita gente acha que doar dinheiro é pouco, mas faz muita diferença. Temos custos para manter o site funcionando e para remunerar os profissionais que não são voluntários. As doações que recebemos permitem que nosso projeto continue existindo.
                </p>
                <div className="flex justify-center items-center mb-4">
                    <img
                        src="/Imagens/Colabore/LogoPix.png"
                        alt="Pix logo"
                        className="h-8 mr-2"
                    />
                </div>
                <img
                    src="/Imagens/Colabore/QRCode.png"
                    alt="QR Code para doação"
                    className="mx-auto mb-4 h-40 w-40"
                />
                <p className="text-sm text-gray-700">
                    <strong>Chave pix (CNPJ):</strong><br />
                    21.328.732/0001-85
                    <br /><br />
                    <strong>Nome:</strong><br />
                    Adote um Pet
                    <br /><br />
                    <strong>Banco:</strong><br />
                    Santander
                </p>
            </div>

        </div>
    );
}
