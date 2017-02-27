let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/enjoyerdb');

//model
let Enjoyer = require('./app/models/enjoyer');

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

let router = express.Router();

router.use((req, res, next) => {
    console.log("Middleware is running");
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/enjoyer')

    .post((req, res) => {

        var enjoyer = new Enjoyer();
        enjoyer.user_details.username = req.body.username;
        enjoyer.user_details.password = req.body.password;
        enjoyer.user_details.nameID = req.body.nameID;
        enjoyer.user_details.userImg = req.body.userImg;
        enjoyer.userState = req.body.userState;
        enjoyer.promoGroup = req.body.promoGroup;
        enjoyer.promoPage = req.body.promoPage;
        enjoyer.active = req.body.active;

        enjoyer.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Enjoyer created!' });
            }
        });

    })
    .get((req, res) => {
        Enjoyer.find((err, enjoyers) => {
            if (err) {
                res.send(err);
            } else {

                res.json(enjoyers);
            }
        });
    });

// select specific id
router.route('/enjoyer/:_id')

    .get((req, res) => {
        Enjoyer.findById(req.params._id, (err, enjoyer) => {
            if (err) {
                res.send(err);
            } else {
                res.json(enjoyer);
            }
        });
    })

    .put((req, res) => {

        // use our bear model to find the bear we want
        Enjoyer.findById(req.params._id, (err, enjoyer) => {

            if (err) {
                res.send(err);
            } else {

                if ((req.body.password != undefined)) {
                    enjoyer.user_details.password = req.body.password;
                }
                if ((req.body.nameID != undefined)) {
                    enjoyer.user_details.nameID = req.body.nameID;
                }
                if ((req.body.userImg != undefined)) {
                    enjoyer.user_details.userImg = req.body.userImg;
                }
                if ((req.body.userState != undefined)) {
                    enjoyer.userState = req.body.userState;
                }
                if ((req.body.promoGroup != undefined)) {
                    enjoyer.promoGroup = req.body.promoGroup;
                }
                if ((req.body.promoPage != undefined)) {
                    enjoyer.promoPage = req.body.promoPage;
                }
                if ((req.body.active != undefined)) {
                    enjoyer.active = req.body.active;
                }

            }

            enjoyer.save((err) => {
                if (err) {
                    res.send(err);
                } else {

                    res.json({ message: 'Enjoyer updated!' });
                }
            });

        });
    })

    .delete((req, res) => {
        Enjoyer.remove({
            _id: req.params._id
        }, (err, enjoyer) => {
            if (err) {
                res.send(err);
            } else {

                res.json({ message: 'Successfully deleted' });
            }
        });
    });

// clear all database
router.route('/enjoyer_clear')

    .delete((req, res) => {
        Enjoyer.remove({}, (err, enjoyer) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Database has been cleared!' });
            }
        });

    });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);