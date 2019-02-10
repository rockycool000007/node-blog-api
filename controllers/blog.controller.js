/* Initialize redis and create connection */

// const redis = require("redis"),
//       client = redis.createClient();
const Redis = require("ioredis");
client = new Redis();

module.exports = {

  /* Create Review  */
  createReview: (req, res) => {
    const id = req.body.id,
      title = req.body.title,
      content = req.body.content,
      author = req.body.author;

      try {
        client.hmset(
          id, ["title", title, "content", content, "author", author],
          (err, reply) => {
            if (err) {
              res.send(err)
            } else {
              res.send(reply);
            }
          }
        );
      } catch (err) {
        res.send("Error creating review");
      }
  },

  /* View All Review */
  getAllReview: (req, res) => {
    const id = req.params.id;
    try {
      client.hgetall(id, (err, reply) => {
        if (err) {
          res.send(err);
        } else {
          res.send(reply);
        }
      });
    } catch (err) {
      res.send("Error getting review");
    }
  },
  
  /* View Review Details */
  getReview: (req, res) => {
    const id = req.params.id;
    try {
      client.hgetall(id, (err, reply) => {
        if (err) {
          res.send(err);
        } else {
          res.send(reply);
        }
      });
    } catch (err) {
      res.send("Error getting review");
    }
  },

  test: (req, res) => {
    
    try {
      // client.set("testkey", "testing");
      // var testval = client.get("testkey");
      res.send("Yay!!!" + testval);
    } catch (error) {
      res.send(error);
    }
  },

  /* Update review details  */
  /*updateReview: (req, res) => {
    const id = req.params.id;
    result = [];
    for (const i in req.body) {
      result.push(i, req.body[i]);
    }

    try {
      client.hmset(id, result, (err, reply) => {
        if (err) {
          res.send(err);
        } else {
          res.send(reply);
        }
      });
    } catch (err) {
      res.send("Error updating review");
    }
  },*/


  /* Delete review */
  deleteReview: (req, res) => {
    try {
      client.del(req.params.id, (err, reply) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Review deleted successfully" });
        }
      });
    } catch (err) {
      res.send("Error deleting review");
    }
  },
  
  /* Create Comment */
  createComment: (req, res) => {
    const id = req.body.id,
      reviewid = req.body.reviewid,
      comment = req.body.comment,
      author = req.body.author;

      try {
        client.hmset(
          id, ["title", title, "content", content, "author", author],
          (err, reply) => {
            if (err) {
              res.send(err)
            } else {
              res.send(reply);
            }
          }
        );
      } catch (err) {
        res.send("Error creating comment");
      }
  }
};
