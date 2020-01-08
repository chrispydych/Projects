/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blackjack;

import java.util.Scanner;

/**
 *
 * @author pydch
 */
    public class Blackjack {
    
       public static void main(String[] args) {
       
          int money;          // Amount of money the user has.
          int bet;            // Amount user bets on a game.
          boolean userWins;   // Did the user win the game?
          Scanner in = new Scanner(System.in);
          
          System.out.println("Welcome to the game of blackjack.");
          System.out.println();
          
          money = 100;  // User starts with $100.
       
          while (true) {
              System.out.println("You have " + money + " dollars.");
              do {
                 System.out.println("How many dollars do you want to bet?  (Enter 0 to end.)");
                 System.out.println("? ");
                 bet = Scanner.in();
                 if (bet < 0 || bet > money)
                     System.out.println("Your answer must be between 0 and " + money + '.');
              } while (bet < 0 || bet > money);
              if (bet == 0)
                 break;
              userWins = playBlackjack();
              if (userWins)
                 money = money + bet;
              else
                 money = money - bet;
              System.out.println();
              if (money == 0) {
                 System.out.print("Looks like you've are out of money!");
                 break;
              }
          }
          
          System.out.println();
          System.out.println("You leave with $" + money + '.');
       
       } // end main()
       
       
       static boolean playBlackjack() {
             // Let the user play one game of Blackjack.
             // Return true if the user wins, false if the user loses.
    
          int deck;                  // A deck of cards.  A new deck for each game.
          int dealerHand;   // The dealer's hand.
          int userHand;     // The user's hand.
          
          deck = new Deck();
          dealerHand = new BlackjackHand();
          userHand = new BlackjackHand();
    
          /*  Shuffle the deck, then deal two cards to each player. */
          
          deck.shuffle();
          dealerHand.addCard( deck.dealCard() );
          dealerHand.addCard( deck.dealCard() );
          userHand.addCard( deck.dealCard() );
          userHand.addCard( deck.dealCard() );
          
          TextIO.putln();
          TextIO.putln();
          
          /* Check if one of the players has Blackjack (two cards totaling to 21).
             The player with Blackjack wins the game.  Dealer wins ties.
          */
          
          if (dealerHand.getBlackjackValue() == 21) {
               TextIO.putln("Dealer has the " + dealerHand.getCard(0)
                                       + " and the " + dealerHand.getCard(1) + ".");
               TextIO.putln("User has the " + userHand.getCard(0)
                                         + " and the " + userHand.getCard(1) + ".");
               TextIO.putln();
               TextIO.putln("Dealer has Blackjack.  Dealer wins.");
               return false;
          }
          
          if (userHand.getBlackjackValue() == 21) {
               TextIO.putln("Dealer has the " + dealerHand.getCard(0)
                                       + " and the " + dealerHand.getCard(1) + ".");
               TextIO.putln("User has the " + userHand.getCard(0)
                                         + " and the " + userHand.getCard(1) + ".");
               TextIO.putln();
               TextIO.putln("You have Blackjack.  You win.");
               return true;
          }
          
          /*  If neither player has Blackjack, play the game.  First the user 
              gets a chance to draw cards (i.e., to "Hit").  The while loop ends 
              when the user chooses to "Stand".  If the user goes over 21,
              the user loses immediately.
          */
          
          while (true) {
              
               /* Display user's cards, and let user decide to Hit or Stand. */
    
               TextIO.putln();
               TextIO.putln();
               TextIO.putln("Your cards are:");
               for ( int i = 0; i < userHand.getCardCount(); i++ )
                  TextIO.putln("    " + userHand.getCard(i));
               TextIO.putln("Your total is " + userHand.getBlackjackValue());
               TextIO.putln();
               TextIO.putln("Dealer is showing the " + dealerHand.getCard(0));
               TextIO.putln();
               TextIO.put("Hit (H) or Stand (S)? ");
               char userAction;  // User's response, 'H' or 'S'.
               do {
                  userAction = Character.toUpperCase( TextIO.getlnChar() );
                  if (userAction != 'H' && userAction != 'S')
                     TextIO.put("Please respond H or S:  ");
               } while (userAction != 'H' && userAction != 'S');
    
               /* If the user Hits, the user gets a card.  If the user Stands,
                  the loop ends (and it's the dealer's turn to draw cards).
               */
    
               if ( userAction == 'S' ) {
                       // Loop ends; user is done taking cards.
                   break;
               }
               else {  // userAction is 'H'.  Give the user a card.  
                       // If the user goes over 21, the user loses.
                   Card newCard = deck.dealCard();
                   userHand.addCard(newCard);
                   TextIO.putln();
                   TextIO.putln("User hits.");
                   TextIO.putln("Your card is the " + newCard);
                   TextIO.putln("Your total is now " + userHand.getBlackjackValue());
                   if (userHand.getBlackjackValue() > 21) {
                       TextIO.putln();
                       TextIO.putln("You busted by going over 21.  You lose.");
                       TextIO.putln("Dealer's other card was the " 
                                                          + dealerHand.getCard(1));
                       return false;  
                   }
               }
               
          } // end while loop
          
          /* If we get to this point, the user has Stood with 21 or less.  Now, it's
             the dealer's chance to draw.  Dealer draws cards until the dealer's
             total is > 16.  If dealer goes over 21, the dealer loses.
          */
    
          TextIO.putln();
          TextIO.putln("User stands.");
          TextIO.putln("Dealer's cards are");
          TextIO.putln("    " + dealerHand.getCard(0));
          TextIO.putln("    " + dealerHand.getCard(1));
          while (dealerHand.getBlackjackValue() <= 16) {
             Card newCard = deck.dealCard();
             TextIO.putln("Dealer hits and gets the " + newCard);
             dealerHand.addCard(newCard);
             if (dealerHand.getBlackjackValue() > 21) {
                TextIO.putln();
                TextIO.putln("Dealer busted by going over 21.  You win.");
                return true;
             }
          }
          TextIO.putln("Dealer's total is " + dealerHand.getBlackjackValue());
          
          /* If we get to this point, both players have 21 or less.  We
             can determine the winner by comparing the values of their hands. */
          
          TextIO.putln();
          if (dealerHand.getBlackjackValue() == userHand.getBlackjackValue()) {
             TextIO.putln("Dealer wins on a tie.  You lose.");
             return false;
          }
          else if (dealerHand.getBlackjackValue() > userHand.getBlackjackValue()) {
             TextIO.putln("Dealer wins, " + dealerHand.getBlackjackValue() 
                              + " points to " + userHand.getBlackjackValue() + ".");
             return false;
          }
          else {
             TextIO.putln("You win, " + userHand.getBlackjackValue() 
                              + " points to " + dealerHand.getBlackjackValue() + ".");
             return true;
          }
    
       }  // end playBlackjack()


