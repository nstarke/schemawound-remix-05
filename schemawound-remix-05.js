//"The Same Color As Your Skin (Extended)" by Schemawound
//Original by Jonathan Siesmasko (schemawound@yahoo.com) - Soundcloud: http://soundcloud.com/schemawound
//Remix by Nicholas Starke (nstarke_07@yahoo.com) - Soundcloud: http://soundcloud.com/nicholas-starke
//Requires Audiolet (https://github.com/oampo/Audiolet)

var SchemawoundRemix05 = function(seconds) {
	var synth = null;
	var audiolet = new Audiolet(), Synth = function(audiolet, seconds) {
		AudioletGroup.apply(this, [audiolet, 0, 1]);

		//create osc nodes

		//this.sin1Group = new Sin1Group(audiolet);
		this.sin1Left = new Sine(audiolet, 65);
		this.sin1LeftMulAdd = new MulAdd(audiolet, 440, 0);
		this.sin1Left.connect(this.sin1LeftMulAdd);

		this.sin3Left = new Sine(audiolet, 45);
		this.sin3LeftMulAdd = new MulAdd(audiolet, 330, 0);
		this.sin3Left.connect(this.sin3LeftMulAdd);

		this.sin13Add = new Add(audiolet);
		this.sin3LeftMulAdd.connect(this.sin13Add);
		this.sin1LeftMulAdd.connect(this.sin13Add, 0, 1);
		
		this.sin2 = new Sine(audiolet, 1);
		this.sin2MulAdd = new MulAdd(audiolet, 5, 105);
		this.sin2.connect(this.sin2MulAdd);

		this.sinModDepth1 = new Sine(audiolet, 0.01);
		this.sinModDepth1MulAdd = new MulAdd(audiolet, 10, 0);
		this.sinModDepth1.connect(this.sinModDepth1MulAdd);

		this.sinModDepth2 = new Sine(audiolet, 0.00033);
		this.sinModDepth2MulAdd = new MulAdd(audiolet, 1000, 0);
		this.sinModDepth2.connect(this.sinModDepth2MulAdd);

		this.sinModDepthMul = new Multiply(audiolet);
		this.sinModDepth2MulAdd.connect(this.sinModDepthMul, 0, 1);
		this.sinModDepth1MulAdd.connect(this.sinModDepthMul);

		this.sinModAdd = new Add(audiolet);
		this.sin13Add.connect(this.sinModAdd, 0, 1);
		this.sin2MulAdd.connect(this.sinModAdd);

		this.sinModMul = new Multiply(audiolet);
		this.sinModAdd.connect(this.sinModMul, 0, 1);
		this.sinModDepthMul.connect(this.sinModMul);

		this.ampModDepth1 = new Sine(audiolet, 0.1);
		this.ampModDepth1MulAdd = new MulAdd(audiolet, 0.5, 1);
		this.ampModDepth1.connect(this.ampModDepth1MulAdd);

		this.ampModDepth2 = new Sine(audiolet, 1);
		this.ampModDepth2MulAdd = new MulAdd(audiolet, 0.5, 1);
		this.ampModDepth2.connect(this.ampModDepth2MulAdd);

		this.ampModDepthMul = new Multiply(audiolet);
		this.ampModDepth2MulAdd.connect(this.ampModDepthMul, 0, 1);
		this.ampModDepth1MulAdd.connect(this.ampModDepthMul);

		this.sinLineEnv = new Envelope(audiolet, 1, [40, 10, 4000, 4, 400], [seconds, seconds, seconds, seconds], 1, function() {
			audiolet.scheduler.addRelative(0, this.remove.bind(this));
		}.bind(this));
		this.sinLine = new Saw(audiolet);
		this.sinLineEnv.connect(this.sinLine);

		this.sum = new Pulse(audiolet);
		this.sinModMul.connect(this.sum);
		this.sumMul = new Multiply(audiolet);
		this.sum.connect(this.sumMul, 0, 1);
		this.ampModDepthMul.connect(this.sumMul);
		this.sumTanh = new Tanh(audiolet);
		this.sumMul.connect(this.sumTanh);

		this.comb1 = new CombFilter(audiolet, 1, 0.5, 1);
		this.sumTanh.connect(this.comb1);
		this.comb1Add = new Add(audiolet);
		this.comb1.connect(this.comb1Add, 0, 1);
		this.sumTanh.connect(this.comb1Add);
		this.comb1Mul = new Multiply(audiolet);
		this.comb1Add.connect(this.comb1Mul, 0, 1);
		this.sinLine.connect(this.comb1Mul);

		this.comb2 = new CombFilter(audiolet, 8, 7, 0.5);
		this.comb1Mul.connect(this.comb2);
		this.comb2Add = new Add(audiolet);
		this.comb1Mul.connect(this.comb2Add, 0, 1);
		this.comb2.connect(this.comb2Add);
		this.comb2Mul = new Multiply(audiolet, 0.4);
		this.comb2Add.connect(this.comb2Mul);
		
		this.comb3 = new CombFilter(audiolet, 0.01, 0.005, 1);
		this.sumTanh.connect(this.comb3);
		this.comb3Add = new Add(audiolet);
		this.comb3.connect(this.comb3Add, 0, 1);
		this.sumTanh.connect(this.comb3Add);
		this.comb3Mul = new Multiply(audiolet);
		this.comb3Add.connect(this.comb3Mul, 0, 1);
		this.sinLine.connect(this.comb3Mul);

		this.comb4 = new CombFilter(audiolet,  0.008, 0.007, 0.5);
		this.comb3Mul.connect(this.comb4);
		this.comb4Add = new Add(audiolet);
		this.comb3Mul.connect(this.comb4Add, 0, 1);
		this.comb4.connect(this.comb4Add);
		this.comb4Mul = new Multiply(audiolet, 0.4);
		this.comb4Add.connect(this.comb4Mul);

		this.combsMix = new Add(audiolet);
		this.comb4Mul.connect(this.combsMix);
		this.comb2Mul.connect(this.combsMix,0,1);
		this.softClip = new SoftClip(audiolet);
		this.combsMix.connect(this.softClip);
		this.softClipMul = new Multiply(audiolet, 0.8);
		this.softClip.connect(this.softClipMul);

		this.env = new ADSREnvelope(audiolet, 1, 0.1, 0, seconds - 0.2, 0.1, function() {
			audiolet.scheduler.addRelative(0, this.remove.bind(this));
		}.bind(this));

		this.outputSin1 = new Sine(audiolet, 40);
		this.outputSin2 = new Sine(audiolet, 456);
		this.outputSin1Mul1 = new Multiply(audiolet);
		this.softClipMul.connect(this.outputSin1Mul1, 0, 1);
		this.outputSin1.connect(this.outputSin1Mul1);
		this.outputSin1Mul2 = new Multiply(audiolet);
		this.outputSin1Mul1.connect(this.outputSin1Mul2, 0, 1);
		this.outputSin2.connect(this.outputSin1Mul2);
		this.reverb = new Reverb(audiolet, 0.7, 0.7, 0.7);
		this.outputSin1Mul2.connect(this.reverb);
		this.reverb.connect(this.outputs[0]);

	};

	extend(Synth, AudioletGroup);
	this.play = function() {
		synth = new Synth(audiolet, seconds);
		synth.connect(audiolet.output);
	}, this.stop = function() {
		synth.disconnect(audiolet.output);
	}
}
