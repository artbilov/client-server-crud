const [form] = document.forms
const userList = document.getElementsByTagName('ul')[0]

form.onsubmit = handleSubmit
userList.onclick = handleClick

getUsers().then(renderUserList)

function renderUserList(users) {
  userList.innerHTML = users.map(user => {
    return `<li class="user"><button class="del">❌</button> <button class="edit">Edit</button> <span>${user}</span></li>`
  }).join('')
}

function getUsers() {
  return fetch('/api/users')
    .then(res => res.json())
}

function handleSubmit() {
  const userInput = form[0].value
  if (!userInput) return
  const path = '/api/users'
  if (form.id === 'edit') {
    const body = JSON.stringify({ item: form.dataset.editableElement, newItem: userInput })
    const init = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body }
    fetch(path, init).then(res => res.json()).then(renderUserList)
    stopEdit()
  } else {
    const body = JSON.stringify({ item: userInput })
    const init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
    fetch(path, init).then(res => res.json()).then(renderUserList)
  }
  form.reset()
}

function handleClick(e) {
  const btn = e.target

  if (btn.className === 'del') {
    form.id = ''
    const path = '/api/users'
    const body = JSON.stringify({ item: btn.parentElement.lastChild.textContent })
    const init = { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body }
    fetch(path, init).then(res => res.json()).then(renderUserList)
  } else if (btn.className === 'edit') {
    const userName = btn.parentElement.lastChild.textContent
    startEdit(userName)
    
  }

}

function startEdit(userName) {
  const cancelBtn = document.createElement('button')
  cancelBtn.textContent = 'Cancel'
  form.append(cancelBtn)
  cancelBtn.onclick = stopEdit
  form.id = 'edit'
  form.dataset.editableElement = userName
  form[0].value = userName
  form[1].textContent = 'Save'
}

function stopEdit(e) {
  e?.preventDefault()
  form.reset()
  form.id = ''
  form[1].textContent = 'Add User'
  form.lastChild.remove()
}