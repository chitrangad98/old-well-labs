import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetList from "./components/AssetList";
import AssetDetail from "./components/AssetDetail";
import CumulativeReturnForm from "./components/CumulativeReturnForm";

function App() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/assets")
      .then((response) => setAssets(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAssetSelect = (assetName) => {
    setSelectedAsset(assetName);
    setPriceData([]);
    axios
      .get(`http://localhost:8000/assets/${assetName}`)
      .then((response) => {
        // Here, I have sorted the data from latest to oldest date
        const sortedData = [...response.data].sort(
          (a, b) => new Date(b.asof) - new Date(a.asof)
        );
        setPriceData(sortedData);
      })
      .catch((err) => {
        console.error(err);
        setPriceData([]);
      });
  };

  return (
    <div style={{ padding: "2em" }}>
      <h1>Stock Prices</h1>
      <AssetList assets={assets} onSelect={handleAssetSelect} />

      {selectedAsset && (
        <>
          <CumulativeReturnForm selectedAsset={selectedAsset} />
          <AssetDetail assetName={selectedAsset} priceData={priceData} />
        </>
      )}
    </div>
  );
}

export default App;
