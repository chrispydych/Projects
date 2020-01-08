
#m socket import inet_pton
from sys import byteorder as SYS_BYTEORDER

# constants

NET_BYTEORDER = 'big'   # Networks are big-endian.
PTR_MASK = 0xc0         # 1100 0000 0000 0000
PTR_VAL_MASK = 0x3fff   # 0011 1111 1111 1111

# class
DNS_INET = 1
# type
DNS_A = 1               # name -> IP
DNS_NS = 2              # name server
DNS_CNAME = 5           # canonical name
DNS_PTR = 12            # IP -> name
DNS_HINFO = 13          # host info
DNS_MX = 15             # mail exchange
DNS_AXFR = 252          # request for zone transfer
DNS_ANY = 255           # all records

# flags

DNS_QUERY = 0 << 15     # 0 = query, 1 = response
DNS_RESPONSE = 1 << 15

DNS_STDQUERY = 0        # opcode - 4 bits
DNS_INVQUERY = 1 << 11
DNS_SRVSTATUS = 1 << 12

DNS_AA = 1 << 10        # authoritative answer
DNS_TC = 1 << 9         # truncated
DNS_RD = 1 << 8         # recursion desired
DNS_RA = 1 << 7         # recursion available

DNS_OK = 0              # rcode = reply codes
DNS_FORMAT = 1          # format error (unable to interpret)
DNS_SERVERFAIL = 2      # server failure
DNS_ERROR = 3           # no DNS entry
DNS_NOTIMPL = 4         # not implemented
DNS_REFUSED = 5         # server refused the query

# classes

class Question:
    
    def __init__(self, name, qType, qClass):
        self.name = name
        self.qType = qType
        self.qClass = qClass
    
    @staticmethod
    def fromBytes(other, startPos = 0):
        """return Question object as well as bytes from packet"""
        if not isinstance(other, bytes):
            raise TypeError('Usage: ResourceRecord.fromBytes(bytes)')
        
        name, nameLen = parseName(other, startPos)
        offset = startPos + nameLen
        
        # type, class:
        qType = int.from_bytes(other[offset:offset+2], NET_BYTEORDER)
        qClass = int.from_bytes(other[offset+2:offset+4], NET_BYTEORDER)
        
        return Question(name, qType, qClass), offset+4-startPos
        
    def toBytes(self):
        ret = b''
        
        # name first:
        labels = self.name.split('.')
        for i in labels:
            leni = len(i)
            ret += leni.to_bytes(1, SYS_BYTEORDER)
            if leni > 0:
                ret += i.encode('ascii')
        #ret += b'\x00' # terminate name
        
        # type, class:
        ret += int(self.qType).to_bytes(2, NET_BYTEORDER)
        ret += int(self.qClass).to_bytes(2, NET_BYTEORDER)
        
        return ret

class ResourceRecord:
    
    from socket import inet_ntoa
    
    def __init__(self, name, rrType, rrClass, ttl, rdLength, rData):
        self.name = name
        self.rrType = rrType
        self.rrClass = rrClass
        self.ttl = ttl
        self.rdLength = rdLength
        self.rData = rData
        # rData is stored as bytes, because their meanings depend on rrType.
        
    @staticmethod
    def fromBytes(other, startPos = 0):
        """return RR object, as well as bytes in packet"""
        if not isinstance(other, bytes):
            raise TypeError('Usage: ResourceRecord.fromBytes(bytes)')
                    
        name, nameLen = parseName(other, startPos)
        offset = startPos + nameLen
        
        #print(name)
        #print(offset)
        
        # type, class, ttl, rdlength:
        rrType = int.from_bytes(other[offset:offset+2], NET_BYTEORDER)
        rrClass = int.from_bytes(other[offset+2:offset+4], NET_BYTEORDER)
        ttl = int.from_bytes(other[offset+4:offset+8], NET_BYTEORDER)
        rdLength = int.from_bytes(other[offset+8:offset+10], NET_BYTEORDER)
        #print('rdlength = ' + str(rdLength))
        
        # rData:
        if rdLength > 0:
            rData = other[offset+10:offset+10+rdLength]
        else:
            rData = b''
        
        # debug: print bytes read into RR
        #print(other[startPos:offset+10+rdLength])
        return ResourceRecord(name, rrType, rrClass, ttl, rdLength, rData), offset+10+rdLength-startPos
    
    def toBytes(self):
        
        ret = b''
        
        # name first:
        labels = self.name.split('.')
        for i in labels:
            leni = len(i)
            ret += leni.to_bytes(1, SYS_BYTEORDER)
            if leni > 0:
                ret += i.encode('ascii')
        ret += b'\x00' # terminate name
        
        # type, class, ttl, rdLength
        ret += int(self.rrType).to_bytes(2, NET_BYTEORDER)
        ret += int(self.rrClass).to_bytes(2, NET_BYTEORDER)
        ret += int(self.ttl).to_bytes(4, NET_BYTEORDER)
        ret += int(self.rdLength).to_bytes(2, NET_BYTEORDER)
        
        # rData:
        ret += self.rData
        
        return ret
    
    def parseRData(self):
        '''returns appropriate rData values based on record type'''
        ret = None
        if self.rrType == DNS_A:
            # A type returns an IP adress
            ret = ResourceRecord.inet_ntoa(self.rData)
        
        elif self.rrType == DNS_PTR:
            # PTR type returns a domain name
            ret = parseName(self.rData, 0)[0] # no need for length
            
        elif self.rrType == DNS_CNAME:
            # CNAME returns a canonical domain name
            ret = parseName(self.rData, 0)[0] # no need for length
            
        elif self.rrType == DNS_NS:
            # NS returns a name server domain name
            ret = parseName(self.rData, 0)[0]
            
        return ret

class DNSPacket:
    
    def __init__(self, **kwargs):
        # initialize variables
        self.identification = 0
        self.flags = 0
        self.numQuestions = 0
        self.numAnswers = 0
        self.numAuthorities = 0
        self.numAdditionals = 0
        self.questions = [] # list of questions
        self.answers = [] # list of RRs
        self.authority = [] # list of RRs
        self.additional = [] # list of RRs
        
        #check keyword args for initial values
        if 'identification' in kwargs:
            self.identification = kwargs['identification']
            del kwargs['identification']
        if 'flags' in kwargs:
            self.flags = kwargs['flags']
            del kwargs['flags']
        if 'questions' in kwargs:
            self.questions = kwargs['questions']
            self.numQuestions = len(self.questions)
            del kwargs['questions']
        if 'answers' in kwargs:
            self.answers = kwargs['answers']
            self.numAnswers = len(self.answers)
            del kwargs['answers']
        if 'authority' in kwargs:
            self.authority = kwargs['authority']
            self.numAuthorities = len(self.authority)
            del kwargs['authority']
        if 'additional' in kwargs:
            self.additional = kwargs['additional']
            self.numAdditionals = len(self.additional)
            del kwargs['additional']
        if len(kwargs) > 0:
            # throw an exception for unknown keywords.
            # This will help finding misspelled keywords.
            raise ValueError('Unknown keyword: ' + kwargs.keys()[0])
    
    @staticmethod    
    def fromBytes(other): # other is a bytes object
        if not isinstance(other, bytes):
            raise TypeError('Usage: DNSPacket.fromBytes(bytes)')
        
        offset = 12
        
        Identification = int.from_bytes(other[0:2], NET_BYTEORDER)
        Flags = int.from_bytes(other[2:4], SYS_BYTEORDER) # this matters!
        NumQuestions = int.from_bytes(other[4:6], NET_BYTEORDER)
        NumAnswers = int.from_bytes(other[6:8], NET_BYTEORDER)
        NumAuthorities = int.from_bytes(other[8:10], NET_BYTEORDER)
        NumAdditionals = int.from_bytes(other[10:12], NET_BYTEORDER)
        
        Questions = []
        Answers = []
        Authority = []
        Additional = []
        
        #other = other[12:]
        
        for i in range(NumQuestions):
            q, size = Question.fromBytes(other, offset)
            Questions.append(q)
            offset += size
            #print('offset', offset)
            #print(other[0:offset])
        
        for i in range(NumAnswers):
            a, size = ResourceRecord.fromBytes(other, offset)
            Answers.append(a)
            offset += size
            #print('offset', offset)
        
        for i in range(NumAuthorities):
            a, size = ResourceRecord.fromBytes(other, offset)
            Authority.append(a)
            offset += size
            #print('offset', offset)
        
        for i in range(NumAdditionals):
            a, size = ResourceRecord.fromBytes(other, offset)
            Additional.append(a)
            offset += size
            #print('offset', offset)
        
        return DNSPacket(identification = Identification,
            flags = Flags, questions = Questions,
            answers = Answers, authority = Authority,
            additional = Additional)
        
    def toBytes(self):
        ret = int(self.identification).to_bytes(2, NET_BYTEORDER)
        ret += int(self.flags).to_bytes(2, SYS_BYTEORDER) # this matters!
        ret += int(self.numQuestions).to_bytes(2, NET_BYTEORDER)
        ret += int(self.numAnswers).to_bytes(2, NET_BYTEORDER)
        ret += int(self.numAuthorities).to_bytes(2, NET_BYTEORDER)
        ret += int(self.numAdditionals).to_bytes(2, NET_BYTEORDER)
        for i in self.questions:
            ret += i.toBytes()
        for i in self.answers:
            ret += i.toBytes()
        for i in self.authority:
            ret += i.toBytes()
        for i in self.additional:
            ret += i.toBytes()
            
        return ret
            
# functions

def makeRequest(name, RRType, ident = 7777): # RRType is DNS_A, DNS_PTR, etc.
    
    if not isinstance(name, str) or not isinstance(RRType, int):
        raise TypeError('Usage: makeRequest(str, int)')
        
    flgs = DNS_QUERY | DNS_RD 
    if RRType == DNS_PTR:
        flgs = flgs | DNS_INVQUERY
    
    q = Question(name, RRType, DNS_INET) 
    return DNSPacket(identification = ident, flags = flgs,
        questions = [q])

def parseName(other, startPos):
    '''parse a DNS style name.'''
    name = ''
        
    offset = startPos + 1
    ptr = offset # pointer for names
    nameMovesOffset = True # true until we reach a pointer
    
    # name first:
    labelLen = int.from_bytes(other[startPos:startPos+1], SYS_BYTEORDER)
    #print(labelLen)
    # byteorder doesn't really matter since it's 1 byte
    if labelLen & PTR_MASK == PTR_MASK: # if it's a pointer:
        ptr = (int.from_bytes(other[startPos:startPos+2], NET_BYTEORDER) & PTR_VAL_MASK) + 1
        nameMovesOffset = False # takfes care of compression
        labelLen = int.from_bytes(other[ptr-1:ptr], SYS_BYTEORDER)
        offset += 1 # offset should be startPos + 2 if it began with a ptr
        #print(labelLen)
    
    while labelLen != 0:
        name += other[ptr:ptr+labelLen].decode('ascii') + '.'
        oldLen = labelLen
        labelLen = int.from_bytes(other[ptr+labelLen:ptr+labelLen+1],
            SYS_BYTEORDER)
        #print(labelLen)
        if labelLen & PTR_MASK == PTR_MASK:
            # if it's a pointer:
            ptr = (int.from_bytes(other[ptr+oldLen:ptr+oldLen+2], NET_BYTEORDER) & PTR_VAL_MASK) + 1
            #print('pointer to ' + str(ptr))
            labelLen = int.from_bytes(other[ptr-1:ptr],
                SYS_BYTEORDER) # get correct length after pointer lookup
            #print(labelLen)
            if nameMovesOffset:
                offset += oldLen + 2 # account for pointer 
                nameMovesOffset = False
        else:
            ptr += oldLen + 1
            if nameMovesOffset:
                offset = ptr
    return name, offset - startPos
        
def tester():
    instr = ''
    while instr != '0':
        print('1: test Question.fromBytes')
        print('2: test Question.toBytes')
        print('3: test ResourceRecord.fromBytes')
        print('4: test ResourceRecord.toBytes')
        print('5: test DNSPacket.fromBytes')
        print('6: test DNSPacket.toBytes')
        print('0: exit')
        instr = input('>>> ')
        
        if instr == '1':
            qBytes = b'\x03www\x04xkcd\x03com\x00\x00\x01\x00\x01'
            q, size = Question.fromBytes(qBytes)
            print(q.name, size)
            
        elif instr == '2':
            q = Question('www.xkcd.com', DNS_A, DNS_INET)
            print(q.toBytes())
            
        elif instr == '3':
            rrBytes = b'\x01f\x03isi\x04arpa\x00\x00\x01\x00\x01'
            rrBytes += b'\x00\x00\x00\x0e\x00\x00'
            #print(len(rrBytes))
            rrBytes += b'\x03foo\xc0\x00\x01\x00\x01'
            rrBytes += b'\x00\x00\x00\x0e\x00\x00'
            rr1, size = ResourceRecord.fromBytes(rrBytes)
            print(rr1.name, size)
            rr2, size = ResourceRecord.fromBytes(rrBytes, size)
            print(rr2.name, size)
        
        elif instr == '4':
            rr = ResourceRecord('www.xkcd.com.', DNS_A, DNS_INET, 30, 0, b'')
            print(rr.toBytes())
            
        elif instr == '6':
            packet = makeRequest('www.xkcd.com.', DNS_A)
            print(packet.identification, packet.flags, packet.questions[0].name)
            
        elif instr == '0':
            exit(0)
            
        else:
            print('Bad command.')

if __name__ == '__main__':
    tester()

