const User = require ("../models/userModel");
const ErrorResponse = ("../utils/errorResponse");

exports.signup = async (req , res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne ({ email });

    if (userExist){
        return next (new ErrorResponse ("email already registerd", 400));
    }
    try {
        const user = User.create(req.body);
        res.status(201).json({
            success :true,
            user
        })

    }catch(error){
    next(error);
    }

}