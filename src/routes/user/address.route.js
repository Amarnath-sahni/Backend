import {Router} from "express"
import { authenticate } from "../../middleware/auth.middleware.js";
import { address, getAddress, updateaddress, deleteAddress} from "../../controller/user/address.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { AddressSchema } from "../../validators/address.validators.js";

const router = new Router();

router.post("/address", authenticate, validate(AddressSchema) ,address);
router.post("/getAddress", authenticate,getAddress);
router.post("/updateAddress", authenticate, validate(AddressSchema) ,updateaddress);
router.post("/deleteAddress", authenticate, validate(AddressSchema) ,deleteAddress);

export default router;