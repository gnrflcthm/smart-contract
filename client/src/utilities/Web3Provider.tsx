import { Contract, BrowserProvider, parseUnits } from "ethers";
import { FC, PropsWithChildren, createContext, useMemo } from "react";
import ksContract from "../contracts/KickStarter.json";

export type CurrencyUnits = "wei" | "gwei" | "ether";

interface IWeb3Context {
  connectWallet: () => Promise<void>;
  deposit: (
    name: string,
    amount: string | number,
    units: CurrencyUnits
  ) => Promise<void>;
  getAccumulated: () => Promise<bigint>;
  computeRemaining: () => Promise<bigint>;
  getTotalDonations: () => Promise<bigint>;
  hasSmartWallet: boolean;
}

export const Web3Context = createContext<IWeb3Context>({
  connectWallet: async () => {
    return;
  },
  deposit: async () => {
    return;
  },
  getAccumulated: async () => {
    return BigInt("0");
  },
  computeRemaining: async () => {
    return BigInt("0");
  },
  getTotalDonations: async () => {
    return BigInt("0");
  },
  hasSmartWallet: false,
});

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  };

  const deposit = async (
    name: string,
    amount: number | string,
    units: string
  ) => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(contractAddress, ksContract.abi, signer);

      try {
        const transaction = await contract.deposit(name, {
          value: parseUnits(amount.toString(), units),
        });

        await transaction.wait();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAccumulated = async () => {
    let accumulated = BigInt("0");
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, ksContract.abi, provider);

      try {
        accumulated = await contract.computeRemaining();
      } catch (error) {
        console.log(error);
      }
    }
    return accumulated;
  };

  const computeRemaining = async () => {
    let remaining = BigInt("0");
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, ksContract.abi, provider);

      try {
        remaining = await contract.computeRemaining();
      } catch (error) {
        console.log(error);
      }
    }
    return remaining;
  };

  const hasSmartWallet = useMemo(() => window.ethereum !== undefined, []);

  const getTotalDonations = async () => {
    let totalDonations = BigInt("0");
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, ksContract.abi, provider);

      try {
        totalDonations = await contract.getTotalDonations();
      } catch (error) {
        console.log(error);
      }
    }
    return totalDonations;
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        deposit,
        getAccumulated,
        computeRemaining,
        getTotalDonations,
        hasSmartWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
