<h1 align="center">PlatformKit Auth</h1>

<p align="center">
Open-Source, Self-Hosted, Standalone Authentication/Single Sign-On (SSO) Solution
</p>

**Connects with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Email-ebf5fb?style=for-the-badge&logo=minutemailer"/>
<img src="https://img.shields.io/badge/Google-ebf5fb?style=for-the-badge&logo=google"/>
<img src="https://img.shields.io/badge/Github-ebf5fb?style=for-the-badge&logo=GitHub&logoColor=000"/>
<img src="https://img.shields.io/badge/Facebook-ebf5fb?style=for-the-badge&logo=facebook"/>
<img src="https://img.shields.io/badge/Instagram-ebf5fb?style=for-the-badge&logo=instagram"/>
<img src="https://img.shields.io/badge/Twitter-ebf5fb?style=for-the-badge&logo=twitter"/>
<img src="https://img.shields.io/badge/Reddit-ebf5fb?style=for-the-badge&logo=reddit"/>
<img src="https://img.shields.io/badge/Pinterest-ebf5fb?style=for-the-badge&logo=Pinterest&logoColor=red"/>
</p>

**Works with:** <br>
<p float="left">
<img src="https://img.shields.io/badge/next.js-ebf5fb?style=for-the-badge&logo=nextdotjs&logoColor=000"/>
<img src="https://img.shields.io/badge/nuxt.js-ebf5fb?style=for-the-badge&logo=nuxtdotjs"/>
<img src="https://img.shields.io/badge/Laravel-ebf5fb?style=for-the-badge&logo=laravel"/>
</p>

**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Express.js-ebf5fb?style=for-the-badge&logo=express&logoColor=000" />
<img src="https://img.shields.io/badge/Passport.js-ebf5fb?style=for-the-badge&logo=passport" />
<img src="https://img.shields.io/badge/Vue.js-ebf5fb?style=for-the-badge&logo=vuedotjs" />
<img src="https://img.shields.io/badge/Bootstrap-ebf5fb?style=for-the-badge&logo=bootstrap"/>
</p>

**Deploy with:** <br> 
<p float="left">
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" />
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge"/><img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

<div align="center">
    <img src="docs/images/screenshot.png" style="border-radius:4px; margin:auto;max-width:300px;"  width="400"/>
</div>

## Features

- Single Sign-On & passwordless login for any app or framework
- Beautiful, minimal UI included out of the box
- UI can be easily customized
- Additional SSO platforms can be easily added

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/auth pk-auth
```

Go to the project directory

```bash
  cd pk-auth
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

A local instance is now running at `https://localhost:3000`

## Configuration

Before use, you will need to add the following environment variables to your .env file

```env
# Environment
ENVIRONMENT=development
SESSION_SECRET=xxxxx

# Branding
LOGO=https://www.example.com/logo.png

# Repository for custom UI/Routes
REPO=https://www.github.com/{username}/{repo}
BUILD_COMMAND="npm run build"
UI_DIRECTORY="dist"
ROUTES_DIRECTORY="routes"
DEV_PATH=localhost:4000

# Redirects
ALLOWED_DOMAINS=https://localhost:4000,https://localhost:3000

# E-mail
MAGIC_LINK_SECRET=xxxxx
MAIL_USER=user@example.com
MAIL_SENDER=user@example.com
MAIL_KEY=password
MAIL_HOST=smtp.xxx.xxx
MAIL_PORT=587

# Facebook
FACEBOOK_CLIENT_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_SCOPES=email,pages_show_list,pages_read_engagement,instagram_content_publish,instagram_basic,pages_show_list

# Twitter
TWITTER_APP_ID=
TWITTER_CONSUMER_API_KEY=
TWITTER_CONSUMER_API_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Pinterest 
PINTEREST_APP_ID=
PINTEREST_APP_SECRET=
PINTEREST_SCOPES=user_accounts:read,pins:read,pins:write,boards:write,boards:read

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Integrating with your app / website

Embed the app in an iframe within your website/app. The end-user will go through the login flow entirely through the embedded endpoint. If the login is successful, the user will be redirected to a `/succcess` endpoint where the `token` and a `secret` are represented as the `t` and `s` URL query parameters.

Example:

```
https://localhost:3000/success?t=abcdefg&s=1234567
```

Using the Javascript framework/method of your choice, you can monitor the iframe for the presence of this information, and scrape it/close the iframe accordingly when it appears.

## Deployment

To deploy to the cloud, simply click one of the buttons below.

<a href="https://render.com/deploy?repo=https://github.com/platform-kit/auth" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> </a> <a href="https://heroku.com/deploy?template=https://github.com/platform-kit/auth" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/auth/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a>
