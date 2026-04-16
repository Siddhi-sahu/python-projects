from datetime import datetime
import pandas as pd
import csv 
from data_entry import get_amount, get_date, get_category, get_description
import matplotlib.pyplot as plt

class CSV:
    CSV_FILE = "finance-data.csv"
    COLUMNS=["date", "amount", "category", "description"]
    FORMAT = "%d-%m-%Y"
    
    @classmethod
    def initalise_csv(cls):
        try:
            pd.read_csv(cls.CSV_FILE)
        except FileNotFoundError:
            dataframe = pd.DataFrame(columns=cls.COLUMNS)
            dataframe.to_csv(cls.CSV_FILE, index=False)
    @classmethod
    def add_entry(cls, date, amount, category, description):
        new_entry = {
            "date": date,
            "amount": amount,
            "category": category,
            "description": description
        }
        with open(cls.CSV_FILE, "a", newline="") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=cls.COLUMNS)
            writer.writerow(new_entry)
        print("succesfully added entry.")
        
    @classmethod
    def get_transactions(cls, start_date, end_date):
        df = pd.read_csv(cls.CSV_FILE)
        df["date"] = pd.to_datetime(df["date"], format=CSV.FORMAT)
        start_date = datetime.strptime(start_date, CSV.FORMAT)
        end_date = datetime.strptime(end_date, CSV.FORMAT)

        mask = (df["date"] >= start_date) & (df["date"] <= end_date)
        filtered_df = df.loc[mask]

        if filtered_df.empty:
            print("No transactions found in the given date range.")
        else:
            print(
                f"Transactions from {start_date.strftime(CSV.FORMAT)} to {end_date.strftime(CSV.FORMAT)}"
            )
            print(
                filtered_df.to_string(
                    index=False, formatters={"date": lambda x: x.strftime(CSV.FORMAT)}
                )
            )

            total_income = filtered_df[filtered_df["category"] == "Income"]["amount"].sum()
            total_expense = filtered_df[filtered_df["category"] == "Expense"]["amount"].sum()
            
            print("\nsummary:")
            print(f"total tncome: ${total_income:.2f}")
            print(f"total expense: ${total_expense:.2f}")
            print(f"net savings: ${(total_income - total_expense):.2f}")

        return filtered_df


def add():
    CSV.initalise_csv()
    date = get_date(
        "enter the date of the transaction(dd-mm-yyyy) or enter today's date: ",
        allow_default=True,
    )
    amount = get_amount()
    category = get_category()
    description = get_description()
    CSV.add_entry(date, amount, category, description)
    
def plot_transactions(df):
    df.set_index("date", inplace=True)

    income_df = (
        df[df["category"] == "Income"]
        .resample("D")["amount"]
        .sum()
        .reindex(df.index, fill_value=0)
    )
    expense_df = (
        df[df["category"] == "Expense"]
        .resample("D")["amount"]
        .sum()
        .reindex(df.index, fill_value=0)
    )

    plt.figure(figsize=(10, 5))
    plt.plot(income_df.index, income_df, label="Income", color="g")
    plt.plot(expense_df.index, expense_df, label="Expense", color="r")
    plt.xlabel("Date")
    plt.ylabel("Amount")
    plt.title("Income and Expenses Over Time")
    plt.legend()
    plt.grid(True)
    plt.show()


def main():
    while True:
        print("\n1). add a new transaction")
        print("2). view transactions and summary within a date range")
        print("3). exit")
        choice = input("enter your choice (1-3): ")
        
        if choice == "1":
            add()
        elif choice == "2":
            start_date = get_date("enter the start date (dd-mm-yyyy): ")
            end_date = get_date("enter the end date (dd-mm-yyyy): ")
            df = CSV.get_transactions(start_date, end_date)
            if input("Do you want to see a plot? (y/n) ").lower() == "y":
                plot_transactions(df)
        elif choice == "3":
            print("exiting...")
            break
        else:
            print("invalid choice. E=enter 1, 2 or 3.")
            
if __name__ == "__main__":
    main()