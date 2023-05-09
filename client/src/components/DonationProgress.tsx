import { FC } from "react";
import { formatEther } from "ethers";

interface DonationProgressProps {
  current: bigint;
  target: bigint;
  targetReached: boolean;
  totalDonations: bigint;
}

const DonationProgress: FC<DonationProgressProps> = ({
  current,
  target,
  targetReached = false,
  totalDonations = 0,
}) => {
  console.log(current, target);
  const progress =
    (parseFloat(formatEther(current).substring(0, 5)) /
      parseFloat(formatEther(target).substring(0, 5))) *
    100;
  return (
    <div className="w-full relative rounded-full py-3 bg-white overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-primary"
        style={{ width: `${targetReached ? 100 : progress}%` }}
      />
      <p className="text-on_primary font-primetime relative z-4 text-center block w-full font-bold uppercase">
        {targetReached ? (
          <span>Target Reached</span>
        ) : (
          <>
            {totalDonations.toString()}{" "}
            <span>donation{totalDonations !== BigInt("1") && "s"}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default DonationProgress;
