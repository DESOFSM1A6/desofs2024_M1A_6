# Non Functional Requirements

## Funtionality

- O sistema deve ser capaz de suportar a importação e adição de imagens a uma noticia.
- Deverá ser possível pesquisar noticias por titulo, autor e data de publicação.

## Usability

- O sistema deve ser acessivel a partir de uma pagina web adaptada a todos os dispositivos.
- O texto das noticias deve ser legivel em todos os dispositivos.
- O sistema deve ser facil de usar e intuitivo.
- O sistema deve ser capaz de suportar a adição de noticias por utilizadores sem conhecimentos técnicos.

## Reliability

- O sistema não deve ter mais de 1 hora de inatividade por mês.
- O sistema deve ser capaz de recuperar de falhas em menos de 5 minutos.

## Performance

- O sistema não deve demorar mais de 10 segundos para carregar a página inicia.
- O sistema não deve demorar mais de 10 segundos para carregar a página de uma noticia.

## Suportability

- A pagina web deve ser suportada por todos os navegadores modernos desktop e mobile.
- O sistema deve ser capaz de suportar 1000 acessos simultaneos.

## MORE

### Segurança

- O sistema deve estar em conformidade com os requisitos de segurança OWASP.
- O sistema deve ser capaz de proteger os dados dos utilizadores (todos os roles).
- O sistema deve ser capaz de proteger os assets do sistema. (Noticias, imagens, etc)

### Manutenção

- O sistema deve ser facil de manter e atualizar.
- O sistema deve ser capaz de ser atualizado sem afetar a base de dados.

### Testes

- O sistema deve ter uma bateria extensiva de testes unitarios e de integração.
- O sistema deve ser capaz de ser testado de forma automatizada.
- Deve existir uma suite de testes de aceitação.
- Deve existir uma pipeline de CI/CD.

### Documentação

- Deve existir documentação de utilizador.
- Deve existir documentação com a arquitetura do sistema e os requisitos de segurança.
