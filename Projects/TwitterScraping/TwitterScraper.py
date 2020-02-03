from twitterscraper import query_tweets
import datetime as dt
import pandas as pd

begin_date = dt.date(2020,1,2)
end_date = dt.date(2020,1,20)

limit = 1000
lang = 'english'

tweets = query_tweets("impeachment", begindate = begin_date, enddate = end_date, limit = limit, lang = lang)

df = pd.DataFrame(t.__dict__ for t in tweets)
