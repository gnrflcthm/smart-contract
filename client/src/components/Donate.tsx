import { useContext, useState, useEffect, useMemo, FormEvent } from "react";
import { CurrencyUnits, Web3Context } from "../utilities/Web3Provider";

import DonationProgress from "./DonationProgress";
import Dropdown from "./Dropdown";

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
    <section className="bg-primary_bg rounded-[2rem] p-8 h-fit space-y-8">
      <p className="text-lg text-white">
        If you are interested in supporting this project, send your donations
        down below.
      </p>
      <DonationProgress
        current={accumulated}
        target={total}
        totalDonations={donations}
      />
      <form onSubmit={submitForm} className="flex flex-col justify-between text-white text-opacity-50 text-xl border-light my-8">
        <input
          type="text"
          className={`${
            isAnonymous ? "hidden" : "block"
          } w-full rounded-lg bg-dark bg-opacity-0 text-white text-opacity-50 text-lg p-3 border border-light my-2`}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex flex-row">
          <input
            type="text"
            className="flex-1 rounded-l-lg bg-dark bg-opacity-0 text-white text-opacity-50 text-lg p-3 border border-light my-2"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* <select className="w-1/3 rounded-r-lg bg-primary text-white text-lg p-3 border border-light my-2">
            <option value="ether">ETHER</option>
            <option value="gwei">GWEI</option>
            <option value="wei">WEI</option>
          </select> */}
          <Dropdown
            choices={{ wei: "WEI", gwei: "GWEI", ether: "ETHER" }}
            onSelect={setUnits}
          />
        </div>
        <div className="flex flex-row align-center my-5">
          <input
            type="checkbox"
            className="w-5 h-5 accent-primary"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label className="text-white text-opacity-50 text-sm mx-2">
            Anonymous
          </label>
        </div>
        <button type="submit" className="w-full bg-primary rounded-xl text-white text-lg p-3 border border-primary hover:bg-transparent hover:text-primary my-2 transition-all duration-250">
          DONATE
        </button>
        <a href="#" className="text-center w-full bg-primary rounded-xl bg-opacity-0 text-primary text-lg p-3 border border-primary my-2 hover:bg-primary hover:text-white transition-all duration-250">
          SHARE
        </a>
      </form>
    </section>
  );
};

export default Donate;
