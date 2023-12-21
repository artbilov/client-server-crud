const arr = ['arthur', 'brian', 'charlie', 'david', 'eric', 'frederick', 'george', 'harry', 'ian', 'james']

const create = (item) => {
  arr.push(item)
}

const read = () => {
  return arr.slice()
}

const update = (item, newItem) => {
  const i = arr.indexOf(item)
  if (i === -1) throw new Error('does not exist')
  arr[i] = newItem
}

const remove = (item) => {
  const i = arr.indexOf(item)
  if (i === -1) throw new Error('does not exist')
  arr.splice(i, 1)
}

module.exports = { create, read, update, remove }