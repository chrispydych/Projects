/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mazerecursion;

/**
 *
 * @author pydch
 */
public class MazeRecursion {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String[][] maze = new String[][]{
             { "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"},
             { "#", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", "#"},
             { ".", ".", "#", ".", "#", ".", "#", "#", "#", "#", ".", "#"},
             { "#", "#", "#", ".", "#", ".", ".", ".", ".", "#", ".", "#"},   
             { "#", ".", ".", ".", ".", "#", "#", ".", ".", "#", ".", "."},
             { "#", "#", "#", "#", ".", "#", ".", ".", ".", "#", ".", "#"},
             { "#", ".", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#"},
             { "#", "#", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#"},
             { "#", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", "#"},
             { "#", "#", "#", "#", "#", "#", ".", ".", "#", "#", ".", "#"},
             { "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"},
             { "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"}
                
            };
        int rowInt= 2;
        int colInt = 0;
        mazeTraverse(maze, rowInt, colInt);
        
    }
    
    public static String[][] mazeTraverse(String[][] maze, int row, int col) {
        
        if (col == maze[0].length-1)
        {
            MazeDisplay(maze);
            return maze;
        }        
        String up = maze[row-1][col];
        String down = maze[row + 1][col];
        String left = " ";
        if (col != 0)
        {
            left = maze[row][col - 1];
        }    
        String right = maze[row][col + 1];
        
        if(left.equals("."))
        {
            maze[row][col - 1] = "X";
            MazeDisplay(maze);
            return mazeTraverse(maze, row, col - 1);
        }
        if(down.equals("."))
        {
            maze[row + 1][col] = "X";
            MazeDisplay(maze);
            return mazeTraverse(maze, row + 1, col);
        }
        if(right.equals("."))
        {
            maze[row][col + 1] = "X";
            MazeDisplay(maze);
            return mazeTraverse(maze, row, col + 1);
        }
        if(up.equals("."))
        {
            maze[row - 1][col] = "X";
            MazeDisplay(maze);
            return mazeTraverse(maze, row - 1, col);
        }
        if(right.equals("X"))
        {
            return mazeTraverse(maze, row, col + 1);
        }
        if(down.equals("X"))
        {
            return mazeTraverse(maze, row + 1, col);
        }
        if(left.equals("X"))
        {
            return mazeTraverse(maze, row, col + 1);
        }
        if(up.equals("X"))
        {
            return mazeTraverse(maze, row - 1, col);
        }
        MazeDisplay(maze);
        return mazeTraverse(maze,row,col);
    }
    
    public static void MazeDisplay(String[][] maze){
        System.out.println();
        for ( int i = 0; i < maze.length; i++)
        {
            for ( int j = 0; j < maze[0].length; j++)
            {
                if(j == maze[0].length - 1)
                {
                    System.out.print(maze[i][j] + "\n");
                }
                else
                {
                    System.out.print(maze[i][j]);
                }
            }
        }
    }
}

