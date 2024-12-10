import React from "react";

function AssetList({ assets, onSelect }) {
  return (
    <div>
      <h2>All Assets with Latest Close in USD</h2>
      <ul>
        {assets.map((a) => (
          <li
            key={a.name}
            style={{ cursor: "pointer", color: "brown" }}
            onClick={() => onSelect(a.name)}
          >
            <strong>{a.name}</strong> : ${a.latest_close_usd}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssetList;
