import { useContext, useState, useEffect, FormEvent } from "react";
import { CurrencyUnits, Web3Context } from "../utilities/Web3Provider";

import DonationProgress from "./DonationProgress";
import Dropdown from "./Dropdown";

const Donate = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState<CurrencyUnits>("wei");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const {
    connectWallet,
    deposit,
    accumulated,
    target,
    targetReached,
    totalDonations,
  } = useContext(Web3Context);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    // console.table({ name, amount, units, isAnonymous });
    deposit(isAnonymous ? "Anon" : name, amount, units);
  };

  useEffect(() => {
    (async () => {
      await connectWallet();
    })();
  }, [connectWallet]);

  return (
    <section className="bg-primary_bg rounded-[2rem] p-8 h-fit space-y-8">
      {targetReached ? (
        <h1 className="text-white font-bold text-xl text-center">
          Thank you for all the support and the donations that we have received.
          We look forward to being able to provide you with our services
        </h1>
      ) : (
        <p className="text-lg text-white">
          If you are interested in supporting this project, send your donations
          down below.
        </p>
      )}
      <DonationProgress
        current={accumulated}
        target={target}
        targetReached={targetReached}
        totalDonations={totalDonations}
      />
      {!targetReached && (
        <form
          onSubmit={submitForm}
          className="flex flex-col justify-between text-white text-opacity-50 text-xl border-light my-8"
        >
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
          <button
            type="submit"
            className="w-full bg-primary rounded-xl text-white text-lg p-3 border border-primary hover:bg-transparent hover:text-primary my-2 transition-all duration-250"
          >
            DONATE
          </button>
          <a
            href="#"
            className="text-center w-full bg-primary rounded-xl bg-opacity-0 text-primary text-lg p-3 border border-primary my-2 hover:bg-primary hover:text-white transition-all duration-250"
          >
            SHARE
          </a>
        </form>
      )}
    </section>
  );
};

export default Donate;
