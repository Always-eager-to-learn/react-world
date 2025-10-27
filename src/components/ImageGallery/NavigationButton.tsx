import { DynamicIcon } from "lucide-react/dynamic";
import { toTitleCase } from "../../scripts/Character";

interface Props {
  text: string | null | undefined;
  icon: "chevron-right" | "chevron-left";
  direction: "prev" | "next";
  columnPosition: "col-start-3" | "col-start-1";
  functionOnClick: (nameValue: string) => void;
  stateSetterFunction: () => void;
}

const NavigationButton = ({
  text,
  icon,
  direction,
  columnPosition,
  functionOnClick,
  stateSetterFunction,
}: Props) => {
  function changeParam(text: string | null | undefined) {
    if (text) {
      functionOnClick(text);
      stateSetterFunction();
    }
  }

  return (
    <>
      {text !== undefined && text !== null ? (
        <button
          className={`${columnPosition} row-start-1  bg-[#FDF0D5] sm:p-3.5 max-sm:p-1.5 rounded-3xl self-end justify-center cursor-pointer items-center group hover:bg-[#313131] hover:text-[#FDF0D5] transition-[background-color, outline, outline-color, color, transform] duration-200 ease-out active:scale-90 flex sm:gap-3.5 max-sm:gap-1.5 ${direction === "prev" ? "flex-row-reverse" : "flex-row"} hover:outline-2 hover:outline-[#FDF0D5]`}
          onClick={() => changeParam(text)}
        >
          <p className="sm:text-xl max-sm:text-lg">
            To the {direction} page ({toTitleCase(text)})
          </p>
          <DynamicIcon name={icon} size={33} />
        </button>
      ) : null}
    </>
  );
};

export default NavigationButton;
