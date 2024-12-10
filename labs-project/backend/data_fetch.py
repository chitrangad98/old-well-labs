import csv
import os
from datetime import datetime, date
from models import PriceData

# Load CSV data 
data = []
csv_path = os.path.join(os.path.dirname(__file__), "stock-data.csv")
with open(csv_path, "r", newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        record = PriceData(
            name=row["name"].strip(),
            asof=datetime.strptime(row["asof"].strip(), "%m/%d/%Y").date(),
            volume=int(row["volume"].strip()),
            close_usd=float(row["close_usd"]),
            sector_level1=row["sector_level1"].strip(),
            sector_level2=row["sector_level2"].strip(),
        )
        data.append(record)

def get_all_assets_details():
    # Dictionary to store the latest info by asset name
    latest_data_by_asset = {}
    for item in data:
        # If this asset isn't recorded yet or the date is more recent
        if item.name not in latest_data_by_asset or item.asof > latest_data_by_asset[item.name]['date']:
            latest_data_by_asset[item.name] = {
                'date': item.asof,
                'close_usd': item.close_usd
            }

    # Convert to a list and sort by asset name
    assets_details = [
        {"name": name, "latest_close_usd": info['close_usd']}
        for name, info in latest_data_by_asset.items()
    ]
    assets_details.sort(key=lambda x: x['name'])
    return assets_details


def get_asset_data(asset_name: str):
    return [item for item in data if item.name.lower() == asset_name.lower()]

def get_cumulative_return(asset_name: str, start_date: date, end_date: date):
    asset_prices = get_asset_data(asset_name)
    filtered = [p for p in asset_prices if start_date <= p.asof <= end_date]
    if len(filtered) < 2:
        return None
    filtered.sort(key=lambda x: x.asof)
    start_price = filtered[0].close_usd
    end_price = filtered[-1].close_usd
    if start_price == 0:
        return None
    return (end_price / start_price) - 1.0
