from typing import Optional, Any, List
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from read_db import login
import os
import csv
import pandas as pd
import base64
import soundfile as sf
import io

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3000",
    "chrome-extension://piobiddnoconmfjnogfaoeahfgonlpji",
    "https://mail.google.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Text(BaseModel):
    text: str

class Answer(BaseModel):
    diagnosis: int
    cognition: int
    timeStamp: str

class Audio(BaseModel):
   audio: list
   timeStamp: str

class LoginInfo(BaseModel):
    email: str
    password: str

# structure for handling users

# Handle sending in of audio data
# Save the audio in a folder with data

# Save the audio file in a folder with a name (perhaps based on date) with a csv file with information
# Get the csv data from the forms.

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/login")
def get_user(loginInfo: LoginInfo):
    response = login(loginInfo.email, loginInfo.password)
    return response

# @app.post("/upload_audio/")
# async def create_upload_file(file: UploadFile = File(...)):
#     return {"filename": file.filename}

@app.post("/upload_audio/")
async def create_upload_file(file: UploadFile = File(...)):
    print(file)
    audio_bytes = file.file.read()
    print(audio_bytes)

    data, samplerate = sf.read(io.BytesIO(audio_bytes))
    print(data)
    print(samplerate)

    # with open('myfile2.wav', mode='bx') as f:
    #     f.write(audio_bytes)
    #print(vars(request))

    # responseJson  = await request.json()
    # print(responseJson)
    # print(audio_file.audio)
    # with open("audio.wav", "wb") as aud:
    #     aud.write(audio_file.audio[0])
    return {"audio": "audio_file"}

@app.post("/upload_answer/")
async def upload_answer(answer: Answer):
    print("the answers are", answer)
    os.mkdir(answer.timeStamp)
    path = answer.timeStamp + "/answers.csv"
    with open(path, mode='w') as result_file:
        result_writer = csv.writer(result_file, delimiter=',')
        result_writer.writerow([answer.diagnosis, answer.cognition, answer.timeStamp])
    return {"answer": answer}
