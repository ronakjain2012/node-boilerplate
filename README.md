# Welcome to Node Boilerplate! ![enter image description here](https://img.shields.io/badge/Development%20Status-Under%20Development-blueviolet)
This is a full stack web-app boilerplate project with ExpressJS + MongoDB + PUG. It is NOT an out-of-box project. I make it in order to create an up-to-date starter kit which contains all important functions (user signup, login, oauth, profile, ...etc) except the business-logic.

_This is just my personal boilerplate, it may or may not be a good fit for your project(s) but I tried to make it best as much as I can._  Inspired by  [dstroot/skeleton](https://github.com/dstroot/skeleton)  and  [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter)

**If you like my work, please 💸 [donate](https://paypal.me/RonakBokaria?locale.x=en_GB). Thank you!**

## Table of Contents
-   [Features](https://github.com/ronakjain2012/node-boilerplate/#features)
-   [Directory Layout](https://github.com/ronakjain2012/node-boilerplate/#directorylayout)
-   [Prerequisites](https://github.com/ronakjain2012/node-boilerplate/#prerequisites)
-   [Getting Started](https://github.com/ronakjain2012/node-boilerplate/#getting-started)
-   [Obtaining API Keys](https://github.com/ronakjain2012/node-boilerplate/#obtaining-api-keys)
-   [Project Structure](https://github.com/ronakjain2012/node-boilerplate/#project-structure)
-   [List of Packages](https://github.com/ronakjain2012/node-boilerplate/#list-of-packages)
-   [Scripts](https://github.com/ronakjain2012/node-boilerplate/#scripts)
-   [Useful Tools and Resources](https://github.com/ronakjain2012/node-boilerplate/#useful-tools-and-resources)
-   [Recommended Design Resources](https://github.com/ronakjain2012/node-boilerplate/#recommended-design-resources)
-   [Recommended Node.js Libraries](https://github.com/ronakjain2012/node-boilerplate/#recommended-nodejs-libraries)
-   [Recommended Client-side Libraries](https://github.com/ronakjain2012/node-boilerplate/#recommended-client-side-libraries)
-   [Pro Tips](https://github.com/ronakjain2012/node-boilerplate/#pro-tips)
-   [FAQ](https://github.com/ronakjain2012/node-boilerplate/#faq)
-   [How It Works](https://github.com/ronakjain2012/node-boilerplate/#how-it-works-mini-guides)
-   [Cheatsheets](https://github.com/ronakjain2012/node-boilerplate/#cheatsheets)
    -   [ES6](https://github.com/ronakjain2012/node-boilerplate/#-es6-cheatsheet)
    -   [JavaScript Date](https://github.com/ronakjain2012/node-boilerplate/#-javascript-date-cheatsheet)
    -   [Mongoose Cheatsheet](https://github.com/ronakjain2012/node-boilerplate/#mongoose-cheatsheet)
-   [Deployment](https://github.com/ronakjain2012/node-boilerplate/#deployment)
-   [Production](https://github.com/ronakjain2012/node-boilerplate/#production)
-   [Testimonials](https://github.com/ronakjain2012/node-boilerplate/#Testimonials)
-   [License](https://github.com/ronakjain2012/node-boilerplate/#license)


## [Directory Layout](https://github.com/ronakjain2012/node-boilerplate/#directorylayout)

     |-public
	 | |-js
	 | | |-script.js
	 | |-views
	 | | |-nav.pug
	 | | |-index.pug
	 | | |-layout
	 | | | |-footer.pug
	 | | | |-main.pug
	 | | | |-header.pug
	 | |-plugins
	 | | |-holder
	 | | | |-holder.js
	 | | |-bootstrap
	 | | | |-js
	 | | | | |-bootstrap.js
	 | | | |-css
	 | | | | |-bootstrap.css
	 | | |-popper
	 | | | |-popper.min.js
	 | |-css
	 | | |-style.css
	 |-userStorage
	 |-utils
	 | |-globalHelpers.js
	 | |-helper.js
	 | |-apiResponse.js
	 |-locales
	 | |-hi.js
	 | |-en.js
	 | |-fr.js
	 | |-ru.js
	 |-package.json
	 |-index.js
	 |-config
	 | |-db
	 | | |-mongo.js
	 | |-others
	 | | |-winston.js
	 | |-heart.js
	 | |-env
	 | | |-index.js
	 | | |-staging.js
	 | | |-development.js
	 | | |-integration.js
	 | | |-default.js
	 | | |-production.js
	 | |-const
	 | | |-const.js
	 |-a.out
	 |-__doc
	 | |-dirStructure
	 | | |-0.0.1
	 | |-todos
	 | | |-integrations
	 |-.babelrc
	 |-yarn-error.log
	 |-build
	 |-.env
	 |-LICENSE
	 |-.eslintrc.json
	 |-.gitignore
	 |-storage
	 | |-seed
	 | |-logs
	 | | |-waring.log
	 | | |-error.log
	 | | |-morgan
	 | | | |-access.log
	 | | |-log.log
	 | | |-info.log
	 | |-.gitignore
	 | |-migration
	 |-routes
	 | |-index.js
	 | |-api.js
	 | |-web.js
	 |-README.md
	 |-package-lock.json
	 |-app
	 | |-controllers
	 | | |-testController.js
	 | |-models
	 | |-services
	 | | |-error.js
	 | | |-s3.js
	 | | |-log.js
	 |-.env.example
	 |-webpack.config.js
	 |-.prettierrc

## [Testimonials](https://github.com/ronakjain2012/node-boilerplate/#Testimonials)

## [License](https://github.com/ronakjain2012/node-boilerplate/#license)
MIT