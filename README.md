# Multiview Touch Control for ATEM Switcher
A touchscreen multiview control app for Blackmagic ATEM switcher. Converts touchscreen interactions to ATEM commands via Sofie ATEM API.
For development the Touchscreen Dell P2418HT was used and tested.

![Infographic on how to use this app](https://raw.githubusercontent.com/airbenich/multiviewTouchControl/master/gfx/multiview_gfx.png)

## To Use

To clone and run this repository you'll need to run these commands from your command line:

```bash
# Clone this repository
git clone https://github.com/airbenich/multiviewTouchControl
# Go into the repository
cd multiviewTouchControl
# Install dependencies
npm install
# Run the app
npm start 
```

## Connect to switcher
```bash
# Run the app and connect to a switcher with the ip: 192.168.1.110
npm start switcher 192.168.1.110
```

## Known issues
Connection to ATEM Mixer via Sofie Library couldn't be tested yet, because i don't have access to an atem mixer right now.

## License

[GPL 3.0 (General Public Licence)](LICENSE.md)
