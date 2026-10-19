# Game Dev Skills

[English](README.md)

[Agent Skills](https://agentskills.io) para desenvolvimento de jogos, sem amarra com engine. Elas fazem um agente de código trabalhar como codiretor de game design, arquiteto técnico e revisor de riscos: planeja antes de construir, testa o que afirma e nunca inventa benchmark nem playtest.

Funcionam com Godot, Unity, Unreal, Bevy ou engine própria. Testadas no **Claude Code**; o suporte ao **OpenAI Codex** já está pronto e a confirmação está pendente.

## As skills

| Skill | Para que serve |
| --- | --- |
| `game-dev-questline` | Encaminhar um pedido sobre jogo para a skill certa, quando não está claro qual usar |
| `game-plan` | Planejar um jogo ou uma funcionalidade por decisões em ordem de dependência, terminando num blueprint. Nunca escreve código |
| `game-implement` | Construir uma funcionalidade com teste primeiro, em fatias verticais, rodando as conferências e revisando o diff |
| `game-debug` | Achar a causa raiz de um bug, travamento ou dessincronia e corrigir com teste de regressão |
| `game-review` | Revisar código, PR ou arquitetura, com achados por gravidade e local no arquivo. Só leitura |
| `game-test` | Escolher e escrever testes de unidade, integração, play-mode ou roteiro de playtest, separando o observado do não verificado |
| `game-optimize` | Medir primeiro, mudar um gargalo por vez, comparar antes e depois |

Elas compartilham um conjunto de regras (na pasta `references/` de cada skill): rótulos de evidência (`verified`, `inferred`, `assumed`), um formato de pergunta com opções em letras, pensado para o terminal, um checklist de arquitetura e um registro de riscos.

## Instalação

### Claude Code

```
/plugin marketplace add ThiagoFdaSLopes/game-dev-skills
/plugin install game-dev-skills@game-dev-skills
```

As skills ficam disponíveis como `/game-dev-skills:game-plan`, `/game-dev-skills:game-implement` e assim por diante, e o Claude também as usa sozinho quando o pedido combina com uma delas.

### OpenAI Codex

```
npx skills add ThiagoFdaSLopes/game-dev-skills -a codex
```

O comando copia as skills para `.agents/skills/` no projeto atual (com `-g`, para todos os projetos). Chame uma com `$game-plan` ou só descreva a tarefa.

### Outros agentes

Gemini CLI, Cursor, OpenCode, GitHub Copilot e outros leem o mesmo formato `SKILL.md`, mas **ainda não foram testados**. A instalação manual está em [docs/install.md](docs/install.md); se funcionou com você, conte numa issue.

## Adaptar ao seu projeto

Sem configuração, as skills descobrem o que precisam no repositório: engine, testes, CI, documentação, convenções do git. Para elas seguirem as *suas* regras, crie um **perfil de projeto**:

1. Copie [`templates/project.md`](templates/project.md) para `.game-dev/project.md` no repositório do seu jogo.
2. Preencha o que se aplica e apague o resto: onde ficam as decisões de design, os comandos exatos dos testes, as convenções de branch e commit, se o agente pode commitar e abrir PR.
3. Faça o commit. Toda skill lê esse arquivo no começo da tarefa.

Há exemplos para [Godot](templates/examples/godot.md), [Unity](templates/examples/unity.md) e [Unreal](templates/examples/unreal.md). A lista completa de seções, com o padrão de cada uma, está em [`shared/project-profile.md`](shared/project-profile.md). O perfil é escrito em inglês nos exemplos, mas pode ser escrito em português.

O seu `CLAUDE.md` / `AGENTS.md` sempre vale mais que o perfil, e o perfil vale mais que as regras genéricas.

## Padrões de segurança

- O planejamento nunca muda código.
- Sem um perfil que diga o contrário, o agente não faz commit, push nem abre pull request sem você pedir.
- Merge, aprovação, fechar PR e apagar branch são sempre seus.
- Nada de saída de teste, número de FPS ou resultado de playtest inventado; o que não foi verificado aparece marcado.

## Contribuir

Issues e pull requests são bem-vindos: relatos de bug ("a skill fez X, eu esperava Y"), exemplos para outras engines, suporte a outros agentes, skills novas. Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes (em inglês; issues e PRs em português também são aceitos).

## Licença

[MIT](LICENSE)
