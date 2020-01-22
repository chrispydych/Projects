board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 3, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]

]

def solve(bo):
    find = findEmpty(bo)
    if not find:
        return True
    else:
        row, col = find

    for i in range(1,10):
        if boardValid(bo, i, (row, col)):
            bo[row][col] = i

            if solve(bo):
                return True

            bo[row][col] = 0    

    return False


def boardValid(bo, num, pos):

    #checking the row if it is a valid position
    for i in range(len(bo[0])):
        if bo[pos[0]][i] == num and pos[1] != i:
            return False

    #checking the column if it is a valid position
    for i in range(len(bo)):
        if bo[i][pos[1]] == num and pos[0] != i: #check each col looping through 0-8 and make sure it is not the exact pos that just inserted 
            return False

    #check cube
    xBox = pos[1] // 3
    yBox = pos[0] // 3

    for i in range(yBox*3, yBox*3 + 3):
        for j in range(xBox*3, xBox*3 + 3):
            if bo[i][j] == num and (i,j) != pos:
                return False

    return True            

def printBoard(bo):
    for i in range(len(bo)):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - ")

        for j in range(len(bo[0])):
            if j % 3 == 0 and j != 0:
                print("| ", end="")

            if j == 8:
                print(bo[i][j])
            else:
                print(str(bo[i][j]) + " ", end="")

#printBoard(board)

def findEmpty(bo):
    for i in range(len(bo)):
        for j in range(len(bo[0])):
            if bo[i][j] == 0:
                return (i, j)

    return None


printBoard(board)

print (" ")
print ("       solved              ")
print (" ")

solve(board)
printBoard(board)
print(" ")