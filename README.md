*Use of this software is subject to important terms and conditions as set forth in the License file*

# React App Scaffold
A pure typescript scaffold for developing apps in Zendesk with React.

## Dependencies
The only dependency is Node and a package manager. Per the original app scaffold, Node version should be >= 18.12.1

## Usage
1. Ensure dependencies are installed in your development environment
2. Clone the repo to a folder on your machine
```
git clone https://github.com/Joshlha/zd-ts-react.git .
```
3. Install packages
```
npm i
```
4. If using VSCode, install the ESLint plugin for much better type checking and formatting/auto-fixing options.
5. Open two terminals and run the two commends below, one in each terminal.
```
npm run watch
```
```
npm run start
```
6. Finally, navigate to a ticket in Zendesk and append `?zcli_apps=true` to the URL

## Help
If you have any issues getting this scaffold to work, feel free to open an issue on this repo. 

If you need general help with setting up you dev environemnt or working with ZAFClient, it is recommended to start with Zendesk's own scaffold before moving onto this typescript scaffold, as the community at large is using that resource.

## Contributing
The scaffold is intended to be bare minimum. As such, there isn't a whole lot of room for additions. If you have any idea and would like to contribute, feel free to open an issue and we can review it. 

One example of an additional feature would be having multiple app entrypoints, using multiple ZAFClients, etc.

## License
This code is a derivative of Zendesk's react app scaffold, found in [this github repo](https://github.com/zendesk/app_scaffolds). As such, we are required to inform you of major changes made to the original codebase. This repository retains the license of the repository from which it is derived.

## Changes from [app_scaffolds/packages/react](https://github.com/zendesk/app_scaffolds/tree/master/packages/react)
1. This code derives only from the `/packages/react` folder in the derivative repo. All other code has been thrown out.
2. ALL javascript has been changed to Typescript
3. Necessary dependencies for Typescript have been added, including typescript packages for integration with other dependencies such as Webpack and Node.
4. Dependencies used for localization have been removed.

