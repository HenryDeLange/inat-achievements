# Wild Achievements

This project aims to show fun personal achievements based on observations recorded on iNaturalist.

---

## Live Site
[https://henrydelange.github.io/inat-achievements](https://henrydelange.github.io/inat-achievements)

---

## Development

### Setup
`npm install`\
Downloads all dependencies.

### Run
 `npm start`\
Runs the application in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build
 `npm run build`\
Builds the app for production to the `build` folder.\

### Hosting
This page is hosted via GitHub Pages integration.

#### Steps to publish a new hosted version
  1. Make sure the `homepage` property is set in the `package.json` file.
  2. Make sure `gh-pages` is installed under a `devDependencies` in the `package.json` file.
  3. Make sure the `predeploy` and `deploy` scripts are configured in the `package.json` file.
      - If not then add the following:\
        ```
        "scripts": {
            ...
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build",
            ...
        ```
  4. Build the production version using the `npm run predeploy` command.
  5. Deploy the application to GitHub Pages using the `npm run deploy` command.
      - This step will push the application's build artifacts to the `gh-pages` branch.
  6. On GitHub, navigate to the repository's `Settings` and then make sure that `Source` property under the `Pages` category is set to use the `gh-pages` branch.
  7. The new version of the application should be online shortly. Done :)
