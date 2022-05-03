// import { buildReportId } from '@/functions/reports.js'

import { dateIsBefore, parseDateFormat, formatDate } from '@/utils.js'

import appConfig from '@/app-config.yml'
import RegexParser from 'regex-parser'

function validateProjectId (input) {
  return validateIdFormat(input)
}

function validateGatewayId (input) {
  return validateIdFormat(input)
}

function validateIdFormat (input) {
  const rx = new RegexParser(appConfig.idValidation.regex)
  return rx.test(input)
}

function validateReportDates (startDate, endDate) {
  const format = appConfig.reports.dates.format
  const minDate = appConfig.reports.dates.min
  const maxDate = appConfig.reports.dates.max

  const min = parseDateFormat(minDate, format)
  const max = parseDateFormat(maxDate, format)
  // TODO: max needs to be allowed to be 'today' eventually
  const start = parseDateFormat(startDate, format) ?? min
  const end = parseDateFormat(endDate, format) ?? max

  const startBelowMin = dateIsBefore(start, min)
  const startBeyondMax = dateIsBefore(max, start)
  const endBelowMin = dateIsBefore(end, min)
  const endBeyondMax = dateIsBefore(max, end)
  const startPastEnd = dateIsBefore(end, start)

  const safeStart = formatDate(start, format)
  const safeEnd = formatDate(end, format)

  if (startBelowMin || endBelowMin) {
    return {
      startDate: safeStart,
      endDate: safeStart
    }
  }

  if (startBeyondMax || endBeyondMax) {
    return {
      startDate: safeEnd,
      endDate: safeEnd
    }
  }

  if (startPastEnd) {
    return {
      startDate: safeEnd,
      endDate: safeStart
    }
  }

  return {
    startDate: startDate ? safeStart : startDate,
    endDate: endDate ? safeEnd : endDate
  }
}

function buildReportId ({ projectId = null, gatewayId = null, startDate = null, endDate = null }) {
  return `report:{projectId:${projectId},gatewayId:${gatewayId},startDate:${startDate},endDate:${endDate}}`
}

function routeGuard (to) {
  const gate = {
    valid: true,
    cleanRoute: {
      name: to.name,
      params: {}
    }
  }

  const startDate = to.params.startDate
  const endDate = to.params.endDate
  const projectId = to.params.projectId
  const gatewayId = to.params.gatewayId

  if (startDate || endDate) {
    const validDates = validateReportDates(startDate, endDate)
    if (endDate && validDates.endDate !== endDate) {
      gate.valid = false
      gate.cleanRoute.params.endDate = validDates.endDate || null
    }
    if (startDate && validDates.startDate !== startDate) {
      gate.valid = false
      gate.cleanRoute.params.startDate = validDates.startDate || null
    }
  }
  if (projectId && !validateProjectId(projectId)) {
    gate.valid = false
    gate.cleanRoute.params.projectId = null
  }
  if (gatewayId && !validateGatewayId(gatewayId)) {
    gate.valid = false
    gate.cleanRoute.params.gatewayId = null
  }

  console.log(gate)

  return gate
}

export {
  validateProjectId,
  validateGatewayId,
  validateIdFormat,
  validateReportDates,
  buildReportId,
  routeGuard
}
