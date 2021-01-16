const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();

// Route Database
const router = jsonServer.router("./db.json");

// Read users file
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

// Body Parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated(email, password) {
  return (
    userdb.users.findIndex((user) => {
      return user.email === email && user.password === password;
    }) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:", req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());
    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;
    //Add new user
    data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);

  //Response
  res.status(200).json({ access_token });
});


// Login
server.get("/auth/login", (req, res) => {
  
  // Get authorization header -> el token
  let codi = req.headers.authorization.split(" ")[1]

  //xtoni - pdt comprovar que és de tipus "Basic" -> LLegir més sobre aquest tema.
  //let tipusAuth = authHeader.slice(0, authHeader.indexOf(" ")).trim();

  // Decode user & password
  let buff = new Buffer.from(codi, "base64");
  let text = buff.toString("ascii");

  let user = text.slice(0, text.indexOf(":")).trim();
  let pswd = text.slice(text.indexOf(":") + 1).trim();

  //console.log(`U:${user}-P:${pswd}-`);

  if (!isAuthenticated(user, pswd)) {
    console.log(`-user:${user},pswd=${pswd}-`);
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }

  // Retorna el token
  const access_token = createToken({ user, pswd });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// it can't start with  /auth
// xtoni Is ? useful?
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
