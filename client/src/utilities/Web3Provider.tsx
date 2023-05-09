import { Contract, BrowserProvider, parseUnits } from "ethers";
import {
  FC,
  PropsWithChildren,
  createContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import ksContract from "../contracts/KickStarter.json";

export type CurrencyUnits = "wei" | "gwei" | "ether";

interface IWeb3Context {
  connectWallet: () => Promise<void>;
  deposit: (
    name: string,
    amount: string | number,
    units: CurrencyUnits
  ) => Promise<void>;
  totalDonations: bigint;
  accumulated: bigint;
  remaining: bigint;
  target: bigint;
  targetReached: boolean;
  hasSmartWallet: boolean;
}

export const Web3Context = createContext<IWeb3Context>({
  connectWallet: async () => {
    return;
  },
  deposit: async () => {
    return;
  },
  accumulated: BigInt("0"),
  remaining: BigInt("0"),
  target: BigInt("0"),
  totalDonations: BigInt("0"),
  targetReached: false,
  hasSmartWallet: false,
});

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const [totalDonations, setTotalDonations] = useState(BigInt("0"));
  const [accumulated, setAccumulated] = useState(BigInt("0"));
  const [remaining, setRemaining] = useState(BigInt("0"));
  const [targetReached, setTargetReached] = useState(false);

  const target = useMemo(
    () => accumulated + remaining,
    [accumulated, remaining]
  );

  useEffect(() => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, ksContract.abi, provider);

      Promise.all([
        contract.getAccumulated(),
        contract.computeRemaining(),
        contract.getTotalDonations(),
        contract.isTargetReached(),
      ])
        .then(([acc, rem, don, tar]) => {
          setAccumulated(acc);
          setRemaining(rem);
          setTotalDonations(don);
          console.log(tar);
          setTargetReached(tar);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleDonation = (name: string, value: bigint) => {
    console.log(name, value);
    setAccumulated((val) => val + value);
    setRemaining((val) => val - value);
  };

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

        await contract.on("DonationReceived", handleDonation);

        await transaction.wait();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const hasSmartWallet = useMemo(() => window.ethereum !== undefined, []);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        deposit,
        hasSmartWallet,
        accumulated,
        remaining,
        target,
        targetReached,
        totalDonations,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
