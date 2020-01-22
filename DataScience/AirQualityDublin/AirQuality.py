import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import plotly.express as px

dublin = pd.read_csv('DublinCityCouncilCO2011.csv') #names = ['Date','Time', 'CO mg/m3','8 hr roling avg'])
print(dublin.head())

#fig = px.line(dublin, x = 'CO mg/m3', y = 'Date', title = 'CO Increase')
fig = px.scatter(dublin, x="CO mg/m3", y="Date")
fig.show()




#sns.lmplot(x = 'Date', y = 'Time',
#            data = dublin, 
#            fit_reg=False,
#            hue = 'Stage')