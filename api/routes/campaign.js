const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CampaignsController = require('../controllers/campaigns');




router.get("/", authenticate, CampaignsController.get_all_campaigns);
router.get("/active", authenticate, CampaignsController.get_all_active_campaigns);



module.exports = router;