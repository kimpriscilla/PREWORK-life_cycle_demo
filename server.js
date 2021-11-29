const {
  syncAndSeed,
  models: { User },
} = require("./db");

const express = require("express");
const app = express();
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/assets", express.static(path.join(__dirname, "assets"))); //for stylinhg css ;
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html"))); //! our main page!

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        attributes: {
          exclude: ["bio"], //!finds all users but excludes the big bio
        },
      })
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.id));
  } catch (error) {
    next(error);
  }
});

const start = async () => {
  try {
    await syncAndSeed();
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
