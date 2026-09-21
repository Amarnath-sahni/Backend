import expressAsyncHandler from "express-async-handler";
import Adress from "../../models/address.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";

export const address =expressAsyncHandler(async (req, res, next)=>{
    let {userId, addressLine, city, state,pinCode, phone , notes} = req.body;

    let userAddress = await Adress.create({userId, addressLine, city, state,pinCode, phone , notes});
    return new ApiResponse(201, "address save sucessfully", userAddress).send(res);
})

export const getAddress =expressAsyncHandler(async (req, res, next)=>{
    let {pinCode} = req.body;

    let userAddress = await Adress.create({pinCode});
    return new ApiResponse(201, "address save sucessfully", userAddress).send(res);
})

export const getAddresses =expressAsyncHandler(async (req, res, next)=>{

    let userAddress = await Adress.create({});
    return new ApiResponse(201, "address save sucessfully", userAddress).send(res);
})

export const updateaddress = expressAsyncHandler(async(req, res, next)=>{
  const updateUser = await userModel.findByIdAndUpdate(
    req.myUser._id,
    req.body,
    {
      new : true, // return the updated document
      runValidators : true, // validate the updated document against the shemma
    }
  )

  if(!updateUser) next(new CustomError(404, "User not found"));
  new ApiResponse(200, "User Updated Successfully", updateUser).send(res);
})
export const deleteAddress =expressAsyncHandler(async (req, res, next)=>{
})



 