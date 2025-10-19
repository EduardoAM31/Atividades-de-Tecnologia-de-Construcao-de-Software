class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this._nome = nome;
    this._idade = Number(idade);
    this._cargo = cargo;
    this._salario = Number(salario);
  }

  // Getters e Setters
  get nome() { return this._nome; }
  set nome(n) { this._nome = n; }

  get idade() { return this._idade; }
  set idade(i) { this._idade = Number(i); }

  get cargo() { return this._cargo; }
  set cargo(c) { this._cargo = c; }

  get salario() { return this._salario; }
  set salario(s) { this._salario = Number(s); }

  toString() {
    return `${this._nome} (${this._cargo}) - R$ ${this._salario.toFixed(2)}`;
  }
}

let funcionarios = [];
let indiceEdicao = null;

const form = document.getElementById("formFuncionario");
const tbody = document.querySelector("#tabelaFuncionarios tbody");
const relatorio = document.getElementById("relatorio");

const renderTabela = () => {
    tbody.innerHTML = "";
    funcionarios.forEach((f, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${f.nome}</td>
        <td>${f.idade}</td>
        <td>${f.cargo}</td>
        <td>${f.salario.toFixed(2)}</td>
        <td>
            <button onclick="editarFuncionario(${index})">Editar</button>
            <button onclick="excluirFuncionario(${index})">Excluir</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
};

document.getElementById("btnCadastrar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;
    
    if(!nome || !idade || !cargo || !salario){
        alert("Preencha todos os campos!");
        return;
    }

    const funcionario = new Funcionario(nome, idade, cargo, salario);

    if(indiceEdicao === null){
        funcionarios.push(funcionario);
        alert("Funcionário cadastrado!");
    }else{
        funcionarios[indiceEdicao] = funcionario;
        indiceEdicao = null;
        alert("Funcionário atualizado!");
    }

    form.reset();
    renderTabela();
});

window.editarFuncionario = (index) => {
    const funcionario = funcionarios[index];
    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("idade").value = funcionario.idade;
    document.getElementById("cargo").value = funcionario.cargo;
    document.getElementById("salario").value = funcionario.salario;
    indiceEdicao = index;
};

window.excluirFuncionario = (index) => {
    if (confirm("Deseja excluir este funcionário?")) {
        funcionarios.splice(index, 1);
        renderTabela();
        alert("Funcionário removido!");
    } 
};

document.getElementById("btnSalarioAlto").addEventListener("click", () => {
  const lista = funcionarios.filter(f => f.salario > 5000).map(f => f.toString());
  relatorio.textContent = lista.length ? lista.join("\n") : "Nenhum funcionário com salário acima de 5000.";
});

document.getElementById("btnMediaSalarial").addEventListener("click", () => {
  if (funcionarios.length === 0) return relatorio.textContent = "Nenhum funcionário cadastrado.";
  const media = funcionarios.reduce((soma, f) => soma + f.salario, 0) / funcionarios.length;
  relatorio.textContent = `Média salarial: R$ ${media.toFixed(2)}`;
});

document.getElementById("btnCargosUnicos").addEventListener("click", () => {
  const cargos = new Set(funcionarios.map(f => f.cargo));
  relatorio.textContent = cargos.length ? cargos.join("\n") : "Sem cargos cadastrados.";
});

document.getElementById("btnNomesMaiusculo").addEventListener("click", () => {
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  relatorio.textContent = nomes.length ? nomes.join("\n") : "Sem funcionários cadastrados.";
});