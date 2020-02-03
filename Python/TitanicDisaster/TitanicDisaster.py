#Data Processing
import pandas as pd

#Linear Algebra
import numpy as np

#Data Visualization
import seaborn as sns
from matplotlib import pyplot as plt
from matplotlib import style

#Algorithms
from sklearn import linear_model
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import Perceptron
from sklearn.linear_model import SGDClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC, LinearSVC
from sklearn.naive_bayes import GaussianNB


df = pd.read_csv(r"Python\TitanicDisaster\titanic.csv")

#df.info()

survived = 'Survived'
not_survived = 'Not Survived'
fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(10,4))
women = df[df['Sex'] == 'female']
men = df[df['Sex'] == 'male']
ax = sns.distplot(women[women['Survived'] == 1].Age.dropna(), bins=18, label = survived, ax = axes[0], kde = False)

ax = sns.distplot(women[women['Survived'] == 0].Age.dropna(), bins=40, label=not_survived, ax=axes[0], kde=False)

ax.legend()
ax.set_title('Female')

ax = sns.distplot(men[men['Survived'] == 1].Age.dropna(), bins=18, label = survived, ax = axes[1], kde = False)
ax = sns.distplot(men[men['Survived'] == 0].Age.dropna(), bins=40, label = not_survived, ax = axes[1], kde = False)

ax.legend()
_ = ax.set_title('Male')
