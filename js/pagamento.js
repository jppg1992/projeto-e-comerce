window.onload = function () {
  carregaPedido()
  carregarTotalPedido()
}
function carregarTotalPedido() {
  var total = 0.0
  const tot = document.querySelector('#preco-total-ped')
  document.querySelectorAll('.precoitem').forEach(preco => {
    total = total + parseFloat(preco.textContent.replace(',', '.'))
  })

  if (tot) tot.textContent = total.toFixed(2).toString().replace('.', ',')
  console.log(total)
}

function excluirItemCarrinho(nroItem) {
  let pedido = localStorage.getItem('Pedido')
  if (pedido) pedido = JSON.parse(pedido)
  else pedido = []

  console.log(pedido)
  if (pedido.length > 0) {
    pedido.splice(nroItem - 1, 1)
  }
  console.log(pedido)
  localStorage.setItem('Pedido', JSON.stringify(pedido))

  carregaPedido()
  carregarTotalPedido()
}

function carregaPedido() {
  let pedido = localStorage.getItem('Pedido')
  let div = document.getElementById('pedido')
  div.innerHTML = ''
  if (pedido) {
    pedido = JSON.parse(pedido)
    pedido.forEach(item => {
      console.log(item)
      let it = {
        name: '',
        vlrUn: 0.0,
        qt: 0,
        img: '',
        index: 0
      }
      it = item
      console.log(it)
      it.index = pedido.indexOf(item) + 1
      div.innerHTML += `<p class="item">
      <img
        class="item-img"
        src="${it.img}"
        alt=""
      />
      <span class="indice-item">${it.index}</span>
      - ${it.name} ${it.qt}un x R$${it.vlrUn
        .toFixed(2)
        .toString()
        .replace('.', ',')}
      <strong class="vl-item">
        R$ <span class="precoitem">${it.total
          .toFixed(2)
          .toString()
          .replace('.', ',')}</span>
        <a class="excluir" onclick="excluirItemCarrinho(${it.index})" href="#"
          ><i class="ph-trash-fill"></i>
        </a>
      </strong>
    </p>`
    })
  }
}
