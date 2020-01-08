.eqv	$num,	$s0
.eqv	$ii,	$s1
.eqv	$rem,	$s2
.eqv	read_int, 5

.data

outString: .asciiz	"Enter a number: "

.text 

li	$v0,	4   		#system call for printing string
la	$a0,	outString  	#address in a0
syscall
addi	$v0,	$0,	read_int #input(num)
syscall
add	$num,	$0,	$v0     #num = int
addi	$ii,	$0,	2       #ii=2
add	$t4,	$0,	2       #2 now in t4
div	$num,	$t4             #num/2 is divided
mflo	$t6                     #num/2 now in t6
mult	$0,	$0              #0 now in low and high

#While Loop

While:
addi	$rem,	$a0,	1
slt	$t1,	$ii,	$t6     #while(ii<num/2)
bne	$t1,	1,	Exit    #if the while statement isn't true it will go to Exit and get out of while loop
div 	$num, 	$ii             #num%ii now in hi
mfhi 	$t7                     #num%ii now in $t7
mult 	$0, 	$0              #hi and lo have values of 0
add 	$rem, 	$0, 	$t7     #rem=num%ii

#If Statement

beq 	$rem, 	$0,	ifEnd   #if(rem==0) it will execute and go to the ifEnd
bne 	$rem, 	$0, 	Exit    #if the if statement is untrue it won't execute and will go to the Exit 

ifEnd: 
div 	$num, 	$t5             #num/2 now in lo
mflo 	$t6                     #num/2 now in t6
mult 	$0, 	$0              #0 now in low and high
add 	$ii, 	$0, 	$t6     #ii=num/2    
                
# Exit If Statement

bne	$rem,	$0,	ifPrime	#if(rem!=0) is true will go to the ifPrime
beq	$rem,	$0,	Else    #if its not true itll go to Else


# Exit

Exit:  
addi 	$ii,	$ii,	1       #increment ii
beq 	$t1,	 1,	While   #start loop again

#If Prime

ifPrime:        
.data
outString2: .asciiz	"Number is prime"
.text
li 	$v0, 	4   	        #system call ffor printing string
la	$a0,	outString2      #load address of string to be printed into a0
syscall
beq	$0,	$0,	End   #Will go to End

# Else Statement 

Else:
.data
outString3: .asciiz	"Number is not prime."
.text
li	$v0,	4 		#system call for printing the string
la	$a0,	outString3 	#load address into a0
syscall
End:

