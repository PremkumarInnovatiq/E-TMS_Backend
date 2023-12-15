import AuditDetails from "../../models/audit/audit";
import { getQueryParams } from "../../utilities/helpers";

export const getAllAudits = async (query) => {
  const params = getQueryParams(query, null, true);

  // Extract only the date from createdAt. Purpose for: (filter)
  if (params.filter.createdAt) {
    const startDate = new Date(params.filter.createdAt);
    startDate.setHours(0, 0, 0, 0); 
    const endDate = new Date(params.filter.createdAt);
    endDate.setHours(23, 59, 59, 999); 

    params.filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  const paginatedResults = await AuditDetails.paginate(params.filter, {
    page: params.page,
    limit: params.limit,getQueryParams,
    sort: params.sortBy,
  });
  const populatedData = await AuditDetails.populate(paginatedResults.docs, {
    path: "modifiedBy",
    select: "name last_name email",
  });
  return { ...paginatedResults, docs: populatedData };
};

export const createAudit = async (auditData) => {
  try { 
    const auditRecords = new AuditDetails(auditData);
    const createdAuditData = await auditRecords.save();
    return createdAuditData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};