import Banner from "../assets/banner.png";
import BossPaayos from "../assets/bosspaayos.png";
import SwiftFix from "../assets/swiftfix.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Project = () => {
  return (
    <section className="flex-flex-col lg:w-3/5 w-full">
      <img src={Banner} alt="Logo" className="rounded-[2rem] min-[320px]:w-full" />
      <div className="py-8 lg:px-8 px-6">
        <div className="flex flex-row items-center">
          <img src={BossPaayos} width={'40px'} />
          <img src={SwiftFix} width={'40px'} />
          <p className="mx-3 text-white xl:text-xl">SwiftFix is organizing this fundraiser to help BossPaayos flourish.</p>
          <FontAwesomeIcon icon={faCheckCircle} style={{color: "#1f991d"}} />
        </div>
        <div className="flex justify-start items-center text-white text-opacity-50 space-x-8 text-xl py-6 border-y-[1px] border-light my-8">
          <p>Created last May 08, 2023</p>
          <p>•</p>
          <p className="underline">Start-Up Business</p>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-white text-xl">
            BossPaayos aims to give the finest quality of service for repairs,
            maintenance, cleaning, modding, and fixing for computers and laptops
            in the confines of the computer or laptop owner's home.
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
