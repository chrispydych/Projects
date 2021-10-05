from turtle import Screen, Turtle
import random

#Left Paddle
left_paddle = Turtle()
left_paddle.shape("square")
left_paddle.penup()
left_paddle.color("white")
left_paddle.shapesize(stretch_wid=5, stretch_len=1)
left_paddle.setposition(x = -350, y = 0)

#Right Paddle
right_paddle = Turtle()
right_paddle.shape("square")
right_paddle.penup()
right_paddle.color("white")
right_paddle.shapesize(stretch_wid=5, stretch_len=1)
right_paddle.setposition(x = 350, y = 0)

#Ball
ball = Turtle()
ball.shape("square")
ball.penup()
ball.color("white")
ball.setposition(x = 0, y = 0)



#Moving the ball

#Right Paddle controls
def right_paddle_move_up():
    y_pos = right_paddle.ycor()
    y_pos += 20
    right_paddle.sety(y_pos)

def right_paddle_move_down():
    y_pos = right_paddle.ycor()
    y_pos -= 20
    right_paddle.sety(y_pos)

#Left Paddle controls
def left_paddle_move_up():
    y_pos = left_paddle.ycor()
    y_pos += 20
    left_paddle.sety(y_pos)

def left_paddle_move_down():
    y_pos = left_paddle.ycor()
    y_pos -= 20
    left_paddle.sety(y_pos)


screen = Screen()
screen.bgcolor("black")
screen.setup(width=800, height=600)
screen.title("Pong")
screen.listen()


screen.onkeypress(right_paddle_move_up, "Up")
screen.onkeypress(right_paddle_move_down, "Down")
screen.onkeypress(left_paddle_move_up, "w")
screen.onkeypress(left_paddle_move_down, "s")


screen.exitonclick()


#Create and Move paddle
#width = 20, height = 100, x_pos = 350, y_pos = 0, up and down keys 20 pixels
