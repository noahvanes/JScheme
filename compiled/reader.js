function READER() {
    'use strict';
    var program, position, hold;
    var asm, pool, err;
    function load(str) {
        program = str;
        position = 0;
    }
    function link(asmModule, errModule, poolModule) {
        asm = asmModule;
        err = errModule;
        pool = poolModule;
    }
    function make() {
        var tag = arguments[0];
        var len = arguments.length;
        var chk = asm.fmake(tag, len - 1);
        for (var i = 1; i < len; ++i)
            asm.fset(chk, i, arguments[i]);
        return chk;
    }
    function readerError(err$2) {
        err$2(arguments[1]);
        throw err$2;
    }
    function expect(ch, err$2) {
        var res = readC();
        if (res !== ch)
            readerError(err$2, res);
    }
    function read_exp() {
        try {
            return read();
        } catch (exception) {
            console.log(exception);
            return asm.slipVoid();
        }
    }
    function read() {
        switch (peekC()) {
        case '(':
            return read_lbr();
        case '#':
            return read_shr();
        case '\'':
            return read_quo();
        case '"':
            return read_str();
        case '+':
        case '-':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return read_num();
        default:
            return read_sym();
        }
    }
    function read_lbr() {
        skipC();
        if (//skip the '('
            // an empty list
            peekC() === ')') {
            skipC();
            return asm.slipNull();
        }
        // a non-empty list
        var elements = [];
        do {
            elements.push(read());
            if (peekC() === '.') {
                skipC();
                var tail = read();
                expect(')', err.expectedRBR);
                return buildList(elements, tail);
            }
        } while (peekC() !== ')');
        skipC();
        return buildList(elements, asm.slipNull());
    }
    function read_quo() {
        skipC();
        var // skip '
        quoted = read();
        var exp = make(0, quoted, asm.slipNull());
        exp = make(0, pool.loadQuo(), exp);
        return exp;
    }
    function read_shr() {
        skipC();
        switch (// skip #
            readC()) {
        case 't':
            return asm.slipTrue();
        case 'f':
            return asm.slipFalse();
        case '\\':
            var code = readC().charCodeAt(0);
            var char = asm.fmakeChar(code);
            return char;
        case '(':
            return read_vec();
        default:
            readerError(err.invalidSyntax);
        }
    }
    function read_vec() {
        if (peekC() === ')') {
            skipC();
            return make(0, pool.loadVec(), asm.slipNull());
        }
        var elements = [];
        do {
            elements.push(read());
        } while (peekC() !== ')');
        var args = buildList(elements, asm.slipNull());
        var vctApl = make(0, pool.loadVec(), args);
        return vctApl;
    }
    function read_str() {
        hold = position;
        while (program.charAt(++position) !== '"');
        return extractString(hold + 1, position++);
    }
    function read_sym() {
        hold = position;
        while (!isTerminator(program.charAt(++position)));
        return pool.enterPool(program.substring(hold, position));
    }
    function read_num() {
        hold = position;
        switch (//step 1: check for sign
            program.charAt(position)) {
        case '+':
        case '-':
            if (!isNumber(program.charAt(++position))) {
                --position;
                //oops, go back
                return read_sym();
            }
        }
        while (//step 2: parse number in front of .
            isNumber(program.charAt(++position)));
        if (//step 3: parse number after .
            program.charAt(position) === '.') {
            while (isNumber(program.charAt(++position)));
            var flt = parseFloat(program.substring(hold, position));
            return asm.fmakeFloat(flt);
        }
        var int = parseInt(program.substring(hold, position));
        return asm.fmakeNumber(int);
    }
    function isTerminator(c) {
        switch (c) {
        case ' ':
        case '':
        case '\n':
        case '\t':
        case '\'':
        case '"':
        case ')':
        case '(':
        case ';':
        case '.':
        case '\r':
            return true;
        default:
            return false;
        }
    }
    function isNumber(c) {
        return !(c < '0' || c > '9');
    }
    function skipWhiteSpace() {
        while (true) {
            switch (program.charAt(position)) {
            case ';':
                var current;
                while ((current = program.charAt(++position)) != '\n' && current != '\r' && current != '');
            case '\n':
            case '\r':
            case '\t':
            case ' ':
                ++position;
                break;
            default:
                return;
            }
        }
    }
    function skipC() {
        skipWhiteSpace();
        ++position;
    }
    function peekC() {
        skipWhiteSpace();
        return program.charAt(position);
    }
    function readC() {
        skipWhiteSpace();
        return program.charAt(position++);
    }
    function buildList(elements, tail) {
        var len = elements.length;
        var lst = tail;
        while (len) {
            var exp = elements[--len];
            lst = make(0, exp, lst);
        }
        return lst;
    }
    function extractString(from, to) {
        var len = to - from;
        var str = asm.fmakeText(5, len);
        for (var i = 0; i < len; ++i) {
            var chr = program.charCodeAt(from + i);
            asm.ftextSetChar(str, i, chr);
        }
        return str;
    }
    return {
        load: load,
        link: link,
        read: read_exp
    };
}