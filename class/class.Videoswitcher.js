class Videoswitcher {
	constructor(name, ip) {
		this.name = name;
		this.ip = ip;
		this.state = {
			preview:null,
			program:null,
		}

		// create an connect
		const { Atem } = require('atem-connection')
		this.switcher = new Atem()
		this.switcher.connect(this.ip);
		this.switcher.on('stateChanged',(state,path) => {
			// console.log(state);

			if(state.video.ME[0]) {
				this.state.preview = state.video.ME[0].previewInput;
			} else {
				this.changePreviewInput(1);
			}

			if(state.video.ME[0]) {
				this.state.program = state.video.ME[0].programInput;
			} else {
				this.changeProgramInput(2);
			}
			// console.log(this.state);
			
			
			// console.log(path);
		});

		// connect
		this.switcher.on('connected', () => {
			console.log('Switcher connected');
		})
	}

	changeProgramInput(input) {
		this.switcher.changeProgramInput(input).then((res) => {
			// console.log(res)
			// ProgramInputCommand {
			// 	flag: 0,
			// 	rawName: 'PrgI',
			// 	mixEffect: 0,
			// 	properties: { source: 3 },
			// 	resolve: [Function],
			// 	reject: [Function] }
		})
		// console.log(this.switcher.state)
	}

	changePreviewInput(input) {
		this.state.preview = input;
		this.switcher.changePreviewInput(input).then((res) => {
			// console.log(res)
		})
		// console.log(this.switcher.state)
	}

	cut(input) {
		this.state.program = this.state.preview;
		this.switcher.cut(input).then((res) => {
			console.log(res)
		})
		// console.log(this.switcher.state)
	}

	setTransitionPosition(input) {
		// 100 % * 100 = 10.000 <- expected final value for a transition
		this.switcher.setTransitionPosition(input*100).then((res) => {
			// console.log(res)
		})
		// console.log(this.switcher.state)
	}

	tapped(input) {
		if(this.state.preview == input) {
			// let toBePreview = this.state.program;
			this.changeProgramInput(input);
			// this.changePreviewInput(toBePreview);
			
			return true;
		} else {
			this.changePreviewInput(input);
		}
	}
}




