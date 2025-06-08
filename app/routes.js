const ObjectID = require('mongodb').ObjectID


module.exports = function(app, db) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/order', function(req, res) {
        res.render('order.ejs');
    });

    // Pizza order endpoints
    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, order: req.body.order}, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/');
      })
    })

    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({_id: ObjectID(req.body._id)}, {
        $set: {
          order:req.body.order 
        }
      }, {
        sort: {_id: -1},
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({_id: ObjectID(req.body._id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

};
