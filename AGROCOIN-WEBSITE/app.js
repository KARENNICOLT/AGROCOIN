document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');

    if (!window.ethereum || !window.ethereum.isMetaMask) {
        alert('MetaMask no está instalado. Por favor, instala MetaMask.');
        window.open('https://metamask.io/download/', '_blank');
        return;
    }

    connectButton.addEventListener('click', async () => {
        try {
            // Solicitar acceso a MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert('Conectado con la cuenta: ' + accounts[0]);

            // Agregar la red Polygon si es necesario
            await addPolygonNetwork();
        } catch (error) {
            console.error('Error al conectar con MetaMask:', error);
            alert(`Error: ${error.message || 'Ocurrió un problema al conectar con MetaMask.'}`);
        }
    });

    // Detectar cambios de red y recargar la página
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
});

async function addPolygonNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x89', // ID de la red Polygon
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/']
            }]
        });
    } catch (error) {
        console.error('Error al agregar la red Polygon:', error);
        alert('Ocurrió un error al agregar la red Polygon.');
    }
}
