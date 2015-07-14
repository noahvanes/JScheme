var startp;

function SLIP(callbacks, size) {
    'use strict';
    function SLIP_ASM(stdlib, foreign$2, heap) {
        'use asm';
        var /* -- IMPORTS & VARIABLES -- */
        //memory
        MEM8 = new stdlib.Uint8Array(heap);
        var MEM32 = new stdlib.Uint32Array(heap);
        var FLT32 = new stdlib.Float32Array(heap);
        var STKTOP = foreign$2.heapSize | 0;
        var MEMSIZ = foreign$2.heapSize | 0;
        var MEMTOP = 0;
        var //math
        fround = stdlib.Math.fround;
        var imul = stdlib.Math.imul;
        //TODO: cleanup registers
        //registers
        var ADR = 0;
        var ARG = 0;
        var BND = 0;
        var DCT = 0;
        var DFR = 0;
        //dictionary frame
        var DEN = 0;
        //dictionary environment
        var DGL = 0;
        //dictionary global frame
        var ENV = 0;
        var EXP = 0;
        var FRM = 0;
        var FLT = fround(0);
        var GLB = 0;
        var IDX = 0;
        var KON = 0;
        var LEN = 0;
        var LST = 0;
        var OFS = 0;
        //dictionary offset
        var PAR = 0;
        var PAT = 0;
        var SCP = 0;
        //dictionary scope
        var SEQ = 0;
        var SIZ = 0;
        var SYM = 0;
        var TMP = 0;
        var VAL = 0;
        var //reader
        look = foreign$2.look;
        var skip = foreign$2.skip;
        var read = foreign$2.read;
        var readSymbol = foreign$2.readSymbol;
        var readString = foreign$2.readString;
        var readNumber = foreign$2.readNumber;
        //dictionary
        var currentScpLvl = 0;
        var currentFrmSiz = 0;
        var globalFrmSiz = 0;
        var //errors
        err_expectedRBR = foreign$2.expectedRBR;
        var err_invalidSyntax = foreign$2.invalidSyntax;
        var err_invalidIf = foreign$2.invalidIf;
        var err_invalidSequence = foreign$2.invalidSequence;
        var err_invalidQuote = foreign$2.invalidQuote;
        var err_invalidDefine = foreign$2.invalidDefine;
        var err_invalidAssignment = foreign$2.invalidAssignment;
        var err_invalidLambda = foreign$2.invalidLambda;
        var err_invalidApplication = foreign$2.invalidApplication;
        var err_undefinedVariable = foreign$2.undefinedVariable;
        var err_invalidParamCount = foreign$2.invalidParamCount;
        var err_invalidParameter = foreign$2.invalidParameter;
        var err_invalidOperator = foreign$2.invalidOperator;
        var err_invalidExpression = foreign$2.invalidExpression;
        var err_invalidArgument = foreign$2.invalidArgument;
        var err_invalidLength = foreign$2.invalidLength;
        var err_invalidRange = foreign$2.invalidRange;
        var err_fatalMemory = foreign$2.fatalMemory;
        //pool
        var __POOL_TOP__ = 0;
        var __POOL_SIZ__ = 0;
        //environment
        var __GLOBAL_SIZ__ = 0;
        var //timer
        clock = foreign$2.clock;
        var reset = foreign$2.reset;
        //symbols
        var __QUO_SYM__ = 0;
        var __VEC_SYM__ = 0;
        var __DEF_SYM__ = 0;
        var __LMB_SYM__ = 0;
        var __IFF_SYM__ = 0;
        var __BEG_SYM__ = 0;
        var __SET_SYM__ = 0;
        var loadQuo = foreign$2.loadQuo;
        var loadVec = foreign$2.loadVec;
        var loadDef = foreign$2.loadDef;
        var loadLmb = foreign$2.loadLmb;
        var loadIff = foreign$2.loadIff;
        var loadBeg = foreign$2.loadBeg;
        var loadSet = foreign$2.loadSet;
        var loadPls = foreign$2.loadPls;
        var loadMns = foreign$2.loadMns;
        var loadMul = foreign$2.loadMul;
        var loadDiv = foreign$2.loadDiv;
        var loadCns = foreign$2.loadCns;
        var loadCar = foreign$2.loadCar;
        var loadCdr = foreign$2.loadCdr;
        var loadSca = foreign$2.loadSca;
        var loadScd = foreign$2.loadScd;
        var loadLst = foreign$2.loadLst;
        var loadNeq = foreign$2.loadNeq;
        var loadSma = foreign$2.loadSma;
        var loadLrg = foreign$2.loadLrg;
        var loadLeq = foreign$2.loadLeq;
        var loadSeq = foreign$2.loadSeq;
        var loadAss = foreign$2.loadAss;
        var loadMap = foreign$2.loadMap;
        var loadVcm = foreign$2.loadVcm;
        var loadVcr = foreign$2.loadVcr;
        var loadVcs = foreign$2.loadVcs;
        var loadVcl = foreign$2.loadVcl;
        var loadEqu = foreign$2.loadEqu;
        var loadEql = foreign$2.loadEql;
        var loadEva = foreign$2.loadEva;
        var loadApl = foreign$2.loadApl;
        var loadRea = foreign$2.loadRea;
        var loadLoa = foreign$2.loadLoa;
        var loadIpa = foreign$2.loadIpa;
        var loadInu = foreign$2.loadInu;
        var loadIsy = foreign$2.loadIsy;
        var loadIve = foreign$2.loadIve;
        var loadIst = foreign$2.loadIst;
        var loadDis = foreign$2.loadDis;
        var loadNew = foreign$2.loadNew;
        var loadSre = foreign$2.loadSre;
        var loadSse = foreign$2.loadSse;
        var loadSle = foreign$2.loadSle;
        var loadAvl = foreign$2.loadAvl;
        var loadCol = foreign$2.loadCol;
        var loadClk = foreign$2.loadClk;
        var loadSlp = foreign$2.loadSlp;
        var loadRnd = foreign$2.loadRnd;
        var loadErr = foreign$2.loadErr;
        var loadRst = foreign$2.loadRst;
        var loadCcc = foreign$2.loadCcc;
        var //IO
        promptUserInput = foreign$2.promptUserInput;
        var printNewline = foreign$2.printNewline;
        var promptInput = foreign$2.promptInput;
        var printOutput = foreign$2.printOutput;
        var printLog = foreign$2.printLog;
        var loadFile = foreign$2.loadFile;
        var initREPL = foreign$2.initREPL;
        var //custom
        random = foreign$2.random;
        //other
        var __EMPTY_VEC__ = 0;
        function available() {
            return STKTOP - MEMTOP | 0;
        }
        function collectGarbage() {
            STKTOP = STKTOP - 4 | 0;
            MEM32[STKTOP >> 2] = makeBusy(STKTOP) | 0;
            mark(MEMSIZ - 4 | 0);
            update();
            crunch();
            zap();
        }
        function mark(pos) {
            pos = pos | 0;
            var cel = 0;
            var ptr = 0;
            var len = 0;
            for (;;) {
                cel = MEM32[pos >> 2] | 0;
                switch (cel & 3) {
                case //last 2 bits
                    0:
                    //bp
                    ptr = cel;
                    cel = MEM32[ptr >> 2] | 0;
                    switch (cel & 7) {
                    case //last 3 bits
                        0:
                        //rbp
                        MEM32[ptr >> 2] = makeBusy(pos) | 0;
                        MEM32[pos >> 2] = cel;
                        len = headerSize(cel) | 0;
                        pos = len ? ptr + (len << 2) | 0 : pos - 4 | 0;
                        continue;
                    case 2:
                    case //rBp
                        6:
                        //RBp
                        ptr = makeFree(cel) | 0;
                        cel = MEM32[ptr >> 2] | 0;
                    case 4:
                        //Rbp
                        MEM32[ptr >> 2] = makeBusy(pos) | 0;
                        MEM32[pos >> 2] = cel;
                        pos = pos - 4 | 0;
                    }
                    continue;
                case 2:
                    //Bp
                    pos = makeFree(cel) | 0;
                    if ((pos | 0) == (STKTOP | 0))
                        return;
                case 1:
                case //bP
                    3:
                    //BP
                    pos = pos - 4 | 0;
                }
            }
        }
        function update() {
            var src = 0;
            var dst = 0;
            var cel = 0;
            var ptr = 0;
            var len = 0;
            var siz = 0;
            var cur = 0;
            while ((src | 0) < (MEMTOP | 0)) {
                cel = MEM32[src >> 2] | 0;
                if (cel & 2) {
                    do {
                        //marked chunk
                        ptr = cel;
                        cel = MEM32[ptr >> 2] | 0;
                        MEM32[ptr >> 2] = dst;
                    } while (cel & 2);
                    MEM32[src >> 2] = makeBusy(cel) | 0;
                    len = (headerSize(cel) | 0) + 1 << 2;
                    src = src + len | 0;
                    dst = dst + len | 0;
                } else {
                    //unmarked chunk
                    siz = (headerSize(cel) | 0) + 1 << 2;
                    for (cur = src + siz | 0; (cur | 0) < (MEMTOP | 0); cur = cur + len | 0, siz = siz + len | 0) {
                        cel = MEM32[cur >> 2] | 0;
                        if (cel & 2)
                            break;
                        //busy
                        len = (headerSize(cel) | 0) + 1 << 2;
                        if ((siz + len | 0) > 67108860)
                            break;
                    }
                    MEM32[src >> 2] = makeHeader(0, (siz >> 2) - 1 | 0) | 0;
                    src = src + siz | 0;
                }
            }
        }
        function crunch() {
            var src = 0;
            var dst = 0;
            var len = 0;
            var cel = 0;
            while ((src | 0) < (MEMTOP | 0)) {
                cel = MEM32[src >> 2] | 0;
                len = headerSize(cel) | 0;
                if (cel & 2) {
                    //busy
                    MEM32[dst >> 2] = makeFree(cel) | 0;
                    src = src + 4 | 0;
                    dst = dst + 4 | 0;
                    for (; (len | 0) > 0; len = len - 1 | 0) {
                        MEM32[dst >> 2] = MEM32[src >> 2];
                        src = src + 4 | 0;
                        dst = dst + 4 | 0;
                    }
                } else {
                    len = len + 1 << 2;
                    src = src + len | 0;
                }
            }
            MEMTOP = dst;
        }
        function makeHeader(tag$2, siz) {
            tag$2 = tag$2 | 0;
            siz = siz | 0;
            var hdr = 0;
            hdr = siz << 6 | tag$2;
            return hdr << 2 | 0;
        }
        function headerSize(hdr) {
            hdr = hdr | 0;
            return hdr >>> 8 | 0;
        }
        function makeFree(ofs) {
            ofs = ofs | 0;
            return ofs & 4294967293 | 0;
        }
        function makeBusy(ofs) {
            ofs = ofs | 0;
            return ofs | 2 | 0;
        }
        function makeImmediate(val) {
            val = val | 0;
            return val << 1 | 1 | 0;
        }
        function isImmediate(exp) {
            exp = exp | 0;
            return exp & 1 | 0;
        }
        function immediateVal(exp) {
            exp = exp | 0;
            return exp >> 1 | 0;
        }
        function makeChunk(tag$2, siz) {
            tag$2 = tag$2 | 0;
            siz = siz | 0;
            var adr = 0;
            adr = MEMTOP;
            MEMTOP = MEMTOP + (siz + 1 << 2) | 0;
            MEM32[adr >> 2] = makeHeader(tag$2, siz) | 0;
            return adr | 0;
        }
        function chunkTag(ptr) {
            ptr = ptr | 0;
            var hdr = 0;
            hdr = MEM32[ptr >> 2] | 0;
            return hdr >>> 2 & 63 | 0;
        }
        function chunkSize(ptr) {
            ptr = ptr | 0;
            var hdr = 0;
            hdr = MEM32[ptr >> 2] | 0;
            return headerSize(hdr) | 0;
        }
        function chunkGet(ptr, idx) {
            ptr = ptr | 0;
            idx = idx | 0;
            return MEM32[ptr + idx >> 2] | 0;
        }
        function chunkGetByte(ptr, idx) {
            ptr = ptr | 0;
            idx = idx | 0;
            return MEM8[ptr + idx | 0] | 0;
        }
        function chunkGetFloat(ptr, idx) {
            ptr = ptr | 0;
            idx = idx | 0;
            return fround(FLT32[ptr + idx >> 2]);
        }
        function chunkSet(ptr, idx, val) {
            ptr = ptr | 0;
            idx = idx | 0;
            val = val | 0;
            MEM32[ptr + idx >> 2] = val | 0;
        }
        function chunkSetByte(ptr, idx, byt) {
            ptr = ptr | 0;
            idx = idx | 0;
            byt = byt | 0;
            MEM8[ptr + idx | 0] = byt;
        }
        function chunkSetFloat(ptr, idx, flt) {
            ptr = ptr | 0;
            idx = idx | 0;
            flt = fround(flt);
            FLT32[ptr + idx >> 2] = flt;
        }
        function push(el) {
            el = el | 0;
            STKTOP = STKTOP - 4 | 0;
            MEM32[STKTOP >> 2] = el;
        }
        function pop() {
            var tmp = 0;
            tmp = MEM32[STKTOP >> 2] | 0;
            STKTOP = STKTOP + 4 | 0;
            return tmp | 0;
        }
        function peek() {
            return MEM32[STKTOP >> 2] | 0;
        }
        function poke(el) {
            el = el | 0;
            MEM32[STKTOP >> 2] = el;
        }
        function zap() {
            STKTOP = STKTOP + 4 | 0;
        }
        function emptyStk() {
            STKTOP = MEMSIZ;
        }
        function stkSize() {
            return (MEMSIZ - STKTOP | 0) >> 2;
        }
        function stackAt(idx) {
            idx = idx | 0;
            return MEM32[STKTOP + idx >> 2] | 0;
        }
        function tag(exp) {
            exp = exp | 0;
            var val = 0;
            if (isImmediate(exp) | 0) {
                val = immediateVal(exp) | 0;
                if ((val | 0) < 1073741312)
                    //signed smallint
                    return 69;    //signed smallint
                else if ((val | 0) < 1073741568)
                    //character
                    return 64;    //character
                else if ((val | 0) < 1073741820)
                    //native pointer
                    return 70;    //native pointer
                else
                    switch (//special value
                        val & 3) {
                    case 0:
                        return 66;
                    case 1:
                        return 65;
                    case 2:
                        return 68;
                    case 3:
                        return 67;
                    }
            }
            return chunkTag(exp) | 0;
        }
        function makeChar(charCode$2) {
            charCode$2 = charCode$2 | 0;
            return makeImmediate(1073741312 | charCode$2) | 0;
        }
        function charCode(ch) {
            ch = ch | 0;
            return (immediateVal(ch) | 0) & 255;
        }
        function isChar(x) {
            x = x | 0;
            return (tag(x) | 0) == 64 | 0;
        }
        function isTrue(x) {
            x = x | 0;
            return (tag(x) | 0) == 65 | 0;
        }
        function isFalse(x) {
            x = x | 0;
            return (tag(x) | 0) == 66 | 0;
        }
        function isVoid(x) {
            x = x | 0;
            return (tag(x) | 0) == 67 | 0;
        }
        function isNull(x) {
            x = x | 0;
            return (tag(x) | 0) == 68 | 0;
        }
        function isNumber(x) {
            x = x | 0;
            return (tag(x) | 0) == 69 | 0;
        }
        function makeNative(nat) {
            nat = nat | 0;
            return makeImmediate(1073741568 | nat) | 0;
        }
        function nativePtr(nat) {
            nat = nat | 0;
            return (immediateVal(nat) | 0) & 255;
        }
        function isNative(x) {
            x = x | 0;
            return (tag(x) | 0) == 70 | 0;
        }
        function makePair(car, cdr) {
            car = car | 0;
            cdr = cdr | 0;
            var pair = 0;
            pair = makeChunk(0, 2) | 0;
            chunkSet(pair, 4, car);
            chunkSet(pair, 8, cdr);
            return pair | 0;
        }
        function pairCar(ptr) {
            ptr = ptr | 0;
            return chunkGet(ptr, 4) | 0;
        }
        function pairCdr(ptr) {
            ptr = ptr | 0;
            return chunkGet(ptr, 8) | 0;
        }
        function pairSetCar(ptr, exp) {
            ptr = ptr | 0;
            exp = exp | 0;
            chunkSet(ptr, 4, exp);
        }
        function pairSetCdr(ptr, exp) {
            ptr = ptr | 0;
            exp = exp | 0;
            chunkSet(ptr, 8, exp);
        }
        function isPair(x) {
            x = x | 0;
            return (tag(x) | 0) == 0 | 0;
        }
        function makeVector(siz) {
            siz = siz | 0;
            return makeChunk(2, siz) | 0;
        }
        function fillVector(siz, exp) {
            siz = siz | 0;
            exp = exp | 0;
            var vct = 0;
            var idx = 0;
            vct = makeChunk(2, siz) | 0;
            for (idx = 1; (idx | 0) <= (siz | 0); idx = idx + 1 | 0)
                chunkSet(vct, idx << 2, exp);
            return vct | 0;
        }
        function vectorRef(vct, idx) {
            vct = vct | 0;
            idx = idx | 0;
            return chunkGet(vct, idx << 2) | 0;
        }
        function vectorSet(vct, idx, val) {
            vct = vct | 0;
            idx = idx | 0;
            val = val | 0;
            chunkSet(vct, idx << 2, val);
        }
        function vectorLength(vct) {
            vct = vct | 0;
            return chunkSize(vct) | 0;
        }
        function currentStack() {
            var len = 0;
            var idx = 0;
            var vct = 0;
            var cur = 0;
            len = stkSize() | 0;
            vct = makeVector(len) | 0;
            while ((idx | 0) < (len | 0)) {
                cur = stackAt(idx << 2) | 0;
                idx = idx + 1 | 0;
                vectorSet(vct, idx, cur);
            }
            return vct | 0;
        }
        function restoreStack(vct) {
            vct = vct | 0;
            var len = 0;
            emptyStk();
            for (len = vectorLength(vct) | 0; len; len = len - 1 | 0)
                push(vectorRef(vct, len) | 0);
        }
        function isVector(x) {
            x = x | 0;
            return (tag(x) | 0) == 2 | 0;
        }
        function makeSequence(siz) {
            siz = siz | 0;
            return makeChunk(6, siz) | 0;
        }
        function sequenceAt(seq, idx) {
            seq = seq | 0;
            idx = idx | 0;
            return chunkGet(seq, idx << 2) | 0;
        }
        function sequenceSet(seq, idx, val) {
            seq = seq | 0;
            idx = idx | 0;
            val = val | 0;
            chunkSet(seq, idx << 2, val);
        }
        function sequenceLength(seq) {
            seq = seq | 0;
            return chunkSize(seq) | 0;
        }
        function isSequence(x) {
            x = x | 0;
            return (tag(x) | 0) == 6 | 0;
        }
        function makeIfs(pred, conseq) {
            pred = pred | 0;
            conseq = conseq | 0;
            var ifs = 0;
            ifs = makeChunk(8, 2) | 0;
            chunkSet(ifs, 4, pred);
            chunkSet(ifs, 8, conseq);
            return ifs | 0;
        }
        function ifsPredicate(ifs) {
            ifs = ifs | 0;
            return chunkGet(ifs, 4) | 0;
        }
        function ifsConsequence(ifs) {
            ifs = ifs | 0;
            return chunkGet(ifs, 8) | 0;
        }
        function isIfs(x) {
            x = x | 0;
            return (tag(x) | 0) == 8 | 0;
        }
        function makeIff(pred, conseq, alter) {
            pred = pred | 0;
            conseq = conseq | 0;
            alter = alter | 0;
            var iff = 0;
            iff = makeChunk(10, 3) | 0;
            chunkSet(iff, 4, pred);
            chunkSet(iff, 8, conseq);
            chunkSet(iff, 12, alter);
            return iff | 0;
        }
        function iffPredicate(iff) {
            iff = iff | 0;
            return chunkGet(iff, 4) | 0;
        }
        function iffConsequence(iff) {
            iff = iff | 0;
            return chunkGet(iff, 8) | 0;
        }
        function iffAlternative(iff) {
            iff = iff | 0;
            return chunkGet(iff, 12) | 0;
        }
        function isIff(x) {
            x = x | 0;
            return (tag(x) | 0) == 10 | 0;
        }
        function makeQuo(exp) {
            exp = exp | 0;
            var quo = 0;
            quo = makeChunk(22, 1) | 0;
            chunkSet(quo, 4, exp);
            return quo | 0;
        }
        function quoExpression(quo) {
            quo = quo | 0;
            return chunkGet(quo, 4) | 0;
        }
        function isQuo(x) {
            x = x | 0;
            return (tag(x) | 0) == 22 | 0;
        }
        function makeLambda(arg, bdy) {
            arg = arg | 0;
            bdy = bdy | 0;
            var lmb = 0;
            lmb = makeChunk(18, 2) | 0;
            chunkSet(lmb, 4, arg);
            chunkSet(lmb, 8, bdy);
            return lmb | 0;
        }
        function lambdaArg(lmb) {
            lmb = lmb | 0;
            return chunkGet(lmb, 4) | 0;
        }
        function lambdaBdy(lmb) {
            lmb = lmb | 0;
            return chunkGet(lmb, 8) | 0;
        }
        function isLambda(x) {
            x = x | 0;
            return (tag(x) | 0) == 18 | 0;
        }
        function makeDfv(ofs, val) {
            ofs = ofs | 0;
            val = val | 0;
            var dfv = 0;
            dfv = makeChunk(12, 2) | 0;
            chunkSet(dfv, 4, ofs);
            chunkSet(dfv, 8, val);
            return dfv | 0;
        }
        function dfvOfs(dfv) {
            dfv = dfv | 0;
            return chunkGet(dfv, 4) | 0;
        }
        function dfvVal(dfv) {
            dfv = dfv | 0;
            return chunkGet(dfv, 8) | 0;
        }
        function isDfv(x) {
            x = x | 0;
            return (tag(x) | 0) == 12 | 0;
        }
        function makeDff(ofs, arc, frc, bdy) {
            ofs = ofs | 0;
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            var dff = 0;
            dff = makeChunk(14, 4) | 0;
            chunkSet(dff, 4, ofs);
            chunkSet(dff, 8, arc);
            chunkSet(dff, 12, frc);
            chunkSet(dff, 16, bdy);
            return dff | 0;
        }
        function dffOfs(dff) {
            dff = dff | 0;
            return chunkGet(dff, 4) | 0;
        }
        function dffArgc(dff) {
            dff = dff | 0;
            return chunkGet(dff, 8) | 0;
        }
        function dffFrmSiz(dff) {
            dff = dff | 0;
            return chunkGet(dff, 12) | 0;
        }
        function dffBdy(dff) {
            dff = dff | 0;
            return chunkGet(dff, 16) | 0;
        }
        function isDff(x) {
            x = x | 0;
            return (tag(x) | 0) == 14 | 0;
        }
        function makeDfz(ofs, arc, frc, bdy) {
            ofs = ofs | 0;
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            var dfz = 0;
            dfz = makeChunk(30, 4) | 0;
            chunkSet(dfz, 4, ofs);
            chunkSet(dfz, 8, arc);
            chunkSet(dfz, 12, frc);
            chunkSet(dfz, 16, bdy);
            return dfz | 0;
        }
        function dfzOfs(dfz) {
            dfz = dfz | 0;
            return chunkGet(dfz, 4) | 0;
        }
        function dfzArgc(dfz) {
            dfz = dfz | 0;
            return chunkGet(dfz, 8) | 0;
        }
        function dfzFrmSiz(dfz) {
            dfz = dfz | 0;
            return chunkGet(dfz, 12) | 0;
        }
        function dfzBdy(dfz) {
            dfz = dfz | 0;
            return chunkGet(dfz, 16) | 0;
        }
        function isDfz(x) {
            x = x | 0;
            return (tag(x) | 0) == 30 | 0;
        }
        function makeSlc(ofs, val) {
            ofs = ofs | 0;
            val = val | 0;
            var slc = 0;
            slc = makeChunk(40, 2) | 0;
            chunkSet(slc, 4, ofs);
            chunkSet(slc, 8, val);
            return slc | 0;
        }
        function slcOfs(slc) {
            slc = slc | 0;
            return chunkGet(slc, 4) | 0;
        }
        function slcVal(slc) {
            slc = slc | 0;
            return chunkGet(slc, 8) | 0;
        }
        function isSlc(x) {
            x = x | 0;
            return (tag(x) | 0) == 40 | 0;
        }
        function makeSgl(scp, ofs, val) {
            scp = scp | 0;
            ofs = ofs | 0;
            val = val | 0;
            var sgl = 0;
            sgl = makeChunk(20, 3) | 0;
            chunkSet(sgl, 4, scp);
            chunkSet(sgl, 8, ofs);
            chunkSet(sgl, 12, val);
            return sgl | 0;
        }
        function sglScp(sgl) {
            sgl = sgl | 0;
            return chunkGet(sgl, 4) | 0;
        }
        function sglOfs(sgl) {
            sgl = sgl | 0;
            return chunkGet(sgl, 8) | 0;
        }
        function sglVal(sgl) {
            sgl = sgl | 0;
            return chunkGet(sgl, 12) | 0;
        }
        function isSgl(x) {
            x = x | 0;
            return (tag(x) | 0) == 20 | 0;
        }
        function makeApplication(opr, opd) {
            opr = opr | 0;
            opd = opd | 0;
            var apl = 0;
            apl = makeChunk(16, 2) | 0;
            chunkSet(apl, 4, opr);
            chunkSet(apl, 8, opd);
            return apl | 0;
        }
        function aplOperator(apl) {
            apl = apl | 0;
            return chunkGet(apl, 4) | 0;
        }
        function aplOperands(apl) {
            apl = apl | 0;
            return chunkGet(apl, 8) | 0;
        }
        function isApplication(x) {
            x = x | 0;
            return (tag(x) | 0) == 16 | 0;
        }
        function makeContinuation(kon, frm, env, stk) {
            kon = kon | 0;
            frm = frm | 0;
            env = env | 0;
            stk = stk | 0;
            var cnt = 0;
            cnt = makeChunk(24, 4) | 0;
            chunkSet(cnt, 4, kon);
            chunkSet(cnt, 8, frm);
            chunkSet(cnt, 12, env);
            chunkSet(cnt, 16, stk);
            return cnt | 0;
        }
        function continuationKon(cnt) {
            cnt = cnt | 0;
            return chunkGet(cnt, 4) | 0;
        }
        function continuationFrm(cnt) {
            cnt = cnt | 0;
            return chunkGet(cnt, 8) | 0;
        }
        function continuationEnv(cnt) {
            cnt = cnt | 0;
            return chunkGet(cnt, 12) | 0;
        }
        function continuationStk(cnt) {
            cnt = cnt | 0;
            return chunkGet(cnt, 16) | 0;
        }
        function isContinuation(x) {
            x = x | 0;
            return (tag(x) | 0) == 24 | 0;
        }
        function makeFrm(vrb, nxt) {
            vrb = vrb | 0;
            nxt = nxt | 0;
            var frm = 0;
            frm = makeChunk(26, 2) | 0;
            chunkSet(frm, 4, vrb);
            chunkSet(frm, 8, nxt);
            return frm | 0;
        }
        function frameVrb(frm) {
            frm = frm | 0;
            return chunkGet(frm, 4) | 0;
        }
        function frameNxt(frm) {
            frm = frm | 0;
            return chunkGet(frm, 8) | 0;
        }
        function isFrame(x) {
            x = x | 0;
            return (tag(x) | 0) == 26 | 0;
        }
        function makeEnv(frm, siz, nxt) {
            frm = frm | 0;
            siz = siz | 0;
            nxt = nxt | 0;
            var env = 0;
            env = makeChunk(28, 3) | 0;
            chunkSet(env, 4, frm);
            chunkSet(env, 3, siz);
            chunkSet(env, 12, nxt);
            return env | 0;
        }
        function envFrm(env) {
            env = env | 0;
            return chunkGet(env, 4) | 0;
        }
        function envSiz(env) {
            env = env | 0;
            return chunkGet(env, 3) | 0;
        }
        function envNxt(env) {
            env = env | 0;
            return chunkGet(env, 12) | 0;
        }
        function isEnvironment(x) {
            x = x | 0;
            return (tag(x) | 0) == 28 | 0;
        }
        function makeThunk(exp, siz) {
            exp = exp | 0;
            siz = siz | 0;
            var thk = 0;
            thk = makeChunk(32, 8) | 0;
            chunkSet(thk, 4, exp);
            chunkSet(thk, 8, siz);
            return thk | 0;
        }
        function thunkExp(thk) {
            thk = thk | 0;
            return chunkGet(thk, 4) | 0;
        }
        function thunkSiz(thk) {
            thk = thk | 0;
            return chunkGet(thk, 8) | 0;
        }
        function isThunk(x) {
            x = x | 0;
            return (tag(x) | 0) == 32 | 0;
        }
        function makeLmb(arc, frc, bdy) {
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            var lmb = 0;
            lmb = makeChunk(18, 3) | 0;
            chunkSet(lmb, 4, arc);
            chunkSet(lmb, 8, frc);
            chunkSet(lmb, 12, bdy);
            return lmb | 0;
        }
        function lmbArgc(lmb) {
            lmb = lmb | 0;
            return chunkGet(lmb, 4) | 0;
        }
        function lmbFrmSiz(lmb) {
            lmb = lmb | 0;
            return chunkGet(lmb, 8) | 0;
        }
        function lmbBdy(lmb) {
            lmb = lmb | 0;
            return chunkGet(lmb, 12) | 0;
        }
        function isLmb(x) {
            x = x | 0;
            return (tag(x) | 0) == 18 | 0;
        }
        function makeLmz(arc, frc, bdy) {
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            var lmz = 0;
            lmz = makeChunk(34, 3) | 0;
            chunkSet(lmz, 4, arc);
            chunkSet(lmz, 8, frc);
            chunkSet(lmz, 12, bdy);
            return lmz | 0;
        }
        function lmzArgc(lmz) {
            lmz = lmz | 0;
            return chunkGet(lmz, 4) | 0;
        }
        function lmzFrmSiz(lmz) {
            lmz = lmz | 0;
            return chunkGet(lmz, 8) | 0;
        }
        function lmzBdy(lmz) {
            lmz = lmz | 0;
            return chunkGet(lmz, 12) | 0;
        }
        function isLmz(x) {
            x = x | 0;
            return (tag(x) | 0) == 34 | 0;
        }
        function makeLocal(ofs) {
            ofs = ofs | 0;
            var lcl = 0;
            lcl = makeChunk(36, 1) | 0;
            chunkSet(lcl, 4, ofs);
            return lcl | 0;
        }
        function localOfs(lcl) {
            lcl = lcl | 0;
            return chunkGet(lcl, 4) | 0;
        }
        function isLocal(x) {
            x = x | 0;
            return (tag(x) | 0) == 36 | 0;
        }
        function makeGlobal(scp, ofs) {
            scp = scp | 0;
            ofs = ofs | 0;
            var glb = 0;
            glb = makeChunk(38, 2) | 0;
            chunkSet(glb, 4, scp);
            chunkSet(glb, 8, ofs);
            return glb | 0;
        }
        function globalScp(glb) {
            glb = glb | 0;
            return chunkGet(glb, 4) | 0;
        }
        function globalOfs(glb) {
            glb = glb | 0;
            return chunkGet(glb, 8) | 0;
        }
        function isGlobal(x) {
            x = x | 0;
            return (tag(x) | 0) == 38 | 0;
        }
        function makePrc(arc, frc, bdy, env) {
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            env = env | 0;
            var prc = 0;
            prc = makeChunk(4, 4) | 0;
            chunkSet(prc, 4, arc);
            chunkSet(prc, 8, frc);
            chunkSet(prc, 12, bdy);
            chunkSet(prc, 16, env);
            return prc | 0;
        }
        function prcArgc(prc) {
            prc = prc | 0;
            return chunkGet(prc, 4) | 0;
        }
        function prcFrmSiz(prc) {
            prc = prc | 0;
            return chunkGet(prc, 8) | 0;
        }
        function prcBdy(prc) {
            prc = prc | 0;
            return chunkGet(prc, 12) | 0;
        }
        function prcEnv(prc) {
            prc = prc | 0;
            return chunkGet(prc, 16) | 0;
        }
        function isPrc(x) {
            x = x | 0;
            return (tag(x) | 0) == 4 | 0;
        }
        function makePrz(arc, frc, bdy, env) {
            arc = arc | 0;
            frc = frc | 0;
            bdy = bdy | 0;
            env = env | 0;
            var prz = 0;
            prz = makeChunk(42, 4) | 0;
            chunkSet(prz, 4, arc);
            chunkSet(prz, 8, frc);
            chunkSet(prz, 12, bdy);
            chunkSet(prz, 16, env);
            return prz | 0;
        }
        function przArgc(prz) {
            prz = prz | 0;
            return chunkGet(prz, 4) | 0;
        }
        function przFrmSiz(prz) {
            prz = prz | 0;
            return chunkGet(prz, 8) | 0;
        }
        function przBdy(prz) {
            prz = prz | 0;
            return chunkGet(prz, 12) | 0;
        }
        function przEnv(prz) {
            prz = prz | 0;
            return chunkGet(prz, 16) | 0;
        }
        function isPrz(x) {
            x = x | 0;
            return (tag(x) | 0) == 42 | 0;
        }
        function makeFloat(nbr) {
            nbr = fround(nbr);
            var flt = 0;
            flt = makeChunk(1, 1) | 0;
            chunkSetFloat(flt, 4, nbr);
            return flt | 0;
        }
        function floatNumber(flt) {
            flt = flt | 0;
            return fround(chunkGetFloat(flt, 4));
        }
        function isFloat(x) {
            x = x | 0;
            return (tag(x) | 0) == 1 | 0;
        }
        function makeText(tag$2, len) {
            tag$2 = tag$2 | 0;
            len = len | 0;
            var chk = 0;
            var siz = 0;
            for (siz = len; siz & 3; siz = siz + 1 | 0);
            chk = makeChunk(tag$2, siz >> 2) | 0;
            for (len = len + 4 | 0, siz = siz + 4 | 0; (len | 0) < (siz | 0); len = len + 1 | 0)
                chunkSetByte(chk, len, 0);
            return chk | 0;
        }
        function textSetChar(txt, idx, chr) {
            txt = txt | 0;
            idx = idx | 0;
            chr = chr | 0;
            chunkSetByte(txt, idx + 4 | 0, chr);
        }
        function textGetChar(txt, idx) {
            txt = txt | 0;
            idx = idx | 0;
            return chunkGetByte(txt, idx + 4 | 0) | 0;
        }
        function textLength(txt) {
            txt = txt | 0;
            var len = 0;
            len = (chunkSize(txt) | 0) << 2;
            if (len)
                for (; !(chunkGetByte(txt, len + 3 | 0) | 0); len = len - 1 | 0);
            return len | 0;
        }
        function makeString(len) {
            len = len | 0;
            return makeText(5, len) | 0;
        }
        function isString(x) {
            x = x | 0;
            return (tag(x) | 0) == 5 | 0;
        }
        function makeSymbol(len) {
            len = len | 0;
            return makeText(3, len) | 0;
        }
        function isSymbol(x) {
            x = x | 0;
            return (tag(x) | 0) == 3 | 0;
        }
        function initPool() {
            __POOL_TOP__ = 0;
            __POOL_SIZ__ = 64;
            SYM = fillVector(__POOL_SIZ__, 2147483647) | 0;
        }
        function growPool() {
            var idx = 0;
            var sym = 0;
            __POOL_SIZ__ = imul(__POOL_SIZ__, 2) | 0;
            claimSiz(__POOL_SIZ__);
            TMP = fillVector(__POOL_SIZ__, 2147483647) | 0;
            while ((idx | 0) < (__POOL_TOP__ | 0)) {
                idx = idx + 1 | 0;
                sym = vectorRef(SYM, idx) | 0;
                vectorSet(TMP, idx, sym);
            }
            SYM = TMP;
        }
        function poolAt(idx) {
            idx = idx | 0;
            return vectorRef(SYM, idx) | 0;
        }
        function enterPool(sym) {
            sym = sym | 0;
            if ((__POOL_TOP__ | 0) == (__POOL_SIZ__ | 0))
                growPool();
            __POOL_TOP__ = __POOL_TOP__ + 1 | 0;
            vectorSet(SYM, __POOL_TOP__, sym);
            return __POOL_TOP__ | 0;
        }
        function loadSymbols() {
            __QUO_SYM__ = loadQuo() | 0;
            __VEC_SYM__ = loadVec() | 0;
            __DEF_SYM__ = loadDef() | 0;
            __LMB_SYM__ = loadLmb() | 0;
            __IFF_SYM__ = loadIff() | 0;
            __BEG_SYM__ = loadBeg() | 0;
            __SET_SYM__ = loadSet() | 0;
        }
        function initDictionary() {
            DEN = 2147483645;
            DFR = 2147483645;
            DGL = 2147483645;
        }
        function defineVar() {
            if ((currentScpLvl | 0) == 0 & (currentFrmSiz | 0) == (__GLOBAL_SIZ__ | 0))
                globalsGrow();
            DFR = makeFrm(PAT, DFR) | 0;
            currentFrmSiz = currentFrmSiz + 1 | 0;
            return currentFrmSiz | 0;
        }
        function enterScope() {
            DEN = makeEnv(DFR, makeImmediate(currentFrmSiz) | 0, DEN) | 0;
            currentScpLvl = currentScpLvl + 1 | 0;
            DFR = 2147483645;
            currentFrmSiz = 0;
        }
        function exitScope() {
            var frameSize = 0;
            frameSize = currentFrmSiz;
            DFR = envFrm(DEN) | 0;
            currentFrmSiz = immediateVal(envSiz(DEN) | 0) | 0;
            DEN = envNxt(DEN) | 0;
            currentScpLvl = currentScpLvl - 1 | 0;
            return frameSize | 0;
        }
        function offset(frm) {
            frm = frm | 0;
            for (; OFS; OFS = OFS - 1 | 0, frm = frameNxt(frm) | 0)
                if ((frameVrb(frm) | 0) == (PAT | 0) | 0)
                    return;
        }
        function lexicalAdr() {
            var env = 0;
            OFS = currentFrmSiz;
            offset(DFR);
            if (OFS) {
                //local variable found!
                SCP = 0;
                return;
            }
            if (currentScpLvl) {
                for (//maybe higher in environment?
                    SCP = currentScpLvl, env = DEN; SCP; SCP = SCP - 1 | 0, env = envNxt(env) | 0) {
                    OFS = immediateVal(envSiz(env) | 0) | 0;
                    offset(envFrm(env) | 0);
                    if (OFS)
                        return;
                }
            }
        }
        function dctCheckpoint() {
            DGL = DFR;
            globalFrmSiz = currentFrmSiz;
        }
        function dctRollback() {
            //TODO: check with C implementation
            DFR = DGL;
            DEN = 2147483645;
            currentFrmSiz = globalFrmSiz;
            currentScpLvl = 0;
        }
        function initEnvironment() {
            __GLOBAL_SIZ__ = 64;
            GLB = fillVector(__GLOBAL_SIZ__, 2147483647) | 0;
            FRM = GLB;
            ENV = 2147483645;
        }
        function globalsGrow() {
            var siz = 0;
            var idx = 0;
            var val = 0;
            siz = imul(__GLOBAL_SIZ__, 2) | 0;
            claimSiz(siz);
            TMP = fillVector(siz, 2147483647) | 0;
            while ((idx | 0) < (__GLOBAL_SIZ__ | 0)) {
                idx = idx + 1 | 0;
                val = vectorRef(GLB, idx) | 0;
                vectorSet(TMP, idx, val);
            }
            __GLOBAL_SIZ__ = siz;
            GLB = TMP;
        }
        function extendEnv() {
            var env = 0;
            var len = 0;
            var idx = 0;
            len = (vectorLength(ENV) | 0) + 1 | 0;
            claimSiz(len);
            env = makeVector(len) | 0;
            for (idx = 1; (idx | 0) < (len | 0); idx = idx + 1 | 0)
                vectorSet(env, idx, vectorRef(ENV, idx) | 0);
            vectorSet(env, len, FRM);
            return env | 0;
        }
        function initNatives() {
            addNative(loadLoa() | 0, 44);
            addNative(loadRnd() | 0, 43);
            addNative(loadSle() | 0, 42);
            addNative(loadSse() | 0, 41);
            addNative(loadSre() | 0, 40);
            addNative(loadCcc() | 0, 39);
            addNative(loadAvl() | 0, 38);
            addNative(loadCol() | 0, 37);
            addNative(loadRst() | 0, 34);
            addNative(loadClk() | 0, 33);
            addNative(loadIst() | 0, 27);
            addNative(loadIve() | 0, 26);
            addNative(loadIsy() | 0, 25);
            addNative(loadInu() | 0, 24);
            addNative(loadIpa() | 0, 23);
            addNative(loadRea() | 0, 22);
            addNative(loadNew() | 0, 21);
            addNative(loadDis() | 0, 20);
            addNative(loadEva() | 0, 18);
            addNative(loadApl() | 0, 19);
            addNative(loadMap() | 0, 17);
            addNative(loadAss() | 0, 16);
            addNative(loadVec() | 0, 32);
            addNative(loadVcl() | 0, 31);
            addNative(loadVcs() | 0, 30);
            addNative(loadVcr() | 0, 29);
            addNative(loadVcm() | 0, 28);
            addNative(loadEql() | 0, 36);
            addNative(loadEqu() | 0, 35);
            addNative(loadNeq() | 0, 11);
            addNative(loadLeq() | 0, 13);
            addNative(loadSeq() | 0, 12);
            addNative(loadSma() | 0, 14);
            addNative(loadLrg() | 0, 15);
            addNative(loadLst() | 0, 10);
            addNative(loadScd() | 0, 9);
            addNative(loadSca() | 0, 8);
            addNative(loadCdr() | 0, 7);
            addNative(loadCar() | 0, 6);
            addNative(loadCns() | 0, 5);
            addNative(loadDiv() | 0, 4);
            addNative(loadMul() | 0, 3);
            addNative(loadPls() | 0, 1);
            addNative(loadMns() | 0, 2);
        }
        function addNative(nam, ptr) {
            nam = nam | 0;
            ptr = ptr | 0;
            PAT = nam;
            OFS = defineVar() | 0;
            VAL = makeNative(ptr) | 0;
            vectorSet(FRM, OFS, VAL);
        }
        function init() {
            initPool();
            loadSymbols();
            initDictionary();
            initEnvironment();
            EXP = 2147483645;
            VAL = 2147483645;
            LST = 2147483645;
            __EMPTY_VEC__ = makeVector(0) | 0;
            initNatives();
        }
        function Slip_REPL() {
            initREPL();
            run(127);
        }
        function inputReady() {
            run(45);
        }
        function claim() {
            if ((available() | 0) < 128) {
                reclaim();
                if ((available() | 0) < 128)
                    err_fatalMemory();
            }
        }
        function claimSiz(amount) {
            amount = amount | 0;
            amount = (imul(amount, 4) | 0) + 128 | 0;
            if ((available() | 0) < (amount | 0)) {
                reclaim();
                if ((available() | 0) < (amount | 0))
                    err_fatalMemory();
            }
        }
        function reclaim() {
            var regs = [
                'SYM','PAT','GLB','FRM','ENV','DGL','DFR',
                'DEN', 'LST', 'ARG', 'VAL', 'EXP', '__EMPTY_VEC__'
                ];

            var oldStr = regs.map(function(str) { return printOutput(eval(str)); });

            push(SYM);
            push(PAT);
            push(GLB);
            push(FRM);
            push(ENV);
            push(DGL);
            push(DFR);
            push(DEN);
            push(LST);
            push(ARG);
            push(VAL);
            push(EXP);
            push(__EMPTY_VEC__);
            collectGarbage();
            __EMPTY_VEC__ = pop() | 0;
            EXP = pop() | 0;
            VAL = pop() | 0;
            ARG = pop() | 0;
            LST = pop() | 0;
            DEN = pop() | 0;
            DFR = pop() | 0;
            DGL = pop() | 0;
            ENV = pop() | 0;
            FRM = pop() | 0;
            GLB = pop() | 0;
            PAT = pop() | 0;
            SYM = pop() | 0;
            loadSymbols();

            var newStr = regs.map(function(str) { return printOutput(eval(str)); });
            for(var i = 0; i < regs.length; ++i) {
                if (oldStr[i] != newStr[i]) {
                    console.log('Difference in ' + regs[i]);
                    console.log('Old: ' + oldStr[i]);
                    console.log('New: ' + newStr[i]);
                    throw 'Oops!';
                }
            }


        }
        function _N_add() {
            VAL = 0;
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = VAL + (immediateVal(EXP) | 0) | 0;
                    break;
                case 1:
                    FLT = fround(fround(VAL | 0) + fround(floatNumber(EXP)));
                    return 112;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            VAL = makeImmediate(VAL) | 0;
            return KON | 0;
        }
        function _N_sub() {
            if ((LEN | 0) == 0) {
                err_invalidParamCount();
                return 131;
            }
            if ((LEN | 0) == 1) {
                ARG = pairCar(ARG) | 0;
                switch (tag(ARG) | 0) {
                case 69:
                    VAL = makeImmediate(-(immediateVal(ARG) | 0) | 0) | 0;
                    return KON | 0;
                case 1:
                    claim();
                    VAL = makeFloat(fround(-fround(floatNumber(ARG)))) | 0;
                    return KON | 0;
                default:
                    err_invalidArgument(ARG | 0);
                    return 131;
                }
            }
            VAL = pairCar(ARG) | 0;
            ARG = pairCdr(ARG) | 0;
            LEN = LEN - 1 | 0;
            switch (tag(VAL) | 0) {
            case 69:
                VAL = immediateVal(VAL) | 0;
                while (LEN) {
                    LEN = LEN - 1 | 0;
                    EXP = pairCar(ARG) | 0;
                    ARG = pairCdr(ARG) | 0;
                    switch (tag(EXP) | 0) {
                    case 69:
                        VAL = VAL - (immediateVal(EXP) | 0) | 0;
                        break;
                    case 1:
                        FLT = fround(fround(VAL | 0) - fround(floatNumber(EXP)));
                        return 113;
                    default:
                        err_invalidArgument(EXP | 0);
                        return 131;
                    }
                }
                VAL = makeImmediate(VAL) | 0;
                return KON | 0;
            case 1:
                FLT = fround(floatNumber(VAL));
                return 113;
            }
            err_invalidArgument(VAL | 0);
            return 131;
        }
        function _N_multiply() {
            VAL = 1;
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = imul(VAL, immediateVal(EXP) | 0) | 0;
                    break;
                case 1:
                    FLT = fround(fround(VAL | 0) * fround(floatNumber(EXP)));
                    return 114;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            VAL = makeImmediate(VAL) | 0;
            return KON | 0;
        }
        function _N_div() {
            if ((LEN | 0) == 0) {
                err_invalidParamCount();
                return 131;
            }
            claim();
            if ((LEN | 0) == 1) {
                ARG = pairCar(ARG) | 0;
                switch (tag(ARG) | 0) {
                case 69:
                    VAL = makeFloat(fround(fround(1) / fround(immediateVal(ARG) | 0))) | 0;
                    return KON | 0;
                case 1:
                    VAL = makeFloat(fround(fround(1) / fround(floatNumber(ARG)))) | 0;
                    return KON | 0;
                default:
                    err_invalidArgument(ARG | 0);
                    return 131;
                }
            }
            VAL = pairCar(ARG) | 0;
            ARG = pairCdr(ARG) | 0;
            LEN = LEN - 1 | 0;
            switch (tag(VAL) | 0) {
            case 69:
                FLT = fround(immediateVal(VAL) | 0);
                break;
            case 1:
                FLT = fround(floatNumber(VAL));
                break;
            default:
                err_invalidArgument(VAL | 0);
                return 131;
            }
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    FLT = fround(FLT / fround(immediateVal(EXP) | 0));
                    break;
                case 1:
                    FLT = fround(FLT / fround(floatNumber(EXP)));
                    break;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            VAL = makeFloat(FLT) | 0;
            return KON | 0;
        }
        function _N_cons() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            pairSetCdr(ARG, pairCar(pairCdr(ARG) | 0) | 0);
            VAL = ARG;
            return KON | 0;
        }
        function _N_car() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            ARG = pairCar(ARG) | 0;
            if (isPair(ARG) | 0) {
                VAL = pairCar(ARG) | 0;
                return KON | 0;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_cdr() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            ARG = pairCar(ARG) | 0;
            if (isPair(ARG) | 0) {
                VAL = pairCdr(ARG) | 0;
                return KON | 0;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_sca() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            VAL = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            if (isPair(ARG) | 0) {
                pairSetCar(ARG, VAL);
                return KON | 0;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_scd() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            VAL = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            if (isPair(ARG) | 0) {
                pairSetCdr(ARG, VAL);
                return KON | 0;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_list() {
            VAL = ARG;
            return KON | 0;
        }
        function _N_nbrEq() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            switch (tag(ARG) | 0) {
            case 69:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = (immediateVal(ARG) | 0) == (immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(immediateVal(ARG) | 0) == fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            case 1:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = fround(floatNumber(ARG)) == fround(immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(floatNumber(ARG)) == fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_seq() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            switch (tag(ARG) | 0) {
            case 69:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = (immediateVal(ARG) | 0) <= (immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(immediateVal(ARG) | 0) <= fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            case 1:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = fround(floatNumber(ARG)) <= fround(immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(floatNumber(ARG)) <= fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_leq() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            switch (tag(ARG) | 0) {
            case 69:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = (immediateVal(ARG) | 0) >= (immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(immediateVal(ARG) | 0) >= fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            case 1:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = fround(floatNumber(ARG)) >= fround(immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(floatNumber(ARG)) >= fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_sma() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            switch (tag(ARG) | 0) {
            case 69:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = (immediateVal(ARG) | 0) < (immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(immediateVal(ARG) | 0) < fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            case 1:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = fround(floatNumber(ARG)) < fround(immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(floatNumber(ARG)) < fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_lrg() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            switch (tag(ARG) | 0) {
            case 69:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = (immediateVal(ARG) | 0) > (immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(immediateVal(ARG) | 0) > fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            case 1:
                switch (tag(EXP) | 0) {
                case 69:
                    VAL = fround(floatNumber(ARG)) > fround(immediateVal(EXP) | 0) ? 2147483643 : 2147483641;
                    return KON | 0;
                case 1:
                    VAL = fround(floatNumber(ARG)) > fround(floatNumber(EXP)) ? 2147483643 : 2147483641;
                    return KON | 0;
                }
                err_invalidArgument(EXP | 0);
                return 131;
            }
            err_invalidArgument(ARG | 0);
            return 131;
        }
        function _N_assoc() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            VAL = pairCar(ARG) | 0;
            LST = pairCar(pairCdr(ARG) | 0) | 0;
            while (isPair(LST) | 0) {
                BND = pairCar(LST) | 0;
                if (!(isPair(BND) | 0)) {
                    err_invalidArgument(BND | 0);
                    return 131;
                }
                if ((pairCar(BND) | 0) == (VAL | 0)) {
                    VAL = BND;
                    return KON | 0;
                }
                LST = pairCdr(LST) | 0;
            }
            VAL = 2147483641;
            return KON | 0;
        }
        function _N_map() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            LEN = 1;
            VAL = pairCar(ARG) | 0;
            LST = pairCar(pairCdr(ARG) | 0) | 0;
            if (isNull(LST) | 0) {
                VAL = 2147483645;
                return KON | 0;
            }
            claim();
            ARG = makePair(pairCar(LST) | 0, 2147483645) | 0;
            LST = pairCdr(LST) | 0;
            push(makeImmediate(KON) | 0);
            push(1);
            if (isNull(LST) | 0) {
                KON = 115;
            } else {
                push(VAL);
                push(LST);
                KON = 116;
            }
            return 109;
        }
        function _N_eval() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(ARG) | 0;
            push(makeImmediate(KON) | 0);
            KON = 117;
            return 54;
        }
        function _N_apply() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            VAL = pairCar(ARG) | 0;
            ARG = pairCar(pairCdr(ARG) | 0) | 0;
            for (LST = ARG, LEN = 0; isPair(LST) | 0; LEN = LEN + 1 | 0)
                LST = pairCdr(LST) | 0;
            if (!(isNull(LST) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            return 109;
        }
        function _N_display() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            printLog(pairCar(ARG) | 0);
            VAL = 2147483647;
            return KON | 0;
        }
        function _N_newline() {
            printNewline();
            VAL = 2147483647;
            return KON | 0;
        }
        function _N_read() {
            promptUserInput();
            return 0;
        }
        function _N_isPair() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (tag(pairCar(ARG) | 0) | 0) == 0 ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_isNull() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (tag(pairCar(ARG) | 0) | 0) == 68 ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_isSymbol() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (tag(pairCar(ARG) | 0) | 0) == 3 ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_isVector() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (tag(pairCar(ARG) | 0) | 0) == 2 ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_isString() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (tag(pairCar(ARG) | 0) | 0) == 5 ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_makeVector() {
            if (!LEN) {
                err_invalidParamCount();
                return 131;
            }
            LST = pairCdr(ARG) | 0;
            ARG = pairCar(ARG) | 0;
            if (!(isNumber(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            LEN = immediateVal(ARG) | 0;
            if ((LEN | 0) < 0) {
                err_invalidLength(LEN | 0);
                return 131;
            }
            claimSiz(LEN);
            VAL = fillVector(LEN, isNull(LST) | 0 ? 2147483647 : pairCar(LST) | 0) | 0;
            return KON | 0;
        }
        function _N_vectorRef() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            if (!(isVector(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            if (!(isNumber(EXP) | 0)) {
                err_invalidArgument(EXP | 0);
                return 131;
            }
            IDX = immediateVal(EXP) | 0;
            LEN = vectorLength(ARG) | 0;
            if (0 <= (IDX | 0) & (IDX | 0) < (LEN | 0)) {
                VAL = vectorRef(ARG, IDX + 1 | 0) | 0;
                return KON | 0;
            }
            err_invalidRange(IDX | 0, 0, LEN - 1 | 0);
            return 131;
        }
        function _N_vectorSet() {
            if ((LEN | 0) != 3) {
                err_invalidParamCount();
                return 131;
            }
            LST = pairCdr(ARG) | 0;
            ARG = pairCar(ARG) | 0;
            EXP = pairCar(LST) | 0;
            VAL = pairCar(pairCdr(LST) | 0) | 0;
            if (!(isVector(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            if (!(isNumber(EXP) | 0)) {
                err_invalidArgument(EXP | 0);
                return 131;
            }
            IDX = immediateVal(EXP) | 0;
            LEN = vectorLength(ARG) | 0;
            if (0 <= (IDX | 0) & (IDX | 0) < (LEN | 0)) {
                vectorSet(ARG, IDX + 1 | 0, VAL);
                return KON | 0;
            }
            err_invalidRange(IDX | 0, 0, LEN - 1 | 0);
            return 131;
        }
        function _N_vectorLength() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            ARG = pairCar(ARG) | 0;
            if (!(isVector(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
            }
            VAL = makeImmediate(vectorLength(ARG) | 0) | 0;
            return KON | 0;
        }
        function _N_vector() {
            claimSiz(LEN);
            VAL = makeVector(LEN) | 0;
            for (IDX = 1; (IDX | 0) <= (LEN | 0); IDX = IDX + 1 | 0, ARG = pairCdr(ARG) | 0)
                vectorSet(VAL, IDX, pairCar(ARG) | 0);
            return KON | 0;
        }
        function _N_clock() {
            if (LEN) {
                err_invalidParamCount();
                return 131;
            }
            VAL = makeImmediate(clock() | 0) | 0;
            return KON | 0;
        }
        function _N_reset() {
            if (LEN) {
                err_invalidParamCount();
                return 131;
            }
            reset();
            VAL = 2147483647;
            return KON | 0;
        }
        function _N_eq() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            VAL = (pairCar(ARG) | 0) == (pairCar(pairCdr(ARG) | 0) | 0) ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_equal() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(ARG) | 0;
            ARG = pairCar(pairCdr(ARG) | 0) | 0;
            return 120;
        }
        function _N_collect() {
            reclaim();
            VAL = makeImmediate(available() | 0) | 0;
            return KON | 0;
        }
        function _N_available() {
            VAL = makeImmediate(available() | 0) | 0;
            return KON | 0;
        }
        function _N_callcc() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            VAL = pairCar(ARG) | 0;
            if (!(isPrc(VAL) | 0)) {
                err_invalidArgument(VAL | 0);
                return 131;
            }
            ARG = currentStack() | 0;
            ARG = makeContinuation(makeImmediate(KON) | 0, FRM, ENV, ARG) | 0;
            ARG = makePair(ARG, 2147483645) | 0;
            LEN = 1;
            return 109;
        }
        function _N_stringRef() {
            if ((LEN | 0) != 2) {
                err_invalidParamCount();
                return 131;
            }
            EXP = pairCar(pairCdr(ARG) | 0) | 0;
            ARG = pairCar(ARG) | 0;
            if (!(isString(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            if (!(isNumber(EXP) | 0)) {
                err_invalidArgument(EXP | 0);
                return 131;
            }
            IDX = immediateVal(EXP) | 0;
            LEN = textLength(ARG) | 0;
            if (0 <= (IDX | 0) & (IDX | 0) < (LEN | 0)) {
                VAL = makeChar(textGetChar(ARG, IDX) | 0) | 0;
                return KON | 0;
            }
            err_invalidRange(IDX | 0, 0, LEN - 1 | 0);
            return 131;
        }
        function _N_stringSet() {
            if ((LEN | 0) != 3) {
                err_invalidParamCount();
                return 131;
            }
            LST = pairCdr(ARG) | 0;
            ARG = pairCar(ARG) | 0;
            EXP = pairCar(LST) | 0;
            VAL = pairCar(pairCdr(LST) | 0) | 0;
            if (!(isString(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            if (!(isNumber(EXP) | 0)) {
                err_invalidArgument(EXP | 0);
                return 131;
            }
            if (!(isChar(VAL) | 0)) {
                err_invalidArgument(VAL | 0);
                return 131;
            }
            IDX = immediateVal(EXP) | 0;
            LEN = textLength(ARG) | 0;
            if (0 <= (IDX | 0) & (IDX | 0) < (LEN | 0)) {
                textSetChar(ARG, IDX, charCode(VAL) | 0);
                return KON | 0;
            }
            err_invalidRange(IDX | 0, 0, LEN - 1 | 0);
            return 131;
        }
        function _N_stringLength() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            ARG = pairCar(ARG) | 0;
            if (!(isString(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
            }
            VAL = makeImmediate(textLength(ARG) | 0) | 0;
            return KON | 0;
        }
        function _N_random() {
            if (LEN | 0) {
                err_invalidParamCount();
                return 131;
            }
            claim();
            VAL = makeFloat(fround(+random())) | 0;
            return KON | 0;
        }
        function _N_load() {
            if ((LEN | 0) != 1) {
                err_invalidParamCount();
                return 131;
            }
            ARG = pairCar(ARG) | 0;
            if (!(isString(ARG) | 0)) {
                err_invalidArgument(ARG | 0);
                return 131;
            }
            push(makeImmediate(KON) | 0);
            KON = 118;
            loadFile(ARG | 0);
            return 0;
        }
        function _R_read() {
            switch (look() | 0) {
            case 40:
                return 46;
            case 35:
                return 52;
            case 39:
                return 50;
            case 34:
                VAL = readString() | 0;
                return KON | 0;
            case 43:
            case 45:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                VAL = readNumber() | 0;
                return KON | 0;
            }
            VAL = readSymbol() | 0;
            return KON | 0;
        }
        function _R_readLBR() {
            skip();
            if ((look() | 0) == 41) {
                skip();
                VAL = 2147483645;
                return KON | 0;
            }
            push(makeImmediate(KON) | 0);
            push(1);
            KON = 47;
            return 45;
        }
        function _R_c1_LBR() {
            claim();
            if ((look() | 0) == 41) {
                skip();
                VAL = makePair(VAL, 2147483645) | 0;
                return 49;
            }
            IDX = immediateVal(peek() | 0) | 0;
            poke(VAL);
            push(makeImmediate(IDX + 1 | 0) | 0);
            if ((look() | 0) == 46) {
                skip();
                KON = 48;
            }
            return 45;
        }
        function _R_c2_LBR() {
            if ((look() | 0) != 41) {
                err_expectedRBR(look() | 0);
                return 131 | 0;
            }
            skip();
            return 49;
        }
        function _R_c3_LBR() {
            IDX = immediateVal(pop() | 0) | 0;
            for (; IDX; IDX = IDX - 1 | 0)
                VAL = makePair(pop() | 0, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _R_readQUO() {
            skip() | 0;
            push(makeImmediate(KON) | 0);
            KON = 51;
            return 45;
        }
        function _R_c_QUO() {
            claim();
            VAL = makePair(VAL, 2147483645) | 0;
            VAL = makePair(__QUO_SYM__, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _R_readSHR() {
            skip();
            switch (read() | 0) {
            case 116:
                VAL = 2147483643;
                return KON | 0;
            case 102:
                VAL = 2147483641;
                return KON | 0;
            case 92:
                VAL = makeChar(read() | 0) | 0;
                return KON | 0;
            case 40:
                if ((look() | 0) == 41) {
                    skip();
                    VAL = makePair(__VEC_SYM__, 2147483645) | 0;
                    return KON | 0;
                }
                push(makeImmediate(KON) | 0);
                KON = 53;
                push(3);
                return 45;
            }
            err_invalidSyntax();
            return 131;
        }
        function _R_c_vector() {
            if ((look() | 0) == 41) {
                skip();
                LEN = immediateVal(pop() | 0) | 0;
                claimSiz(LEN);
                VAL = makePair(VAL, 2147483645) | 0;
                for (LEN = LEN - 1 | 0; LEN; LEN = LEN - 1 | 0)
                    VAL = makePair(pop() | 0, VAL) | 0;
                VAL = makePair(__VEC_SYM__, VAL) | 0;
                KON = immediateVal(pop() | 0) | 0;
                return KON | 0;
            }
            claim();
            IDX = immediateVal(peek() | 0) | 0;
            poke(VAL);
            push(makeImmediate(IDX + 1 | 0) | 0);
            return 45;
        }
        function _C_compile() {
            if (isPair(EXP) | 0) {
                LST = pairCdr(EXP) | 0;
                EXP = pairCar(EXP) | 0;
                if (isSymbol(EXP) | 0) {
                    if ((EXP | 0) == (__IFF_SYM__ | 0))
                        return 62;
                    else if ((EXP | 0) == (__DEF_SYM__ | 0))
                        return 68;
                    else if ((EXP | 0) == (__BEG_SYM__ | 0))
                        return 56;
                    else if ((EXP | 0) == (__LMB_SYM__ | 0))
                        return 75;
                    else if ((EXP | 0) == (__SET_SYM__ | 0))
                        return 73;
                    else if ((EXP | 0) == (__QUO_SYM__ | 0))
                        return 59;
                }
                return 79;
            }
            if (isSymbol(EXP) | 0)
                return 55;
            VAL = EXP;
            return KON | 0;
        }
        function _C_compileSymbol() {
            claim();
            PAT = EXP;
            lexicalAdr();
            if (OFS) {
                OFS = makeImmediate(OFS) | 0;
                if (SCP) {
                    SCP = makeImmediate(SCP) | 0;
                    VAL = makeGlobal(SCP, OFS) | 0;
                } else {
                    VAL = makeLocal(OFS) | 0;
                }
                return KON | 0;
            }
            err_undefinedVariable(PAT | 0);
            return 131;
        }
        function _C_compileSequence() {
            if (isNull(LST) | 0) {
                VAL = 2147483647;
                return KON | 0;
            }
            if (!(isPair(LST) | 0)) {
                err_invalidSequence();
                return 131;
            }
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            if (!(isNull(LST) | 0)) {
                claim();
                push(makeImmediate(KON) | 0);
                push(3);
                push(LST);
                KON = 57;
            }
            return 54;
        }
        function _C_c1_sequence() {
            LST = pop() | 0;
            LEN = immediateVal(peek() | 0) | 0;
            poke(VAL);
            push(makeImmediate(LEN + 1 | 0) | 0);
            if (!(isPair(LST) | 0)) {
                err_invalidSequence();
                return 131;
            }
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            if (isNull(LST) | 0) {
                KON = 58;
            } else {
                claim();
                push(LST);
            }
            return 54;
        }
        function _C_c2_sequence() {
            LEN = immediateVal(pop() | 0) | 0;
            claimSiz(LEN);
            EXP = makeSequence(LEN) | 0;
            sequenceSet(EXP, LEN, VAL);
            do {
                LEN = LEN - 1 | 0;
                sequenceSet(EXP, LEN, pop() | 0);
            } while ((LEN | 0) > 1);
            VAL = EXP;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_compileQuote() {
            if (!(isPair(LST) | 0)) {
                err_invalidQuote();
                return 131;
            }
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            if (isNull(LST) | 0) {
                claim();
                VAL = makeQuo(EXP) | 0;
                return KON | 0;
            }
            err_invalidQuote();
            return 131;
        }
        function _C_compileInline() {
            claim();
            enterScope();
            push(makeImmediate(KON) | 0);
            KON = 61;
            return 54;
        }
        function _C_c_compileInline() {
            SIZ = exitScope() | 0;
            KON = immediateVal(pop() | 0) | 0;
            if (SIZ) {
                claim();
                SIZ = makeImmediate(SIZ) | 0;
                VAL = makeThunk(VAL, SIZ) | 0;
                return KON | 0;
            }
            //default to normal compilation if no locals are used
            EXP = VAL;
            return 54;
        }
        function _C_compileIf() {
            if (!(isPair(LST) | 0)) {
                err_invalidIf();
                return 131;
            }
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            if (!(isPair(LST) | 0)) {
                err_invalidIf();
                return 131;
            }
            claim();
            push(makeImmediate(KON) | 0);
            push(LST);
            KON = 63;
            return 54;
        }
        function _C_c1_if() {
            LST = peek() | 0;
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            poke(VAL);
            if (isNull(LST) | 0) {
                KON = 64;
                return 60;
            }
            if (isPair(LST) | 0) {
                claim();
                push(LST);
                KON = 65;
                return 60;
            }
            err_invalidIf();
            return 131;
        }
        function _C_c2_if() {
            claim();
            VAL = makeIfs(pop() | 0, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_c3_if() {
            LST = peek() | 0;
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            poke(VAL);
            if (!(isNull(LST) | 0)) {
                err_invalidIf();
                return 131;
            }
            KON = 66;
            return 60;
        }
        function _C_c4_if() {
            claim();
            EXP = pop() | 0;
            VAL = makeIff(pop() | 0, EXP, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_compileParameters() {
            for (LST = PAR; isPair(LST) | 0; LST = pairCdr(LST) | 0) {
                PAT = pairCar(LST) | 0;
                if (!(isSymbol(PAT) | 0)) {
                    err_invalidParameter();
                    return 131;
                }
                claim();
                defineVar() | 0;
            }
            return KON | 0;
        }
        function _C_compileDefine() {
            claim();
            if (!(isPair(LST) | 0)) {
                err_invalidDefine();
                return 131;
            }
            PAT = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            push(makeImmediate(KON) | 0);
            switch (tag(PAT) | 0) {
            case 3:
                if (!(isPair(LST) | 0)) {
                    err_invalidDefine();
                    return 131;
                }
                EXP = pairCar(LST) | 0;
                LST = pairCdr(LST) | 0;
                if (!(isNull(LST) | 0)) {
                    err_invalidDefine();
                    return 131;
                }
                OFS = defineVar() | 0;
                push(makeImmediate(OFS) | 0);
                KON = 69;
                return 54;
            case 0:
                PAR = pairCdr(PAT) | 0;
                PAT = pairCar(PAT) | 0;
                if (!(isSymbol(PAT) | 0)) {
                    err_invalidDefine();
                    return 131;
                }
                OFS = defineVar() | 0;
                push(makeImmediate(OFS) | 0);
                push(LST);
                enterScope();
                KON = 70;
                return 67;
            }
            err_invalidDefine();
            return 131;
        }
        function _C_c1_define() {
            claim();
            OFS = pop() | 0;
            KON = immediateVal(pop() | 0) | 0;
            VAL = makeDfv(OFS, VAL) | 0;
            return KON | 0;
        }
        function _C_c2_define() {
            switch (tag(LST) | 0) {
            case 68:
                LST = peek() | 0;
                poke(makeImmediate(currentFrmSiz) | 0);
                KON = 71;
                return 56;
            case 3:
                claim();
                PAT = LST;
                defineVar() | 0;
                LST = peek() | 0;
                poke(makeImmediate(currentFrmSiz) | 0);
                KON = 72;
                return 56;
            }
            err_invalidDefine();
            return 131;
        }
        function _C_c3_define() {
            claim();
            SIZ = makeImmediate(exitScope() | 0) | 0;
            //total frame size
            TMP = pop() | 0;
            //argument count
            OFS = pop() | 0;
            //offset
            VAL = makeDff(OFS, TMP, SIZ, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_c4_define() {
            claim();
            SIZ = makeImmediate(exitScope() | 0) | 0;
            //total frame size
            TMP = pop() | 0;
            //argument count
            OFS = pop() | 0;
            //offset
            VAL = makeDfz(OFS, TMP, SIZ, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_compileSet() {
            claim();
            if (!(isPair(LST) | 0)) {
                err_invalidAssignment();
                return 131;
            }
            PAT = pairCar(LST) | 0;
            if (!(isSymbol(PAT) | 0)) {
                err_invalidAssignment();
                return 131;
            }
            LST = pairCdr(LST) | 0;
            if (!(isPair(LST) | 0)) {
                err_invalidAssignment();
                return 131;
            }
            EXP = pairCar(LST) | 0;
            LST = pairCdr(LST) | 0;
            if (!(isNull(LST) | 0)) {
                err_invalidAssignment();
                return 131;
            }
            //NOTE: original C implementation first compiles expression...
            //... then looks up the pattern, so that statements such as:
            //(set! x (begin (define x 2) 'foo)) are valid.
            push(makeImmediate(KON) | 0);
            push(PAT);
            KON = 74;
            return 54;
        }
        function _C_c_set() {
            claim();
            PAT = pop() | 0;
            lexicalAdr();
            if (OFS) {
                OFS = makeImmediate(OFS) | 0;
                if (SCP) {
                    SCP = makeImmediate(SCP) | 0;
                    VAL = makeSgl(SCP, OFS, VAL) | 0;
                } else {
                    VAL = makeSlc(OFS, VAL) | 0;
                }
                KON = immediateVal(pop() | 0) | 0;
                return KON | 0;
            }
            err_undefinedVariable(PAT | 0);
            return 131;
        }
        function _C_compileLambda() {
            if (!(isPair(LST) | 0)) {
                err_invalidLambda();
                return 131;
            }
            claim();
            enterScope();
            PAR = pairCar(LST) | 0;
            push(makeImmediate(KON) | 0);
            push(pairCdr(LST) | 0);
            KON = 76;
            return 67;
        }
        function _C_c1_lambda() {
            switch (tag(LST) | 0) {
            case 68:
                LST = peek() | 0;
                poke(makeImmediate(currentFrmSiz) | 0);
                KON = 77;
                return 56;
            case 3:
                claim();
                PAT = LST;
                defineVar() | 0;
                LST = peek() | 0;
                poke(makeImmediate(currentFrmSiz) | 0);
                KON = 78;
                return 56;
            }
            err_invalidLambda();
            return 131;
        }
        function _C_c2_lambda() {
            claim();
            SIZ = makeImmediate(exitScope() | 0) | 0;
            TMP = pop() | 0;
            VAL = makeLmb(TMP, SIZ, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_c3_lambda() {
            claim();
            SIZ = makeImmediate(exitScope() | 0) | 0;
            TMP = pop() | 0;
            VAL = makeLmz(TMP, SIZ, VAL) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_compileApplication() {
            claim();
            push(makeImmediate(KON) | 0);
            if (isNull(LST) | 0) {
                KON = 80;
            } else {
                push(1);
                push(LST);
                KON = 81;
            }
            return 54;
        }
        function _C_c1_application() {
            claim();
            VAL = makeApplication(VAL, __EMPTY_VEC__) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _C_c2_application() {
            ARG = pop() | 0;
            LEN = immediateVal(peek() | 0) | 0;
            poke(VAL);
            push(makeImmediate(LEN + 1 | 0) | 0);
            if (!(isPair(ARG) | 0)) {
                err_invalidApplication();
                return 131;
            }
            EXP = pairCar(ARG) | 0;
            ARG = pairCdr(ARG) | 0;
            if (isNull(ARG) | 0) {
                KON = 82;
            } else {
                claim();
                push(ARG);
            }
            return 54;
        }
        function _C_c3_application() {
            LEN = immediateVal(pop() | 0) | 0;
            claimSiz(LEN);
            EXP = makeVector(LEN) | 0;
            vectorSet(EXP, LEN, VAL);
            for (LEN = LEN - 1 | 0; LEN; LEN = LEN - 1 | 0)
                vectorSet(EXP, LEN, pop() | 0);
            VAL = makeApplication(pop() | 0, EXP) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _E_eval() {
            switch (tag(EXP) | 0) {
            case 68:
            case 67:
            case 65:
            case 66:
            case 69:
            case 64:
            case 0:
            case 4:
            case 2:
            case 5:
            case 1:
            case 70:
            case 24:
                return 84;
            case 36:
                return 85;
            case 38:
                return 86;
            case 40:
                return 87;
            case 20:
                return 89;
            case 12:
                return 91;
            case 14:
                return 93;
            case 30:
                return 94;
            case 18:
                return 95;
            case 34:
                return 96;
            case 6:
                return 97;
            case 22:
                return 99;
            case 8:
                return 100;
            case 10:
                return 102;
            case 32:
                return 104;
            case 16:
                return 105;
            }
            err_invalidExpression(EXP | 0);
            return 131;
        }
        function _E_evalSelf() {
            VAL = EXP;
            return KON | 0;
        }
        function _E_evalLocal() {
            OFS = immediateVal(localOfs(EXP) | 0) | 0;
            VAL = vectorRef(FRM, OFS) | 0;
            return KON | 0;
        }
        function _E_evalGlobal() {
            SCP = immediateVal(globalScp(EXP) | 0) | 0;
            OFS = immediateVal(globalOfs(EXP) | 0) | 0;
            VAL = vectorRef(vectorRef(ENV, SCP) | 0, OFS) | 0;
            return KON | 0;
        }
        function _E_setLocal() {
            claim();
            push(makeImmediate(KON) | 0);
            push(slcOfs(EXP) | 0);
            EXP = slcVal(EXP) | 0;
            KON = 88;
            return 83;
        }
        function _E_c_setLocal() {
            OFS = immediateVal(pop() | 0) | 0;
            vectorSet(FRM, OFS, VAL);
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _E_setGlobal() {
            claim();
            push(makeImmediate(KON) | 0);
            push(sglScp(EXP) | 0);
            push(sglOfs(EXP) | 0);
            EXP = sglVal(EXP) | 0;
            KON = 90;
            return 83;
        }
        function _E_c_setGlobal() {
            OFS = immediateVal(pop() | 0) | 0;
            SCP = immediateVal(pop() | 0) | 0;
            vectorSet(vectorRef(ENV, SCP) | 0, OFS, VAL);
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _E_evalDfv() {
            claim();
            push(makeImmediate(KON) | 0);
            push(dfvOfs(EXP) | 0);
            EXP = dfvVal(EXP) | 0;
            KON = 92;
            return 83;
        }
        function _E_c_evalDfv() {
            OFS = immediateVal(pop() | 0) | 0;
            vectorSet(FRM, OFS, VAL);
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _E_evalDff() {
            VAL = makePrc(dffArgc(EXP) | 0, dffFrmSiz(EXP) | 0, dffBdy(EXP) | 0, extendEnv() | 0) | 0;
            OFS = immediateVal(dffOfs(EXP) | 0) | 0;
            vectorSet(FRM, OFS, VAL);
            return KON | 0;
        }
        function _E_evalDfz() {
            VAL = makePrz(dfzArgc(EXP) | 0, dfzFrmSiz(EXP) | 0, dfzBdy(EXP) | 0, extendEnv() | 0) | 0;
            vectorSet(FRM, dfzOfs(EXP) | 0, VAL);
            OFS = immediateVal(dfzOfs(EXP) | 0) | 0;
            vectorSet(FRM, OFS, VAL);
            return KON | 0;
        }
        function _E_evalLmb() {
            VAL = makePrc(lmbArgc(EXP) | 0, lmbFrmSiz(EXP) | 0, lmbBdy(EXP) | 0, extendEnv() | 0) | 0;
            return KON | 0;
        }
        function _E_evalLmz() {
            VAL = makePrz(lmzArgc(EXP) | 0, lmzFrmSiz(EXP) | 0, lmzBdy(EXP) | 0, extendEnv() | 0) | 0;
            return KON | 0;
        }
        function _E_evalSequence() {
            claim();
            push(makeImmediate(KON) | 0);
            push(EXP);
            push(3);
            EXP = sequenceAt(EXP, 1) | 0;
            KON = 98;
            return 83;
        }
        function _E_c_sequence() {
            IDX = immediateVal(pop() | 0) | 0;
            IDX = IDX + 1 | 0;
            SEQ = peek() | 0;
            LEN = sequenceLength(SEQ) | 0;
            EXP = sequenceAt(SEQ, IDX) | 0;
            if ((IDX | 0) == (LEN | 0)) {
                zap();
                KON = immediateVal(pop() | 0) | 0;
            } else {
                push(makeImmediate(IDX) | 0);
            }
            return 83;
        }
        function _E_evalQuote() {
            VAL = quoExpression(EXP) | 0;
            return KON | 0;
        }
        function _E_evalIfs() {
            claim();
            push(makeImmediate(KON) | 0);
            push(ifsConsequence(EXP) | 0);
            EXP = ifsPredicate(EXP) | 0;
            KON = 101;
            return 83;
        }
        function _E_c_ifs() {
            if (!(isFalse(VAL) | 0)) {
                EXP = pop() | 0;
                KON = immediateVal(pop() | 0) | 0;
                return 83;
            }
            zap();
            VAL = 2147483647;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _E_evalIff() {
            claim();
            push(makeImmediate(KON) | 0);
            push(EXP);
            EXP = iffPredicate(EXP) | 0;
            KON = 103;
            return 83;
        }
        function _E_c_iff() {
            EXP = pop() | 0;
            EXP = isFalse(VAL) | 0 ? iffAlternative(EXP) | 0 : iffConsequence(EXP) | 0;
            KON = immediateVal(pop() | 0) | 0;
            return 83;
        }
        function _E_evalThunk() {
            SIZ = thunkSiz(EXP) | 0;
            claimSiz(SIZ);
            if ((KON | 0) != 111) {
                push(makeImmediate(KON) | 0);
                push(ENV);
                push(FRM);
                KON = 111;
            }
            ENV = extendEnv() | 0;
            FRM = fillVector(SIZ, 2147483647) | 0;
            EXP = thunkExp(EXP) | 0;
            return 83;
        }
        function _E_evalApplication() {
            claim();
            push(makeImmediate(KON) | 0);
            push(aplOperands(EXP) | 0);
            EXP = aplOperator(EXP) | 0;
            KON = 106;
            return 83;
        }
        function _E_c1_application() {
            ARG = peek() | 0;
            LEN = vectorLength(ARG) | 0;
            if ((LEN | 0) == 0) {
                zap();
                ARG = 2147483645;
                LEN = 0;
                KON = immediateVal(pop() | 0) | 0;
                return 109;
            }
            claim();
            poke(VAL);
            push(3);
            if ((LEN | 0) == 1) {
                KON = 108;
            } else {
                KON = 107;
                push(ARG);
            }
            EXP = vectorRef(ARG, 1) | 0;
            return 83;
        }
        function _E_c2_application() {
            ARG = pop() | 0;
            IDX = immediateVal(peek() | 0) | 0;
            IDX = IDX + 1 | 0;
            poke(VAL);
            push(makeImmediate(IDX) | 0);
            EXP = vectorRef(ARG, IDX) | 0;
            if ((IDX | 0) == (vectorLength(ARG) | 0)) {
                KON = 108;
            } else {
                claim();
                push(ARG);
            }
            return 83;
        }
        function _E_c3_application() {
            LEN = IDX = immediateVal(pop() | 0) | 0;
            claimSiz(imul(3, LEN) | 0);
            ARG = makePair(VAL, 2147483645) | 0;
            for (IDX = IDX - 1 | 0; IDX; IDX = IDX - 1 | 0)
                ARG = makePair(pop() | 0, ARG) | 0;
            VAL = pop() | 0;
            KON = immediateVal(pop() | 0) | 0;
            return 109;
        }
        function _E_apply() {
            switch (tag(VAL) | 0) {
            case 4:
                claimSiz(imul(3, LEN) | 0);
                if ((KON | 0) != 111) {
                    push(makeImmediate(KON) | 0);
                    push(FRM);
                    push(ENV);
                    KON = 111;
                }
                //EXP = procedureBdy(VAL)|0;
                //PAR = procedurePar(VAL)|0;
                //ENV = procedureEnv(VAL)|0;
                FRM = 2147483645;
                return 110;
            case 70:
                return nativePtr(VAL) | 0;
            case 24:
                if ((LEN | 0) != 1) {
                    err_invalidParamCount();
                    return 131;
                }
                KON = immediateVal(continuationKon(VAL) | 0) | 0;
                restoreStack(continuationStk(VAL) | 0);
                FRM = continuationFrm(VAL) | 0;
                ENV = continuationEnv(VAL) | 0;
                VAL = pairCar(ARG) | 0;
                return KON | 0;
            }
            err_invalidOperator();
            return 131;
        }
        function _E_bind() {
            switch (tag(PAR) | 0) {
            case 68:
                if (isNull(ARG) | 0)
                    return 83;
                break;
            case 0:
                if (isPair(ARG) | 0) {
                    BND = makePair(pairCar(PAR) | 0, pairCar(ARG) | 0) | 0;
                    FRM = makePair(BND, FRM) | 0;
                    ARG = pairCdr(ARG) | 0;
                    PAR = pairCdr(PAR) | 0;
                    return 110;
                }
                break;
            case 3:
                BND = makePair(PAR, ARG) | 0;
                FRM = makePair(BND, FRM) | 0;
                return 83;
            }
            err_invalidParamCount();
            return 131;
        }
        function _E_c_return() {
            FRM = pop() | 0;
            ENV = pop() | 0;
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _N_addFloats() {
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    FLT = fround(FLT + fround(immediateVal(EXP) | 0));
                    break;
                case 1:
                    FLT = fround(FLT + fround(floatNumber(EXP)));
                    break;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            claim();
            VAL = makeFloat(FLT) | 0;
            return KON | 0;
        }
        function _N_substractFloats() {
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    FLT = fround(FLT - fround(immediateVal(EXP) | 0));
                    break;
                case 1:
                    FLT = fround(FLT - fround(floatNumber(EXP)));
                    break;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            claim();
            VAL = makeFloat(FLT) | 0;
            return KON | 0;
        }
        function _N_multiplyFloats() {
            while (LEN) {
                LEN = LEN - 1 | 0;
                EXP = pairCar(ARG) | 0;
                ARG = pairCdr(ARG) | 0;
                switch (tag(EXP) | 0) {
                case 69:
                    FLT = fround(FLT * fround(immediateVal(EXP) | 0));
                    break;
                case 1:
                    FLT = fround(FLT * fround(floatNumber(EXP)));
                    break;
                default:
                    err_invalidArgument(EXP | 0);
                    return 131;
                }
            }
            claim();
            VAL = makeFloat(FLT) | 0;
            return KON | 0;
        }
        function _N_c1_map() {
            LEN = immediateVal(pop() | 0) | 0;
            claimSiz(imul(3, LEN) | 0);
            VAL = makePair(VAL, 2147483645) | 0;
            for (; LEN; LEN = LEN - 1 | 0) {
                VAL = makePair(pop() | 0, VAL) | 0;
            }
            KON = immediateVal(pop() | 0) | 0;
            return KON | 0;
        }
        function _N_c2_map() {
            LST = pop() | 0;
            EXP = pop() | 0;
            LEN = immediateVal(peek() | 0) | 0;
            LEN = LEN + 1 | 0;
            poke(VAL);
            push(makeImmediate(LEN) | 0);
            claim();
            VAL = EXP;
            ARG = makePair(pairCar(LST) | 0, 2147483645) | 0;
            LST = pairCdr(LST) | 0;
            LEN = 1;
            if (isNull(LST) | 0) {
                KON = 115;
            } else {
                push(VAL);
                push(LST);
                KON = 116;
            }
            return 109;
        }
        function _N_c_eval() {
            EXP = VAL;
            KON = immediateVal(pop() | 0) | 0;
            return 83;
        }
        function _N_c1_load() {
            EXP = VAL;
            KON = 119;
            return 54;
        }
        function _N_c2_load() {
            EXP = VAL;
            KON = immediateVal(pop() | 0) | 0;
            return 83;
        }
        function _N_compare() {
            TMP = tag(EXP) | 0;
            if ((TMP | 0) != (tag(ARG) | 0)) {
                VAL = 2147483641;
                return KON | 0;
            }
            switch (TMP | 0) {
            case 1:
                return 121;
            case 5:
                return 122;
            case 0:
                return 123;
            case 2:
                return 125;
            }
            VAL = (ARG | 0) == (EXP | 0) ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_compareFloat() {
            VAL = fround(floatNumber(EXP)) == fround(floatNumber(ARG)) ? 2147483643 : 2147483641;
            return KON | 0;
        }
        function _N_compareString() {
            LEN = textLength(ARG) | 0;
            if ((textLength(EXP) | 0) != (LEN | 0)) {
                VAL = 2147483641;
                return KON | 0;
            }
            while (LEN) {
                LEN = LEN - 1 | 0;
                if ((textGetChar(ARG, LEN) | 0) != (textGetChar(EXP, LEN) | 0)) {
                    VAL = 2147483641;
                    return KON | 0;
                }
            }
            VAL = 2147483643;
            return KON | 0;
        }
        function _N_comparePair() {
            push(pairCdr(EXP) | 0);
            push(pairCdr(ARG) | 0);
            EXP = pairCar(EXP) | 0;
            ARG = pairCar(ARG) | 0;
            push(makeImmediate(KON) | 0);
            KON = 124;
            return 120;
        }
        function _N_c_comparePair() {
            KON = immediateVal(pop() | 0) | 0;
            if ((VAL | 0) == 2147483641) {
                zap();
                zap();
                return KON | 0;
            }
            ARG = pop() | 0;
            EXP = pop() | 0;
            return 120;
        }
        function _N_compareVector() {
            LEN = vectorLength(ARG) | 0;
            if ((vectorLength(EXP) | 0) != (LEN | 0)) {
                VAL = 2147483641;
                return KON | 0;
            }
            if (!LEN) {
                VAL = 2147483643;
                return KON | 0;
            }
            if ((LEN | 0) > 1) {
                push(makeImmediate(KON) | 0);
                push(EXP);
                push(ARG);
                push(3);
                KON = 126;
            }
            ARG = vectorRef(ARG, 1) | 0;
            EXP = vectorRef(EXP, 1) | 0;
            return 120;
        }
        function _N_c_compareVector() {
            if ((VAL | 0) == 2147483641) {
                zap();
                zap();
                zap();
                KON = immediateVal(pop() | 0) | 0;
                return KON | 0;
            }
            IDX = immediateVal(pop() | 0) | 0;
            ARG = pop() | 0;
            EXP = peek() | 0;
            IDX = IDX + 1 | 0;
            if ((IDX | 0) == (vectorLength(ARG) | 0)) {
                zap();
                KON = immediateVal(pop() | 0) | 0;
            } else {
                push(ARG);
                push(makeImmediate(IDX) | 0);
                KON = 126;
            }
            ARG = vectorRef(ARG, IDX) | 0;
            EXP = vectorRef(EXP, IDX) | 0;
            return 120;
        }
        function _REPL() {
            dctCheckpoint();
            KON = 128;
            promptInput();
            return 0;
        }
        function _c1_repl() {
            EXP = VAL;
            KON = 129;
            startp = MEMTOP
            return 54;
        }
        function _c2_repl() {
            EXP = VAL;
            KON = 130;
            console.log('@COMPILE: ');
            for (var i = (startp>>2); i < (MEMTOP>>2); ++i)
                console.log(MEM32[i]);
            return 83;
        }
        function _c3_repl() {
            printOutput(VAL | 0);
            console.log('@OUTPUT: ');
            for (var i = (startp>>2); i < (MEMTOP>>2); ++i)
                console.log(MEM32[i]);
            console.log('');
            console.log('');
            return 127;
        }
        function _error() {
            FRM = GLB;
            ENV = 2147483645;
            dctRollback();
            emptyStk();
            return 127;
        }
        function nop() {
            return 0;
        }
        function run(instr) {
            instr = instr | 0;
            for (; instr; instr = FUNTAB[instr & 255]() | 0);
        }
        var FUNTAB = [
            nop,
            _N_add,
            _N_sub,
            _N_multiply,
            _N_div,
            _N_cons,
            _N_car,
            _N_cdr,
            _N_sca,
            _N_scd,
            _N_list,
            _N_nbrEq,
            _N_seq,
            _N_leq,
            _N_sma,
            _N_lrg,
            _N_assoc,
            _N_map,
            _N_eval,
            _N_apply,
            _N_display,
            _N_newline,
            _N_read,
            _N_isPair,
            _N_isNull,
            _N_isSymbol,
            _N_isVector,
            _N_isString,
            _N_makeVector,
            _N_vectorRef,
            _N_vectorSet,
            _N_vectorLength,
            _N_vector,
            _N_clock,
            _N_reset,
            _N_eq,
            _N_equal,
            _N_collect,
            _N_available,
            _N_callcc,
            _N_stringRef,
            _N_stringSet,
            _N_stringLength,
            _N_random,
            _N_load,
            _R_read,
            _R_readLBR,
            _R_c1_LBR,
            _R_c2_LBR,
            _R_c3_LBR,
            _R_readQUO,
            _R_c_QUO,
            _R_readSHR,
            _R_c_vector,
            _C_compile,
            _C_compileSymbol,
            _C_compileSequence,
            _C_c1_sequence,
            _C_c2_sequence,
            _C_compileQuote,
            _C_compileInline,
            _C_c_compileInline,
            _C_compileIf,
            _C_c1_if,
            _C_c2_if,
            _C_c3_if,
            _C_c4_if,
            _C_compileParameters,
            _C_compileDefine,
            _C_c1_define,
            _C_c2_define,
            _C_c3_define,
            _C_c4_define,
            _C_compileSet,
            _C_c_set,
            _C_compileLambda,
            _C_c1_lambda,
            _C_c2_lambda,
            _C_c3_lambda,
            _C_compileApplication,
            _C_c1_application,
            _C_c2_application,
            _C_c3_application,
            _E_eval,
            _E_evalSelf,
            _E_evalLocal,
            _E_evalGlobal,
            _E_setLocal,
            _E_c_setLocal,
            _E_setGlobal,
            _E_c_setGlobal,
            _E_evalDfv,
            _E_c_evalDfv,
            _E_evalDff,
            _E_evalDfz,
            _E_evalLmb,
            _E_evalLmz,
            _E_evalSequence,
            _E_c_sequence,
            _E_evalQuote,
            _E_evalIfs,
            _E_c_ifs,
            _E_evalIff,
            _E_c_iff,
            _E_evalThunk,
            _E_evalApplication,
            _E_c1_application,
            _E_c2_application,
            _E_c3_application,
            _E_apply,
            _E_bind,
            _E_c_return,
            _N_addFloats,
            _N_substractFloats,
            _N_multiplyFloats,
            _N_c1_map,
            _N_c2_map,
            _N_c_eval,
            _N_c1_load,
            _N_c2_load,
            _N_compare,
            _N_compareFloat,
            _N_compareString,
            _N_comparePair,
            _N_c_comparePair,
            _N_compareVector,
            _N_c_compareVector,
            _REPL,
            _c1_repl,
            _c2_repl,
            _c3_repl,
            _error,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop,
            nop
        ];
        return {
            /* -- EXPORTS -- */
            /**************/
            /**** MAIN ****/
            /**************/
            init: init,
            claim: claim,
            claimSiz: claimSiz,
            Slip_REPL: Slip_REPL,
            inputReady: inputReady,
            /**************/
            /*** MEMORY ***/
            /**************/
            available: available,
            collectGarbage: collectGarbage,
            /************************/
            /*** ABSTRACT GRAMMAR ***/
            /************************/
            //tag
            tag: tag,
            //specials
            isTrue: isTrue,
            isFalse: isFalse,
            isNull: isNull,
            isVoid: isVoid,
            //numbers
            makeImmediate: makeImmediate,
            immediateVal: immediateVal,
            isNumber: isNumber,
            //characters
            makeChar: makeChar,
            charCode: charCode,
            isChar: isChar,
            //pairs
            pairCar: pairCar,
            pairCdr: pairCdr,
            pairSetCar: pairSetCar,
            pairSetCdr: pairSetCdr,
            isPair: isPair,
            //procedures
            prcArgc: prcArgc,
            prcFrmSiz: prcFrmSiz,
            prcBdy: prcBdy,
            prcEnv: prcEnv,
            przArgc: przArgc,
            przFrmSiz: przFrmSiz,
            przBdy: przBdy,
            przEnv: przEnv,
            isPrc: isPrc,
            isPrz: isPrz,
            //vectors
            fillVector: fillVector,
            vectorRef: vectorRef,
            vectorSet: vectorSet,
            vectorLength: vectorLength,
            isVector: isVector,
            //floats
            makeFloat: makeFloat,
            floatNumber: floatNumber,
            isFloat: isFloat,
            //string
            makeString: makeString,
            stringAt: textGetChar,
            stringSet: textSetChar,
            stringLength: textLength,
            isString: isString,
            //symbols
            makeSymbol: makeSymbol,
            symbolAt: textGetChar,
            symbolSet: textSetChar,
            symbolLength: textLength,
            isSymbol: isSymbol,
            //natives
            nativePtr: nativePtr,
            isNative: isNative,
            //sequences
            sequenceAt: sequenceAt,
            sequenceSet: sequenceSet,
            sequenceLength: sequenceLength,
            isSequence: isSequence,
            //single if-statements
            ifsPredicate: ifsPredicate,
            ifsConsequence: ifsConsequence,
            isIfs: isIfs,
            //full if-statements
            iffPredicate: iffPredicate,
            iffConsequence: iffConsequence,
            iffAlternative: iffAlternative,
            isIff: isIff,
            //quotes
            quoExpression: quoExpression,
            isQuo: isQuo,
            //thunks
            thunkExp: thunkExp,
            thunkSiz: thunkSiz,
            isThunk: isThunk,
            //lambdas
            lmbFrmSiz: lmbFrmSiz,
            lmbArgc: lmbArgc,
            lmbBdy: lmbBdy,
            isLmb: isLmb,
            lmzFrmSiz: lmzFrmSiz,
            lmzArgc: lmzArgc,
            lmzBdy: lmzBdy,
            isLmz: isLmz,
            //variable definitions
            dfvOfs: dfvOfs,
            dfvVal: dfvVal,
            isDfv: isDfv,
            //function definitions
            dffBdy: dffBdy,
            dffArgc: dffArgc,
            dffFrmSiz: dffFrmSiz,
            dffOfs: dffOfs,
            dfzBdy: dfzBdy,
            dfzArgc: dfzArgc,
            dfzFrmSiz: dfzFrmSiz,
            dfzOfs: dfzOfs,
            isDff: isDff,
            isDfz: isDfz,
            //assignments
            sglScp: sglScp,
            sglOfs: sglOfs,
            sglVal: sglVal,
            slcOfs: slcOfs,
            slcVal: slcVal,
            isSgl: isSgl,
            isSlc: isSlc,
            //variables
            localOfs: localOfs,
            globalScp: globalScp,
            globalOfs: globalOfs,
            isLocal: isLocal,
            isGlobal: isGlobal,
            //applications
            aplOperator: aplOperator,
            aplOperands: aplOperands,
            isApplication: isApplication,
            /**************/
            /**** POOL ****/
            /**************/
            enterPool: enterPool,
            poolAt: poolAt
        };
    }
    function READER() {
        'use strict';
        var program, position, hold;
        var makeString, stringSet, makeNumber, makeFloat, enterPool, claimSiz, claim;
        function load(str) {
            program = str;
            position = 0;
        }
        function link(asm$2, pool$2) {
            makeString = asm$2.makeString;
            stringSet = asm$2.stringSet;
            makeNumber = asm$2.makeNumber;
            makeFloat = asm$2.makeFloat;
            claimSiz = asm$2.claimSiz;
            claim = asm$2.claim;
            enterPool = pool$2.enterPool;
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
        function skip() {
            skipWhiteSpace();
            ++position;
        }
        function peek() {
            skipWhiteSpace();
            return program.charCodeAt(position);
        }
        function read() {
            skipWhiteSpace();
            return program.charCodeAt(position++);
        }
        function readSymbol() {
            hold = position;
            while (!isTerminator(program.charAt(++position)));
            return enterPool(program.substring(hold, position));
        }
        function extractString(from, to) {
            var len = to - from;
            claimSiz(len);
            var str = makeString(len);
            for (var i = 0; i < len; ++i)
                stringSet(str, i, program.charCodeAt(from + i));
            return str;
        }
        function readString() {
            hold = position;
            while (program.charAt(++position) != '"');
            return extractString(hold + 1, position++);
        }
        function readNumber() {
            hold = position;
            switch (//step 1: check for sign
                program.charAt(position)) {
            case '+':
            case '-':
                if (!isNumber(program.charAt(++position))) {
                    --position;
                    //oops, go back
                    return readSymbol();
                }
            }
            while (//step 2: parse number in front of .
                isNumber(program.charAt(++position)));
            if (//step 3: parse number after .
                program.charAt(position) === '.') {
                while (isNumber(program.charAt(++position)));
                claim();
                return makeFloat(parseFloat(program.substring(hold, position)));
            }
            return makeNumber(parseInt(program.substring(hold, position)));
        }
        return {
            load: load,
            skip: skip,
            peek: peek,
            read: read,
            readSymbol: readSymbol,
            readString: readString,
            readNumber: readNumber,
            link: link
        };
    }
    function SYMBOLS() {
        'use strict';
        var __POOL__ = Object.create(null);
        var makeSymbol, symbolSet, symbolAt, symbolLength, addToPool, poolAt;
        function link(asm$2) {
            makeSymbol = asm$2.makeSymbol;
            symbolSet = asm$2.symbolSet;
            symbolAt = asm$2.symbolAt;
            symbolLength = asm$2.symbolLength;
            addToPool = asm$2.enterPool;
            poolAt = asm$2.poolAt;
        }
        function buildSymbol(txt) {
            var len = txt.length;
            var sym = makeSymbol(len);
            for (var i = 0; i < len; ++i)
                symbolSet(sym, i, txt.charCodeAt(i));
            return sym;
        }
        function symbolText(chk) {
            var len = symbolLength(chk);
            var arr = new Array(len);
            for (var i = 0; i < len; ++i)
                arr[i] = symbolAt(chk, i);
            return String.fromCharCode.apply(null, arr);
        }
        function enterPool(str) {
            var idx;
            if (//already in pool
                idx = __POOL__[str])
                return poolAt(idx);
            var //not in pool yet
            sym = buildSymbol(str);
            idx = addToPool(sym);
            __POOL__[str] = idx;
            return sym;
        }
        function symbol(str) {
            return function () {
                return enterPool(str);
            };
        }
        return {
            enterPool: enterPool,
            loadCcc: symbol('call/cc'),
            loadAvl: symbol('available'),
            loadCol: symbol('collect'),
            loadClk: symbol('clock'),
            loadSlp: symbol('sleep'),
            loadRnd: symbol('random'),
            loadErr: symbol('error'),
            loadSre: symbol('string-ref'),
            loadSse: symbol('string-set!'),
            loadSle: symbol('string-length'),
            loadIpa: symbol('pair?'),
            loadInu: symbol('null?'),
            loadIsy: symbol('symbol?'),
            loadIve: symbol('vector?'),
            loadIst: symbol('string?'),
            loadQuo: symbol('quote'),
            loadIff: symbol('if'),
            loadDef: symbol('define'),
            loadLmb: symbol('lambda'),
            loadSet: symbol('set!'),
            loadBeg: symbol('begin'),
            loadPls: symbol('+'),
            loadMns: symbol('-'),
            loadMul: symbol('*'),
            loadDiv: symbol('/'),
            loadCns: symbol('cons'),
            loadCar: symbol('car'),
            loadCdr: symbol('cdr'),
            loadSca: symbol('set-car!'),
            loadScd: symbol('set-cdr!'),
            loadLst: symbol('list'),
            loadSma: symbol('<'),
            loadLrg: symbol('>'),
            loadLeq: symbol('>='),
            loadSeq: symbol('<='),
            loadNeq: symbol('='),
            loadAss: symbol('assoc'),
            loadMap: symbol('map'),
            loadVec: symbol('vector'),
            loadVcm: symbol('make-vector'),
            loadVcr: symbol('vector-ref'),
            loadVcs: symbol('vector-set!'),
            loadVcl: symbol('vector-length'),
            loadEql: symbol('equal?'),
            loadEqu: symbol('eq?'),
            loadEva: symbol('eval'),
            loadRea: symbol('read'),
            loadLoa: symbol('load'),
            loadApl: symbol('apply'),
            loadDis: symbol('display'),
            loadNew: symbol('newline'),
            loadRst: symbol('reset'),
            link: link
        };
    }
    function TIMER() {
        'use strict';
        var __START__;
        function reset() {
            __START__ = new Date().getTime();
        }
        function getTime() {
            var current = new Date().getTime();
            return current - __START__;
        }
        return {
            getTime: getTime,
            reset: reset
        };
    }
    function PRINTER() {
        'use strict';
        var getTag, numberVal, floatNumber, charCode, stringText, symbolLength, symbolAt, pairCar, pairCdr, isPair, isNull, vectorRef, vectorLength, ag;
        function link(asm$2) {
            getTag = asm$2.tag;
            numberVal = asm$2.numberVal;
            floatNumber = asm$2.floatNumber;
            charCode = asm$2.charCode;
            stringText = asm$2.stringText;
            symbolLength = asm$2.symbolLength;
            symbolAt = asm$2.symbolAt;
            pairCar = asm$2.pairCar;
            pairCdr = asm$2.pairCdr;
            isPair = asm$2.isPair;
            isNull = asm$2.isNull;
            vectorRef = asm$2.vectorRef;
            vectorLength = asm$2.vectorLength;
            ag = asm$2;
        }
        function printExp(exp) {
            var tag = getTag(exp);
            switch (tag) {
            case 68:
                return '()';
            case 67:
                return '#<void>';
            case 65:
                return '#t';
            case 66:
                return '#f';
            case 69:
                return numberVal(exp).toString();
            case 64:
                return '#\\' + String.fromCharCode(charCode(exp).toString());
            case 0:
                return printPair(exp);
            case 2:
                return printVector(exp);
            case 5:
                return '"' + stringText(exp) + '"';
            case 1:
                return floatNumber(exp).toString();
            case 70:
                return '#<native procedure>';
            case 24:
                return '#<continuation>';
            case 3:
                return symbolText(exp);
            case 4:
            case 42:
                return '#<procedure>';
            case 36:
                return '#<local variable @ offset ' + printExp(ag.localOfs(exp)) + '>';
            case 38:
                return '#<variable @ scope-level/offset: ' + printExp(ag.globalScp(exp)) + '/' + printExp(ag.globalOfs(exp)) + '>';
            case 6:
                return '#<sequence ' + printSequence(exp) + '>';
            case 8:
                return '#<simple-if ' + printExp(ag.ifsPredicate(exp)) + ' ' + printExp(ag.ifsConsequence(exp)) + '>';
            case 10:
                return '#<full-if ' + printExp(ag.iffPredicate(exp)) + ' ' + printExp(ag.iffConsequence(exp)) + ' ' + printExp(ag.iffAlternative(exp)) + '>';
            case 32:
                return '#<thunk (size: ' + printExp(ag.thunkSiz(exp)) + '; body: ' + printExp(ag.thunkExp(exp)) + ')>';
            case 22:
                return '#<quote ' + printExp(ag.quoExpression(exp)) + '>';
            case 18:
                return '#<lambda (argument count: ' + printExp(ag.lmbArgc(exp)) + '; frame size: ' + printExp(ag.lmbFrmSiz(exp)) + '; body: ' + printExp(ag.lmbBdy(exp)) + ')>';
            case 34:
                return '#<lambda (argument* count: ' + printExp(ag.lmzArgc(exp)) + '; frame size: ' + printExp(ag.lmzFrmSiz(exp)) + '; body: ' + printExp(ag.lmzBdy(exp)) + ')>';
            case 12:
                return '#<variable definition @ offset ' + printExp(ag.dfvOfs(exp)) + ' (value: ' + printExp(ag.dfvVal(exp)) + ')>';
            case 14:
                return '#<function definition @ offset ' + printExp(ag.dffOfs(exp)) + ' (argument count: ' + printExp(ag.dffArgc(exp)) + '; frame size:  ' + printExp(ag.dffFrmSiz(exp)) + '; body:  ' + printExp(ag.dffBdy(exp)) + ')>';
            case 30:
                return '#<function definition @ offset ' + printExp(ag.dfzOfs(exp)) + ' (argument* count: ' + printExp(ag.dfzArgc(exp)) + '; frame size:  ' + printExp(ag.dfzFrmSiz(exp)) + '; body:  ' + printExp(ag.dfzBdy(exp)) + ')>';
            case 20:
                return '#<assignment @ scope-level/offset: ' + printExp(ag.sglScp(exp)) + '/' + printExp(ag.sglOfs(exp)) + ' (value: ' + printExp(ag.sglVal(exp)) + ')>';
            case 40:
                return '#<local assignment @ offset: ' + printExp(ag.slcOfs(exp)) + ' (value: ' + printExp(ag.slcVal(exp)) + ')>';
            case 16:
                return '#<application ' + printExp(ag.aplOperator(exp)) + ' @ ' + printExp(ag.aplOperands(exp)) + '>';
            default:
                return '<expression (tag: ' + tag + ')>';
            }
        }
        var printSequence = function (exp) {
            var str = '', idx = 1;
            var len = ag.sequenceLength(exp);
            while (idx < len)
                str += printExp(ag.sequenceAt(exp, idx++)) + ' ';
            str += printExp(ag.sequenceAt(exp, idx));
            return str;
        };
        var printBindings = printExp;
        function symbolText(chk) {
            var len = symbolLength(chk);
            var arr = new Array(len);
            for (var i = 0; i < len; ++i)
                arr[i] = symbolAt(chk, i);
            return String.fromCharCode.apply(null, arr);
        }
        function printPair(exp) {
            var str = '(' + printExp(pairCar(exp));
            var cdr = pairCdr(exp);
            var cdrStr = printExp(cdr);
            if (isPair(cdr)) {
                // prettier!
                cdrStr = cdrStr.substring(1, cdrStr.length - 1);
                return str + ' ' + cdrStr + ')';
            }
            if (isNull(cdr))
                return str + ')';
            return str + ' . ' + cdrStr + ')';
        }
        function printVector(exp) {
            var len = vectorLength(exp);
            if (len === 0)
                return '#()';
            var str = '#(';
            for (var idx = 1; idx < len; ++idx) {
                str += printExp(vectorRef(exp, idx)) + ' ';
            }
            str += printExp(vectorRef(exp, len)) + ')';
            return str;
        }
        return {
            printExp: printExp,
            link: link
        };
    }
    function ERRORS() {
        'use strict';
        var report, printExp;
        function link(io$2, printer$2) {
            report = io$2.printError;
            printExp = printer$2.printExp;
        }
        function invalidLength(len) {
            report('invalid length: ' + len);
        }
        function invalidRange(idx, from, to) {
            report('expected index in range [' + from + ', ' + to + '], given ' + idx);
        }
        function expectedRBR(code) {
            report('expected ), given ' + String.fromCharCode(code));
        }
        function invalidSyntax() {
            report('invalid syntax');
        }
        function invalidParameter() {
            report('invalid parameter');
        }
        function invalidSequence() {
            report('invalid sequence');
        }
        function invalidQuote() {
            report('invalid quote');
        }
        function invalidIf() {
            report('invalid if');
        }
        function invalidDefine() {
            report('invalid definition');
        }
        function invalidAssignment() {
            report('invalid assignment');
        }
        function invalidLambda() {
            report('invalid lambda');
        }
        function invalidApplication() {
            report('invalid application');
        }
        function undefinedVariable(exp) {
            report('undefined variable: ' + printExp(exp));
        }
        function invalidExpression(exp) {
            report('invalid expression:' + printExp(exp));
        }
        function invalidOperator() {
            report('invalid operator');
        }
        function invalidParamCount() {
            report('invalid parameter count');
        }
        function invalidArgument(exp) {
            report('invalid argument: ' + printExp(exp));
        }
        function fatalMemory() {
            report('insufficient memory!');
            throw 'out of memory';
        }
        return {
            expectedRBR: expectedRBR,
            invalidSyntax: invalidSyntax,
            invalidSequence: invalidSequence,
            invalidQuote: invalidQuote,
            invalidIf: invalidIf,
            invalidDefine: invalidDefine,
            invalidAssignment: invalidAssignment,
            invalidLambda: invalidLambda,
            invalidApplication: invalidApplication,
            undefinedVariable: undefinedVariable,
            invalidOperator: invalidOperator,
            invalidParamCount: invalidParamCount,
            invalidParameter: invalidParameter,
            invalidArgument: invalidArgument,
            invalidExpression: invalidExpression,
            invalidLength: invalidLength,
            invalidRange: invalidRange,
            fatalMemory: fatalMemory,
            link: link
        };
    }
    function IO() {
        'use strict';
        var readExpression, printline, printOut, plog, ld, inputReady, loadInput, printExp, printErr, text;
        function link(asm$2, clbs, reader$2, printer$2) {
            readExpression = clbs.readExpression;
            printline = clbs.printline;
            printOut = clbs.print;
            printErr = clbs.printerror;
            plog = clbs.printlog;
            ld = clbs.load;
            inputReady = asm$2.inputReady;
            text = asm$2.stringText;
            loadInput = reader$2.load;
            printExp = printer$2.printExp;
        }
        function onInput(txt) {
            reader.load(txt);
            inputReady();
        }
        function promptInput() {
            printOut('> ');
            readExpression(onInput);
        }
        function promptUserInput() {
            printOut(':: ');
            readExpression(onInput);
        }
        function onError() {
            //TODO: temporary fix...
            reader.load('#f');
            inputReady();
        }
        function loadFile(str) {
            ld(text(str), onInput, onError);
        }
        function printLog(exp) {
            plog(printExp(exp));
        }
        function printNewline() {
            printline('');
        }
        function printOutput(exp) {
            return printExp(exp);
        }
        function printError(txt) {
            printErr('ERROR: ' + txt);
        }
        function initREPL() {
            printline('Welcome to the slip.js REPL');
            printline('');
        }
        return {
            promptUserInput: promptUserInput,
            printNewline: printNewline,
            promptInput: promptInput,
            printOutput: printOutput,
            printError: printError,
            printLog: printLog,
            initREPL: initREPL,
            loadFile: loadFile,
            link: link
        };
    }
    var memSiz = 1 << (size || 24);
    var buffer = new ArrayBuffer(memSiz);
    var //foreign modules
    reader = READER();
    var printer = PRINTER();
    var errors = ERRORS();
    var pool = SYMBOLS();
    var timer = TIMER();
    var io = IO();
    var foreign = {
        heapSize: memSiz,
        skip: reader.skip,
        look: reader.peek,
        read: reader.read,
        readSymbol: reader.readSymbol,
        readString: reader.readString,
        readNumber: reader.readNumber,
        loadQuo: pool.loadQuo,
        loadIff: pool.loadIff,
        loadDef: pool.loadDef,
        loadBeg: pool.loadBeg,
        loadVec: pool.loadVec,
        loadSet: pool.loadSet,
        loadLmb: pool.loadLmb,
        loadPls: pool.loadPls,
        loadMns: pool.loadMns,
        loadMul: pool.loadMul,
        loadDiv: pool.loadDiv,
        loadCns: pool.loadCns,
        loadCar: pool.loadCar,
        loadCdr: pool.loadCdr,
        loadSca: pool.loadSca,
        loadScd: pool.loadScd,
        loadLst: pool.loadLst,
        loadNeq: pool.loadNeq,
        loadSeq: pool.loadSeq,
        loadLeq: pool.loadLeq,
        loadLrg: pool.loadLrg,
        loadSma: pool.loadSma,
        loadAss: pool.loadAss,
        loadMap: pool.loadMap,
        loadAvl: pool.loadAvl,
        loadCol: pool.loadCol,
        loadClk: pool.loadClk,
        loadSlp: pool.loadSlp,
        loadErr: pool.loadErr,
        loadSre: pool.loadSre,
        loadSse: pool.loadSse,
        loadSle: pool.loadSle,
        loadIpa: pool.loadIpa,
        loadInu: pool.loadInu,
        loadIsy: pool.loadIsy,
        loadIve: pool.loadIve,
        loadIst: pool.loadIst,
        loadVcm: pool.loadVcm,
        loadVcr: pool.loadVcr,
        loadVcs: pool.loadVcs,
        loadVcl: pool.loadVcl,
        loadEqu: pool.loadEqu,
        loadEql: pool.loadEql,
        loadEva: pool.loadEva,
        loadRea: pool.loadRea,
        loadLoa: pool.loadLoa,
        loadApl: pool.loadApl,
        loadDis: pool.loadDis,
        loadNew: pool.loadNew,
        loadRst: pool.loadRst,
        loadCcc: pool.loadCcc,
        loadRnd: pool.loadRnd,
        clock: timer.getTime,
        reset: timer.reset,
        expectedRBR: errors.expectedRBR,
        invalidSyntax: errors.invalidSyntax,
        invalidSequence: errors.invalidSequence,
        invalidQuote: errors.invalidQuote,
        invalidIf: errors.invalidIf,
        invalidDefine: errors.invalidDefine,
        invalidAssignment: errors.invalidAssignment,
        invalidParameter: errors.invalidParameter,
        invalidLambda: errors.invalidLambda,
        invalidApplication: errors.invalidApplication,
        invalidExpression: errors.invalidExpression,
        undefinedVariable: errors.undefinedVariable,
        invalidOperator: errors.invalidOperator,
        invalidParamCount: errors.invalidParamCount,
        invalidArgument: errors.invalidArgument,
        invalidRange: errors.invalidRange,
        invalidLength: errors.invalidLength,
        fatalMemory: errors.fatalMemory,
        promptUserInput: io.promptUserInput,
        printNewline: io.printNewline,
        printOutput: io.printOutput,
        promptInput: io.promptInput,
        printLog: io.printLog,
        loadFile: io.loadFile,
        initREPL: io.initREPL,
        random: Math.random
    };
    var //asm module
    asm = SLIP_ASM(callbacks.stdlib, foreign, buffer);
    asm.makeNumber = asm.makeImmediate;
    asm.numberVal = asm.immediateVal;
    asm.stringText = function (chk) {
        var len = asm.stringLength(chk);
        var arr = new Array(len);
        for (var i = 0; i < len; ++i)
            arr[i] = asm.stringAt(chk, i);
        return String.fromCharCode.apply(null, arr);
    };
    //linking
    pool.link(asm);
    reader.link(asm, pool);
    printer.link(asm);
    io.link(asm, callbacks, reader, printer);
    errors.link(io, printer);
    timer.reset();
    //init
    asm.init();
    return {
        /* ---- EXPORTS ---- */
        Slip_REPL: asm.Slip_REPL
    };
}