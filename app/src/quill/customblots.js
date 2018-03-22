import Quill from 'quill'
const Embed = Quill.import('blots/embed')

class TaskBlot extends Embed {
  static create (value) {
    let node = super.create()
    node.setAttribute('idea-id', value.idea_id)
    node.setAttribute('task-id', value.task_id)

    node.contenteditable = false

    let link = document.createElement('div')
    link.title = link.href = `/idea/${value.idea_id}/design/${value.task_type}/${value.task_id}`
    link.target = '_blank'
    link.setAttribute('class', 'btn btn-primary')
    link.appendChild(document.createTextNode(`Link to ${value.task_type}...`))

    node.appendChild(link)

    return node
  }

  static value (node) {
    return {
      idea_id: node.getAttribute('idea-id'),
      task_id: node.getAttribute('task-id'),
      task_type: node.getAttribute('task-type')
    }
  }
}

class PollBlot extends Embed {
  static create (value) {
    let node = super.create()
    node.setAttribute('user', value.user)
    node.setAttribute('avatar', value.avatar)
    node.setAttribute('text', value.text)

    node.contenteditable = false

    let valueText = document.createElement('h4')
    valueText.appendChild(document.createTextNode(value.text))
    node.appendChild(valueText)

    let avatar = document.createElement('img')
    avatar.setAttribute('src', value.avatar)
    avatar.setAttribute('height', '60px')
    avatar.setAttribute('width', '60px')
    avatar.setAttribute('class', 'avatar')
    node.appendChild(avatar)

    let user = document.createElement('h5')
    user.appendChild(document.createTextNode(`Suggested by ${value.user}`))
    node.appendChild(user)

    let clearfix = document.createElement('div')
    clearfix.setAttribute('class', 'clearfix')
    node.appendChild(clearfix)

    return node
  }

  static value (node) {
    return {
      user: node.getAttribute('user'),
      avatar: node.getAttribute('avatar'),
      text: node.getAttribute('text')
    }
  }
}

export { TaskBlot, PollBlot }
