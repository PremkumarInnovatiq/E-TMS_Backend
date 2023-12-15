import FundingGrant from "../models/funding-grant";

export const createFundingGrant = async (grantData) => {
    try {
        const fundingGrant = new FundingGrant(grantData);
        const createdGrant = await fundingGrant.save();
        return createdGrant;
    } catch (error) {
        throw new Error('Failed to create funding grant.');
    }
}

export const getFundingGrantById = async (grantId) => {
    try {
        const fundingGrant = await FundingGrant.findById(grantId);
        if (!fundingGrant) {
            throw new Error('Funding grant not found.');
        }
        return fundingGrant;
    } catch (error) {
        throw new Error('Failed to get funding grant.');
    }
}

export const updateFundingGrant = async (grantId, updateData) => {
    try {
        const fundingGrant = await FundingGrant.findByIdAndUpdate(grantId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!fundingGrant) {
            throw new Error('Funding grant not found.');
        }
        return fundingGrant;
    } catch (error) {
        throw new Error('Failed to update funding grant.');
    }
}

export const deleteFundingGrant = async (grantId) => {
    try {
        const deletedGrant = await FundingGrant.findByIdAndDelete(grantId);
        if (!deletedGrant) {
            throw new Error('Funding grant not found.');
        }
        return deletedGrant;
    } catch (error) {
        throw new Error('Failed to delete funding grant.');
    }
}


export const getAllFundingGrants = async () => {
    try {
        const fundingGrants = await FundingGrant.find();
        return fundingGrants;
    } catch (error) {
        throw new Error('Failed to get all funding grants.');
    }
};