agent0 = document.getElementById('agent0')
bkdiv = document.getElementById('bkdiv')

currentAgents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Fade', 'Harbor', 'Jett', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru']

function dragEl(elm) {
  height = parseInt(bkdiv.style.height.substring(0,(bkdiv.style.height.length-2)))
  width = parseInt(bkdiv.style.width.substring(0,(bkdiv.style.width.length-2)))

  siheight = parseInt(agent0.style.height.substring(0,(agent0.style.height.length-2)))
  siwidth = parseInt(agent0.style.width.substring(0,(agent0.style.width.length-2)))

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  elm.onmousedown = dragMouseDown


  function dragMouseDown(e) {
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY

    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    if(elm.offsetTop-pos2 > bkdiv.offsetTop+5
      && elm.offsetLeft-pos1 > bkdiv.offsetLeft+5
      && elm.offsetLeft-pos1 < bkdiv.offsetLeft+width-siwidth+5
      && elm.offsetTop-pos2 < bkdiv.offsetTop+height-siheight+5) { 

      elm.style.top = (elm.offsetTop-pos2)
      elm.style.left = (elm.offsetLeft - pos1)
    }
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
}

function createList() {
  document.getElementById('Astra').src = './Agents/Astra.png'
  createAgents()
  createAgentImage()
}

function createAgents() {

  document.getElementById('checkboxAstra').addEventListener('change', function() {
    if(this.checked) {
      agent0.style.visibility = 'visible'
      document.getElementById('Astra').style.filter = "brightness(100%)"
    } else {
      agent0.style.visibility = 'hidden'
      document.getElementById('Astra').style.filter = "brightness(50%)"
    }
  })

  document.getElementById('checkboxAstra').checked=false
  for(let i = 1; i < currentAgents.length; i++) {
    let clone = document.getElementById('AstraDiv').cloneNode(true)
    clone.id = currentAgents[i]+'Div'
    clone.childNodes[1].checked=false
    clone.childNodes[1].id='checkbox'+currentAgents[i]
    clone.childNodes[3].setAttribute('for', 'checkbox'+currentAgents[i])
    clone.childNodes[3].childNodes[1].id=currentAgents[i]
    clone.childNodes[3].childNodes[1].src = './Agents/'+currentAgents[i]+'.png'

    document.getElementById('agentDiv').appendChild(clone)

    document.getElementById('checkbox'+currentAgents[i]).addEventListener('change', function() {
      if(this.checked) {
        document.getElementById('agent'+i).style.visibility = 'visible'
        document.getElementById(currentAgents[i]).style.filter = "brightness(100%)"
      } else {
        document.getElementById('agent'+i).style.visibility = 'hidden'
        document.getElementById(currentAgents[i]).style.filter = "brightness(50%)"
      }
    })
  }
}

function createAgentImage() {

  dragEl(agent0)

  for(let i = 1; i<currentAgents.length; i++) {
    let clone = agent0.cloneNode(true)
    clone.id = 'agent'+i
    clone.childNodes[1].src = './Agents/'+currentAgents[i]+'.png'

    document.getElementById('bkdiv').appendChild(clone)
    dragEl(document.getElementById('agent'+i))


  }
}

function changeMap(value) {
  document.getElementById('mapImage').src = './Maps/'+value+'.png'
}