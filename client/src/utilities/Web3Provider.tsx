import { Contract, BrowserProvider, parseUnits } from "ethers";
import { FC, PropsWithChildren, createContext } from "react";
import ksContract from "../contracts/KickStarter.json";

interface IWeb3Context {
  deposit?: (name: string) => Promise<void>;
  getAccumulated?: () => Promise<bigint>;
  computeRemaining?: () => Promise<bigint>;
}

export const Web3Context = createContext<IWeb3Context>({});
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const deposit = async (name: string) => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(contractAddress, ksContract.abi, signer);

      try {
        const transaction = await contract.deposit(name, {
          value: parseUnits("0.05", "ether"),
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

  return (
    <Web3Context.Provider value={{ deposit, getAccumulated, computeRemaining }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
