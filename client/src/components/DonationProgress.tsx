import { FC } from "react";
import { formatEther } from "ethers";

interface DonationProgressProps {
  current: bigint;
  target: bigint;
  totalDonations: bigint;
}

const DonationProgress: FC<DonationProgressProps> = ({
  current,
  target,
  totalDonations = 0,
}) => {
  const progress = parseFloat(formatEther(current).substring(0, 5)) / parseFloat(formatEther(target).substring(0, 5)) * 100;
  return (
    <div className="w-full relative rounded-full h-7 bg-white overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-primary"
        style={{ width: `${progress}%` }}
      />
      <p className="text-on_primary font-primetime relative z-4 text-center block w-full">
        <span className="font-sans font-extrabold">
          {totalDonations.toString()}
        </span>{" "}
        <span>donation{totalDonations !== BigInt("1") && "s"}</span>
      </p>
    </div>
  );
};

export default DonationProgress;
