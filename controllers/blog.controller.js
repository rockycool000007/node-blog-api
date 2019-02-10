/* Initialize redis and create connection */

// const redis = require("redis"),
//       client = redis.createClient();
const Redis = require("ioredis");
client = new Redis(6379, "34.73.193.10 ");
var uuid = require('uuid');

module.exports = {
  /* Methods :
  1. Create a Review
  2. Get all Reviews
  3. Get a specific Review
  4. Delete a Review
  5. Add Comment */
  /* Create Review */
  createReview: (req, res) => {
    const id = uuid.v4() /*req.body.id*/,
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
    const id = req.params.reviewid;
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
    const id = req.params.reviewid;
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

  /* Delete review */
  deleteReview: (req, res) => {
    try {
      client.del(req.params.reviewid, (err, reply) => {
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
    const id = uuid.v4(),
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