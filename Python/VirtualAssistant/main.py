import webbrowser
import speech_recognition
import pyttsx3
import wikipedia
import datetime
#import pyaudio


def takeCommand():

    recog = speech_recognition.Recognizer()

    with speech_recognition.Microphone() as source:
        print("Listening")

        recog.pause_threshold = 0.5
        audio = recog.listen(source)


        try:
            print("Recognizing")


            Query = recog.recognize_google(audio, language='en-US')
            print("printed command = ", Query)

        except Exception as e:
            print(e)
            print("Say that again sir")
            return "None"

        return Query

def speak(audio):

    engine = pyttsx3.init()

    voices = engine.getProperty('voices')

    engine.setProperty('voices', voices[0].id)

    engine.say(audio)

    engine.runAndWait()


def tellDay():

    day = datetime.satetime.today().weekday() + 1

    day_dict = {1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday',
                7: 'Sunday'}

    if day in day_dict.keys():
        actual_day = day_dict[day]
        print(actual_day)
        speak("The day is " + actual_day)

def tellTime():

    time = str(datetime.datetime.now())

    print(time)
    hour = time[11:13]
    min = time[14:16]
    speak(self, "The time is " + hour + " hours and" + min + "minutes")

def Hello():

    speak("Hello sir, I am your Robotic Useful Static Technical Interface or Rusti for short. How can I help you?")

def take_query():

    Hello()

    while(True):

        query = takeCommand().lower()
        if "open google" in query:
            speak("Opening Google ")
            webbrowser.open("www.google.com")
            continue

        elif "open leetcode" in query:
            speak("Opening Leetcode ")
            webbrowser.open("www.leetcode.com")
            continue

        elif "what day is it" in query:
            tellDay()
            continue
        
        elif "what is the time" in query:
            tellTime()
            continue

        elif "bye" in query:
            speak("Good day sir")
            exit()

        elif "tell me your name" in query:
            speak("I am your robotic useful static technical interface, or Rusti for short ")
        
        """elif "add to my calendar" in query:
            addCalendar()
            continue"""

        """elif "remove from my calendar" in query:
            removeCalendar()
            continue"""

        """elif "tell me my schedule" in query:
            schedule()
            continue"""


if __name__ == '__main__':

    take_query()
