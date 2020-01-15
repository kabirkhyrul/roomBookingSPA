var express = require('express');
var router = express.Router();
var dbConn = require('../public/javascripts/db');
// display all booking history
router.get('/', function (req, res, next) {

  dbConn.query('SELECT * FROM rooms ORDER BY id desc', function (err, rows) {

    if (err) {
      req.flash('error', err);
      // render to index.ejs
      res.render('index', { rooms: '' });
    } else {
      // render to index.ejs
      res.render('index', {
        rooms: rows,
        title: 'Register',
        name: '',
        booking_date: '',
        checkout_date: '',
        nid: '',
        mobile: '',
        button: 'Register'
      });
    }
  });
});


// add booking
router.post('/add', function (req, res, next) {

  let name = req.body.name;
  let booking_date = req.body.booking_date;
  let checkout_date = req.body.checkout_date;
  let nid = req.body.nid;
  let mobile = req.body.mobile;
  let errors = false;

  if (name.length === 0 || booking_date.length === 0 || checkout_date.length === 0 || nid.length === 0 || mobile.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Please fill all data");
    // render to index with flash message
     res.redirect('/');
  }

  // if no error
  if (!errors) {

    var form_data = {
      name: name,
      booking_date: booking_date,
      checkout_date: checkout_date,
      nid: nid,
      mobile: mobile
    }

    // insert query
    dbConn.query('INSERT INTO rooms SET ?', form_data, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash('error', err)

        // render to index
        res.render('index', {
          name: form_data.name,
          booking_date: form_data.booking_date,
          checkout_date: form_data.checkout_date,
          nid: form_data.nid,
          mobile: form_data.mobile
        })
      } else {
        req.flash('success', 'Booked Successfully');
        res.redirect('/');
      }
    })
  }
})

// edit booking
router.get('/(:id)', function (req, res, next) {

  let id = req.params.id;

  dbConn.query('SELECT * FROM rooms WHERE id = ' + id, function (err, rows, fields) {
    if (err) throw err

    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'Room not found ')
      res.redirect('/')
    }
    // if book found
    else {
      dbConn.query('SELECT * FROM rooms ORDER BY id desc', function (err, results) {

        if (err) {
          req.flash('error', err);
          // render to index.ejs
          res.render('index', { rooms: '' });
        } else {

          // render to index
          res.render('index', {
            rooms: results,
            title: 'Edit Booking',
            id: rows[0].id,
            name: rows[0].name,
            booking_date: rows[0].booking_date.toDateString(),
            checkout_date: rows[0].checkout_date.toDateString(),
            nid: rows[0].nid,
            mobile: rows[0].mobile,
            button: 'Update Booking'
          })
        }
      });

    }
  })
})

// update booking data
router.post('/update/:id', function (req, res, next) {

  let id = req.params.id;
  let name = req.body.name;
  let booking_date = req.body.booking_date;
  let checkout_date = req.body.checkout_date;
  let nid = req.body.nid;
  let mobile = req.body.mobile;
  let errors = false;

  if (name.length === 0 || booking_date.length === 0 || checkout_date.length === 0 || nid.length === 0 || mobile.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Please fill all data");
    dbConn.query('SELECT * FROM rooms ORDER BY id desc', function (err, results) {

      if (err) {
        req.flash('error', err);
        // render to views/index.ejs
        res.render('index', { rooms: '',title: 'Register', button: 'Register'});
      } else {

        // render to index
        res.render('index', {
          rooms: results,
          title: 'Edit Booking',
          id: rows[0].id,
          name: rows[0].name,
          booking_date: rows[0].booking_date,
          checkout_date: rows[0].checkout_date,
          nid: rows[0].nid,
          mobile: rows[0].mobile
        })
      }
    });
    // render to index with flash message
    res.render('index', {
      title: 'Register',
      name: name,
      booking_date: booking_date,
      checkout_date: checkout_date,
      nid: nid,
      mobile: mobile,
      button: 'Register'
    })
  }

  // if no error
  if (!errors) {

    var form_data = {
      name: name,
      booking_date: booking_date,
      checkout_date: checkout_date,
      nid: nid,
      mobile: mobile
    }

    // update query
    dbConn.query('UPDATE rooms SET ? WHERE id = ' + id, form_data, function (err, result) {
      //if(err) throw err
      if (err) {
        // set flash message
        req.flash('error', err)
        // render to index
        res.render('index', {
          id: req.params.id,
          name: form_data.name,
          booking_date: form_data.booking_date,
          checkout_date: form_data.checkout_date,
          nid: form_data.nid,
          mobile: form_data.mobile,
          title: 'Register',button: 'Register'
        })
      } else {
        req.flash('success', 'Booking Updated');
        res.redirect('/');
      }
    })
  }
})

// delete booking
router.get('/delete/(:id)', function (req, res, next) {

  let id = req.params.id;

  dbConn.query('DELETE FROM rooms WHERE id = ' + id, function (err, result) {
    //if(err) throw err
    if (err) {
      // set flash message
      req.flash('error', err)
      // redirect to index page
      res.redirect('/')
    } else {
      // set flash message
      req.flash('success', 'Booking deleted!')
      // redirect to index page
      res.redirect('/')
    }
  })
})

module.exports = router;