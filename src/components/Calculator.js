/* eslint-disable no-eval */
/* eslint-disable no-useless-escape */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";

import { REG_EXP, breakVariable } from "../utils";
import FormulaPreview from "./FormulaPreview";

const Calculator = () => {
  const [formula, setFormula] = useState("${var1:key1} * 100");
  const [variables, setVariables] = useState([]);
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    const extractVariables = () => {
      const tokens = formula.split(" ");
      const result = [];
      tokens.forEach(token => {
        if (token.match(REG_EXP.INPUT)) {
          const { key, placeholder } = breakVariable(token);
          result.push({ key, placeholder });
        }
      });
      setVariables(result);
    };
    extractVariables();
  }, []);

  const setInput = (key, value) =>
    setInputData(prev => ({ ...prev, [key]: value }));

  const calculate = () => {
    const variables = formula.match(REG_EXP.INPUT);
    let expression = formula;
    variables.forEach(variable => {
      const { key } = breakVariable(variable);
      const variableValue = inputData[key];
      expression = expression.replace(variable, variableValue);
    });
    console.log("final expression:", expression);
    setResult(eval(expression));
  };

  return (
    <section id="calculator">
      <h3 className="formula">
        Formula:{" "}
        <Input
          className="formula-input"
          value={formula}
          onChange={({ target: { value } }) => setFormula(value)}
        />
      </h3>
      {variables.map(({ key, placeholder }, i) => (
        <Input
          key={i}
          placeholder={placeholder.toUpperCase()}
          className="variable-input"
          style={{ width: "70px" }}
          value={inputData[key]}
          onChange={({ target: { value } }) => setInput(key, value)}
        />
      ))}
      <h3 className="formula-preview">
        {<FormulaPreview formula={formula} />}
      </h3>
      <Button onClick={calculate}>Calculate</Button>
      <div className="formula-result">
        Result: <span>{result}</span>
      </div>
    </section>
  );
};

export default Calculator;
