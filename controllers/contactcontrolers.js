const asyncHandler=require("express-async-handler");

const mongoose = require("mongoose");

const contact=require("../models/contactmodel")

//get all contacts
//@acces private

const getcontacts =asyncHandler(async(req,res)=>{
    const contacts = await contact.find({user_id: req.user.id});
    res.status(200).json({contacts});
});


//create contact
//@acces private

const createcontact= asyncHandler(async(req,res)=>{
    console.log("the request is :" ,req.body
    );
    const {UserName,Email,Phone}= req.body;
    if (!UserName || !Email || !Phone){
        res.status(400);
        throw new Error("All are mandatory");
        
    }
    const newcontact=await contact.create({
        UserName,
        Email,
        Phone,
        user_id:req.user.id
    })
    
    res.status(200).json(newcontact);
});

//update contact
//@acces private

const updatecontact = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const contactt = await contact.findById(req.params.id);

    if (!contactt) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contactt.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's contacts");
    }

    const updatedcontact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedcontact);
});

// delete contact
//@acces private

const deletecontact = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const deletedcontact = await contact.findById(req.params.id);

    if (!deletedcontact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (deletedcontact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user's contacts");
    }

    await deletedcontact.deleteOne();

    res.status(200).json(deletedcontact);
});

// get contact
//@acces private

const getcontact = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const contactt = await contact.findById(req.params.id);

    if (!contactt) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contactt);
});

module.exports={getcontact,getcontacts,updatecontact,deletecontact,createcontact}
