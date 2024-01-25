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

export function getBridgeState(host: string, blockToSearch?: string | number): Promise<BridgeState>;
