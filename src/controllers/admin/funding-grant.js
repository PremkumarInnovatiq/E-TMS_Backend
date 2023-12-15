import {
    createFundingGrant,
    getFundingGrantById,
    updateFundingGrant,
    deleteFundingGrant,
    getAllFundingGrants
} from '../../services/funding-grant';

export const createFundingGrantController = async (req, res, next) => {
    try {
        const grantData = req.body;

        const createdGrant = await createFundingGrant(grantData);

        res.status(201).json({ success: true, message: 'Funding Grant created successfully', data: createdGrant });
    } catch (err) {
        next(err);
    }
};

export const getFundingGrantByIdController = async (req, res, next) => {
    try {
        const grantId = req.params.id;

        const fundingGrant = await getFundingGrantById(grantId);
        if (!fundingGrant) {
            return res.status(404).json({ message: 'Funding Grant not found' });
        }
        res.status(200).json({ success: true, data: fundingGrant });
    } catch (err) {
        next(err);
    }
};

export const updateFundingGrantController = async (req, res, next) => {
    try {
        const grantId = req.params.id;
        const updateData = req.body;

        const updatedGrant = await updateFundingGrant(grantId, updateData);

        res.status(200).json({ success: true, message: "Funding Grant updated successfully", data: updatedGrant });
    } catch (err) {
        next(err);
    }
};

export const deleteFundingGrantController = async (req, res, next) => {
    try {
        const grantId = req.params.id;

        const deletedGrant = await deleteFundingGrant(grantId);

        res.status(200).json({ success: true, message: "Funding Grant deleted successfully", data: deletedGrant });
    } catch (err) {
        next(err);
    }
};

export const getAllFundingGrantsController = async (req, res, next) => {
    try {
        const fundingGrants = await getAllFundingGrants();

        res.status(200).json({ success: true, data: fundingGrants });
    } catch (err) {
        next(err);
    }
};