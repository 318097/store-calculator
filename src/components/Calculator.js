/* eslint-disable no-eval */
/* eslint-disable no-useless-escape */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect, Fragment } from "react";
import { Input, Button } from "antd";
import uuid from "uuid";

const input = "${var1:key1} * 100";

const REG_EXP = {
  input: /\$\{\w+:\w+\}/,
  operator: /[+\-*\/]/,
  constant: /\d/
};

const getKey = variable => {
  let parsedVariable = variable.replace(/[\$\{\}]/g, "");
  const [, key] = parsedVariable.split(":");
  return key;
};

const Calculator = () => {
  const [output, setOutput] = useState([]);
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    const parseInput = () => {
      const tokens = input.split(" ");

      const result = tokens.map(token => {
        if (token.match(REG_EXP.input)) {
          const key = getKey(token);
          console.log(token, key);
          return { type: "INPUT", key };
        } else if (token.match(REG_EXP.operator))
          return { type: "OPERATOR", value: token };
        else if (token.match(REG_EXP.constant))
          return { type: "CONSTANT", value: token };
      });
      setOutput(result);
    };
    parseInput();
  }, []);

  const setInput = (key, value) =>
    setInputData(prev => ({ ...prev, [key]: value }));

  const calculate = () => {
    const variables = input.match(REG_EXP.input);
    let expression = input;
    variables.forEach(variable => {
      const key = getKey(variable);

      const variableValue = inputData[key];
      console.log(variableValue);
      expression = expression.replace(variable, variableValue);
    });
    console.log(expression);
    setResult(eval(expression));
  };

  return (
    <div>
      {output.map(({ type, key, value }) => {
        switch (type) {
          case "INPUT":
            return (
              <Input
                style={{ width: "50px" }}
                value={inputData[key]}
                onChange={({ target: { value } }) => setInput(key, value)}
              />
            );
          case "OPERATOR":
            return <span className="operator">{value}</span>;
          case "CONSTANT":
            return <span className="constant">{value}</span>;
          default:
            return <Fragment />;
        }
      })}
      <Button onClick={calculate}>Calculate</Button>
      <div>
        Result: <span>{result}</span>
      </div>
    </div>
  );
};

export default Calculator;
