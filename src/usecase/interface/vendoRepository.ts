import Vendor from "../../domain/vendor";

interface VendorRepository{
    saveVendor(vendor:Vendor):Promise<any>
    mobileExistCheck(mobile:string):Promise<any>
    emailExistCheck(email:string):Promise<any>
    changeVendorName(vendorId:string,name:string):Promise<any>
    changeMobile(vendorId:string,mobile:string):Promise<any>
    changePassword(vendorId:string,password:string):Promise<any>
    forgotPasswordChange(mobile:string,password:string):Promise<any>

    findVendorById(id:string):Promise<any>
}

export default VendorRepository