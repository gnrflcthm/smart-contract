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
    </section>
  );
};

export default Donate;
