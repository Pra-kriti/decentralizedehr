var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home');
    patient = require('../controllers/patient');
    doctor = require('../controllers/doctor');
module.exports = function (app) {
    router.get('/', home.index);
    router.get('/patient/:firstAccount',patient.index);
    router.get('/doctor/:firstAccount',doctor.index);

    router.post('/home/:firstAccount',home.login);
    router.get('/home/:firstAccount/signuppatient',home.signuppatient);
    router.get('/home/:firstAccount/signupdr',home.signupdr);
    router.post('/home/:firstAccount/signuppatient/firstform',home.patientfirstform);
    router.post('/home/:firstAccount/signuppatient/secondform',home.patientsecondform);
    router.post('/home/:firstAccount/signuppatient/thirdform',home.patientthirdform);
    router.post('/home/:firstAccount/signupdr/firstform',home.drfirstform);
    router.post('/home/:firstAccount/signupdr/secondform',home.drsecondform);
    router.post('/home/:firstAccount/signupdr/thirdform',home.drthirdform);
    
    
    router.get('/patient/:firstAccount/allergies', patient.allergies);
    router.post('/patient/:firstAccount/allergiessubmit', patient.allergiessubmit);

    router.get('/patient/:firstAccount/immunization', patient.immunization);
    router.post('/patient/:firstAccount/immunizationsubmit', patient.immunizationsubmit);

    router.get('/patient/:firstAccount/vitalSigns', patient.vitalsigns);
    router.post('/patient/:firstAccount/vitalSignssubmit', patient.vitalsignssubmit);

    router.get('/patient/:firstAccount/surgicalHistory', patient.surgicalhistory);
    router.post('/patient/:firstAccount/patientsurgicalHistorysubmit', patient.surgicalhistorysubmit);

    router.get('/patient/:firstAccount/medications', patient.medications);
    router.post('/patient/:firstAccount/medicationssubmit', patient.medicationssubmit);

    router.get('/patient/:firstAccount/personalDetail', patient.personaldetail);
    router.post('/patient/:firstAccount/personalDetailedit', patient.personalDetailedit);

    router.get('/patient/:firstAccount/reports', patient.reports);
    router.post('/patient/:firstAccount/reportssubmit', patient.reportssubmit);

    router.get('/patient/:firstAccount/sharedoc', patient.sharedoc);
    router.post('/patient/:patientAccount/:drAccount/sharedoc/', patient.retrieveinfo);
    router.get('/patient/:patientAccount/:drAccount/sharedoc/info', patient.share);
    router.get('/patient/:firstAccount/getdoc', patient.getdoc);

    router.get('/doctor/:firstAccount/personalDetail', doctor.personaldetail);
    router.post('/doctor/:firstAccount/personalDetailedit', doctor.personalDetailedit);

    router.post('/doctor/:voterAccount/:candidateAccount/vote', doctor.vote);
    app.use(router);
};