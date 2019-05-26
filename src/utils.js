export const formatPredictions = data => {
  let result = []
  Object.entries(data).map(p => result.push({ name: p[0], result: p[1] }))
  return result
}

export const sortResults = data => {
  return data.sort((a, b )=> {
    if (a.result < b.result)
      return 1;
    if (a.result > b.result)
      return -1;
    return 0;
  })
}