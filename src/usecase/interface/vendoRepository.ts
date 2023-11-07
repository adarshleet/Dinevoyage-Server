import Vendor from "../../domain/vendor";

interface VendorRepository{
    saveVendor(vendor:Vendor)
    mobileExistCheck(mobile:string)
    emailExistCheck(email:string)
}

export default VendorRepository