<p align="center">
  <img src="https://user-images.githubusercontent.com/27915933/174158191-d209ecc6-7466-41aa-87e4-fcf60536dffe.png" alt="Logo" width="150px"/>
  <h1 align="center">Campus Booster</h1>
</p>

## What is Campus Booster?
- Campus Booster is a data analytics and management tool for SUPINFO students and higher-up managers.<br/>
- It enables administrators to manage users, student balances, contracts, absence justifications, campuses, courses, plannings and grades.<br/>
- Students are able to look at their grades for each year, access commonly-used tools, consult their planning in real time, justify an absence, and glance at their balance & yearly progression.<br/>
- Teachers and companies can give grades to their students so that they are given a fail or a pass to each module they follow.<br/><br/>

## Online availability

The website is available at this address: https://campusbooster.eu<br/><br/>
## Local install process

- Make sure you have Node.js on your device: [install yarn](https://nodejs.org/en)
- Then install yarn with the Node package manager: `npm install -g yarn`
- Clone the project locally with Git: `git clone https://github.com/CampusBooster/client.git`
- Install mkcert with the package manager of your choice:
  - For Windows: [Chocolatey](https://community.chocolatey.org/packages/mkcert)
  - For MacOS: run `brew install mkcert`
  - For Linux: install certutil with `sudo apt install libnss3-tools`, then run `brew install mkcert`
- Run this command at the root directory: `mkcert -key-file key.pem -cert-file crt.pem localhost`
<br/><br/>

## Run project locally

- `yarn start`

The project will automatically open in your browser.
