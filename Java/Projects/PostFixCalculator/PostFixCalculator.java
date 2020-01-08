/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package postfixevaluator;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.Scanner;
/**
 *
 * @author pydch
 */
public class PostFixCalculator {
    
public static void main(String[] args) throws IOException {
    Scanner in = new Scanner(System.in);
    System.out.println("What is the file name?");
    String input = in.nextLine();
    File test1 = new File("test1.txt");
    ReversePolishCalc calc = new ReversePolishCalc();
    calc.calculateFile("test1.txt");
    PrintWriter out = new PrintWriter("test1.txt");
}
    
public static class ReversePolishCalc {
    private static String Add = "+";
    private static String Sub = "-";
    private static String Mul = "*";
    private static String Div = "/";
    
    int handleCalculation(LinkedList<Integer> stack, String[] el) {
    int operand1;
    int operand2;
        for (int i = 0; i < el.length; i++) {
            if (el[i].equals(Add) || el[i].equals(Sub) || el[i].equals(Mul) || el[i].equals(Div)) {
                operand1 = stack.pop();
                operand2 = stack.pop();
                switch(el[i]) {
                    case "+": {
                        int local = operand1 + operand2;
                        stack.push(local);
                        break;
                    }
                    case "-": {
                        int local = operand1 - operand2;
                        stack.push(local);
                        break;
                    }
                    case "*": {
                        int local = operand1 * operand2;
                        stack.push(local);
                        break;
                    }
                    case "/": {
                        int local = operand1 / operand2;
                        stack.push(local);
                        break;
                    }
                }
            }
            else{
                stack.push(Integer.parseInt(el[i]));
            }
        }
        return stack.pop();
    }
    
public void calculateFile(String fileName) throws IOException {      
    BufferedReader br = null;
        StringBuilder sb = null;
        try {
            FileReader fileReader = new FileReader("test1.txt");
            br = new BufferedReader(fileReader);
            sb = new StringBuilder();
            String line = br.readLine();
            
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            String Input = sb.toString();            
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            br.close();
        }
    }
    int calculate(String input) {
        LinkedList<Integer> stack = new LinkedList<>();
        String [] inputs = input.split((" "));
        return handleCalculation(stack, inputs);
    }

}

}   




