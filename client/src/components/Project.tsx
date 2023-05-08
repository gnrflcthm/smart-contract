import logo from "../assets/bp.png";

const Project = () => {
  return (
    <section className="flex-flex-col w-3/5">
      <div className="bg-black w-full rounded-[2rem] h-96"></div>
      <div className="p-8">
        <div>
          <div className="rounded-full h-8 w-8 bg-red-500" />
        </div>
        <div className="flex justify-start items-center text-white text-opacity-50 space-x-8 text-xl py-6 border-y-[1px] border-light my-8">
          <p>Created last May 08, 2023</p>
          <p>⚪</p>
          <p className="underline">Start-Up Business</p>
        </div>
        <div className="flex-flex-col space-y-4">
          <p className="text-white text-xl">
            BossPaayos aims to give the finest quality of service for repairs,
            maintenance, cleaning, modding, and fixing for computers and laptops
            in the confines of the computer or laptop owner's home. \
          </p>
          <p className="text-white text-xl">
            To help those in need of technical assistance and get jobs done with
            time efficiency in a wide area of operation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Project;
