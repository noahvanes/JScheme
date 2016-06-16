function DICTIONARY() {
	"use strict";

	var asm, err;
	var savedOffset = 0;
	var environment = [];
	var frame = [];

	function dctError(err) {
		err();
		throw err;
	}

	function link(asmModule,errModule) {
		asm = asmModule;
		err = errModule;
	}

	function defineVar(vrb,constant) {

		if((environment.length===0)&&(frame.length===__GLOBAL_SIZ__))
			dctError(err.globalOverflow);

		frame.push({
			name: asm.protect(vrb),
			constant: constant
		});
		return frame.length;
	}

	//register a function to allow re-compilation
	function registerFunction(funBody,funParams,funArgc) {

		// construct lexical environment
		var funEnv = environment.slice();
		var frm = funEnv.pop();
		funEnv.push(frm.slice());

		var vrb = frm[frm.length-1];
		vrb.inline = true;
		vrb.inlining = 0;
		vrb.body = asm.protect(funBody);
		vrb.params = asm.protect(funParams);
		vrb.argc = funArgc;
		vrb.env = funEnv;
		return vrb;
	}

	function unregisterFunction(vrb) {
		vrb.inline = false;
		asm.free(vrb.body);
		asm.free(vrb.params);
	}

	function frameSize() {
		return frame.length;
	}

	function scopeLevel() {
		return environment.length;
	}

	function enterScope() {
		environment.push(frame);
		frame = [];
		frame.minSize = 0;
	}

	function exitScope() {

		var len = frame.length;
		resetFrame(0);  // clean all references
		var frameSize = Math.max(frame.minSize,len);
		frame = environment.pop();
		return frameSize;
	}

	function lookup(scope,offset) {

		if(scope===0 || scope-1===environment.length)
			return frame[offset-1];

		return environment[scope-1][offset-1];
	}

	function offset(sym,frame) {

		var len = frame.length;
		while(len-- > 0) {
			var vrb = frame[len];
			if(asm.feq(vrb.name,sym))
				return len+1;
		}
		return false; //variable not found
	}

	function setMinimumFrameSize(size) {
		frame.minSize = (frame.minSize? Math.max(frame.minSize,size):size);
	}

	function lookupEnvironment(sym,env) {
		for(var lvl = env.length; lvl > 0; --lvl) {
			var frm = env[lvl-1];
			var ofs = offset(sym,frm);
			if(ofs) {
				var scp = (lvl===environment.length+1? 0 : lvl);
				return { scope: scp, offset: ofs }
			}
		}
		return false;
	}

	function getMinimumFrameSize(size) {
		return frame.minSize;
	}

	function resetMinimumFrameSize(size) {
		frame.minSize = size;
	}

	function lexicalAdr(sym) {

		//local search
		var localOffset = offset(sym,frame);
		if(localOffset)
			return { scope: 0, offset: localOffset } 
			
		//global search
		return lookupEnvironment(sym,environment);
	}

	function resetFrame(len) {
		while(frame.length > len) {
			var def = frame.pop();
			asm.free(def.name);
			if(def.inline) {
				asm.free(def.body);
				asm.free(def.params);
			}
		}
	}

	function checkpoint() {
		savedOffset = frame.length;
	}

	function rollback() {
		frame = (environment.length==0?frame:environment[0]);
		resetFrame(savedOffset);
		environment = [];
	}

	return {
		link: link,
		lookup: lookup,
		defineVar: defineVar,
		lexicalAdr: lexicalAdr,
		enterScope: enterScope,
		exitScope: exitScope,
		frameSize: frameSize,
		scopeLevel: scopeLevel,
		registerFunction: registerFunction,
		unregisterFunction: unregisterFunction,
		getMinimumFrameSize: getMinimumFrameSize,
		setMinimumFrameSize: setMinimumFrameSize,
		resetMinimumFrameSize: resetMinimumFrameSize,
		lookupEnvironment: lookupEnvironment,
		checkpoint: checkpoint,
		rollback: rollback
	}
}