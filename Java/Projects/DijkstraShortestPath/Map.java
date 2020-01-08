/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package as6;

/**
 *
 * @author Chris Pydych
 */

import java.awt.Graphics;
import javax.swing.JFrame;
import javax.swing.JComponent;
import java.awt.Color; 

public class Map
{
   public static void draw(Graphics g)
   {
       Color arrColor[] = {Color.BLACK, Color.RED, Color.CYAN}; // you can choose colors you want       
       /*
       fillOval(x, y, width, height):
       x - the x coordinate of the upper left corner of the oval to be drawn
       y - the y coordinate of the upper left corner of the oval 
       width - the width of the oval
       height - the height of the oval
       */        
       int x = 0; 
       int y = 0; 
       int width = 30; 
       int height = 30; // if width equals height, then it's a circle
       
       for (int i = 0; i < 6; i++)  // draw 6 circles on a row
       {
           g.setColor(arrColor[i % 2]);
           g.fillOval(x + width * i, y, width, height);
       }
       
        g.setColor(arrColor[2]); // set color cyan
       // draw a red node at (400, 410):
       int x1 = 400; 
       int y1 = 410; 
       g.fillOval(x1, y1, width, height);        
       
       // draw a red node at (500, 510):
       int x2 = 500; 
       int y2 = 510; 
       g.fillOval(x2, y2, width, height); 
       
       g.setColor(arrColor[0]); // set color black
       // draw an edge connenting (x1, y1) and (x2, y2)
       g.drawLine(x1 + width/2, y1+ width/2, x2 + width/2, y2+ width/2);
       

       
   } // end of draw function

   public static void main(String[] args)
   {
      JFrame frame = new JFrame();

      final int FRAME_WIDTH = 800;
      final int FRAME_HEIGHT = 800;
      
      frame.setSize(FRAME_WIDTH, FRAME_HEIGHT);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      
      JComponent component = new JComponent()
      {
         public void paintComponent(Graphics graph)
         {
            draw(graph);
         }
      };

      frame.add(component);
      frame.setVisible(true);
   }  // end of main function
}
