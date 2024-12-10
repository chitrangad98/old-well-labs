import React from "react";

function AssetDetail({ assetName, priceData }) {
  return (
    <div>
      <h2>Price Data for {assetName}</h2>
      <table border="1" cellPadding="5" style={{ marginTop: "1em" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Close (USD)</th>
            <th>Volume</th>
            <th>Sector Level 1</th>
            <th>Sector Level 2</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((p, index) => (
            <tr key={index}>
              <td>{p.asof}</td>
              <td>{p.close_usd}</td>
              <td>{p.volume}</td>
              <td>{p.sector_level1}</td>
              <td>{p.sector_level2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetDetail;
