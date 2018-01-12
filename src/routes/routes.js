const express = require("express");
const router = express.Router();
const register_parent = require("./register_parent");
const login_parent = require('./parent_profile');
const add_designated_adult = require('./add_designated_adult');
const error = require('./error');


router.get('/', (req, res)=>{
  res.render("home");
})

router.get('/school_login_page', (req, res)=>{
  res.render('school_login')
})
router.get('/parent_login_page', (req, res)=>{
  res.render('parent_login')
})

router.get('/user_select', (req, res)=>{
  res.render('user_select.hbs')
})
router.get('/user_select_register', (req, res)=>{
  res.render('user_select_register')
})
router.get('/parent_registration_form', (req, res)=>{
  res.render('parent_registration_form')
})
router.get('/parent_profile', (req, res)=>{
  res.render('parent_profile')
})

router.post('/login_parent', login_parent.post);
router.post('/register_parent', register_parent.post)

router.get('/add_child', (req, res)=>{
  res.render('add_child')
})
router.get('/add_da_page', (req, res)=>{
  res.render('add_da')
})
router.post('/add_da', add_designated_adult.post)

router.use(error.client);
router.use(error.server);
module.exports = router;
