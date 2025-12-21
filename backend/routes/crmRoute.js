import express from 'express'
import {
    addLead, listLeads, updateLeadStatus, removeLead,
    addInteraction, listInteractions,
    getCRMStats
} from '../controllers/crmController.js'
import adminAuth from '../middleware/adminAuth.js'

const crmRouter = express.Router();

// Lead Routes
crmRouter.post('/leads/add', adminAuth, addLead);
crmRouter.get('/leads/list', adminAuth, listLeads);
crmRouter.post('/leads/status', adminAuth, updateLeadStatus);
crmRouter.post('/leads/remove', adminAuth, removeLead);

// Interaction Routes
crmRouter.post('/interactions/add', adminAuth, addInteraction);
crmRouter.get('/interactions/list', adminAuth, listInteractions);

// Analytics Routes
crmRouter.get('/stats', adminAuth, getCRMStats);

export default crmRouter;
