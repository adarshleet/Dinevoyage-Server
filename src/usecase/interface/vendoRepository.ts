import Vendor from "../../domain/vendor";

interface VendorRepository{
    saveVendor(vendor:Vendor)
    mobileExistCheck(mobile:string)
    emailExistCheck(email:string)

    findVendorById(id:string)
}

export default VendorRepository