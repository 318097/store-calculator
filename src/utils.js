const REG_EXP = {
  INPUT: /\$\{\w+:\w+\}/,
  OPERATOR: /[+\-*\/]/,
  CONSTANT: /\d/
};

const breakVariable = variable => {
  const parsedVariable = variable.replace(/[\$\{\}]/g, "");
  const [placeholder, key] = parsedVariable.split(":");
  return { placeholder, key };
};

export { REG_EXP, breakVariable };
