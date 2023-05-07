import { FC } from "react";
import { formatEther } from "ethers";

interface DonationProgressProps {
  current: bigint;
  target: bigint;
  totalDonations: number;
}

const DonationProgress: FC<DonationProgressProps> = ({
  current,
  target,
  totalDonations = 0,
}) => {
  console.log(formatEther(current), formatEther(target));
  return (
    <div className="w-full relative rounded-full h-7 bg-white overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-primary"
        style={{ width: `${(current / target) * BigInt("100")}%` }}
      />
      <p className="text-on_primary font-primetime relative z-4 text-center block w-full">
        <span className="font-sans font-extrabold">{totalDonations}</span>{" "}
        <span>donation{totalDonations !== 1 && "s"}</span>
      </p>
    </div>
  );
};

export default DonationProgress;
