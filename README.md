# Wild Achievements

![GitHub package.json version](https://img.shields.io/github/package-json/v/HenryDeLange/inat-achievements) ![GitHub](https://img.shields.io/github/license/HenryDeLange/inat-achievements)

This project calculates fun personal achievements based on observations recorded on [iNaturalist](https://www.inaturalist.org).

---

## Live Site
![Website](https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Fwild-achievements.mywild.co.za) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/HenryDeLange/inat-achievements/Deploy%20to%20GitHub%20Pages?label=deploy)

[https://wild-achievements.mywild.co.za](https://wild-achievements.mywild.co.za)\
(or [https://henrydelange.github.io/inat-achievements](https://henrydelange.github.io/inat-achievements))

---

## Development

![GitHub language count](https://img.shields.io/github/languages/count/HenryDeLange/inat-achievements) ![GitHub top language](https://img.shields.io/github/languages/top/HenryDeLange/inat-achievements) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/HenryDeLange/inat-achievements/Build%20Project)

### Setup
`npm install`\
Downloads all dependencies.

### Run
 `npm start`\
Runs the **React** web application in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm electron:start`\
Runs the **Electron** desktop client.\
Depends on the main application to be running on _http://localhost:3000_ (via the `npm start` command).

### Build
 `npm run build`\
Builds the app for production to the `build` folder.\

### Web App Hosting
Hosts this project using GitHub Pages.

#### _Custom Subdomain_
The custom subdomain `wild-achievements.mywild.co.za` has been configured on GitHub, as specified in the `CNAME` file. As a result the `homepage` property is set in the `package.json` file should be `http://HenryDeLange.github.io/` instead of `http://HenryDeLange.github.io/inat-achievements` when using the GitHub IO domain. However due to the Electron build the property is instead set to the `./` relative path.

#### _GitHub Action to automatically publish a new hosted version_
The GitHub Action defined in `./.github/workflows/deploy-to-pages.yml` will run automatically when code is committed into the `master` branch, resulting in a website of the latest code in the branch being available online on GitHub Pages.

#### _Manual steps to publish a new hosted version_
  1. Make sure the `homepage` property is set in the `package.json` file as described above in the _Custom Subdomain_ section.
  2. Build the production version using the `npm run predeploy` command.
  3. Deploy the application to GitHub Pages using the `npm run deploy` command.
      - This step will push the application's build artifacts to the `gh-pages` branch.
  4. On GitHub, navigate to the repository's `Settings` and then make sure that `Source` property under the `Pages` category is set to use the `gh-pages` branch.
  5. The new version of the application should be online shortly. Done :)

### Desktop App Distributable
Run this project as A desktop application using Electron.

#### _GitHub Action to automatically build a new desktop release_
The GitHub Action defined in `./.github/workflows/release-electron.yml` will run automatically when code is committed into the `master` branch, resulting in the desktop application of the latest code in the branch being available as a GitHub Release.

#### _Manual steps to build a new desktop release_
  1. Make sure the `homepage` property is set in the `package.json` file as described above in the _Custom Subdomain_ section.to the `./` relative path.
  2. Run the _npm script_ for the relevant environment.
      - For example: `npm run electron:package:win`
  3. The distributable application will be in the `dist` folder. Done :)

### Android App
The `expo-app` folder contains an Expo application that contains a simple _WebView_ that points directly to the live website.

#### _Manual steps to build a new Android release_
  1. Install Expo CLI `npm install --global expo-cli` and Expo EAS CLI `npm install -g eas-cli`.
  2. Log in to Expo `eas whoami`.
  3. Run the Android build `eas build --platform android`.
  4. Download the `apk` file from the Expo website, and either:
      - Manually install it on your Android device.
          - To do this download [bundletool](https://github.com/google/bundletool) and then run a command like this to obtain the APK file from the AAB created by Expo EAS Build: `java -jar bundletool-all-1.9.1.jar build-apks --bundle=WildAchievements.aab --output=WildAchievements.apks --mode=universal`.
      - Manually upload it to the Google Play Store from the Google Play Console.
      - Use Expo EAS Submit to upload it to the Google Play Store.
