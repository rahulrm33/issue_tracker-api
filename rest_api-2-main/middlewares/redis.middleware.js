const redis_client = require('../redis_connect');


function cacheCheck(req, res, next) {
    const _id = req.params.id
    redis_client.get(_id, (err, data) => {
      if (err) {
        throw err;
      } else {
        // Check cached data is exist.
        if (data != null) {
          // Send cached data.
          console.log('Response is sent from cache with key')
          res.status(200).send(JSON.parse(data));
        } else {
          // If there is no cached data then let leave the caching to the
          // final controller function.
          console.log('Response is sent from cache with key to mongo')
          next();
        }
      }
    })
};

module.exports={
    cacheCheck
}