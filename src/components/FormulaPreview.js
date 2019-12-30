import React, { Fragment } from "react";

import { REG_EXP, breakVariable } from "../utils";

const FormulaPreview = ({ formula }) => {
  const tokens = formula.split(" ");
  return (
    <Fragment>
      {tokens.map((token, index) => {
        let className,
          output = token;

        if (token.match(REG_EXP.INPUT)) {
          const { placeholder } = breakVariable(token);
          className = "variable";
          output = placeholder;
        } else if (token.match(REG_EXP.OPERATOR)) className = "operator";
        else if (token.match(REG_EXP.CONSTANT)) className = "constant";

        return (
          <span key={index} className={className}>
            {output}
          </span>
        );
      })}
    </Fragment>
  );
};
export default FormulaPreview;
