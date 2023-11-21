const express = require("express");
const router = express.Router();
const {addPerson, allPeople, getPerson, updatePerson, deletePerson, filterByAge} = require('../controllers/personControllers');

router.post('/add', addPerson);
router.get('/all', allPeople);
router.get('/:id',getPerson);
router.put('/update',updatePerson);
router.get('/delete/:id', deletePerson);
router.get('/filter/:age', filterByAge);

module.exports = router;