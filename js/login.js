function validarLogin(login, senha) {
  var passwd = localStorage.getItem(login)
  if (passwd === senha) {
    const form = document.getElementById('frm')
    form.setAttribute('action', './pages/catalogo.html')
    alert('Boas compras!!!!')
    salvarUsuarioLogado(login)
  } else {
    alert('Usuário ou senha inválido!')
    throw Error('Usuário ou senha inválido!')
  }
}

function salvarUsuarioLogado(user) {
  localStorage.setItem('logado', user)
}
