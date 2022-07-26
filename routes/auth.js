var express = require("express");
var router = express.Router();
var passport = require("passport");
var TwitterStrategy = require("passport-twitter");
var FacebookStrategy = require("passport-facebook");
var InstagramStrategy = require("passport-facebook");
var MagicLinkStrategy = require("passport-magic-link").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;
var PinterestStrategy = require("passport-pinterest-v5").Strategy;
var RedditStrategy = require("passport-reddit").Strategy;
var dotenv = require("dotenv").config();
var domain = process.env.DOMAIN || "https://localhost:3000";
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var features = {
  mail: false,
  facebook: false,
  instagram: false,
  twitter: false,
  google: false,
  youtube: false,
  github: false,
  pinterest: false,
  reddit: false,
};
// Feature Flags
if (
  process.env.MAIL_USER != null &&
  process.env.MAIL_KEY != null &&
  process.env.MAIL_HOST != null &&
  process.env.MAIL_PORT != null
) {
  features.mail = true;
}

if (
  process.env.FACEBOOK_APP_SECRET != null &&
  process.env.FACEBOOK_CLIENT_ID != null
) {
  features.facebook = true;
}

if (
  process.env.INSTAGRAM_APP_SECRET != null &&
  process.env.INSTAGRAM_CLIENT_ID != null
) {
  features.instagram = true;
}

if (
  process.env.TWITTER_APP_ID != null &&
  process.env.TWITTER_CONSUMER_API_KEY != null &&
  process.env.TWITTER_CONSUMER_API_SECRET != null
) {
  features.twitter = true;
}
if (
  process.env.GOOGLE_CLIENT_ID != null &&
  process.env.GOOGLE_CLIENT_SECRET != null
) {
  features.google = true;
}

if (
  process.env.YOUTUBE_CLIENT_ID != null &&
  process.env.YOUTUBE_CLIENT_SECRET != null
) {
  features.youtube = true;
}

if (
  process.env.GITHUB_CLIENT_ID != null &&
  process.env.GITHUB_CLIENT_SECRET != null
) {
  features.github = true;
}

if (
  process.env.PINTEREST_APP_ID != null &&
  process.env.PINTEREST_APP_SECRET != null
) {
  features.pinterest = true;
}
if (
  process.env.REDDIT_APP_ID != null &&
  process.env.REDDIT_APP_SECRET != null
) {
  features.google = true;
}

console.log(features);

// Passport Config
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//////////////////////////////////////////////////////////////////////////////////////// Magic Link (e-mail)
if (features.mail == true) {
  // Magic Link Config
  var sesAccessKey = process.env.MAIL_USER;
  var sesSecretKey = process.env.MAIL_KEY;
  var mailHost = process.env.MAIL_HOST;
  var mailPort = process.env.MAIL_PORT;
  var mailSender = process.env.MAIL_SENDER || process.env.MAIL_USER;
  var mailSecure = process.env.MAIL_SECURE || true;
  passport.use(
    new MagicLinkStrategy(
      {
        secret: process.env.MAGIC_LINK_SECRET,
        userFields: ["email"],
        tokenField: "token",
      },
      (user, token) => {
        console.log(user.email);
        var email = user.email;
        var transporter = nodemailer.createTransport(
          smtpTransport({
            host: mailHost,
            port: mailPort,
            secure: false,
            auth: {
              user: sesAccessKey,
              pass: sesSecretKey,
            },
          })
        );
        var text =
          "To log in, click this link: " +
          domain +
          "/auth/link/callback?token=" +
          token +
          "Your login token is:  " +
          token;
        var html =
          '<br><a href="' +
          domain +
          "/auth/link/callback?token=" +
          token +
          '">Click here to log in. </a>';
        console.log(html);
        var mailOptions = {
          from: mailSender,
          to: email,
          subject: "Your login instructions for " + domain,
          text: text,
          html: html,
        };
        var dumpMailInfo = function (err, info) {
          console.log(err);
          console.log(info);
        };
        let info = transporter.sendMail(mailOptions, dumpMailInfo);
      },
      (user) => {
        return user;
        // return User.findOrCreate({ email: user.email, name: user.name });
      }
    )
  );
  // Magic Link Routes
  router.post(
    "/auth/link",
    passport.authenticate("magiclink", { action: "requestToken" }),
    (req, res) => res.redirect("/check-your-inbox")
  );
  router.get(
    "/auth/link/callback",
    passport.authenticate("magiclink", { action: "acceptToken" }),
    function (req, res) {
      // Successful authentication, redirect home.
      // console.log(req.user);
      var token = req.query.token;
      var queryString = "?t=" + encodeURIComponent(token);
      return res.redirect("/success" + queryString);
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////////// Facebook
if (features.facebook == true) {
  // Facebook Config
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: domain + "/auth/facebook/callback",
      },
      function (token, tokenSecret, profile, cb) {
        var data = {
          token: token,
          tokenSecret: tokenSecret,
          profile: profile,
        };
        //console.log(data);
        return cb(null, data);
      }
    )
  );
  // Facebook Routes
  var facebookScopes =
    "email,pages_show_list,pages_read_engagement,instagram_content_publish,instagram_basic,pages_show_list";
  if (
    process.env.FACEBOOK_SCOPES != null &&
    process.env.FACEBOOK_SCOPES != ""
  ) {
    facebookScopes = process.env.FACEBOOK_SCOPES;
  }
  facebookScopes = facebookScopes.split(",");
  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: facebookScopes })
  );
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      // console.log(req.user);
      var token = req.user.token;
      var secret = req.user.tokenSecret;
      var queryString = "?t=" + encodeURIComponent(token);
      return res.redirect("/success" + queryString);
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////////// Instagram
if (features.instagram == true) {
  // Instagram Config
  passport.use(
    new InstagramStrategy(
      {
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_APP_SECRET,
        callbackURL: domain + "/auth/instagram/callback",
      },
      function (token, tokenSecret, profile, cb) {
        var data = {
          token: token,
          tokenSecret: tokenSecret,
          profile: profile,
        };
        //console.log(data);
        return cb(null, data);
      }
    )
  );
  // Instagram Routes
  var instagramScopes =
    "email,pages_show_list,pages_read_engagement,instagram_content_publish,instagram_basic,pages_show_list";
  if (
    process.env.INSTAGRAM_SCOPES != null &&
    process.env.INSTAGRAM_SCOPES != ""
  ) {
    instagramScopes = process.env.INSTAGRAM_SCOPES;
  }
  instagramScopes = instagramScopes.split(",");
  router.get(
    "/auth/instagram",
    passport.authenticate("facebook", { scope: instagramScopes })
  );
  router.get(
    "/auth/instagram/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req.user);
      var token = req.user.token;
      var secret = req.user.tokenSecret;
      var queryString = "?t=" + encodeURIComponent(token);
      return res.redirect("/success" + queryString);
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////////// Twitter
if (features.twitter == true) {
  // Twitter Config
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_API_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_API_SECRET,
        callbackURL: domain + "/auth/twitter/callback",
      },
      function (token, tokenSecret, profile, cb) {
        var data = {
          token: token,
          tokenSecret: tokenSecret,
          profile: profile,
        };
        //console.log(data);
        return cb(null, data);
      }
    )
  );
  // Twitter Routes
  router.get(
    "/auth/twitter",
    (req, res, next) => {
      var allowedDomains = process.env.ALLOWED_DOMAINS.split(",");
      var redirectDomain = req.query.redirect;
      var allowed = null;
      if (
        redirectDomain != null &&
        redirectDomain != "" &&
        allowedDomains.includes(redirectDomain)
      ) {
        allowed = "Allowed";
      } else {
        allowed = "Not Allowed";
      }
      console.log("Redirect: " + redirectDomain + " " + allowed);
      next(); // pass control to the next handler
    },
    passport.authenticate("twitter")
  );
  router.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      var session = req.session;
      var token = req.user.token;
      var secret = req.user.tokenSecret;
      var queryString =
        "?t=" + encodeURIComponent(token) + "&s=" + encodeURIComponent(secret);
      var redirectPath = "/success";

      console.log("Session: \n");
      console.log(session);
      return res.redirect(redirectPath + queryString);
    }
  );
}
//////////////////////////////////////////////////////////////////////////////////////// Google
if (features.google == true) {
  // Google Config
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: domain + "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        var data = {
          token: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        // console.log(data);
        return cb(null, data);
      }
    )
  );
  // Google Routes
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      var token = req.user.token;
      var refreshToken = req.user.refreshToken;
      var queryString = "?t=" + encodeURIComponent(token);
      /*
       + "&r=" +
      encodeURIComponent(refreshToken); 
      */
      return res.redirect("/success" + queryString);
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////////// Google
if (features.youtube == true) {
  var youtubeScopes = ["https://www.googleapis.com/auth/youtube","https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.upload"]
  if(process.env.YOUTUBE_SCOPES != null && process.env.YOUTUBE_SCOPES != ''){
    youtubeScopes = process.env.YOUTUBE_SCOPES.split(',');
  }

  // YouTube Config
  passport.use(
    new YoutubeV3Strategy(
      {
        clientID: process.env.YOUTUBE_CLIENT_ID,
        clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
        callbackURL: domain + "/auth/youtube/callback",
        scope: youtubeScopes
      },
      function (accessToken, refreshToken, profile, cb) {
        var data = {
          token: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        // console.log(data);
        return cb(null, data);
      }
    )
  );
  // Youtube Routes
  router.get(
    "/auth/youtube",
    passport.authenticate("youtube")
  );
  router.get(
    "/auth/youtube/callback",
    passport.authenticate("youtube", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      var token = req.user.token;
      var refreshToken = req.user.refreshToken;
      var queryString = "?t=" + encodeURIComponent(token);
      /*
       + "&r=" +
      encodeURIComponent(refreshToken); 
      */
      return res.redirect("/success" + queryString);
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////////// Pinterest
if (features.pinterest == true) {
  // Pinterest Config
  var pinterestScopes =
    "user_accounts:read,pins:read,pins:write,boards:write,boards:read";
  if (
    process.env.PINTEREST_SCOPES != null &&
    process.env.PINTEREST_SCOPES != ""
  ) {
    pinterestScopes = process.env.PINTEREST_SCOPES;
  }
  pinterestScopes = pinterestScopes.split(",");
  passport.use(
    new PinterestStrategy(
      {
        clientID: process.env.PINTEREST_APP_ID,
        clientSecret: process.env.PINTEREST_APP_SECRET,
        callbackURL: domain + "/auth/pinterest/callback",
        scope: pinterestScopes,
        state: true,
      },
      function (accessToken, refreshToken, profile, cb) {
        var data = {
          token: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        console.log(data);
        return cb(null, data);
      }
    )
  );
  // Pinterest Routes
  router.get("/auth/pinterest", passport.authenticate("pinterestV5"));
  router.get(
    "/auth/pinterest/callback",
    passport.authenticate("pinterestV5", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.

      var token = req.user.token;
      var refreshToken = req.user.refreshToken;
      var queryString = "?t=" + encodeURIComponent(token);
      +"&r=" + encodeURIComponent(refreshToken);
      // console.log(req.user);
      return res.redirect("/success" + queryString);
    }
  );
}
//////////////////////////////////////////////////////////////////////////////////////// Reddit
if (features.reddit == true) {
  // Reddit Config
  passport.use(
    new RedditStrategy(
      {
        clientID: process.env.REDDIT_APP_ID,
        clientSecret: process.env.REDDIT_APP_SECRET,
        state: true,
        callbackURL: domain + "/auth/reddit/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        var data = {
          token: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        console.log(data);
        return cb(null, data);
      }
    )
  );
  // Reddit Routes
  router.get("/auth/reddit", function (req, res, next) {
    passport.authenticate("reddit", { duration: "permanent" })(req, res, next);
  });
  router.get(
    "/auth/reddit/callback",
    passport.authenticate("reddit", {
      duration: "permanent",
      failureRedirect: "/login",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      var token = req.user.token;
      var refreshToken = req.user.refreshToken;
      var queryString = "?t=" + encodeURIComponent(token);

      +"&r=" + encodeURIComponent(refreshToken);

      return res.redirect("/success" + queryString);
    }
  );
}
//////////////////////////////////////////////////////////////////////////////////////// GitHub
if (features.github == true) {
  // GitHub Config
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: domain + "/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        var data = {
          token: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        console.log(data);
        return cb(null, data);
      }
    )
  );
  // GitHub Routes
  router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  router.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      var token = req.user.token;
      var refreshToken = req.user.refreshToken;
      var queryString = "?t=" + encodeURIComponent(token);
      /*
       + "&r=" +
      encodeURIComponent(refreshToken); 
      */
      return res.redirect("/success" + queryString);
    }
  );
}

module.exports = router;
