const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

// * : app.use
app.use(express.json());
app.use(cors());

// * : Routers
const postRouter = require("./routes/PostRouter");
app.use("/post-router",postRouter);
const commentRouter = require("./routes/CommentRouter");
app.use("/comment-router",commentRouter);
const userRouter = require("./routes/UserRouter");
app.use("/user-router", userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server is running on port 3001");
  });
});
