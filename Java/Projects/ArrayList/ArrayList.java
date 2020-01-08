/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arraylistassignment;

/**
 * 101366666
 * Chris Pydych
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;


public class ArrayListAssignment { 
      public static void main(String[] args) {
          Scanner scan = new Scanner(System.in);
         
          ArrayList<Integer> arrayX = new ArrayList<Integer>();//first Array
          ArrayList<Integer> arrayY = new ArrayList<Integer>();//second Array
          
          System.out.println("What do you want to do with your sets of numbers?\n"
                   + "Enter 1 for reversing the arrays, 2 for attaching the \n"
                   + "arrays together, 3 for merging the arrays with \n"
                   + "alternations, 4 to remove duplicates in the arrays, and 5\n"
                   + "to quit");//explains what the numbers mean  
          int choice = scan.nextInt();
          if (choice != 5) {//choice to end program will be 5
              String s = "";
              while (!s.equalsIgnoreCase("quit")){
              System.out.println("Please enter integer for first array list: ");//enter first integer for first array
              arrayX.add(scan.nextInt());
              System.out.println("Please enter integer for second array list: ");//enter first integer for second array
              arrayY.add(scan.nextInt());
              System.out.println("If you are done adding numbers type 'quit', if not type any letter");//any letter will keep the progrm running
              s = scan.next();
              }    
          }
       
       
           if (choice == 1){//reverses arrays
               
                System.out.print("This is the arrays in reverse order ");
                Collections.reverse(arrayX);//reverses arrayX
                Collections.reverse(arrayY);//reverses arrayY
                System.out.println(arrayX.toString());
                System.out.println(arrayY.toString());
               }
           
           if (choice == 2)//merge the two arrays into 1
               {
                System.out.print("Attaching the arrays together creates this: " 
                        + arrayX.addAll(arrayY));//adds arrayY to arrayX                    
               }
           if (choice == 3){//merge and alternate the two arrays                
                ArrayList<Integer> arrayZ = new ArrayList<Integer>();
                for(int i = 0; i < arrayX.size(); i++){
                    
                        arrayZ.add(arrayX.get(i));
                        arrayZ.add(arrayY.get(i));                                                              
                    
                }
                   System.out.println(arrayZ.toString());
                }
            
            if (choice == 4){//removes duplicates
                int j = 0;
                while (j < arrayX.size()){//removes duplicates from arrayX  
                for(int i = j+1; i < arrayX.size(); i++){
                        if(arrayX.get(j).equals(arrayX.get(i))){
                            arrayX.remove(i);
                        }
                }  
              j++;  
            }
                int k = 0;
                while (k < arrayY.size()){//removes duplicates from arrayY
                for (int i = k+1; i < arrayY.size(); i++){
                        if(arrayY.get(k).equals(arrayY.get(i))){
                            arrayY.remove(i);
                        }
                }    
              k++;      
             }
           
            System.out.print(arrayX);
            System.out.print(arrayY);
            } 
            if (choice == 5){//quits program
                System.out.println("You quit the program");        
            }
            
               
       }    
    
}
       
      


