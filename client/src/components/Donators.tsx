import Donator from "../assets/donator.png";

const Donators = () => {
  return (
    <section className="flex flex-col bg-primary_bg rounded-[2rem] p-8 h-fit space-y-4 my-5">
      <p className="text-white font-bold">Recent Donations</p>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center py-4 border-b border-light">
          <img src={Donator} alt="donator" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col px-5">
            <p className="text-white">Juan Dela Cruz</p>
            <div className="flex flex-row space-x-2">
              <p className="text-white">3 ETH</p>
              <p>⚪</p>
              <p className="text-white">5 secs</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center py-4 border-b border-light">
          <img src={Donator} alt="donator" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col px-5">
            <p className="text-white">Anonymous</p>
            <div className="flex flex-row space-x-2">
              <p className="text-white">3 ETH</p>
              <p>⚪</p>
              <p className="text-white">5 secs</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-primary rounded-xl text-white text-lg p-3 border border-primary hover:text-primary hover:bg-transparent transition-all duration-250 my-2">
          SEE ALL
        </button>
      </div>
    </section>
  );
};

export default Donators;
