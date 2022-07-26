function submitForm(event) {
  event.preventDefault()
  let form = new FormData(event.srcElement)
  let title = form.get('title')
  let description = form.get('description')

  document.cookie = title + '=' + description //setCookie

  addCard(title,description)

  document.getElementsByName('title')[0].value = ''
  document.getElementsByName('description')[0].value = ''
}

function addCard(title,description) {
  if (title === '' || description === '') {
    let p = document.getElementById('emptyvalue')
    p.innerHTML = 'Cannot Add Empty Values'
    p.style.display = 'block'
    setTimeout(() => {
      p.style.display = 'none'
    }, 2000);
  } else {
    let card = document.createElement('div')
    document.body.appendChild(card)

    let question = document.createElement('h2')
    let qText = document.createTextNode(title)
    card.appendChild(question)
    question.appendChild(qText)

    let show = document.createElement('a')
    let sText = document.createTextNode('Show/Hide')
    card.appendChild(show)
    show.appendChild(sText)
    show.onclick = function() {showAnswer()}

    br(show)
    br(show)

    let c = 0
    function showAnswer() {
      if (c % 2 === 0) {
        answer.style.display = 'inline'
      } else {
        answer.style.display = 'none'
      }
      c += 1
    }

    let answer = document.createElement('p')
    let aText = document.createTextNode(description)
    card.appendChild(answer)
    answer.appendChild(aText)

    br(answer)
    br(answer)

    let remove = document.createElement('button')
    let dText = document.createTextNode('Remove')
    card.appendChild(remove)
    remove.appendChild(dText)
    remove.onclick = function() {removeCard()}

    function removeCard() {
      card.style.display = 'none'
      document.cookie = title + "=;expires=" + new Date(0).toUTCString()
    }

    let edit = document.createElement('button')
    let eText = document.createTextNode('Edit')
    card.appendChild(edit)
    edit.appendChild(eText)
    edit.onclick = function() {editCard()}
    edit.style.float = 'right'

    function editCard() {
      removeCard()
      document.getElementsByName('title')[0].value = description
    }

    function br(elem) {
      let br = document.createElement('br')
      elem.appendChild(br)
    }

  }
}


function showForm() {
  document.getElementById('form').style.display = 'block'
}

function removeForm() {
  document.getElementById('form').style.display = 'none'
}

function checkCookie() {
  let myCookies = document.cookie
  let myC = myCookies.split(';')
  for (item in myC) {
    let newItem = myC[item].split('=')
    title = newItem[0]
    description = newItem[1]
    addCard(title,description)
  }
}