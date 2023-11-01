import Vendor from "../../domain/vendor";

interface VendorRepository{
    saveVendor(vendor:Vendor)
    mobileExistCheck(mobile:string)
}

export default VendorRepository