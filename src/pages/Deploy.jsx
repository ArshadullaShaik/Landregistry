import React, { useState, useContext } from 'react';
import { LandRegistryContext } from '../context/LandRegistryContext';
import { Rocket, CheckCircle, Copy } from 'lucide-react';

const Deploy = () => {
    const { deployContract, currentAccount, connectWallet } = useContext(LandRegistryContext);
    const [status, setStatus] = useState('idle'); // idle, deploying, success, error
    const [newAddress, setNewAddress] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleDeploy = async () => {
        if (!currentAccount) return alert("Connect Wallet First");
        setStatus('deploying');
        setErrorMsg('');
        try {
            const address = await deployContract();
            setNewAddress(address);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMsg(error.reason || error.message || "Deployment Failed");
        }
    };

    if (!currentAccount) {
         return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] pt-24">
                 <h2 className="text-2xl font-bold mb-4">Please Connect Your Wallet to Deploy</h2>
                 <button onClick={connectWallet} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
                    Connect Wallet
                 </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 px-4 bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-blue-50 rounded-full">
                        <Rocket size={48} className="text-blue-600" />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Deploy Contract</h1>
                <p className="text-gray-600 mb-8">
                    Deploy a new instance of the Land Registry smart contract to the blockchain. 
                    This will set you as the owner and administrator.
                </p>

                {status === 'idle' && (
                    <button 
                        onClick={handleDeploy}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02]"
                    >
                        Deploy to Sepolia
                    </button>
                )}

                {status === 'deploying' && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-blue-600 font-semibold animate-pulse">Confirming Transaction...</p>
                        <p className="text-sm text-gray-500 mt-2">Please wait for block confirmation.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="animate-fade-in-up">
                        <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                            <CheckCircle size={32} />
                            <span className="text-2xl font-bold">Deployed!</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg break-all mb-4 border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Contract Address</p>
                            <p className="font-mono text-gray-800 font-bold">{newAddress}</p>
                        </div>
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm text-left mb-6 border border-yellow-100">
    <strong>Important:</strong> Update <code className="bg-yellow-100 px-1 rounded">src/utils/contract.js</code> with this address to interact with your new registry.
</div>
                        <button 
                            onClick={() => {setStatus('idle'); setNewAddress('');}}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Deploy Another
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-red-500">
                        <p className="font-bold mb-2">Error</p>
                        <p className="text-sm bg-red-50 p-3 rounded border border-red-100">{errorMsg}</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-4 text-gray-600 underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Deploy;
