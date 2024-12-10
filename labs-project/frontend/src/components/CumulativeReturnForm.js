import React, { useState } from "react";
import axios from "axios";

function CumulativeReturnForm({ selectedAsset }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cumulativeReturn, setCumulativeReturn] = useState(null);

  const handleCumulativeReturnSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsset || !startDate || !endDate) return;

    axios
      .get(
        `http://localhost:8000/assets/${selectedAsset}/cumulative_return?start_date=${startDate}&end_date=${endDate}`
      )
      .then((response) => {
        setCumulativeReturn(response.data.cumulative_return);
      })
      .catch((err) => {
        console.error(err);
        setCumulativeReturn(null);
      });
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <h3>Calculate Cumulative Return</h3>
      <form onSubmit={handleCumulativeReturnSubmit}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "1em" }}>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginLeft: "1em" }}>
          Get Return
        </button>
      </form>
      {cumulativeReturn !== null && (
        <p style={{ marginTop: "1em" }}>
          Cumulative Return from {startDate} to {endDate}:{" "}
          <span style={{ fontWeight: "bold", color: "brown" }}>
            {(cumulativeReturn * 100).toFixed(2)}%
          </span>
        </p>
      )}
    </div>
  );
}

export default CumulativeReturnForm;
