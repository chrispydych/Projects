/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package postfixevaluator;

/**
 *
 * @author pydch
 */
public class LinkedList<T> {
    private int size;
    private Node<T> head;
    public LinkedList() {
        head = null;
        size = 0;
    }
    public void push(T element){
        if (head == null) {
            head = new Node(element);
        }
        else{
            Node<T> newNode = new Node(element);
            newNode.next = head;
        }
        size++;
    }
    public T pop(){
        if (head == null)
            return null;
        else{
            T topData = head.data;
            head = (Node<T>) head.data;
            size--;
            return topData;
        }
    }
    public T top() {
        if(head != null)
            return head.data;
        else
            return null;
    }
    public int size() {
        return size;
    }
    public boolean isEmpty(){
        return size == 0;
    }
    private class Node<T> {
        private T data;
        private Node<T> next;
        public Node(T data){
            this.data = data;
        }
    }
}

