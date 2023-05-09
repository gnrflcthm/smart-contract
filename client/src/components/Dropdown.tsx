import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { CurrencyUnits } from "../utilities/Web3Provider";

interface DropdownProps {
  defaultIndex?: number;
  choices: { [value: string]: string };
  onSelect: React.Dispatch<React.SetStateAction<CurrencyUnits>>;
}

const Dropdown: FC<DropdownProps> = ({
  defaultIndex = 0,
  choices,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [curent, setCurrent] = useState(Object.keys(choices)[defaultIndex]);

  useEffect(() => {
    onSelect(curent as CurrencyUnits);
  }, [curent, onSelect]);

  return (
    <div
      className="h-full relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((val) => !val)}
        className="w-full rounded-r-lg bg-primary text-white text-lg p-3 border border-light my-2 text-start flex justify-start space-x-2 items-center"
      >
        <FontAwesomeIcon icon={faEthereum} />
        <span>{choices[curent]}</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col absolute top-[101%] right-0 w-fit lg:w-full rounded-[1rem] divide-solid divide-light divide-y border border-light bg-[#1E1E1E] text-white overflow-hidden`}
      >
        {Object.keys(choices).map((key, i) => (
          <button
            type="button"
            onClick={() => {
              setCurrent(key);
              setIsOpen(false);
            }}
            key={i}
            className="py-1 px-3 text-lg text-start text-white text-opacity-50 hover:bg-primary hover:text-white transition-colors duration-250 flex"
          >
            <FontAwesomeIcon icon={faEthereum} className="mr-2" />
            {choices[key]}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
