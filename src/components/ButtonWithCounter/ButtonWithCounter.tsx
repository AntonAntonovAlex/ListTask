import { memo } from "react";
import RenderCountLabel from "../RenderCountLabel/RenderCountLabel";
import useRenderCounter from "../../hooks/useRenderCounter";

const ButtonWithCounter = memo(
    ({
      onClick,
      buttonText,
      buttonClass,
    }: {
      onClick: () => void;
      buttonText: string;
      buttonClass?: string;
    }) => {
      const counter = useRenderCounter();
  
      return (
        <div className={buttonClass}>
          <button onClick={onClick}>{buttonText}</button>
          <RenderCountLabel label="Button" count={counter} />
        </div>
      );
    },
    (prevProps, nextProps) =>
      prevProps.onClick === nextProps.onClick &&
      prevProps.buttonText === nextProps.buttonText &&
      prevProps.buttonClass === nextProps.buttonClass
  );

  export default ButtonWithCounter;