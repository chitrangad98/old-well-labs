from pydantic import BaseModel
from datetime import date
from typing import List

class PriceData(BaseModel):
    name: str
    asof: date
    volume: int
    close_usd: float
    sector_level1: str
    sector_level2: str

class AssetSummary(BaseModel):
    name: str
    latest_close_usd: float

class CumulativeReturnResult(BaseModel):
    asset: str
    start_date: date
    end_date: date
    cumulative_return: float
