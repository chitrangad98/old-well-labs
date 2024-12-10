from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import date

from models import PriceData, AssetSummary, CumulativeReturnResult
from data_fetch import get_all_assets_details, get_asset_data, get_cumulative_return

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/assets", response_model=List[AssetSummary])
def list_assets():

    return get_all_assets_details()

@app.get("/assets/{asset_name}", response_model=List[PriceData])
def list_asset_data(asset_name: str):
    asset_data = get_asset_data(asset_name)
    if not asset_data:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset_data

@app.get("/assets/{asset_name}/cumulative_return", response_model=CumulativeReturnResult)
def asset_cumulative_return(asset_name: str, start_date: date, end_date: date):
    cumulative_return = get_cumulative_return(asset_name, start_date, end_date)
    if cumulative_return is None:
        raise HTTPException(status_code=404, detail="Not enough data for given date range or asset not found")
    return CumulativeReturnResult(
        asset=asset_name,
        start_date=start_date,
        end_date=end_date,
        cumulative_return=cumulative_return
    )
