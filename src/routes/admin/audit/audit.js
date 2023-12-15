const router = require('express').Router();
var auditController = require('../../../controllers/admin/audit/audit')

router.route('/')
    .post(auditController.createAuditController)
    .get(auditController.getAuditController)
    

module.exports = router;    