// import { buildReportId } from '@/functions/functions.js'

import { dateIsBefore, parseDateFormat } from '@/utils.js'

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
  const minDate = appConfig.reports.minDate
  const maxDate = appConfig.reports.maxDate

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

  if (startBelowMin || endBelowMin) {
    return {
      startDate: minDate,
      endDate: minDate
    }
  }

  if (startBeyondMax || endBeyondMax) {
    return {
      startDate: maxDate,
      endDate: maxDate
    }
  }

  if (startPastEnd) {
    return {
      startDate: endDate,
      endDate: startDate
    }
  }
  return {
    startDate,
    endDate
  }
}

function buildReportId ({ projectId = null, gatewayId = null, startDate = null, endDate = null }) {
  return `report:{projectId:${projectId},gatewayId:${gatewayId},startDate:${startDate},endDate:${endDate}}`
}

export {
  validateProjectId,
  validateGatewayId,
  validateIdFormat,
  validateReportDates,
  buildReportId
}
