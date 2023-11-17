import vendorModel from "../database/vendorModel";
import VendorRepository from "../../usecase/interface/vendoRepository";
import Vendor from "../../domain/vendor";

class vendoRepository implements VendorRepository{
    
    async mobileExistCheck(mobile: string) {
        console.log(mobile)
        const vendorFound = await vendorModel.findOne({mobile})
        return vendorFound
    }

    async saveVendor(vendor: Vendor) {
        console.log(vendor)
        const newVendor = new vendorModel(vendor)
        await newVendor.save()
        return newVendor
    }


    async emailExistCheck(email: string) {
        const vendorFound = await vendorModel.findOne({email})
        return vendorFound
    }


    async findVendorById(id: string) {
        const vendorFound = await vendorModel.findById(id)
        return vendorFound
    }

}

export default vendoRepository