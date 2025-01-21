import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export function getAptosClient() {
  const config = new AptosConfig({ 
    network: Network.CUSTOM,
    fullnode: "https://aptos.testnet.suzuka.movementlabs.xyz/v1"
  });
  return new Aptos(config);
}
