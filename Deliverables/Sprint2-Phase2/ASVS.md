# Requisitos de Segurança

## Arquitetura, Design e Ameaça

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 2 | CWE-502  | ContinousIntegration | Implementação do Sonar Cloud |  |
| Nível 2 | CWE-250  | ContinousIntegration | Implementação do Docker Scout verifica a utilização de privilégio em operações que podem ser exploradas |  |
| Nível 2 | CWE-284  | ContinousIntegration | Implementação do Docker Scout deteta problemas em controlo de acessos nos componentes da imagem Docker |  |
| Nível 2 | CWE-284  | ContinousIntegration | Build da imagem Docker verifica que as imagens não utilizam demasiadas permissões |  |
| Nível 2 | CWE-1104  | ContinousIntegration | Implementação de Sonar Cloud e Docker Scout enviam relatórios e avisos sobre componentes e o Dependabot deteta dependências inválidas e cria PRs |  |
| Nível 2 | CWE-284 | Infrastructure | Restrição de tráfego a portas especificas e serviços, reduz o acesso não autorizado | |
| Nível 2 | CWE-306 | Infrastructure | Apenas ser possível aceder o backend através do frontend com autenticação apropriada | |

## Autenticação Segura

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 3 | CWE-319 | Infrastructure | Utilização de 2 containers distintos | |

## Controlo de Acesso Adequado

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-285 | Infrastructure |  Acesso restrito, apenas ao frontend | |
| Nível 1 | CWE-732 | Infrastructure | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | |
| Nível 1 | CWE-639 | Infrastructure |  Apenas ser possível aceder frontend o que diminui a superfície de ataque | |

## Tratamento e registo de erros

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-210 | Infrastructure | Criação de métodos para tratamento de logs controlando a mensagem de erro exibida tendo em conta informações sensíveis. | private handleError - news.service.ts  |
| Nível 2 | CWE-544 | Infrastructure | Criação de métodos para tratamento de logs associados a operações realizadas no código (ex. API Requests) | private handleError - news.service.ts  |
| Nível 2 | CWE-200 | Infrastructure | Criação de métodos para tratamento de logs sincronizados com a data e hora correta | private handleError - news.service.ts  |


## Proteção de Informação

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 2 | CWE-285 | Infrastructure | Acesso apenas à frontend reduz o risco de exposição de informação sensível | |
