import javax.swing.*;

public class UsingSwingForInput {
    public static void main(final String[] args) {
        final String name = JOptionPane.showInputDialog("What is your name?");

        final String input = JOptionPane.showInputDialog("Ho old are you?");
        final int age = Integer.parseInt(input);

        System.out.print("Hello " + name + " . ");
        System.out.println("Next year you'll be " + (age + 1));

        System.exit(0);
    }
}