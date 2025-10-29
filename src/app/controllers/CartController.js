const Laptop = require('../models/Laptop');
const Session = require('../models/Session');
const User = require('../models/User');

class CartController {

    //[GET/POST] Check user authorization
    async authorizationChecker(req, res, next){
        try{
            // Case 1 : Not logged in
            const sessionIdCookies = req.cookies.sessionId;
            if(!sessionIdCookies){
                return res.status(401).json({message: "Please login to add to cart!"});
            }
            // Case 2 : Session was expired
            const sess = await Session.findOne({sessionId : sessionIdCookies});
            if(!sess){
                return res.status(401).json({message: "Session expired, please login again!"});
            }
            // Case 3 : User not found
            const user = await User.findOne({_id : sess.userId});
            if(!user){
                return res.status(401).json({message: "User not found, please login again!"});
            }

            req.user = user;
            next();
        }catch(err){
            return res.status(402).json({message : "Caught error when checking authorization"});
        }
    }
    //[GET] Render cart view
    async viewCart(req, res, next){
        try{
            const sessionIdCookies = req.cookies.sessionId;
            const sess = await Session.findOne({sessionId : sessionIdCookies});
            if(sess){
                const user = await User.findOne({_id : sess.userId});
                
                if(user){
                    const laptops = await Laptop.find({_id: {$in: user.cart.map(item => item.laptopid)}})
                    laptops.forEach(laptop =>{
                        const item = user.cart.find(item => item.laptopid.toString() === laptop._id.toString());
                        laptop.amount = item ? item.amount : 1;
                    })
                    return res.render('payment/cart', {user: user, cart: user.cart, laptops: laptops});
                }
            }
            return res.render('payment/cart', {user: {}, cart: {}, laptops: []});
        }catch(err){
            return next(err);
        }
    }

    //[POST] Add product to cart if user logged in
    async addToCart(req, res, next){
        try{
            const user = req.user;
            
            const laptop = await Laptop.findById(req.body.id);
            if (!laptop) {
                return res.status(404).json({ message: "Laptop not found" });
            }
            // => Acceptable case
            const item = user.cart.find(productItem => productItem.laptopid.toString() === laptop._id.toString());
            if(item){
                item.amount += 1;
            }else{
                user.cart.push({laptopid: laptop._id, amount : 1});
            }
            await user.save();            
            return res.status(200).json({ message: "Laptop added to cart" });
            
        }catch(err){
            console.error("AddToCart error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }

    async removeFromCart(req, res, next){
        try{
            const user = req.user;
             // Case 4 : Laptop not found 
            const laptop = await Laptop.findById(req.body.id);
            if (!laptop) {
                return res.status(404).json({ message: "Laptop not found" });
            }
            // => Acceptable case
            const item = user.cart.find(productItem => productItem.laptopid.toString() === laptop._id.toString());
            if(item){
                user.cart = user.cart.filter(item => item.laptopid.toString() !== laptop._id.toString());
            }else{
                return res.status(404).json({ message: "Laptop not found" });
            }
            await user.save();            
            return res.status(200).json({ message: "Laptop removed from cart" });

        }catch(err){
            return res.status(402).json({message : "Caught error"});
        }
    }

    async paymentHandle(req, res, next){
        const user = req.user;
        // => Acceptable case
        const laptops = await Laptop.find({});

        const mappedCart = new Map(
            user.cart.map(item =>[item.laptopid.toString() , item.amount])
        );

        laptops.forEach(laptop =>{
            laptop.amount = mappedCart.get(laptop._id.toString()) || 0;
        })
        var laptopReal = [];
        if(laptops){
            laptopReal = laptops.filter(laptop => laptop.amount > 0);
        }
        res.render('payment/payment', {user, productItems: laptopReal});
    }
}


module.exports = new CartController;