from sys import argv
import math

#Christopher Pydych
#4/11/2022

#Coffee Shop Program
def coffee():
    dict = {
        "small" : 2,
        "medium" : 3,
        "large" : 4,
        "brewed" : 0,
        "expresso" : .5,
        "cold brew" : 1,
        "Yes" : .5,
        "No" : 0
    }

    continueCoffee = True
    while continueCoffee:
        orderSize = input("What order size? ")
        if orderSize not in dict:
            orderSize = input("Please input small, medium or large: ")

        orderType = input("What order type: brewed, expresso, cold brew? ")
        if orderType not in dict:
            orderType = input("Please input brewed, expresso or cold brew: ")

        orderFlavour = input("Would you like to add some flavouring? (Yes or No) ")
        if orderFlavour == 'Yes':
            flavour = input("What flavour: hazelnut, vanilla, caramel? ")

        if orderFlavour == 'Yes':
            print("You asked for a " + orderSize + " cup of " + orderType + " coffee with " + flavour + " syrup.")
        else:
            print("You asked for a " + orderSize + " cup of " + orderType + " coffee with no syrup.")

        totalPrice = 0
        float(totalPrice)
        totalPrice = dict.get(orderSize)
        totalPrice += dict.get(orderType)
        totalPrice += dict.get(orderFlavour)
        round(totalPrice,2)

        print("Your cup of coffee costs ${:.2f}".format(totalPrice)) 

        tip = totalPrice * .15
        tip += totalPrice

        round(tip, 2)
        print("Your price with a tip is ${:.2f}".format(tip))

        orderAgain= input("Would you like to order again? (Yes or No) ")
        if orderAgain != 'Yes':
            continueCoffee = False
            print("Thank you! Come again.")
        else:
            print("Okay!")
coffee()