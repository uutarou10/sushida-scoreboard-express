var express = require('express');
var sqlite = require('sqlite3').verbose();
var router = express.Router();

var db = new sqlite.Database('./db.sqlite3')

router.get('/score', function(req, res, next) {
  db.all('select * from score order by score desc', function(err, rows) {
    if (err) {
      res.send(500)
    }
    res.send(rows)
  })
})

/*
{
  "name": "uutarou",
  "score": 100
}
 */
router.post('/score', function(req, res, next) {
  if (typeof req.body === 'object' && typeof req.body.name === 'string' && typeof req.body.score === 'number') {
    db.serialize(function () {
      const stmt = db.prepare('insert into score (name, score) values (?, ?)')
      stmt.run([req.body.name, req.body.score], function (err) {
        if (err) {
          res.send(500);
        } else {
          res.send({
            id: this.lastID
          })
        }
      })
    })
  } else {
    res.send(500);
  }
});

/*
{
  "id": 10
}
 */
router.delete('/score', function(req, res, next) {
  if (typeof req.body === 'object' && typeof req.body.id === 'number') {
    db.serialize(function () {
      const stmt = db.prepare('delete from score where id=?')
      stmt.run([req.body.id], function (err) {
        if (err) {
          res.send(500);
        } else {
          res.send(200);
        }
      })
    });
  }
});

module.exports = router;
