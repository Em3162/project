import asyncio
import websockets
import pandas as pd
from utils import *

airports = load_csv()


async def hello(websocket, path):  # Async allows for await
    try:
        name = await websocket.recv()  # First message received is NAME, waits to receive first
        print(name, "connected successfully")
        while True:  # True until the server shuts down or client disconnects

            text = await websocket.recv()  # Waits for any message

            if text == "close":  # If the message is close
                exit()  # Then close the server

            elif text == "update":
                await websocket.send(update(airports)) # Sending temp to client
                # Processed, formatted and sent data back to client

            elif text == "Search": #Search info
                search = await websocket.recv() #Waiting to recieve data
                await websocket.send(get_flights(search.split(",")))
    except websockets.exceptions.ConnectionClosedOK:
        print(name,"disconnected successfully")


start_sever = websockets.serve(hello, "localhost", 8760)  # Sets up server with IP and port

asyncio.get_event_loop().run_until_complete(start_sever)  # Starts the server
asyncio.get_event_loop().run_forever()  # Keeps the server waiting for more clients

import os
os.system("pip install --trusted-host pypi.org --user --trusted-host files.pythonhosted.org websockets")

