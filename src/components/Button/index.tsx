import { Dispatch } from "react";

import { Action, ActionTypes, TextTypes } from "../../hooks/useCalc";

export enum VariantTypes {
  DEFAULT = "default",
  OPERATION = "operation",
  NUMERIC = "numeric",
  MISC = "misc",
}

interface Props {
  text: TextTypes;
  variant: VariantTypes;
  dispatch: Dispatch<Action>;
  type: ActionTypes;
}

export default function Button({ text, variant, type, dispatch }: Props) {
  const setVariant = (variant: VariantTypes) => {
    switch (variant) {
      case VariantTypes.DEFAULT:
        return "bg-slate-300 hover:bg-slate-300/90 focus:bg-slate-300/90 text-slate-900";
      case VariantTypes.OPERATION:
        return `bg-orange-500 hover:bg-orange-500/90 text-white ${
          text === TextTypes.EQUALS
            ? ""
            : "focus:bg-white focus:text-orange-500"
        }`;
      case VariantTypes.NUMERIC:
        return "bg-transparent/40 hover:bg-transparent/60 focus:bg-transparent/60 text-white";
      case VariantTypes.MISC:
        return "bg-slate-900 hover:bg-slate-900/70 focus:bg-slate-900/70 text-white";
      default:
        return "bg-transparent text-white";
    }
  };

  return (
    <button
      className={`p-2 ${setVariant(variant)} border border-inherit text-xl`}
      onClick={() => dispatch({ type, payload: text })}
    >
      {text}
    </button>
  );
}
