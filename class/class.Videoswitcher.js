class Videoswitcher {
	constructor(name, ip) {
		this.name = name;
		this.ip = ip;

		// create an connect
		const { Atem } = require('atem-connection')
		this.switcher = new Atem({ externalLog: console.log })
		this.switcher.connect(this.ip)

		// connect
		this.switcher.on('connected', () => {
			console.log('Switcher connected');
		})

		// on state changed
		this.switcher.on('stateChanged', function(err, state) {
		  console.log(state); // catch the ATEM state.
		});
	}

	changeProgramInput(input) {
		this.switcher.changeProgramInput(input).then((res) => {
			console.log(res)
			// ProgramInputCommand {
			// 	flag: 0,
			// 	rawName: 'PrgI',
			// 	mixEffect: 0,
			// 	properties: { source: 3 },
			// 	resolve: [Function],
			// 	reject: [Function] }
		})
		console.log(this.switcher.state)
	}

	changePreviewInput(input) {
		this.switcher.changePreviewInput(input).then((res) => {
			console.log(res)
		})
		console.log(this.switcher.state)
	}

	cut(input) {
		this.switcher.cut(input).then((res) => {
			console.log(res)
		})
		console.log(this.switcher.state)
	}

	setTransitionPosition(input) {
		this.switcher.setTransitionPosition(input).then((res) => {
			console.log(res)
		})
		// console.log(this.switcher.state)
	}
}




