document.getElementById("btnSalvar").onclick = () => {
  const sala = {
    nome: nome.value,
    capacidade: capacidade.value,
    tipo: tipo.value
  };

  if (!sala.nome || !sala.capacidade) {
    alert("Preencha todos os campos!");
    return;
  }

  const salas = JSON.parse(localStorage.getItem("salas")) || [];
  salas.push(sala);
  localStorage.setItem("salas", JSON.stringify(salas));
  alert("Sala salva!");
  formSala.reset();
};
