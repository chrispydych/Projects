import numpy as np

#training examples
#X = np.array
#Y = np.array


#activation function
def sigmoid(t):
    return 1/(1+np.exp(-t))

#derivative of sigmoid
def sigmoidDerivative(p):
    return p * (1 - p)

class NeuralNetwork:
    def __init__(self, x, y):
        self.input = xself.weights1 = 