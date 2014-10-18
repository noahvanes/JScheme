function Pair(a,d) {

	this.car = a;
	this.cdr = d;
}

function buildList(arr) { 

	var i = arr.length;
	var currentPair = null;

	while (i-- != 0) { 
		currentPair = new Pair(arr[i], currentPair);
	}
	
	return currentPair;
}

function makeSymbol(s) {

	var symbolTable = {}
	var symbolCount = -1;

	makeSymbol = function(nam) {

		var id = symbolTable[nam];
		if (id == undefined) {
			symbolTable[nam] == ++symbolCount;
			id = symbolCount;
		}

		return { txt: nam, id: id }
	}
	return makeSymbol(s);
}

/********************************/

function SchemeReader() {

	var program, position, hold;

	function setup(str) {
		program = str;
		position = 0;
	}

	function isTerminator(c) {

		switch (c) {
			case ' ': case '':
			case '\n': case '\t':
			case '\'': case '\"':
			case ')': case ')':
			case ';': case '.':
				return true;
			default:
				return false;
		}
	}

	function isNumber(c) {

		return !(c < '0' || c > '9');
	}

	function skipWhiteSpace() {

		while(true) {

			switch (program.charAt(position)) {

				case '\n':
				case ' ': 
				case '\t': 
					++position;
					break;
				case ';': 
					var current;
					while((current = program.charAt(++position)) != '\n'
					    	&& current != '');
					break;
				default:
					return;
			}
		}
	}

	function skip() {

		skipWhiteSpace();
		++position;
	}

	function peek() { 

		skipWhiteSpace();
		return program.charAt(position);
	}

	function read() {

		skipWhiteSpace();
		return program.charAt(position++);
	}

	function readSymbol() {

		hold = position; 									//remember start position
		while(!isTerminator(program.charAt(++position))); 	//skip until end of word
		return makeSymbol(program.substring(hold, position));
	}

	function readString() {

		hold = position
		while(program.charAt(++position) != '\"');
		return program.substring(hold, position++);
	}

	function readNumber() {

		hold = position;

		//step 1: check for sign
		switch(program.charAt(position)) {
			case '+':
			case '-':
				++position;
		}
		//step 2: parse number in front of .
		while(isNumber(program.charAt(++position)));
		//step 3: parse number after .
		if(program.charAt(position) == '.') {
			while(isNumber(program.charAt(++position)));
		}

		return parseFloat(program.substring(hold, position));
	}

	return { 
		setup: setup,
		skip: skip,
		peek: peek,
		read: read,
		readSymbol: readSymbol,
		readString: readString,
		readNumber: readNumber
	}
}

function SchemeParser(program) {

	var reader = SchemeReader();
	var character, fun;

	function parse() {

		character = reader.peek();
		
		switch (character) {

			case '(': return parseLBR();
			case '#': return parseSHR();
			case '\'': return parseQUO();
			case '\"': 
				return reader.readString();
			case '+': case '-': case '0':
			case '1': case '2': case '3':
			case '4': case '5': case '6':
			case '7': case '8': case '9':
				return reader.readNumber();
			default:
				return reader.readSymbol();
		}
	}

	function parseLBR() {

		var elm = [];

		reader.skip(); 	// skip left bracket
		while (reader.peek() != ')') { elm.push(parse()) };
		reader.skip(); 	// skip right bracket

		return buildList(elm);
	}

	function parseSHR() {

		reader.skip(); 	// skip #
		character = reader.read();

		switch(character) {

			case 't': 
				return new Boolean(true);
			case 'f':
			 	return new Boolean(false);
			case '(':
				var elm = [];
				while(reader.peek() != ')') { 
					elm.push(parse()); 
				}
				reader.skip(); // skip right bracket
				return elm;
		}
	}

	function parseQUO() {

		reader.skip(); // skip '
		var pair = new Pair(parse(), null);
		pair = new Pair('quote', pair);
		
		return pair;
	}

	return { parse: parse, 
		     setup: reader.setup };
}

var p = SchemeParser();
p.setup("(define (fac n) (if (= n 0) 1 (* n (fac (- n 1)))))");
var x = p.parse();