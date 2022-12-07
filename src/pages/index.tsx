import Head from "next/head";

import Button, { VariantTypes } from "../components/Button";
import useCalc, { ActionTypes, TextTypes } from "../hooks/useCalc";

export default function Home() {
  const [{ currentValue, prevValue, operator, error }, dispatch] = useCalc();

  const setOperator = (operator: string) => {
    switch (operator) {
      case TextTypes.ROOT:
        return "√";
      case TextTypes.POWER:
        return "ˆ";
      default:
        return operator;
    }
  };

  return (
    <>
      <Head>
        <title>Calculadora</title>
      </Head>

      <div className="h-screen grid place-items-center">
        <div className="bg-slate-600  rounded p-2">
          <div className="flex flex-col items-end justify-end bg-transparent min-h-[52px] px-1">
            <p className="text-sm text-slate-300">{`${
              operator === TextTypes.ROOT ? setOperator(operator) : ""
            } ${prevValue}${
              operator !== TextTypes.ROOT ? setOperator(operator) : ""
            }`}</p>
            <p className="text-2xl text-white">
              {error ? "ERRO" : currentValue}
            </p>
          </div>
          <div className="grid grid-cols-6  mt-2">
            <Button
              text={TextTypes.SIN}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.INVERT}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.RESET}
              variant={VariantTypes.DEFAULT}
              dispatch={dispatch}
              type={ActionTypes.CLEAR}
            />
            <Button
              text={TextTypes.PLUSMINUS}
              variant={VariantTypes.DEFAULT}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.PERCENT}
              variant={VariantTypes.DEFAULT}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.DIVIDES}
              variant={VariantTypes.OPERATION}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.COS}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.POWER}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.SEVEN}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.EIGHT}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.NINE}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.TIMES}
              variant={VariantTypes.OPERATION}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.TAN}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.SQUARE}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.FOUR}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.FIVE}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.SIX}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.MINUS}
              variant={VariantTypes.OPERATION}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.PI}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.SQRT}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.ONE}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.TWO}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.THREE}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.PLUS}
              variant={VariantTypes.OPERATION}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.FACTORIAL}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.ROOT}
              variant={VariantTypes.MISC}
              dispatch={dispatch}
              type={ActionTypes.CHOOSE_OPERATION}
            />
            <Button
              text={TextTypes.ZERO}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.COMMA}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.ADD_DIGIT}
            />
            <Button
              text={TextTypes.DEL}
              variant={VariantTypes.NUMERIC}
              dispatch={dispatch}
              type={ActionTypes.DELETE_DIGIT}
            />
            <Button
              text={TextTypes.EQUALS}
              variant={VariantTypes.OPERATION}
              dispatch={dispatch}
              type={ActionTypes.EVALUATE}
            />
          </div>
        </div>
      </div>
    </>
  );
}
