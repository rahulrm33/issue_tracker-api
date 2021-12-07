const redis_client = require('../redis_connect');


function cacheCheck(req, res, next) {
    const _id = req.params.id || req.query.status
    redis_client.get(_id, (err, data) => {
      if (err) {
        throw err;
      } else {
        if (data != null) {
          // Send cached data.
          console.log('Response is sent from cache with key')
          res.status(200).send(JSON.parse(data));
        } else {
          console.log('Response is sent from cache with key to mongo')
          next();
        }
      }
    })
};

module.exports={
    cacheCheck
}
