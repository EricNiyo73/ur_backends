"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("@babel/polyfill");
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _userRoute = _interopRequireDefault(require("./Route/userRoute"));
var _newsRoute = _interopRequireDefault(require("./Route/newsRoute"));
var _eventRoute = _interopRequireDefault(require("./Route/eventRoute"));
var _AdminRoute = _interopRequireDefault(require("./Route/AdminRoute"));
var _bookUseRoute = _interopRequireDefault(require("./Route/bookUseRoute"));
var _commentRoute = _interopRequireDefault(require("./Route/commentRoute"));
var _subscribeRoute = _interopRequireDefault(require("./Route/subscribeRoute"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const {
  PORT
} = process.env;
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
_mongoose.default.Promise = global.Promise;
_mongoose.default.set("strictQuery", true);
_mongoose.default.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Succesfully connected to the database");
}).catch(err => {
  console.log('something went wrong', err);
  process.exit();
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
// =======================swagger docs==========================
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API documentation',
      version: '1.0.0',
      description: `<h1>This is API  which deals with Events,News and Facilities booking in UR Huye Campus</h2>
                            <h3>Authors</h3>
                            <ol>
                            <li><a href="https://github.com/EricNiyo73">Mr Eric N</a></li>
                            <li><a href="https://github.com/utiheba-happy-janvier">Happy Janviere</a></li>
                            </ol>`
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          name: 'Authorization',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [{
      url: 'https://urbackend.onrender.com'
    }]
  },
  apis: ['./src/Docs/*.js']
};
const specs = (0, _swaggerJsdoc.default)(options);

// routes
app.use('/user', _userRoute.default);
app.use('/news', _newsRoute.default);
app.use('/events', _eventRoute.default);
app.use('/admin', _AdminRoute.default);
app.use('/comment', _commentRoute.default);
app.use('/subscribe', _subscribeRoute.default);
app.use('/userbooking', _bookUseRoute.default);
app.use('/docsdocs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
app.get('/', (req, res) => {
  return res.json({
    message: "Welcome  I am testing again"
  });
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map