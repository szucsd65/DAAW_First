const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const equipmentsController = require('../controllers/equipmentsController');
const ratingController = require('../controllers/ratingController');
const adminController = require('../controllers/adminController');

router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/register', authController.registerGet);
router.post('/register', authController.registerPost);
router.get('/logout', authController.logout);

router.get('/', authController.requireAuth, equipmentsController.index);
router.get('/equipments', authController.requireAuth, equipmentsController.list);
router.get('/equipment/:id', authController.requireAuth, equipmentsController.equipmentDetail);

router.get('/equipments/add', authController.requireAuth, equipmentsController.addForm);
router.post('/equipments', authController.requireAuth, equipmentsController.create);

router.post('/equipment/:id/review', authController.requireAuth, ratingController.createReview);
router.get('/myRatings', authController.requireAuth, ratingController.myRatings);

router.get('/topEquipment', authController.requireAuth, ratingController.globalRanking);

router.get('/equipments/:id/edit', authController.requireAuth, equipmentsController.editForm);
router.post('/equipments/:id/edit', authController.requireAuth, equipmentsController.update);

router.get('/admin/equipments', authController.requireAdmin, adminController.adminList);

module.exports = router;
