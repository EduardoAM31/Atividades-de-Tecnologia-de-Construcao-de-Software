function carregarSessoes() {
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  sessoes.forEach(s => {
    const opt = document.createElement("option");
    opt.textContent = `${s.filme} - ${s.sala} (${s.datahora})`;
    sessao.appendChild(opt);
  });
}

btnSalvar.onclick = () => {
  const ingresso = {
    sessao: sessao.value,
    cliente: cliente.value,
    cpf: cpf.value,
    assento: assento.value,
    pagamento: pagamento.value
  };

  if (!ingresso.cliente || !ingresso.cpf || !ingresso.assento) {
    alert("Preencha todos os campos!");
    return;
  }

  const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
  ingressos.push(ingresso);
  localStorage.setItem("ingressos", JSON.stringify(ingressos));
  alert("Venda confirmada!");
  formIngresso.reset();
};

window.onload = carregarSessoes();
