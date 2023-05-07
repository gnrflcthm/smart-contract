import logo from "../assets/bp.png";

const Project = () => {
  return (
    <div className="flex flex-col justify-center space-y-4 lg:w-2/3 w-full">
      <div className="object-cover w-3/5 lg:w-1/2 relative m-auto">
        <img src={logo} alt="BossPaayos Logo" className="relative w-full" />
      </div>
      <div className="flex flex-col text-primary space-y-4 w-[90%] m-auto">
        <h1 className="font-bold text-2xl font-primetime text-center">
          An On-Demand Computer Maintenance and Repair Service
        </h1>
        <p className="indent-8 text-justify">
          BossPaayos aims to give the finest quality of service for repairs,
          maintenance, cleaning, modding, and fixing for computers and laptops
          in the confines of the computer or laptop owner’s home. To help those
          in need of technical assistance and get jobs done with time efficiency
          in a wide area of operation.
        </p>
      </div>
    </div>
  );
};

export default Project;
