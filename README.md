# Wild Achievements

This project aims to show fun personal achievements based on observations recorded on iNaturalist.

---

## Live Site
[https://wild-achievements.mywild.co.za](https://wild-achievements.mywild.co.za)\
or\
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

#### _Custom Subdomain_
The custom subdomain `wild-achievements.mywild.co.za` has been configured on GitHub, as specified in the `CNAME` file. As a result the `homepage` property is set in the `package.json` file should be `http://HenryDeLange.github.io/` instead of `http://HenryDeLange.github.io/inat-achievements` when using the GitHub IO domain.

#### _GitHub Action automatically publish a new hosted version_
The GitHub Action defined in `./.github/workflows/deploy-to-pages.yml` will run automatically when code is committed into the `master` branch, resulting in the latest code in the branch being available online.

#### _Manual steps to publish a new hosted version_
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
