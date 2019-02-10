/* Initialize redis and create connection */

const redis = require("redis"),
      client = redis.createClient();


module.exports = {

  /* Test method */
  test: (req, res) => {
    try {
      res.send("Yay!!!");
    } catch (error) {
      res.send(error);
    }
  },
  
  /* Create Review  */
  create: (req, res) => {
    const id = req.body.id,
      title = req.body.title,
      description = req.body.description;
    try {
      client.hmset(
        id,
        ["title", title, "description", description],
        (err, reply) => {
          if (err) {
            res.send(err);
          } else {
            res.send(reply);
          }
        }
      );
    } catch (err) {
      res.send("Error creaing review");
    }
  },

  /* View Review Details */
  view: (req, res) => {
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


  /* Update review details  */
  update: (req, res) => {
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
  },


  /* Delete review */
  delete: (req, res) => {
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
  }
};
