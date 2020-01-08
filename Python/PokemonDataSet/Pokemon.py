import pandas as pd
import matplotlib as plt
import seaborn as sns

#Read the Dataset
df = pd.read_csv('Pokemon.csv', index_col=0)
#Display the first 5 observations
df.head()
#Scatterplot of attack and defense
sns.lmplot(x = 'Attack', y = 'Defense', data = df,
            fit_reg=False,#No Regression Line
            hue='Stage') #Color by evolution stage


#

#

#