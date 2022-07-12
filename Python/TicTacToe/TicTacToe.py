#Simple Tic Tac Toe Game

import random


print("Welcome to Tic Tac Toe")

print("We will flip a coin to see who goes first")

coin_choice = input("Choose heads or tails: ")

coin = random.randrange(2)

if(coin_choice == "heads" & coin == 1):
    print("You go first!")
elif(coin_choice == "heads" & coin == 1):
    print("Computer goes first!")
elif(coin_choice == "tails" & coin == 0):
    print("You go first!")
else:
    print("Computer goes first!")


if(coin == 0):
    print("Tails")
else:
    print("Heads")

print(coin)