# MasterTask - Sistema de Gerenciamento de Tarefas da Werek

Sistema desenvolvido para controle, organização e monitoramento de tarefas dentro de uma empresa, otimizando a eficiência operacional e promovendo colaboração entre os usuários.

---

## Informações Gerais
- **Instituição**: Ministério da Educação - Instituto Federal da Paraíba (IFPB), Campus Campina Grande  
- **Curso**: Engenharia de Computação   
- **Turma**: Padrões e Projetos 2024.2  
- **Local**: Campina Grande, PB  
- **Ano**: 2025  

### Integrantes do Grupo
- Felipe Luiz ([felipe.lima@academico.ifpb.edu.br](mailto:felipe.lima@academico.ifpb.edu.br))  
- Pedro Sávio ([pedro.sarmento@academico.ifpb.edu.br](mailto:pedro.sarmento@academico.ifpb.edu.br))  
- Geraldo Silveira ([silveira.geraldo@academico.ifpb.edu.br](mailto:silveira.geraldo@academico.ifpb.edu.br))  

---

## Escopo
O **MasterTask** é um sistema de gerenciamento de tarefas que visa melhorar a distribuição, transparência e controle de atividades em uma empresa. Ele abrange:  
- Controle de acesso com permissões para Gerentes Gerais (GMs), Administradores (Admins) e Técnicos.  
- Gerenciamento de usuários, tarefas e relatórios por GMs.  
- Atribuição e monitoramento de tarefas por Admins.  
- Execução e acompanhamento de tarefas por Técnicos.  

### Fora do Escopo
- Integração com ferramentas externas de análise.  
- Gerenciamento de permissões além dos níveis GM, Admin e Técnico.  
- Personalização avançada de relatórios.  

---

## Público-Alvo
- **Gerentes Gerais (GMs)**: Controle do sistema e monitoramento de atividades.  
- **Administradores (Admins)**: Distribuição e gestão de tarefas.  
- **Técnicos**: Execução das tarefas atribuídas.  

---

## Requisitos Funcionais
| ID   | Descrição                                                                 |
|------|---------------------------------------------------------------------------|
| RF1  | GMs podem excluir usuários Admin e Técnico.                               |
| RF2  | GMs podem alterar papéis entre Admin e Técnico.                           |
| RF3  | GMs podem limpar o banco de dados, removendo dados obsoletos.             |
| RF4  | GMs podem baixar relatórios detalhados das atividades.                    |
| RF5  | Admins podem atribuir tarefas (Individual, Em grupo, Generalista).        |
| RF6  | Admins podem visualizar tarefas designadas e em progresso.                |
| RF7  | Técnicos podem visualizar tarefas atribuídas e generalistas disponíveis.  |
| RF8  | Técnicos podem iniciar, pausar e retomar tarefas.                         |
| RF9  | Técnicos podem finalizar tarefas iniciadas.                               |

---

## Requisitos Não Funcionais
| ID    | Descrição                                                                 |
|-------|---------------------------------------------------------------------------|
| RNF1  | Acessível via navegador, otimizado para desktop e mobile.                 |
| RNF2  | Interface intuitiva e de fácil navegação para todos os perfis.            |
| RNF3  | Segurança de dados com autenticação por nível de usuário.                 |
| RNF4  | Relatórios exportáveis em formato planilha.                              |

---

## Funcionamento Geral
O sistema organiza o fluxo de trabalho por níveis de permissão:  
- **GMs**: Gerenciam usuários, dados e relatórios.  
- **Admins**: Distribuem tarefas aos Técnicos.  
- **Técnicos**: Executam e acompanham tarefas.  

O MasterTask promove eficiência e transparência na gestão de tarefas.

---

## Versões do Documento
| Versão | Data       | Descrição                        | Responsáveis                     |
|--------|------------|----------------------------------|----------------------------------|
| 0.1    | 21/10/2024 | Elaboração inicial              | Felipe, Pedro, Geraldo           |
| 0.2    | 07/12/2024 | Atualização de requisitos       | Felipe, Pedro, Geraldo           |
| 0.3    | 18/01/2025 | Atualização de requisitos       | Felipe, Pedro, Geraldo           |
| 0.4    | 15/02/2025 | Atualização de requisitos e casos de uso | Felipe, Pedro, Geraldo |

---

## Padrões Aplicados
| Padrão            | Aplicação no MasterTask                | Justificativa                                      |
|-------------------|----------------------------------------|---------------------------------------------------|
| Singleton         | Conexão com o banco de dados          | Evita múltiplas conexões e melhora desempenho.    |
| Factory Method    | Criação de tarefas                    | Facilita a criação de tipos de tarefas.           |
| Observer          | Notificações de status de tarefas     | Atualiza GMs e Admins sobre mudanças.             |
| Strategy          | Geração de relatórios                 | Flexibilidade nos formatos de relatório.          |
| Decorator         | Funcionalidades extras em tarefas     | Adiciona opções sem alterar a base.              |
| Chain of Responsibility | Controle de permissões          | Garante acesso conforme o nível do usuário.      |
| Command           | Ações de tarefas (iniciar, pausar)    | Encapsula ações para fácil execução.             |
| Template Method   | Fluxo de execução de tarefas          | Define estrutura padrão customizável.            |
| Facade            | Simplificação de subsistemas          | Interface única para operações complexas.        |


Desenvolvido por: **Felipe Luiz, Pedro Sávio, Geraldo Silveira**  
IFPB - Campus Campina Grande, 2025