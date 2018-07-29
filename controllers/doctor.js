var Models = require('../models');
module.exports = {
    index: function (req, res) {
        var viewModel = {
            dr: {},
            validationList: [],
        }
        Models.Doctor.count({}, function (err, count) {
            console.log("Number of doctors:", count);
            if (count <= 3) {
                Models.Doctor.update({
                    'ethAddr': req.params.firstAccount
                }, {
                    $set: {
                        'validDoc': 'true'
                    }
                }, function (err, result) {
                    if (err) throw err;
                });
            }
            Models.Doctor.find(function (err, doctors) {
                if (err) {
                    throw err;
                }
                for (index = 0; index < doctors.length; ++index) {
                    if (doctors[index].validDoc === false) {
                        viewModel.validationList.push(doctors[index]);
                        console.log(viewModel.validationList);
                    }
                }
            });
            Models.Doctor.findOne({
                ethAddr: {
                    $regex: req.params.firstAccount
                }
            }, function (err, doctor) {
                validity = doctor.validDoc;
                console.log(doctor.validDoc);
                viewModel.dr = doctor;
                if (validity === true) {
                    res.render('drdashboard', viewModel);
                } else {
                    res.send('ya voting ko status dekhaune page hunexa');
                }
            });
        });


    },
    personaldetail: function (req, res) {
        var viewModel = {
            dr: {}
        };
        Models.Doctor.findOne({
            'ethAddr': {
                $regex: req.params.firstAccount
            }
        }, function (err, doctor) {
            if (err) {
                throw err;
            }
            if (!err && doctor) {
                console.log(doctor);
                viewModel.dr = doctor;
                res.render('personalDetails', viewModel);
            }
        });
    },
    personalDetailedit: function (req, res) {

        Models.Doctor.update({
            'ethAddr': req.params.firstAccount
        }, {
            $set: {
                'personalDetail': {
                    'firstName': req.body.firstname,
                    'middleName': req.body.middlename,
                    'lastName': req.body.lastname,
                    'gender': req.body.gender,
                    'dob': req.body.dob,
                    'address': req.body.address,
                    'contact': req.body.contact,
                    'specializationDesc': req.body.specializationDesc,
                    'nmc': req.body.nmc,
                    'hospitals': req.body.hospitals
                    // 'profilePic':req.body.dose
                }
            }
        }, function (err, result) {
            if (err) throw err;
        }, false, true);
        res.redirect('/doctor/' + req.params.firstAccount);
    },
    vote: function (req, res) {
        let message={
            msg:""
        }
        Models.Doctor.findOne({
            'ethAddr': {
                $regex: req.params.candidateAccount
            }
        }, function (err, candidate) {
            if (err) {
                throw err;
            }

            if (!err && candidate) {
               
                var threshold;
                
                Models.Doctor.update({
                    'ethAddr': req.params.candidateAccount
                }, {
                    $set: {
                        'voteCount': candidate.voteCount + 1
                    }
                    
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                }, false, true);

                Models.Doctor.update({
                    'ethAddr': req.params.voterAccount
                }, {
                    $addToSet: {
                        'votedAccounts': {
                            'acc': req.params.candidateAccount
                        }
                    }
                    
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                }, false, true);

                
                Models.Doctor.find({
                    'validDoc': true}).count({}, function (err, count) {
                    threshold = Math.floor(count *.50);
                    console.log("No of valid dr:",count);
                    console.log("Threshold value:",threshold);
                    if (candidate.voteCount >= threshold) {
                        Models.Doctor.update({
                            'ethAddr': req.params.candidateAccount
                        }, {
                            $set: {
                                'validDoc': true
                            }
                        }, function (err, result) {
                            if (err) {
                                throw err;
                            }
                        }, false, true);

                    }

                });
                res.send({
                    msg: 'Your vote has been received. Thank You',
                });
            }
        });

    }
};