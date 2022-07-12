# implement the classes listed below 
class FoodItem:
    
    def __init__(self,):


    self.item()

class Burger(FoodItem):
    pass
class Drink(FoodItem):
    pass
class Side(FoodItem):
    pass
class Combo(FoodItem):
    pass
class Order:
    pass
 
def user_input_burger():
    b = Burger()
    #ask user for input and store it in burger object 
    return b
 
def user_input_drink():
    d = Drink()
    #ask user for input and store it in drink object 
    return d
 
def user_input_side():
    s = Side()
    #ask user for input and store it in side object 
    return s
 
def user_input_combo():
    c = Combo()
    #ask user for input and store it in combo object 
    #a combo must include one burger, one side, and one drink
    return c
 
def take_order():
    #ask user for name for the order 
    #repeat taking order until client is done 
    #display order details
    #display a thank you message
    print("Welcome to Burger Shop")
    input(("Would you like a burger, a side, a drink, or a combo? "))
 
take_order()