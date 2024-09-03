const express= require("express");
const router = express.Router();
const Admin = require("../models/Admin")
const Category = require("../models/category")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const upload = require("../utils/multerSetup.js")
const {verifyAdminToken} = require("../utils/verifyToken.js")
const Product = require("../models/product")

router.post("/", async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    
    const admin = await Admin.findOne({username: username})
    console.log(admin)
    if(admin){
        console.log("admin found")

        bcrypt.compare(password, admin.password, (err, result) => {
            if(result){
                
                const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.ADMIN_TOKEN_SECRET, { expiresIn: "1h" });
                console.log(token)
                return res.json({ success: true, token: `Bearer ${token}`, message: "Successfully logged in" });
            }
            return res.json({success: false, message: "Could not log in"})
        })

    }
    else{
        return res.json({success: false, message: "Could not log in"})
    }
           
        
})


router.post("/category/add",   upload.single('image'),  async (req, res) => {
    try{
        console.log(req.body);
       const {name, parentCategory} = req.body;
       const p_category = await Category.findOne({name: parentCategory})
       console.log(p_category)
       let new_cat;
       if(p_category){
         new_cat = new Category({name, parentCategory: p_category.id})
       }
       else{
        new_cat = new Category({name})
       }
      
        if(req.body.image != 'undefined'){
        new_cat.image = req.file.filename
        }
        const result = await new_cat.save()
        if(p_category){
            p_category.subcategories.push(result.id);
            await p_category.save()
        }
      
        res.status(200).send({success:true, message: "category added successfully"})
    }
    catch(err){
        res.send({success: false, message: 'could not add the category'})
    }

})

router.post("/product/add", verifyAdminToken, async (req, res) => {
    try{
        console.log(req.body);
       const {name, image, price, parentCategory} = req.body;
       const p_category = await Category.findOne({name: parentCategory})
       console.log(p_category)
       
       if(p_category){
         const new_product = new Product({name, price, image, category: p_category.id})
         const result = await new_product.save()
         p_category.products.push(result.id);
         await p_category.save()
         res.status(200).send({success:true, message: "category added successfully"})
       }
   
    }
    catch(err){
        res.send({success: false, message: 'could not add the category'})
    }

})

module.exports = router
