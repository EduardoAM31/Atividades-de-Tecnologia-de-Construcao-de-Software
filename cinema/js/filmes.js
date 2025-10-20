document.getElementById("btnSalvar").onclick = () => {
  const filme = {
    titulo: titulo.value,
    descricao: descricao.value,
    genero: genero.value,
    classificacao: classificacao.value,
    duracao: duracao.value,
    estreia: estreia.value
  };

  if (!filme.titulo || !filme.duracao) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  filmes.push(filme);
  localStorage.setItem("filmes", JSON.stringify(filmes));
  alert("Filme salvo com sucesso!");
  formFilme.reset();
};
