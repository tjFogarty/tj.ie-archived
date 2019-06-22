import { SHEET_NAME, SHEET_ID } from './constants'

const baseUrl = `https://api.sheetson.com/v1/sheets/${SHEET_NAME}`
const headers = new Headers({
  'X-Sheetson-Spreadsheet-Id': SHEET_ID,
  'Content-Type': 'application/json'
})

function request(path = '', method = 'GET', data) {
  return new Request(`${baseUrl}${path}`, { method, headers, body: JSON.stringify(data) })
}

export function fetchUpvotes() {
  return fetch(request('?limit=100'))
}

export function addUpvote({ rowIndex, votes }) {
  return fetch(request(`/${rowIndex}`, 'PUT', { votes }))
}

export function createNewRecord(url) {
  return fetch(request('/', 'POST', { url, votes: 1 }))
}
