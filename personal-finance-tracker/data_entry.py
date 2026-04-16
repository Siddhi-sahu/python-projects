from datetime import datetime

date_frmt = "%d-%m-%Y"
CATEGORIES = {"I": "Income", "E": "Expense"}


def get_date(prompt, allow_default=False):
    date_str = input(prompt)
    if allow_default and not date_str:
        return datetime.today().strftime(date_frmt)

    try:
        valid_date = datetime.strptime(date_str, date_frmt)
        return valid_date.strftime(date_frmt)
    except ValueError:
        print("date format invalid, please enter the date in dd-mm-yyyy.")
        return get_date(prompt, allow_default)

def get_amount():
    try:
        amount = float(input("enter the amount : "))
        if amount <= 0:
            raise ValueError("amount must be a non-negative and non-zero value!")
        return amount
    except ValueError as e:
        print(e)
        return get_amount()


def get_category():
    category = input("enter the category ('I' for Income or 'E' for Expense): ").upper()
    if category in CATEGORIES:
        return CATEGORIES[category]
    print("invalid category. enter the category ('I' for Income or 'E' for Expense) ")
    return get_category()

def get_description():
    return input("enter a description: ")