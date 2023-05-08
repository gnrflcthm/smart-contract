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
    <section className="bg-primary_bg rounded-[2rem] p-8 h-fit space-y-8">
      <p className="text-lg text-white">If you are interested in supporting this project, send your donations down below.</p>
      <DonationProgress current={accumulated} target={total} totalDonations={donations} />
      <div className="flex flex-col justify-between text-white text-opacity-50 text-xl border-light my-8">
        <input type="text" className="w-full rounded-lg bg-dark bg-opacity-0 text-white text-opacity-50 text-lg p-3 border border-light my-2" placeholder="Name" />
        <div className="flex flex-row">
          <input type="text" className="w-full rounded-l-lg bg-dark bg-opacity-0 text-white text-opacity-50 text-lg p-3 border border-light my-2" placeholder="Amount" />
          <select className="w-40 rounded-r-lg bg-primary text-white text-lg p-3 border border-light my-2">
            <option value="ether">ETHER</option>
            <option value="gwei">GWEI</option>
          </select>
        </div>
        <div className="flex flex-row align-center my-5">
          <input type="checkbox" className="w-5 h-5" />
          <label className="text-white text-opacity-50 text-sm mx-2">Anonymous</label>
        </div>
        <button className="w-full bg-primary rounded-xl text-white text-lg p-3 border border-light my-2">DONATE</button>
        <button className="w-full bg-primary rounded-xl bg-opacity-0 text-primary text-lg p-3 border border-primary my-2">SHARE</button>
      </div>
    </section>
  );
};

export default Donate;
