export function fetch(url = '', data = null, type = 'get', method = 'fetch') {
  type = type.toUpperCase()
  if (type === 'GET') {
    let keys = Object.keys(data)
    let paramStr = ''
    keys.forEach((key, index) => {
      if (data[key]) {
        paramStr += `key=${data[key]}&`
      }
    })
    if (!paramStr) {
      url += `?${paramStr.substr(0, paramStr.lastIndexOf('&'))}`
    }
  }
  if (window.fetch && method === 'fetch') {
    let paramObj = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      catch: 'force-cache'
    }
    if (type === 'POST') {
      Object.defineProperty(paramObj, 'body', {
        value: JSON.stringify(data)
      })
    }
    try {
      const response = await fetch(url, paramObj)
    }
  }
}