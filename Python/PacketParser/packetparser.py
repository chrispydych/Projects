#chrispydych
#
#packetparser.py
#  
#  Copyright 2018
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  

import socket
from dnspacket import *
import dns.resolver #used for getting dns server ip

MAX_ATTEMPTS = 3

def isValidIP(ip):
    octets = ip.split('.') # if it's not a string, this throws an exception.
    if len(octets) != 4: # IPv4 must have 4 octets
        return False
    for i in octets:
        if not i.isdecimal(): # must all be decimal numbers
            return False
        if int(i) > 255 or int(i) < 0: # must fin in an unsigned byte
            return False
    return True # passed all tests
    
def inverseLookupName(ip):
    '''get the inverse lookup version of this IP address'''
    
    name = ''
    octets = ip.split('.')
    for i in range(3, -1, -1):
        name += octets[i] + '.'
    name += 'in-addr.arpa.'
    #print(name)
    return name

def main(args):
    if len(args) != 2:
        print('Usage: python3 marsee_as2.py <domain name or IP>')
        return 1
    # args[1] is the command line argument, either IP or dn
    queryType = 0
    packet = None
    if isValidIP(args[1]):
        queryType = DNS_PTR
        packet = makeRequest(inverseLookupName(args[1]), DNS_PTR)
    else:
        queryType = DNS_A
        packet = makeRequest(args[1] +  '.', DNS_A)
    
    serverIP = dns.resolver.get_default_resolver().nameservers
    #print(packet.toBytes())
    #print(serverIP)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(30) #timeout after 30 seconds
    sock.bind((socket.inet_ntoa(socket.INADDR_ANY.to_bytes(4, NET_BYTEORDER)), 0))
    numTries = 0
    reply = None
    while numTries < MAX_ATTEMPTS:
        sock.sendto(packet.toBytes(), (serverIP[0], 53))
        message = None
        ip = None
        try:
            message, ip = sock.recvfrom(512)
        except: #timeout
            numTries += 1
            continue
        #print(message)
        reply = DNSPacket.fromBytes(message)
        break
    if reply == None:
        # it timed out, and we never go a response
        print('Local DNS server timeout')
        return 0
    
    if reply.flags & 1 == DNS_OK:
        # Got a good DNS reply
        if reply.numAnswers > 0:
            print('\nAnswer(s):')
            for i in reply.answers:
                #print(i.name)
                if i.rrType == DNS_A:
                    print(i.name[:-1] + ' is ' + i.parseRData())
                elif i.rrType == DNS_PTR:
                    print(args[1] + ' is ' + i.parseRData())
                elif i.rrType == DNS_CNAME:
                    print(i.parseRData() + ' is aliased to ' + i.name[:-1])
        
        #if reply.numAuthorities > 0:
        #    print('\nAuthoritative answer(s):')
        #    for i in reply.authority:
        #        thing = i.parseRData()
        #        #if thing == None:
        #            #print(i.rrType)
        #        print(i.name)
        #        print(i.parseRData())
            
        if reply.numAdditionals > 0:
            print('\nAdditional answer(s):')
            for i in reply.additional:
                #print(i.rrType)
                if i.rrType == DNS_A:
                    print(i.name[:-1] + ' is ' + i.parseRData())
                elif i.rrType == DNS_PTR:
                    print(args[1] + ' is ' + i.parseRData())
                elif i.rrType == DNS_CNAME:
                    print(i.parseRData() + ' is aliased to ' + i.name[:-1])
    
    elif reply.flags & 1 == DNS_SERVERFAIL:
        # could not contact authoritative server
        print('\nAuthoritative DNS server not found')
    
    elif reply.flags & 1 == DNS_ERROR:
        # no records found
        print('\nNo DNS entry')
        
    else:
        print('\nDNS error ' + str(reply.flags & 1))
        
    # note: put '.' at end of domain
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))

