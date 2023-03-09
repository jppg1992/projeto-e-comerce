window.onload = function () {
  carregarUsuarioLogado()
  carregaCarrinho()
}

function carregarUsuarioLogado() {
  const user = localStorage.getItem('logado')
  const btn = document.getElementById('btn-usuario')
  if (btn) {
    btn.textContent = `Olá ${user}`
  }
}

function setSection(className) {
  const sections = document.querySelectorAll('section.container')
  if (sections) {
    sections.forEach(section => {
      section.classList.remove('sessao-amostra')
      section.classList.add('sessao-oculta')
    })
  }

  const section = document.querySelectorAll(`section.${className}`)

  if (section) {
    section.forEach(sec => {
      sec.classList.remove('sessao-oculta')
      sec.classList.add('sessao-amostra')
    })
  }

  const cart = document.getElementById('cart-button')
  if (className === 'servicos') {
    cart.classList.remove('sessao-amostra')
    cart.classList.add('sessao-oculta')
  } else {
    cart.classList.remove('sessao-oculta')
    cart.classList.add('sessao-amostra')
  }
}

function salvarItem(id) {
  let descri = ''
  let precouni = 0.0
  let qtd = 0
  let imgSrc = ''

  const div = document.getElementById(`${id}`)

  for (let i = 0; i < div.children.length; i++) {
    if (div.children[i].classList.contains('infoProd')) {
      const filho = div.children[i]

      for (let j = 0; j < filho.children.length; j++) {
        if (filho.children[j].classList.contains('descr')) {
          descri = filho.children[j].textContent
        } else if (filho.children[j].classList.contains('prc-un'))
          precouni = parseFloat(filho.children[j].textContent.replace(',', '.'))
      }
    } else if (div.children[i].classList.contains('prod-qtd')) {
      const filho = div.children[i]
      for (let j = 0; j < filho.children.length; j++) {
        if (filho.children[j].classList.contains('qtd')) {
          qtd = parseInt(filho.children[j].value)
          filho.children[j].value = 0
        }
      }
    } else if (div.children[i].classList.contains('img-prod')) {
      const filho = div.children[i]
      imgSrc = filho.getAttribute('src')
    }
  }
  console.log(precouni)
  console.log(descri)
  console.log(qtd)
  console.log(imgSrc)

  const item = {
    name: descri,
    vlrUn: precouni,
    qt: qtd,
    total: precouni * qtd,
    img: imgSrc
  }
  console.log(item)

  let pedido = localStorage.getItem('Pedido')
  //console.log(pedido)
  if (pedido) pedido = JSON.parse(pedido)
  else pedido = []
  pedido.push(item)
  pedido = JSON.stringify(pedido)
  // console.log(pedido)
  if (qtd > 0) {
    localStorage.setItem('Pedido', pedido)

    alert('Item adicionado ao carrinho')
    carregaCarrinho()
  } else {
    alert('Item com quantidade ZERO não pode ser adicionado ao carrinho !!')
  }
}

function carregaCarrinho() {
  let pedido = localStorage.getItem('Pedido')
  //console.log(pedido)
  if (pedido) pedido = JSON.parse(pedido)
  else pedido = []

  const qtd = document.getElementById('cart-itens')
  qtd.textContent = pedido.length

  const btn = document.getElementById('cart')
  if (pedido.length > 0) {
    btn.setAttribute('href', './pagamento.html')
  } else {
    btn.setAttribute('href', '#')
  }
}

function sair() {
  const bt = document.getElementById('btn-usuario')
  if (confirm('Deseja efetuar logout?')) {
    bt.setAttribute('href', '../login.html')
  } else {
    bt.setAttribute('href', '#')
  }
}
