import pandas as pd
import haversine as hs
import units
import datetime as dt
import math

class Airport:
    def __init__(self, name, lat, long):
        self.name = name
        self.loc = (lat, long)

class Flight:
    def __init__(self, depart_time, arrival_time):
        self.depart_time = depart_time
        self.arrival_time = arrival_time
        # self.price =

def update(airlist):
    # Client requests dropdown
    airports = ""
    for airport in airlist:  # Cycles through columns read from database.csv
        airports += airport.name + ","  # Adds all the columns to the variable separated by commas
    airports = airports[:-1]  # Takes off the last comma for formatting
    return airports


def load_csv():
    df = pd.read_csv("database.csv")  # Reads database.csv file and understands
    airports = {}
    for row in range (0, len(df["Places"])):
        airports[df["Places"][row]] = Airport(df["Places"][row], df["Latitude"][row], df["Longitude"][row])
    return airports

def get_flights(search):
    airports = load_csv()
    depart = airports[search[6]]
    arrival = airports[search[7]]
    duration = math.trunc(hs.haversine(depart.loc, arrival.loc, unit=hs.Unit.MILES)) / 560 # Trunc rounds down, time = distance/speed (560mph avg plane speed)
    print(duration)
    for i in range(0, 24):
        depart_dt = dt.datetime(int(search[8].split("-")[0]), int(search[8].split("-")[1]), int(search[8].split("-")[2]), i, 0)
        arrival_dt = dt.datetime(int(search[8].split("-")[0]), int(search[8].split("-")[1]), int(search[8].split("-")[2]) + int((i + int(math.trunc(duration + 0.5))) / 24), (i + int(math.trunc(duration + 0.5))) % 24, int(math.trunc(((duration + 0.5) % 1) * 60)) + 30)
        print(((arrival_dt - depart_dt).hour + (arrival_dt - depart_dt).minutes * 60) * price)
        print("")
    return "aaa"

if __name__ == "__main__":
    get_flights("1,2,3,4,5,6,Dublin,London,2021-03-18".split(","))
