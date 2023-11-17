const express = require("express");
const router = express.Router();
const {addPerson, allPeople, getPerson, updatePerson, deletePerson} = require('../controllers/personControllers');

router.post('/add', addPerson);
router.get('/all', allPeople);
router.get('/:id',getPerson);
router.put('/update/:id',updatePerson);
router.get('/delete/:id', deletePerson);

module.exports = router;