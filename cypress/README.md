# 💼 Automação de Testes com Cypress – Projeto Banco Demo

Este projeto tem como objetivo automatizar testes de funcionalidades críticas do sistema bancário de demonstração [Parabank](https://parabank.parasoft.com), utilizando o framework Cypress.

---

## 📌 Funcionalidades Automatizadas

- 🔧 Configuração do banco e inicialização de dados (`00-Configuracao_Banco.cy.js`)
- 👤 Cadastro de contas e usuários (`01-Cadastro_Conta.cy.js`)
- 🔐 Login e autenticação (`02-Login.cy.js`)
- 💸 Transferência entre contas (`03-Transferencia_Conta.cy.js`)
- 📄 Consulta de extratos bancários (`04-Consulta_Extrato.cy.js`)
- 💳 Solicitação de empréstimos (`05-Emprestimo_Conta.cy.js`)
- 🧹 Limpeza do banco após testes (`06-Limpar_DB.cy.js`)

---

## 🚀 Como executar os testes

### ✅ Requisitos
- Node.js instalado (recomenda-se a versão 18+)
- Cypress instalado no projeto (`npm install cypress --save-dev`)

### 🛠️ Instalação

```bash

git clone https://github.com/TobiasGS/case_tecnico_parabank.git

```

### ▶️ Executar testes no modo interativo (GUI)

```bash
npx cypress open
```

### ▶️ Executar testes em modo headless (CLI)

```bash
npx cypress run
```

### ▶️ Executar um arquivo de teste específico

```bash
npx cypress run --spec "cypress/e2e/05-Emprestimo_Conta.cy.js"
```

---

## 🌳 Estrutura de Pastas

```
cypress/
├── e2e/
│   ├── 00-Configuracao_Banco.cy.js
│   ├── 01-Cadastro_Conta.cy.js
│   ├── 02-Login.cy.js
│   ├── 03-Transferencia_Conta.cy.js
│   ├── 04-Consulta_Extrato.cy.js
│   ├── 05-Emprestimo_Conta.cy.js
│   └── 06-Limpar_DB.cy.js
├── support/
│   └── commands.js
└── fixtures/
    
```
---

## 🧪 Boas práticas aplicadas

- Testes organizados por funcionalidades
- Comandos customizados reutilizáveis (`cy.login()`, `cy.emprestimo()`, etc.)
- Cobertura de cenários positivos e negativos
- Uso de dados dinâmicos em cadastros com `cy.gerarDadosPessoais()`
- Validações de UI e lógica de negócio

---

## 📌 Observações

- O sistema Parabank é um ambiente de demonstração. Os dados podem ser resetados a qualquer momento.
- O projeto é voltado para fins educacionais e de avaliação técnica.

---

## 📎 Autor

**Tobias Gomes**  
Analista de QA Sênior | Automação E2E com Cypress  
📧 tobiassantos_96@hotmail.com
