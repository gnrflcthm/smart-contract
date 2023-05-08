import { useContext, useState, useEffect, useMemo, FormEvent } from "react";
import { CurrencyUnits, Web3Context } from "../utilities/Web3Provider";

import DonationProgress from "./DonationProgress";

const Donate = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [remaining, setRemaining] = useState(BigInt("0"));
  const [accumulated, setAccumulated] = useState(BigInt("0"));
  const [donations, setDonations] = useState(BigInt("0"));

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState<CurrencyUnits>("wei");

  const total = useMemo(
    () =>
      remaining + accumulated === BigInt("0")
        ? BigInt("1")
        : remaining + accumulated,
    [accumulated, remaining]
  );

  const {
    connectWallet,
    deposit,
    computeRemaining,
    getAccumulated,
    getTotalDonations,
    hasSmartWallet,
  } = useContext(Web3Context);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    deposit(isAnonymous ? "anon" : name, amount, units);
  };

  useEffect(() => {
    (async () => {
      await connectWallet();
      const [rem, acc, don] = await Promise.all([
        computeRemaining(),
        getAccumulated(),
        getTotalDonations(),
      ]);
      setRemaining(rem);
      setAccumulated(acc);
      setDonations(don);
    })();
  }, []);

  return (
    <form
      className="flex-1 rounded-md p-8 border-8 border-primary lg:w-1/3 w-[90%] space-y-6 m-auto"
      onSubmit={submitForm}
    >
      <h1 className="font-primetime text-primary text-xl">
        If you are interested in supporting us, send us your donations down
        below.
      </h1>
      <DonationProgress
        current={accumulated}
        target={total}
        totalDonations={donations}
      />
      {hasSmartWallet ? (
        <>
          <div>
            <input
              type="name"
              className="w-full px-4 py-2 font-primetime outline-none bg-transparent text-white border-2 border-primary disabled:hidden"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isAnonymous}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="anonymous"
              checked={isAnonymous}
              onClick={() => setIsAnonymous((val) => !val)}
              className="accent-primary"
              id="anonymous"
            />
            <label
              htmlFor="anonymous"
              className="text-white font-primetime pb-1"
            >
              Anonymous
            </label>
          </div>
          <input
            type="text"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            name="units"
            onChange={(e) => setUnits(e.target.value as CurrencyUnits)}
          >
            <option value="wei">Wei</option>
            <option value="gwei">Gwei</option>
            <option value="ether">Ether</option>
          </select>
          <button
            type="submit"
            className="border-4 border-primary text-primary bg-transparent font-bold w-full p-4 pb-5 font-primetime text-xl hover:text-on_primary hover:bg-primary"
          >
            Donate
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center text-primary font-primetime">
            Please Install MetaMask{" "}
          </h1>
        </>
      )}
    </form>
  );
};

export default Donate;
