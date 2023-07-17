import Web3 from 'web3';

export interface PegoutWaitingConfirmation {
    btcRawTx: string;
    pegoutCreationBlockNumber: string;
    rskTxHash: string;
}

export interface PegoutWaitingSignature {
    rskTxHash: string;
    btcRawTx: string;
}

export interface Utxo {
    btcTxHash: string;
    btcTxOutputIndex: number;
    valueInSatoshis: number;
}

export interface PegoutRequest {
    destinationAddressHash160: string;
    amountInSatoshis: string;
    rskTxHash: string;
}

export interface BridgeState {
    activeFederationUtxos: Utxo[];
    pegoutRequests: PegoutRequest[];
    pegoutsWaitingForConfirmations: PegoutWaitingConfirmation[];
    pegoutsWaitingForSignatures: PegoutWaitingSignature[];
    nextPegoutCreationBlockNumber: number;
}

export function getBridgeState(web3: Web3, defaultBlock?: number | string): Promise<BridgeState>;
