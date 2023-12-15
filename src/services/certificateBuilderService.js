import CertificateBuilder from "../models/certificates/certificate-builder";
import CertificateFile from "../models/certificates/certificate-file";
import { getQueryParams } from "../utilities/helpers";

exports.createCertificate = async CertificateBuilderData => {
  try {
    const newCertificate = new CertificateBuilder(CertificateBuilderData);
    const createdCertificate = await newCertificate.save();
    return createdCertificate;
  } catch (error) {
    throw new Error("Failed to create Certificate.");
  }
};

exports.getAllCertificatesBuilt = {
  async getAllCertificatesBuilt(query) {
    const params = getQueryParams(query, null, true);
    return await CertificateBuilder.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy
    });
  }
};
exports.getCertificateList = {
  
  async getCertificateList(query) {
    const params = getQueryParams(query, null, true);
    return await CertificateFile.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy
    });
  }
};


exports.getCertificateBuilderById = async CertificateBuilderId => {
  try {
    const Certificate = await CertificateBuilder.findById(CertificateBuilderId);
    if (!Certificate) {
      throw new Error("Certificate not found.");
    }
    return Certificate;
  } catch (error) {
    throw new Error("Failed to retrieve Certificate.");
  }
};

exports.updateCertificateBuilder = async (CertificateBuilderId, updateData) => {
  try {
    const updatedCertificate = await CertificateBuilder.findByIdAndUpdate(
      CertificateBuilderId,
      updateData,
      {
        new: true
      }
    );
    if (!updatedCertificate) {
      throw new Error("Certificate not found.");
    }
    return updatedCertificate;
  } catch (error) {
    throw new Error("Failed to update Certificate.");
  }
};

exports.deleteCertificateBuilder = async CertificateBuilderId => {
  try {
    const deletedCertificate = await CertificateBuilder.findByIdAndDelete(
      CertificateBuilderId
    );
    if (!deletedCertificate) {
      throw new Error("Certificate not found.");
    }
    return deletedCertificate;
  } catch (error) {
    throw new Error("Failed to delete Certificate.");
  }
};
