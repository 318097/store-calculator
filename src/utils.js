/* eslint-disable no-useless-escape */
const REG_EXP = {
  INPUT: /\$\{\w+:\w+\}/gi,
  OPERATOR: /[+\-*\/]/gi,
  CONSTANT: /\d/gi
};

const breakVariable = variable => {
  const parsedVariable = variable.replace(/[\$\{\}]/g, "");
  const [placeholder, key] = parsedVariable.split(":");
  return { placeholder, key };
};

export { REG_EXP, breakVariable };
