import requests 
from datetime import datetime

user_api = "d5d2be7dae1912e48d2cbf55ba4471bd"
location = input("Enter the city name: ")


complete_api_link = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+user_api

api_link = requests.get(complete_api_link)
api_data = api_link.json()
print (api_data)

if api_data['cod'] == '404':
    print ("Invalid City: {}".format(location))
else:
    temp_city = ((api_data['main']['temp']) - 273.15)
    weather_desc = api_data['weather'][0]['description']
    hmdst = api_data['main']['humidity']
    wind_spd = api_data['wind']['speed']
    date_time = datetime.now().strftime("%d %b %Y | %I:%M:%S %p")

    print ("----------------------------------------------------------------")
    print ("Weather Stats for - {} || {}".format(location.upper(), date_time))
    print ("----------------------------------------------------------------")

    print ("Current temperature is: {:2f} deg C".format(temp_city))
    print ("Current weather desc :",weather_desc)
    print ("Current Humidity    :",hmdst, "%")
    print ("Current wind speed   :",wind_spd, 'kmph')