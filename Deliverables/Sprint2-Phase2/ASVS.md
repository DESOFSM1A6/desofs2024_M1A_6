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
| Nível 2 | CWE-1110 | Controle de Acesso | Verificação das restrições de segurança funcionais nos US e recursos. | |
| Nível 2 | CWE-1059 | Documentação de Segurança| Documentação e justificação de todos os limites de confiança, componentes e fluxos de dados significativos da aplicação. | |

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

## Validação e Sanitização

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-732 | Frontend | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | |
| Nível 1 | CWE-235 | Input Validation | Acesso apenas à frontend reduz o risco de exposição de informação sensível|Verificar se a aplicação implementa defesas contra ataques de poluição de parâmetros HTTP. Por exemplo, use devidamente as funções de validação e sanitização para todos os parâmetros recebidos pela aplicação, independentemente da fonte (GET, POST, cookies, headers, variáveis de ambiente). |
| Nível 1| CWE-138 | Output encoding and Injection Prevention  | Verificar se a codificação de saída é relevante para o interpretador e contexto necessários. Por exemplo, use codificadores específicos para valores HTML, atributos HTML, JavaScript, parâmetros de URL, cabeçalhos HTTP. | |
| Nível 1 | CWE-830 |Verificar se a aplicação protege contra ataques de injeção JSON, ataques de avaliação JSON e avaliação de expressão JavaScript. | |
| Nível 1 | CWE-943 | Verificar se a aplicação protege contra vulnerabilidades de injeção LDAP ou se controles específicos de segurança foram implementados para prevenir a injeção LDAP. | |

## Proteção de Informação

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-235 | Infrastructure | Proteção contra poluição de pedidos HTTP | Sanitizar Pedidos API ex.(ParameterSanitizerInterceptor - FE)  |
| Nível 1 | CWE-915 | Infrastructure | Proteção contra ataques de atribuição massiva de parâmetros | Utilização de DTO's e uso de permissões explícitas  |

