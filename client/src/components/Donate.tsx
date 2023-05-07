import { useContext, useState, useEffect, useMemo } from "react";
import { Web3Context } from "../utilities/Web3Provider";

import DonationProgress from "./DonationProgress";

const Donate = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [remaining, setRemaining] = useState(BigInt("0"));
  const [accumulated, setAccumulated] = useState(BigInt("0"));
  const [name, setName] = useState("");

  const total = useMemo(
    () =>
      remaining + accumulated === BigInt("0")
        ? BigInt("1")
        : remaining + accumulated,
    [accumulated, remaining]
  );

  const { deposit, computeRemaining, getAccumulated } = useContext(Web3Context);

  useEffect(() => {
    (async () => {
      const [rem, acc] = await Promise.all([
        computeRemaining!(),
        getAccumulated!(),
      ]);
      setRemaining(rem);
      setAccumulated(acc);
    })();
  }, []);

  return (
    <div className="flex-1 rounded-md p-8 border-8 border-primary lg:w-1/3 w-[90%] space-y-6 m-auto">
      <h1 className="font-primetime text-primary text-xl">
        If you are interested in supporting us, send us your donations down
        below.
      </h1>
      <DonationProgress
        current={accumulated}
        target={total}
        totalDonations={1}
      />
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
        <label htmlFor="anonymous" className="text-white font-primetime pb-1">
          Anonymous
        </label>
      </div>
      <button
        className="border-4 border-primary text-primary bg-transparent font-bold w-full p-4 pb-5 font-primetime text-xl hover:text-on_primary hover:bg-primary"
        onClick={() => deposit!(isAnonymous ? "anon" : name)}
      >
        Donate
      </button>
    </div>
  );
};

export default Donate;
