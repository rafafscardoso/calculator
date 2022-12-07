import { useReducer } from "react";

export enum ActionTypes {
  ADD_DIGIT = "add_digit",
  CHOOSE_OPERATION = "choose_operation",
  CLEAR = "clear",
  DELETE_DIGIT = "delete_digit",
  EVALUATE = "evaluate",
}

export enum TextTypes {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  ZERO = "0",
  COMMA = ".",
  PLUS = "+",
  MINUS = "−",
  TIMES = "×",
  DIVIDES = "÷",
  EQUALS = "=",
  PERCENT = "%",
  PLUSMINUS = "∓",
  POWER = "xˆy",
  SQUARE = "x²",
  INVERT = "1/x",
  SQRT = "√x",
  ROOT = "y√x",
  DEL = "DEL",
  RESET = "AC",
  SIN = "sin",
  COS = "cos",
  TAN = "tan",
  PI = "∏",
  FACTORIAL = "n!",
}

interface State {
  currentValue: string;
  prevValue: string;
  operator: string;
  overwrite: boolean;
  error: boolean;
}

export interface Action {
  type: ActionTypes;
  payload: string;
}

const initialState: State = {
  currentValue: "0",
  prevValue: "",
  operator: "",
  overwrite: false,
  error: false,
};

const evaluate = ({ currentValue, prevValue, operator }: State) => {
  const current = parseFloat(currentValue);
  const prev = parseFloat(prevValue);

  if (isNaN(current) || isNaN(prev)) {
    return "";
  }

  switch (operator) {
    case TextTypes.PLUS:
      if (isNaN(prev)) {
        return "";
      }
      return (prev + current).toString();
    case TextTypes.MINUS:
      return (prev - current).toString();
    case TextTypes.TIMES:
      return (prev * current).toString();
    case TextTypes.DIVIDES:
      return (prev / current).toString();
    case TextTypes.POWER:
      return Math.pow(prev, current).toString();
    case TextTypes.ROOT:
      return Math.pow(prev, 1 / current).toString();
    default:
      return "";
  }
};

const round = (value: number) => {
  if (value > 0 && 1 - value < 0.0000001) return 1;
  if (value > 0 && value - 0 < 0.0000001) return 0;
  if (value < 0 && value + 1 < 0.0000001) return -1;
  if (value < 0 && 0 - value < 0.0000001) return 0;
  return value;
};

const factorialize = (value: number): number => {
  if (value < 0) return -1;
  else if (value == 0) return 1;
  else {
    return value * factorialize(value - 1);
  }
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ActionTypes.CLEAR:
      return initialState;
    case ActionTypes.ADD_DIGIT:
      if (payload === TextTypes.PI) {
        return {
          ...state,
          currentValue: Math.PI.toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.INVERT) {
        return {
          ...state,
          currentValue: (1 / parseFloat(state.currentValue)).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.PLUSMINUS) {
        return {
          ...state,
          currentValue: (-1 * parseFloat(state.currentValue)).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.SIN) {
        return {
          ...state,
          currentValue: round(
            Math.sin(parseFloat(state.currentValue))
          ).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.COS) {
        return {
          ...state,
          currentValue: round(
            Math.cos(parseFloat(state.currentValue))
          ).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.TAN) {
        return {
          ...state,
          currentValue: round(
            Math.tan(parseFloat(state.currentValue))
          ).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.SQUARE) {
        return {
          ...state,
          currentValue: Math.pow(parseFloat(state.currentValue), 2).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.SQRT) {
        return {
          ...state,
          currentValue: Math.sqrt(parseFloat(state.currentValue)).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.FACTORIAL) {
        if (state.currentValue.includes(".")) {
          return {
            ...state,
            error: true,
            operator: initialState.operator,
            overwrite: true,
            currentValue: initialState.currentValue,
            prevValue: initialState.prevValue,
          };
        }
        return {
          ...state,
          currentValue: factorialize(parseFloat(state.currentValue)).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (payload === TextTypes.PERCENT) {
        if (
          state.operator === TextTypes.PLUS ||
          state.operator === TextTypes.MINUS
        ) {
          return {
            ...state,
            error: false,
            overwrite: true,
            currentValue: (
              (parseFloat(state.currentValue) * parseFloat(state.prevValue)) /
              100
            ).toString(),
          };
        }
        return {
          ...state,
          currentValue: (parseFloat(state.currentValue) / 100).toString(),
          overwrite: true,
          error: false,
        };
      }

      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload,
          overwrite: false,
          error: false,
        };
      }

      if (payload === TextTypes.ZERO && state.currentValue === TextTypes.ZERO) {
        return { ...state, error: false };
      }

      if (
        payload === TextTypes.COMMA &&
        state.currentValue.includes(TextTypes.COMMA)
      ) {
        return { ...state, error: false };
      }

      if (
        payload !== TextTypes.ZERO &&
        payload !== TextTypes.COMMA &&
        state.currentValue === TextTypes.ZERO
      ) {
        return {
          ...state,
          currentValue: payload,
          error: false,
        };
      }

      return {
        ...state,
        currentValue: `${state.currentValue}${payload}`,
      };
    case ActionTypes.CHOOSE_OPERATION:
      if (state.currentValue === "" && state.prevValue === "") {
        return state;
      }

      if (state.currentValue === "") {
        return {
          ...state,
          operator: payload,
        };
      }

      if (state.prevValue === "") {
        return {
          ...state,
          operator: payload,
          prevValue: state.currentValue,
          currentValue: initialState.currentValue,
        };
      }

      return {
        ...state,
        prevValue: evaluate({ ...state }),
        operator: payload,
        currentValue: initialState.currentValue,
      };
    case ActionTypes.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: initialState.currentValue,
        };
      }

      return {
        ...state,
        currentValue:
          state.currentValue.slice(0, -1) || initialState.currentValue,
      };
    case ActionTypes.EVALUATE:
      if (
        state.operator === "" ||
        state.currentValue === "" ||
        state.prevValue === ""
      ) {
        return state;
      }

      return {
        ...state,
        prevValue: initialState.prevValue,
        operator: initialState.operator,
        overwrite: true,
        currentValue: evaluate({ ...state }),
      };
    default:
      return state;
  }
};

export default function useCalc() {
  return useReducer(reducer, initialState);
}
