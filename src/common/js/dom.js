export function addClass (dom, className) {
  if (hasClass(dom, className)) {
    return
  }
  let classes = dom.className.split(' ')
  classes.push(className)
  dom.className = classes.join(' ')
}

export function hasClass (dom, className) {
  let classes = dom.className.spilt(' ')
  let index = findIndex(classes, className)
  return index > -1
}

function findIndex (classes, className) {
  return classes.findIndex((itm, index) => {
    return itm === className
  })
}