class Aluno{
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome} (${this.curso}) - Nota: ${this.notaFinal}`;
    }
}
let alunos = []
indiceEdicao = null;

const form = document.getElementById("formAluno");
const btnCadastrar = document.getElementById("btnCadastrar");
const tbody = document.querySelector("#tabelaAlunos tbody");
const relatorio = document.getElementById("relatorio");

function renderTabela() {
    tbody.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.notaFinal}</td>
        <td>
            <button onclick="editarAluno(${index})">Editar</button>
            <button onclick="excluirAluno(${index})">Excluir</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}

btnCadastrar.addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const nota = document.getElementById("nota").value;

    if (!nome || !idade || !nota) {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = new Aluno(nome, idade, curso, nota);

    if (indiceEdicao === null) {
        alunos.push(aluno);
        alert("Aluno cadastrado com sucesso!");
    } else {
        alunos[indiceEdicao] = aluno;
        indiceEdicao = null;
        alert("Aluno atualizado!");
    }

    form.reset();
    renderTabela();
});

window.editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("nota").value = aluno.notaFinal;
  indiceEdicao = index;
};

window.excluirAluno = (index) => {
  if (confirm("Deseja excluir este aluno?")) {
    alunos.splice(index, 1);
    renderTabela();
    alert("Aluno excluído!");
  }
};

document.getElementById("btnAprovados").addEventListener("click", () => {
    const aprovados = alunos.filter(a => a.isAprovado()).map(a => a.toString());
    relatorio.textContent = aprovados.length ? aprovados.join("\n") : "Nenhum aluno aprovado.";
});

document.getElementById("btnMediaNotas").addEventListener("click", () => {
    if(alunos.length == 0)return relatorio.textContent = "Nenhum aluno cadastrado.";
    const media = alunos.reduce((soma, a) => soma + a.notaFinal, 0) / alunos.length;
    return relatorio.textContent = `Média das notas: ${media.toFixed(2)}`;
});

document.getElementById("btnMediaIdades").addEventListener("click", () => {
    if(alunos.length == 0)return relatorio.textContent = "Nenhum aluno cadastrado.";
    const media = alunos.reduce((soma, a) => soma + a.idade, 0) / alunos.length;
    return relatorio.textContent = `Média das idades: ${media.toFixed(2)}`;
});

document.getElementById("btnOrdemAlfabetica").addEventListener("click", () => {
    if(alunos.length == 0)return relatorio.textContent = "Nenhum aluno cadastrado.";
    const nomes = alunos.map(a => a.nome).sort();
    relatorio.textContent = nomes.join("\n");
});

document.getElementById("btnQtdCursos").addEventListener("click", () => {
    if (alunos.length === 0) return relatorio.textContent = "Sem alunos cadastrados.";
    const contagem = {};
    alunos.forEach(a => {contagem[a.curso] = (contagem[a.curso] || 0) + 1});
    relatorio.textContent = Object.entries(contagem).map(([curso, qtd]) => `${curso}: ${qtd}`).join("\n");
});