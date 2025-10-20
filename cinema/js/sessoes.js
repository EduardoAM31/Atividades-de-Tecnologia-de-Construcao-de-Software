function carregarSelects() {
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];

  filmes.forEach(f => {
    const opt = document.createElement("option");
    opt.textContent = f.titulo;
    filme.appendChild(opt);
  });

  salas.forEach(s => {
    const opt = document.createElement("option");
    opt.textContent = s.nome;
    sala.appendChild(opt);
  });
}

btnSalvar.onclick = () => {
  const sessao = {
    filme: filme.value,
    sala: sala.value,
    datahora: datahora.value,
    preco: preco.value,
    idioma: idioma.value,
    formato: formato.value
  };

  if (!sessao.filme || !sessao.sala || !sessao.datahora) {
    alert("Preencha todos os campos!");
    return;
  }

  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  sessoes.push(sessao);
  localStorage.setItem("sessoes", JSON.stringify(sessoes));
  alert("Sessão cadastrada!");
  formSessao.reset();
};

window.onload = carregarSelects();
