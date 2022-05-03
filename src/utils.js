// import { wait } from '@/utils.js'

function hexToRGB (hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha !== undefined) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

// text-white -> textWhite
function kebabToCamelCase (s) {
  return s.replace(/-./g, x => x[1].toUpperCase())
}

// [5,10] -> 7.5
function avgArray (arr) {
  return arr.reduce((n, sum) => n + sum, 0) / arr.length
}

/*  [
      { id: A1 },
      { id: A2 }
    ] =>
    {
      A1: {id: A1 },
      A2: {id: A2 }
    }
*/
function indexArray (arr, indexedProp = 'id') {
  const dict = {}
  for (const item of arr) {
    const index = item[indexedProp]
    dict[index] = item
  }
  return dict
}

function validateEmail (email) {
  if (!email) {
    return false
  }
  if (typeof email !== 'string') {
    return false
  }
  const result = email.trim().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  return !!result
}

function validatePhone (phone) {
  if (!phone || !phone.match) {
    return false
  }
  const result = phone.match(/^[\d\s()+-]+$/)
  return !!result
}

function isObject (obj) {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true
  }
  return false
}
function countChildArrays (input) {
  // Map/Array/Object of Arrays
  // add up the lengths of all Arrays that are direct descendants

  if (input instanceof Map) {
    return Array.from(input).reduce((total, group) => {
      let current = 0
      if (Array.isArray(group)) {
        current = group.length
      }
      return total + current
    }, 0)
  }

  if (Array.isArray(input)) {
    return input.reduce((total, group) => {
      let current = 0
      if (Array.isArray(group)) {
        current = group.length
      }
      return total + current
    }, 0)
  }

  if (isObject(input)) {
    return Object.values(input).reduce((total, group) => {
      let current = 0
      if (Array.isArray(group)) {
        current = group.length
      }
      return total + current
    }, 0)
  }

  return null
}

function getDeepKey (obj, deepKey) {
  const steps = deepKey.split('.')
  let level = obj
  for (const key of steps) {
    if (key in level) {
      level = level[key]
      continue
    }
    return undefined
  }

  return level
}

function sortObjectsInArray (originalArray, key) {
  const arr = [...originalArray]

  arr.sort((a, b) => {
    const aValue = getDeepKey(a, key)?.toLowerCase() || ''
    const bValue = getDeepKey(b, key)?.toLowerCase() || ''
    return aValue.toLowerCase().localeCompare(bValue.toLowerCase())
  })

  return arr
}

// This function takes in latitude and longitude of two location
// and returns the distance between them as the crow flies (in km)
function calcCrow (lat1, lon1, lat2, lon2) {
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  lat1 = toRad(lat1)
  lat2 = toRad(lat2)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

// Converts numeric degrees to radians
function toRad (Value) {
  return Value * Math.PI / 180
}

// await wait(1000)
function wait (time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

// '13.1em' => {valid: true, value: 13.1, units: 'em', css: '13.1em' }
// 5 => { valid: true, value: 5, units: 'px', css: '5px' }
// '5' => { valid: true, value: 5, units: 'px', css: '5px' }
// 'bs' => { valid: false, value: null, units: null, css: '13.1em' }
function cssUnits (input, units = 'px', fallback) {
  let output = {
    value: null,
    units: null,
    valid: false
  }
  const parser = /^(-?(\d*\.)?\d+)((px)|(em)|(%)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(cm)|(mm)|(in)|(pt)|(pc))$/gmi
  const result = parser.exec(input)
  if (result) {
    output.value = result[1]
    output.units = result[3]
    output.valid = true
    output.css = `${output.value}${output.units}`
  }
  if (!result && !isNaN(parseFloat(input))) {
    output.value = parseFloat(input)
    output.units = units
    output.valid = true
    output.css = `${output.value}${output.units}`
  }
  if (!output.valid && fallback !== undefined) {
    output = cssUnits(fallback, units)
  }
  return output
}

// 'martin' => Ma
// {first: 'Martin', last: 'Kruusement'} => MK
// {first: 'Martin John'} => MJ
function initialsFromName (name) {
  if (!name) {
    return ''
  }

  let full = ''
  if (name.first && typeof name.first === 'string') {
    full = name.first
  }
  if (name.last && typeof name.last === 'string') {
    full += ' ' + name.last
  }
  if (!full && name.full && typeof name.full === 'string') {
    full = name.full
  }

  if (!full && typeof name === 'string') {
    full = name
  }

  // Purge extra whitespace and weird characters [A-z0-9]
  // Keep mid-word dashes, but limit to 1 consecutive dash (-- => -)
  full = full.trim().replace(/\s\s+/g, ' ')
  full = full.replace(/[^a-zA-Z0-9\s-]+/g, '')
  full = full.replace(/--+/g, '-')

  let parts = full.split(' ')
  parts = parts.map(part => part.charAt(0) === '-' ? part.substr(1) : part)
  parts = parts.filter(part => part)

  const first = parts[0]
  if (parts.length === 1) {
    const dashedParts = first.replace(/-+/g, ' ').split(' ').filter(part => part)
    if (dashedParts.length > 1) {
      // Smith-Johnson or John-Robert => SJ and JR if input only last or first name
      const initials = dashedParts[0].substr(0, 1) + dashedParts[dashedParts.length - 1].substr(0, 1)
      return initials.toUpperCase()
    }
    return first.substr(0, 1).toUpperCase() + first.substr(1, 1).toLowerCase()
  }

  const last = parts[parts.length - 1]
  const initials = first.substr(0, 1) + last.substr(0, 1)
  return initials.toUpperCase()
}

function isPast (timestamp) {
  if (isNaN(timestamp)) {
    return false
  }
  return new Date().getTime() > timestamp
}

function dateIsBefore (earlier, later) {
  if (!earlier || !later) {
    return undefined
  }
  const { year, month, day } = earlier
  const { year: laterYear, month: laterMonth, day: laterDay } = later
  if ([year, month, day, laterYear, laterMonth, laterDay].includes(undefined)) {
    return undefined
  }
  if (JSON.stringify(earlier) === JSON.stringify(later)) {
    return false
  }
  return laterYear > year || laterMonth > month || laterDay > day
}

function parseDateFormat (input, format) {
  let year, month, day

  if (!input || isNaN(new Date(input))) {
    return null
  }

  switch (format) {
    case 'YYYY-MM-DD':
      if (/^20[0-9]{2}-[0-1][0-9]-[0-3][0-9]$/.test(input)) {
        [year, month, day] = [...input.split('-').map(n => parseInt(n))]
      }
      break

    default:
      return null
  }

  if ([year, month, day].includes(undefined)) {
    return null
  }
  if (!isValidCalendarDate({ year, month, day })) {
    return null
  }
  return { year, month, day }
}

function formatDate ({ year, day, month }, format) {
  if ([year, month, day].includes(undefined)) {
    return null
  }
  if (!isValidCalendarDate({ year, month, day })) {
    return null
  }

  year = year.toString().padStart(4, '0')
  month = month.toString().padStart(2, '0')
  day = day.toString().padStart(2, '0')

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`
    default:
      return null
  }
}

function isValidCalendarDate ({ year, month, day }) {
  // Filter dates that actually exist in the calendar
  // "2021-12-40" false
  // "2021-02-31" false
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Leap year?
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLengths[1] = 29
  }
  if (day < 1 || day > monthLengths[month - 1]) {
    return false
  }
  return true
}

function convertDateFormat (input, format, outputFormat) {
  // TODO: support parsing from Date or just use datefns
  const parts = parseDateFormat(input, format)
  if (!parts) {
    return 'Invalid date'
  }
  const year = parts.year.toString().padStart(4, '0')
  const month = parts.month.toString().padStart(2, '0')
  const day = parts.day.toString().padStart(2, '0')

  if (outputFormat === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`
  }

  return 'Unsupported format'
}

function stripDecimals (input) {
  if (isNaN(parseFloat(input))) {
    return input
  }
  const string = input.toString()
  let location = string.length
  const separatorIndex = string.indexOf('.')
  if (separatorIndex >= 0) {
    location = separatorIndex
  }
  const decimalsRemoved = string.substring(0, location)
  if (typeof input === 'number') {
    return parseInt(decimalsRemoved)
  }
  return decimalsRemoved
}
function separateThousands (input, separator = ',') {
  if (isNaN(parseFloat(input))) {
    return input
  }
  const string = input.toString()
  const withoutDecimals = stripDecimals(string)
  const decimals = string.substring(withoutDecimals.length)
  const numbers = withoutDecimals.split('')
  let output = ''
  while (numbers.length > 2) {
    let group = [numbers.pop(), numbers.pop(), numbers.pop()].reverse().join('')
    if (numbers.length) {
      group = `${separator}${group}`
    }
    output = `${group}${output}`
  }
  const remainder = numbers.join('')
  return `${remainder}${output}${decimals}`
}

export {
  hexToRGB,
  kebabToCamelCase,
  avgArray,
  indexArray,
  validateEmail,
  validatePhone,
  isObject,
  countChildArrays,
  sortObjectsInArray,
  getDeepKey,
  calcCrow,
  wait,
  cssUnits,
  initialsFromName,
  isPast,
  dateIsBefore,
  parseDateFormat,
  isValidCalendarDate,
  convertDateFormat,
  stripDecimals,
  separateThousands,
  formatDate
}
