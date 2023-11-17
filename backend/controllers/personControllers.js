const Person = require('../models/personModel');
const asyncHandler = require('express-async-handler');



//Endpoint to add new person
const addPerson = asyncHandler(async (req, res) =>{
   try{
    const {lastName, firstName, email, age} = req.body;
    //checking if all inputs are not empty 
    if (!lastName || !firstName || !email){
        return res.status(403).json({
          success: false,
          message: "Not all fields have been entered",
          code: "0x0001",
         });
    }
    //email syntax check
    if (!validateEmail(email)){
        return res.status(400).json({
          success: false,
          message: "Invalid email.",
          code: "0x0002",
        });
    }
    //check if this email exists or not
    const person_email = await Person.findOne({email});
    if(person_email){
        return res.status(400).json({
            success: false,
            message: "Email Already Exists",
            code: "0x0003",
        })
    }
    const person = await Person.create({
        lastName,
        firstName,
        email,
        age,
    });
    res.status(200).send('person add');
   }catch(error){
    res.status(500).send(`An error occurred: ${error.message}`); 
   }

});
//function to test if the email syntax is correct
function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//Endpoint to recover all people
const allPeople = asyncHandler(async (req, res) =>{
   try{
      const people = await Person.find();
      res.json(people);
   }catch(error){
    res.status(500).send(`An error occurred: ${error.message}`); 
   }
});
// Endpoint to retrieve a person by their ID
const getPerson = asyncHandler(async (req, res) =>{
    try{
        const personId = req.params.id;
        const person = await Person.findById(personId);
        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found.",
                code: "0x0004",
            });
        }
        res.json(person);
    }catch(error){
       res.status(500).send(`An error occurred: ${error.message}`); 
    }
});

// Endpoint to update a person
const updatePerson = asyncHandler(async (req, res) =>{
    try{
        const personId = req.params.id;
        // Check if the email already exists for another person
        const emailExists = await Person.findOne({email: req.body.email})
        if(emailExists){
            return res.status(400).json({
                success: false,
                message: "This email is already used by another person.",
                code: "0x0004",
            });
        }
        const person = await Person.findByIdAndUpdate({_id:personId},{
           lastName: req.body.lastName,
           firstName: req.body.firstName,
           email: req.body.email,
           age: req.body.age
        });
        if (!person) {
            return res.status(404).json({ 
                success: false,
                message: "Person not found.",
                code: "0x0004",
            });
        }
        res.status(200).json({
            success: true,
            message: `Person update with success`,
        });
    }catch(error){
       res.status(500).send(`An error occurred: ${error.message}`); 
    }
});
// Endpoint to delete a person
const deletePerson = asyncHandler(async (req, res)=>{
    try{
        const personId = req.params.id;
        const person= await Person.findByIdAndDelete(personId);
        if (!person) {
          return res.status(404).json({ 
            success: false,
            message: "Person not found.",
            code: "0x0004" 
        });
        }
    
        res.status(200).json({
            success: true,
            message: `Person deleted successfully`,
        });

    }catch(error){
       res.status(500).send(`An error occurred: ${error.message}`); 
    }
});
module.exports = {addPerson, allPeople, getPerson, updatePerson, deletePerson};