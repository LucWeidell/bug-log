export function dateFormatter(date) {
  let result = ''
  const justDate = date.split('T')[0] // should hold ['yyyy-mm-dd']
  const arr = justDate.split('-')
  result = arr[1] + '-' + arr[2] + '-' + arr[0] // now mm-dd-yyy
  return result
}
