"use client";

import React from "react";

interface Props {
  onReset: () => void;
}

const ResetDatabase: React.FC<Props> = ({ onReset }) => {
  return (
    <div className="reset-section">
      <button onClick={onReset}>Reset Database</button>
    </div>
  );
};

export default ResetDatabase;
