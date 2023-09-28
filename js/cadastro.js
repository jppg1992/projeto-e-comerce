function gravar(email, senha1, senha2) {
  if (senha1 === senha2) {
    localStorage.setItem(email, senha1)
    alert('Salvo com sucesso.')
    const frm = document.getElementById('frm')
    frm.setAttribute('action', 'https://jppg1992.github.io/projeto-e-comerce/')
  } else {
    alert('Senhas diferentes, cadastro não foi salvo.')
    throw Error('Senhas diferentes, cadastro não foi salvo.')
  }
}
