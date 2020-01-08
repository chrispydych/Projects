######################################################################
#
def findComputerMove(aBoard, depth, isHuman=False):
    abresult = alphabeta(aBoard, depth, -10, 10, isHuman)
    if abresult[1] != None:
        exit(abresult[1])
    else:
        exit(-1)
    return abresult
if __name__ == '__main__':
    print ('This module is not intended for use as "main".')

from AbstractAlphaBeta import *


if __name__ == '__main__':
   aBoard = TicTacToeBoard()
   while not aBoard.isOver():
      aBoard, score = findComputerMove(aBoard, 1, isHuman=True)
      aBoard.printBoard()
      aBoard, score = findComputerMove(aBoard, 1, isHuman=False)
      aBoard.printBoard()

