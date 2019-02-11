/* Initialize redis and create connection */

// const redis = require("redis"),
//       client = redis.createClient();
const Redis = require("ioredis");
client = new Redis(6379, "34.73.193.10");
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
    const id = "rev-" + uuid.v4(),
      title = req.body.title,
      content = req.body.content,
      author = req.body.author;

      try {
        var reviewPost = JSON.stringify(req.body);
        client.set(id, reviewPost);
        res.send("Review created Successfully");
      } catch (err) {
        res.send("Error creating review");
      }
  },

  /* View All Review */
  getAllReview: async (req, res) => {
    try {
      var obj = [];
      client.keys('rev-*').then(function (keys) {
        // Use pipeline instead of sending one command each time to improve the performance.
        var pipeline = client.pipeline();
        
        keys.forEach(async (key) => {
          //pipeline.del(key);
          // var reply = await client.get(key);
          //var reply = await pipeline.get(key);

          var promise = client.pipeline().get(key).exec();
          promise.then(async (result) => {
            //var test = result;
            await obj.push(result);
            return res.send(obj);
            ////res.send(result);
          });

          // await obj.push(reply);
          // await res.send(obj);
        });
        
        return pipeline.exec();
      });
    } catch (err) {
      res.send("Error getting review");
    }
  },
  
  /* View Review Details */
  getReview: async (req, res) => {
    const id = req.params.reviewid;
    try {
      var reply = await client.get(id);
      res.send(reply);
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
    const id = "com-" + uuid.v4(),
      reviewid = req.body.reviewid,
      comment = req.body.comment,
      author = req.body.author;

      try {
        client.exists(reviewid).then(review => { review.del(reviewid) });
        var reviewPost = JSON.stringify(req.body);
        client.set(reviewid, reviewPost);
        res.send("Comment added Successfully");
      } catch (err) {
        res.send("Error creating comment");
      }
  }
};