const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

// router.get("/",(req,res)=>{
//     res.send("this is testing routes");
// });


// get the products data

router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await products.find();
        console.log(productsdata + "data mila hain");
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});


// register the data
router.post("/register", async (req, res) => {
    // console.log(req.body);

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill the all details" });
        console.log("no data available");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" })
        } else {

            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            // yaha pe hasing krenge

            const storedata = await finalUser.save();
            // console.log(storedata);
            res.status(201).json(storedata);
        }

    } catch(error) {
        // console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }

});



// login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    };

    try {

        const userlogin = await USER.findOne({ email: email });
//         console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch);

            const token = await userlogin.generatAuthtoken();

               res.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });

            if (!isMatch) {
                res.status(400).json({ error: "invalid details" });
            } else {
                
                // const token = await userlogin.generatAuthtoken();
                // console.log(token);

                res.status(201).json(userlogin);
                // res.status(201).json(userlogin);
            }

         } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        // console.log("error the bhai catch ma for login time" + error.message);
    }
});

// getindividual

router.get("/getproductsone/:id", async(req, res)=> {

    try {
        const { id } = req.params;
        // console.log(id);

        const individualdata = await products.findOne({ id: id });
        // console.log(individual + "individual data");

        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
});


// adding the data into cart
router.post("/addcart/:id", authenicate, async (req, res) => {

    try {
        // console.log("perfect 6");
        const { id } = req.params;
        const cart = await products.findOne({ id: id });
        console.log(cart + "cart value ");

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact);


        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData);
            console.log(Usercontact);
            res.status(201).json(Usercontact);
        }else {
            res.status(401).json({error: "invalid user"});
        }
    } catch (error) {
        res.status(401).json({error: "invalid user"});
    }
});


// get data into the cart
router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        console.log(buyuser + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});



// get user is login or not
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await User.findOne({ _id: req.userID });
        // console.log(validuserone + "user hain home k header main pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

// for userlogout

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("Amazonweb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});

// item remove ho rhi hain lekin api delete use krna batter hoga
// remove iteam from the cart

router.delete("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(req.rootUser);
    }
});


module.exports = router;