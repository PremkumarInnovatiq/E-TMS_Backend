import {
  createCertificate,
  getAllCertificatesBuilt,
  getCertificateBuilderById,
  updateCertificateBuilder,
  deleteCertificateBuilder,
  getCertificateList
} from "../../services/certificateBuilderService";

export const createCertificateBuilder = async (req, res, next) => {
  try {
    const CertificateData = req.body;
    const createdCertificate = await createCertificate(CertificateData);
    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: createdCertificate
    });
  } catch (error) {
    next(error);
  }
};

export const certificateList = async (req, res, next) => {
  try {
    const { query } = req;
    const Certificates = await getCertificateList.getCertificateList(
      query
    );
    res.status(200).json({ success: true, data: Certificates });
  } catch (error) {
    next(error);
  }
};


export const getAllCertificates = async (req, res, next) => {
  try {
    const { query } = req;
    const Certificates = await getAllCertificatesBuilt.getAllCertificatesBuilt(
      query
    );
    res.status(200).json({ success: true, data: Certificates });
  } catch (error) {
    next(error);
  }
};

export const getCertificateById = async (req, res, next) => {
  try {
    const CertificateBuilderId = req.params.id;
    const Certificate = await getCertificateBuilderById(CertificateBuilderId);
    res.status(200).json({ success: true, data: Certificate });
  } catch (error) {
    next(error);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const CertificateId = req.params.id;
    const updateData = req.body;
    const updatedCertificate = await updateCertificateBuilder(
      CertificateId,
      updateData
    );
    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: updatedCertificate
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const CertificateId = req.params.id;
    const deletedCertificate = await deleteCertificateBuilder(CertificateId);
    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      data: deletedCertificate
    });
  } catch (error) {
    next(error);
  }
};
