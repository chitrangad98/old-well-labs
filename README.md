# old-well-labs

Submission for the Old Well Labs Assessment

- Project is a full-stack application that provides:

: A Python (FastAPI) backend that reads stock price data from a CSV file and offers RESTful endpoints.
: A React frontend that displays a list of assets, their price histories, and allows users to calculate cumulative returns over a specified date range.

- Features
  : Backend (FastAPI)
  : Data Models: Uses Pydantic models to structure the data.
  : Endpoints:

  - GET /assets: Lists all available assets along with their latest close price.
  - GET /assets/{asset_name}: Returns the price history of the specified asset (latest date first).
  - GET /assets/{asset_name}/cumulative_return?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD: Calculates and returns the cumulative return for the given asset between the specified dates.

  : Data Source: Reads directly from a CSV file

  : Frontend (React)

  - Asset List: Displays all assets and their latest close prices. Clicking on an asset fetches its full price history.
  - Price History: Shows a table of prices from the latest to the oldest date.
  - Cumulative Return Form: Allows the user to select a start and end date, then fetches and displays the cumulative return for the selected asset.
