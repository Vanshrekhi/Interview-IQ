import express from 'express'
import { saveAnalysis, getAnalysis } from '../controllers/analysis.controller.js'

const router = express.Router()

router.post('/save', saveAnalysis)
router.get('/:id', getAnalysis)

export default router
