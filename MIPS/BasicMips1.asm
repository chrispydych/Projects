.eqv	$m,	$s0	# m
.eqv	$n,	$s1	# n
.eqv	$i,	$s2	# i
.eqv	$GCD,	$s3	# GCD
.eqv	read_int,	5
.eqv	read_int2,	5
.data

outString: .asciiz 	"Enter numerator: "
.text

main:

li	$v0,	4
la	$a0,	outString
syscall
addi	$v0,	$0,	read_int	#input n
syscall
add	$n,	$0,	$v0		#n = number entered
.data

outString2: .asciiz "Enter denominator: "
.text
li	$v0,	4
la	$a0,	outString2
syscall
addi	$v0,	$0,	read_int2	#input m
syscall
add	$m,	$0	$v0		#m = number entered
jal	GCD    				#jump to GCD function to calculate GCD given the two numbers

Solved:

div	$n,	$GCD			#n/gcd in lo
mflo	$t7       			#n/gcd in t7
mult	$0,	$0    			#0 in lo and hi
div	$m,	$GCD   			#m/gcd in lo
mflo	$t8       			#m/gcd in t8
.data

outString3: .asciiz "Reduced fraction is: "

divString: .asciiz "/"
.text

li	$v0,	4       
la	$a0,	outString3
syscall
li	$v0,	1       		#output n/gcd
add	$a0,	$t7,	$0
syscall
li	$v0,	4      			#output divide sign
la	$a0,	divString
syscall
li	$v0,	1      			#output m/gcd
add	$a0,	$t8,	$0
syscall
beq	$0,	$0,	End		#go to End 
          

GCD: 

div	$m,	$n   			#m % n in hi
mfhi	$t9   	 			#m % n in t9
mult	$0,	$0   			#0 in hi and lo
div	$n,	$m   			#n % m in hi
mfhi	$k1    				#n % m in k1
addi 	$i, 	$0, 	1  		#i = 1
    
if: 

beq	$t9,	$0,	E2   		#if m % n == 0 go to E2
    
if4: 

beq	$k1,	$0,	E3 		#if n % m == 0 go to E3
    
while: 

slt	$t1,	$i,	$n    		#while i < n 
bne	$t1,	1,	Exit    	#if while loop is not true, then exit while loop and go to Exit for GCD is found

if1: 

slt	$t2,	$i,	$m   		#if i < m
bne	$t2,	1, 	Exit   		#go to Exit for GCD
div 	$m,	$i       		#m % i in hi
mfhi 	$t4          			#m % i in t4
mult	$0,	$0      		
div	$n, 	$i      		#n % i in hi
mfhi 	$t6        	 		#n % i in t6
mult 	$0, 	$0      		#0 now in hi and lo

if2: 

beq 	$t4, 	$0, 	if3   	 	#if m % i == 0
bne 	$t4, 	$0, 	End2 		#if it isn't true then go to End2

if3: 

beq	$t6,	$0,	End3 		#if n % i == 0
bne	$t6,	$0,	End2 		#if it isn't true then go to End2

End3: 

add	$GCD,	$0,	$i     		#GCD = i

End2:

addi	$i, 	$i, 	1   		#increment i       
beq 	$t1, 	1, 	while  		#go back to while

E3:
 
add 	$GCD, 	$0, 	$m  		#GCD = m
beq 	$0, 	$0, 	Exit   		#go to Exit

E2:
 
add 	$GCD, 	$0, 	$n  		#GCD = n

Exit: 

jal 	Solved 	 			#solved

End: #End 

