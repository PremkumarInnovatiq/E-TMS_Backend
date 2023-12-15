import { getQueryParams } from "../utilities/helpers";
import InternalEmails from "../models/internalMail";
const mongoose = require('mongoose');

export const sendEmail = async (requestData, userData, userName, userImage) => {
    try {
        const MailData = await InternalEmails.create(requestData);
        return MailData;
    } catch (error) {
        throw new Error('Failed to send mail');
    }
};

export const sendReplyEmail = async (requestData, id) => {
    try {
        const existingData = await InternalEmails.findById(id);
        if (!existingData) {
            throw new Error('Document not found');
        }
        if (!existingData.mail || !Array.isArray(existingData.mail)) {
            existingData.mail = [];
        }
        existingData.mail.push(requestData.body);
        existingData.read = false;
        const updatedMailData = await existingData.save();
        return updatedMailData;
    } catch (error) {
        throw new Error('Failed to send mail');
    }
};

exports.internalEmailGetServices = {
    async getMailsByMailId(queryParams) {
        try {
            let filterValue = queryParams.filterName;
            let regex = new RegExp(filterValue, "i");
            if (queryParams.toStarred || queryParams.fromStarred) {
                const query = {
                    $or: [
                        {
                            "mail.from": { $regex: regex },
                            $or: [
                                { "mail.to": {
                                     $regex: new RegExp(queryParams.to),
                                 }},
                                 {"mail.cc": {
                                     $regex: new RegExp(queryParams.to),
                                 }},
             
                             ],
                            toStatus: 'active',
                            toStarred: true,
                            toArchive:
                            {
                                $exists: false
                            }
                        },
                        {
                            'mail.from': queryParams.from,
                            "mail.fromName": { $regex: regex },
                            $or: [{ fromStatus: 'draft', fromStatus: 'active' }],
                            fromStarred: true,
                            fromArchive: { $exists: false }
                        },
                    ]
                };
                const params = getQueryParams(queryParams, null, true);
                const mails = await InternalEmails.paginate(query, {
                    page: params.page,
                    limit: params.limit,
                    sort: params.sortBy,

                })
                return mails;
            } else if (queryParams.toSpam || queryParams.fromSpam) {
                const query = {
                    $or: [
                        {
                             $or: [
                                { "mail.to": {
                                     $regex: new RegExp(queryParams.to),
                                 }},
                                 {"mail.cc": {
                                     $regex: new RegExp(queryParams.to),
                                 }},
             
                             ],
                            toStatus: 'active', toSpam: true, toArchive: { $exists: false }
                        },
                        {
                            'mail.from': queryParams.from,
                            $or: [{ fromStatus: 'draft', fromStatus: 'active' }],
                            fromSpam: true,
                            fromArchive: { $exists: false }
                        },
                    ]
                };
                const params = getQueryParams(queryParams, null, true);
                const mails = await InternalEmails.paginate(query, {
                    page: params.page,
                    limit: params.limit,
                    sort: params.sortBy,

                })
                return mails;
            } else if (queryParams.to && !queryParams.toImportant) {
                const query = {
                    $or: [
                        { toSpam: false },
                        { toSpam: { $exists: false } },
                    ],
                    $or: [
                       { "mail.to": {
                            $regex: new RegExp(queryParams.to),
                        }},
                        {"mail.cc": {
                            $regex: new RegExp(queryParams.to),
                        }},
    
                    ],

                    "mail.fromName": { $regex: regex },
                    toStatus: queryParams.toStatus,
                    toArchive: { $exists: false },
                };

                const params = getQueryParams(queryParams, null, true);
                const mails = await InternalEmails.paginate(query, {
                    page: params.page,
                    limit: params.limit,
                    sort: params.sortBy,
                })
                return mails;
            } else if (queryParams.from) {
                const params = getQueryParams(queryParams, null, true);
                const query = {
                    'mail.from': queryParams.from,
                    "mail.to": { $regex: regex },
                    fromStatus: queryParams.fromStatus,
                    $or: [
                        { fromSpam: false },
                        { fromSpam: { $exists: false } },
                    ],
                    fromArchive: { $exists: false }
                };
                const mails = await InternalEmails.paginate(query, {
                    page: params.page,
                    limit: params.limit,
                    sort: params.sortBy,
                })
                return mails;
            } else if (queryParams.toImportant == 'true') {
                const query = {
                    $or: [
                        { "mail.to": {
                             $regex: new RegExp(queryParams.to),
                         }},
                         {"mail.cc": {
                             $regex: new RegExp(queryParams.to),
                         }},
     
                     ],
                    "mail.fromName": { $regex: regex },
                    toStatus: queryParams.toStatus,
                    toImportant: queryParams.toImportant,
                    $or: [
                        { toSpam: false },
                        { toSpam: { $exists: false } },
                    ],
                    toArchive: { $exists: false }
                };
                const params = getQueryParams(queryParams, null, true);
                const mails = await InternalEmails.paginate(query, {
                    page: params.page,
                    limit: params.limit,
                    sort: params.sortBy,
                })
                return mails;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async getMailById(id) {
        try {
            const mailDetails = await InternalEmails.findById(id)
            return mailDetails;
        } catch (error) {
            throw error;
        }
    }
};


exports.internalEmailPutServices = {
    async updateMailById(requestData, userData) {
        if (requestData.toImportant) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toImportant: requestData.toImportant } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.fromImportant) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { fromImportant: requestData.fromImportant } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.toStatus) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toStatus: 'inactive' } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.fromStatus) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { fromStatus: 'inactive' } });
            } catch (e) {
                throw e;
            }
        }
        else if (requestData.toArchive) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toArchive: requestData.toArchive } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.fromArchive) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { fromArchive: requestData.fromArchive } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.toStarred || requestData.toStarred === false) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toStarred: requestData.toStarred } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.fromStarred || requestData.fromStarred === false) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { fromStarred: requestData.fromStarred } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.fromSpam || requestData.fromSpam === false) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { fromSpam: requestData.fromSpam } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.toSpam || requestData.toSpam === false) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toSpam: requestData.toSpam } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.toImportant == false) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { toImportant: requestData.toImportant } });
            } catch (e) {
                throw e;
            }
        } else if (requestData.read) {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData.selectedEmailIds } }, { $set: { "mail.$[].read": true } }
                );
            } catch (e) {
                throw e;
            }
        } else {
            try {
                requestData.modifiedBy = userData;
                return await InternalEmails.updateMany({ _id: { $in: requestData } }, { $set: { status: 'inactive' } });
            } catch (e) {
                throw e;
            }
        }
    },
};

exports.internalEmailDeleteServices = {
    async deleteMailsById(requestData) {
        try {
            return await InternalEmails.deleteMany({ _id: { $in: requestData } });
        } catch (e) {
            throw e;
        }
    },
};


