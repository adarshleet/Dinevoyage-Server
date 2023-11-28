import vendorModel from "../database/vendorModel";
import VendorRepository from "../../usecase/interface/vendoRepository";
import Vendor from "../../domain/vendor";

class vendoRepository implements VendorRepository{
    
    async mobileExistCheck(mobile: string) {
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


    async changeVendorName(vendorId: string, name: string) {
        try {
            const vendorNameChange = await vendorModel.findByIdAndUpdate(vendorId,{$set:{name}})
            return vendorNameChange
        } catch (error) {
            console.log(error)
        }    
    }

    async changeMobile(vendorId: string, mobile: string) {
        try {
            const vendorMobileChange = await vendorModel.findByIdAndUpdate(vendorId,{$set:{mobile}})
            return vendorMobileChange
        } catch (error) {
            console.log(error)
        }
    }

    async changePassword(vendorId: string, password: string) {
        try {
            const passwordChangeStatus = await vendorModel.findByIdAndUpdate(vendorId,{$set:{password}})
            return passwordChangeStatus
        } catch (error) {
            console.log(error)
        }
    }

}

export default vendoRepository