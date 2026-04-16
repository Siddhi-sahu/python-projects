# Personal Finance Tracker

Demo video - https://youtu.be/dolpjUPhU1s
A simple command-line application to track personal income and expenses, view transaction summaries, and visualize spending patterns over time.

## Features

- **Add Transactions**: Record income and expense entries with date, amount, category, and description.
- **View Transactions**: Filter and display transactions within a specified date range.
- **Summary Reports**: Calculate total income, expenses, and net savings for the selected period.
- **Data Visualization**: Plot income and expenses over time using matplotlib.
- **CSV Storage**: All data is stored in a CSV file (`finance-data.csv`) for easy access and portability.

## Installation

1. Clone or download the project files to your local machine.
2. Ensure you have Python 3.x installed.
3. Install the required dependencies:

   ```bash
   pip install pandas matplotlib
   ```

## Usage

1. Run the main script:

   ```bash
   python main.py
   ```

2. Follow the on-screen menu:
   - **Option 1**: Add a new transaction by entering date, amount, category (Income/Expense), and description.
   - **Option 2**: View transactions and summary within a date range. Optionally, generate a plot of income and expenses.
   - **Option 3**: Exit the application.

### Example

- Adding a transaction: Enter date (dd-mm-yyyy), amount, category (I/E), and description.
- Viewing transactions: Specify start and end dates to see filtered results and summary.

## File Structure

- `main.py`: Main application script with menu and core functionality.
- `data_entry.py`: Helper functions for user input validation.
- `finance-data.csv`: CSV file where transaction data is stored.

## Requirements

- Python 3.x
- pandas
- matplotlib
