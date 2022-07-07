# Project Overview

This is my first major React Application. It utilizes tailwind css for all styling, and is a fan page for The Killers. It was created as a DevMountain Foundations Capstone.

## MVP

The project is intended to allow users to learn about The Killers, listen to brief snippets of their music, and enjoy full playthroughs of covers I have personally created of some of their music. It includes typical navigation features such as dropdowns and navbars. It uses [React Router](https://reactrouter.com/docs/en/v6). It also has a fully functional admin section with authentication manually implemented (using Bcrypt for password hashing and manual database seeding with a key for verification of successful login state on the backend). The admin section allows for CRUD operations on the database to continue adding to the public facing 'music-player' and 'covers' sections without the need to write additional code. Login to the admin dashboard persists until the 'LOGOUT' section is clicked in the dashboard, or until the page is manually refreshed/loaded in a new tab or window. If an admin bookmarks a page in the admin dashboard, they will be redirected to the login screen which, upon successful authentication, will redirect them back to the page they originally intended to visit.

## Other Important Project Information

### Planning

You can view the planning doc [on google docs](https://docs.google.com/document/d/1Uqh2AuGL0GP4Rnbelph28px_zfgFIwO0tccHpdt-w3c/edit?usp=sharing).

### Database Model

The database model is attached as a pdf. The database utilizes Postgres.

### Server

The server was designed in NodeJS and currently utilizes about 20 endpoints.

### Design

You can view the wireframes and style guide for this project [on figma](https://www.figma.com/file/aAwkgiaTzavuDBbbRJcEaA/capstone-design?node-id=0%3A1).

### Production Build

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The production build is contained in a different repo, but essentially reflects the dev environment.

### Disclaimer

The 'covers' section has issues playing on iOS due to an unknown (to me) iOS playback policy. This is not related to the code itself. The site is best enjoyed on desktop, but works perfectly well on mobile, other than the iOS bug on the covers page.