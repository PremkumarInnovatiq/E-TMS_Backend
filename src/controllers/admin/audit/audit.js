import { getAllAudits, createAudit } from "../../../services/audit/audit"


export const createAuditController = async (req, res, next) => {
    try {
        const auditData = req.body;
        const createdAudit = await createAudit(auditData);
        res
            .status(201)
            .json({
                success: true,
                message: "Audit saved successfully",
                data: createdAudit,
            });
    } catch (error) {
        console.log(error, "error")
        res.status(500).json({ error: error.message });
    }
};


export const getAuditController = async (req, res) => {
    try {
        const audits = await getAllAudits(req.query);
        res.status(200).json({ success: true, data: audits });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};