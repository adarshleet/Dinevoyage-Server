import Vendor from "../../domain/vendor";

interface VendorRepository{
    saveVendor(vendor:Vendor)
    mobileExistCheck(mobile:string)
    emailExistCheck(email:string)
    changeVendorName(vendorId:string,name:string)
    changeMobile(vendorId:string,mobile:string)
    changePassword(vendorId:string,password:string)
    forgotPasswordChange(mobile:string,password:string)

    findVendorById(id:string)
}

export default VendorRepository