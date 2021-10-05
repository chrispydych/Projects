from turtle import Screen, Turtle
import random

#Frog
player_frog = Turtle()
player_frog.shape("turtle")
player_frog.penup()
player_frog.color("green")
player_frog.setheading(90)
player_frog.setposition(x=0, y=-275)

#Random Cars
random_car = Turtle()
random_car.shape("square")
random_car.penup()
random_car.color("red")
random_car.setposition(x=350, y=0)

game_is_on = True

while game_is_on:
    random_car.backward(5)

def move_frog():
    y_pos = player_frog.ycor()
    y_pos += 5
    player_frog.sety(y_pos)


screen = Screen()
screen.bgcolor("gray")
screen.setup(width=800, height=600)
screen.title("Frogger")
screen.listen()

screen.onkeypress(move_frog, "w")

screen.exitonclick()