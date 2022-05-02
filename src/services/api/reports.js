import client from '@/plugins/axios.js'
import {
  validateProjectId,
  validateGatewayId,
  validateReportDates
} from '@/functions/functions.js'

function load ({ projectId, gatewayId, startDate, endDate }) {
  const payload = {}

  if (validateProjectId(projectId)) {
    payload.projectId = projectId
  }
  if (validateGatewayId(gatewayId)) {
    payload.gatewayId = gatewayId
  }
  const dates = validateReportDates(startDate, endDate)
  payload.from = dates.startDate
  payload.to = dates.endDate

  return client({ requiresAuth: false }).post('/report', payload)
}

export default {
  load
}
