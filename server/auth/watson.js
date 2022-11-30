const router = require("express").Router();
const app = require("../app");
const fs = require("fs");
const helmet = require("helmet");
// const secure = require("express-secure-only");
const cors = require("cors");
const { IamTokenManager } = require("ibm-watson/auth");
require("dotenv").config({ silent: true });

if (!process.env.SPEECH_TO_TEXT_IAM_APIKEY) {
  console.error(
    "Missing required credentials - see https://github.com/watson-developer-cloud/node-sdk#getting-the-service-credentials"
  );
  process.exit(1);
}

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../../webpack.config");

// enable rate-limiting
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// app.use(secure());
app.enable("trust proxy"); // required to work properly behind Bluemix's reverse proxy
app.use("/", limiter);

const watsonAuthenticator = new IamTokenManager({
  apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY,
});

const compiler = webpack(webpackConfig);

router.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
  })
);

// router.get("/audio", async (req, res, next) => {
//   try {
//     const audio = fs.createReadStream("public/audiofile.flac");
//     res.json(audio);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/token", async (req, res, next) => {
  try {
    const { result } = await watsonAuthenticator.requestToken();
    res.json({
      accessToken: result.access_token,
      url: process.env.SPEECH_TO_TEXT_URL,
    });
  } catch (err) {
    next(err);
  }
  // return watsonAuthenticator.requestToken().then(({ result }) => {
  //   res.json({
  //     accessToken: result.access_token,
  //     url: process.env.SPEECH_TO_TEXT_URL,
  //   });
  // });
});

// Chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server on port 3001 using an included self-signed certificate
// note: this is not suitable for production use
if (!process.env.VCAP_SERVICES) {
  const fs = require("fs");
  const https = require("https");
  const HTTPS_PORT = 3001;

  const options = {
    key: fs.readFileSync(__dirname + "/keys/localhost.pem"),
    cert: fs.readFileSync(__dirname + "/keys/localhost.cert"),
  };
  https.createServer(options, app).listen(HTTPS_PORT, function () {
    console.log("Secure server live at https://localhost:%s/", HTTPS_PORT);
  });
}

module.exports = router;
