window.onload = function () {
  carregaPedido()
  carregarTotalPedido()
  carregaParcelamento()
}
function carregarTotalPedido() {
  var total = 0.0
  const tot = document.querySelector('#preco-total-ped')
  document.querySelectorAll('.precoitem').forEach(preco => {
    total = total + parseFloat(preco.textContent.replace(',', '.'))
  })

  localStorage.setItem('Total', total.toFixed(2).toString().replace('.', ','))
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
  carregaParcelamento()
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

function carregaParcelamento() {
  let vlTotal = parseFloat(localStorage.getItem('Total').replace(',', '.'))
  let vlTotalJurosS = vlTotal + vlTotal * 0.05

  console.log(vlTotal, vlTotalJurosS)
  var div1 = document.getElementById('divPagamento1')
  var div2 = document.getElementById('divPagamento2')
  div1.innerHTML = ''
  div2.innerHTML = ''
  /**
   *
   *  Sem juros de 1x até 4x,
   *  juros de 5% de 5x até 8x e
   *  juros compostos de 1,5% ao mês para parcelas maiores do que 8x.
   */

  // for de 1 a 12pra gerar as parcelas
  for (let i = 1; i <= 12; i++) {
    if (i <= 4) {
      div1.innerHTML += `<div class="divInternaIputsRadio">
    <label class="parcelas">
      <input type="radio" name="parcelamento" required /> ${i}X R$
      ${(vlTotal / i)
        .toFixed(2)
        .toString()
        .replace('.', ',')} <strong>SEM JUROS</strong>
    </label>
  </div>`
    } else if (i > 4 && i <= 6) {
      div1.innerHTML += `<div class="divInternaIputsRadio">
    <label class="parcelas">
      <input type="radio" name="parcelamento" required /> ${i}X R$
      ${(vlTotalJurosS / i)
        .toFixed(2)
        .toString()
        .replace('.', ',')} <strong>COM JUROS (5%)</strong>
    </label>
  </div> 
  `
    } else if (i > 6 && i <= 8) {
      div2.innerHTML += `<div class="divInternaIputsRadio">
    <label class="parcelas">
      <input type="radio" name="parcelamento" required /> ${i}X R$
      ${(vlTotalJurosS / i)
        .toFixed(2)
        .toString()
        .replace('.', ',')} <strong>COM JUROS (5%)</strong>
    </label>
  </div> 
  `
    } else if (i > 8 && i <= 12) {
      div2.innerHTML += `<div class="divInternaIputsRadio">
    <label class="parcelas">
      <input type="radio" name="parcelamento" required /> ${i}X R$
      ${((vlTotal * Math.pow(1 + 0.015, i)) / i)
        .toFixed(2)
        .toString()
        .replace('.', ',')} <strong>COM JUROS (1,5% AO MÊS)</strong>
    </label>
  </div> 
  `
    }
  }
}
