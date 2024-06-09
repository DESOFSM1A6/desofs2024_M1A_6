# Requisitos de Segurança


## Arquitetura, Design e Ameaça

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 2 | CWE-250  | ContinousIntegration | Implementação do Docker Scout verifica a utilização de privilégio em operações que podem ser exploradas |  |
| Nível 2 | CWE-284  | ContinousIntegration | Implementação do Docker Scout deteta problemas em controlo de acessos nos componentes da imagem Docker |  |
| Nível 2 | CWE-284  | ContinousIntegration | Build da imagem Docker verifica que as imagens não utilizam demasiadas permissões |  |
| Nível 2 | CWE-284 | Infrastructure | Restrição de tráfego a portas especificas e serviços, reduz o acesso não autorizado | |
| Nível 2 | CWE-306 | Infrastructure | Apenas ser possível aceder o backend através do frontend com autenticação apropriada | |
| Nível 2 | CWE-502  | ContinousIntegration | Implementação do Sonar Cloud |  |
| Nível 2 | CWE-1104  | ContinousIntegration | Implementação de Sonar Cloud e Docker Scout enviam relatórios e avisos sobre componentes e o Dependabot deteta dependências inválidas e cria PRs |  |

| Nível 2 | CWE-1110 | Controle de Acesso | Verificação das restrições de segurança funcionais nos US e recursos. | |
| Nível 2 | CWE-1059 | Documentação de Segurança| Documentação e justificação de todos os limites de confiança, componentes e fluxos de dados significativos da aplicação. | |
| Nível 2 | CWE-502  | ContinousIntegration | Implementação do Sonar Cloud |  |
| Nível 2 | CWE-1104  | ContinousIntegration | Implementação de Sonar Cloud e Docker Scout enviam relatórios e avisos sobre componentes e o Dependabot deteta dependências inválidas e cria PRs |  |


## Autenticação Segura

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-287 | Authentication | Autenticação robusta de utilizadores | ![alt text](./MarkdownImages/Auth/OTPPolicies.png) ![alt text](./MarkdownImages/Auth/MFA_Request.png) | 
| Nível 1 | CWE-303 | Authentication | Verificação de autenticadores | ![alt text](./MarkdownImages/Auth/MFA_Request.png) |
| Nível 1 | CWE-304 | Authentication | Reforço de autenticação multifator | ![alt text](./MarkdownImages/Auth/MFA_Request.png) |
| Nível 1 | CWE-307 | Authentication | Implementação de bloqueio de contas | ![alt text](./MarkdownImages/Auth/Enable_DisableUser.png) |
| Nível 1 | CWE-521| Authentication | Políticas de senhas fortes |![alt text](./MarkdownImages/Auth/PasswordPolicies.png)|
| Nível 1 | CWE-620 | Authentication | Utilização de autenticação multifator (2FA) | ![alt text](./MarkdownImages/Auth/OTPPolicies.png) |
| Nível 1 | CWE-640 | Authentication | Armazenamento seguro de credenciais | ![alt text](./MarkdownImages/Auth/SafeCredentialStorage.png) ![alt text](./MarkdownImages/Auth/SafeCredentialDatabaseStorage.png) https://www.keycloak.org/docs/latest/server_admin/#password-database-compromised|
| Nível 2 | CWE-522 | Authentication | Proteção das credenciais durante a transmissão | ![alt text](./MarkdownImages/Auth/pkce.png) ![alt text](./MarkdownImages/Auth/pkceImplementation.png)  [Redirecionar para a implementação](../../Code/FE/desofs-news/src/app/Services/keycloak-init.factory.ts)|
| Nível 3 | CWE-308 | Authentication | Bloqueio de contas após tentativas falhadas | ![alt text](./MarkdownImages/Auth/BruteForceDetectionPolicies.png) |
| Nível 3 | CWE-319 | Infrastructure | Utilização de 2 containers distintos | |


## Controlo de Acesso Adequado

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-285 | Infrastructure |  Acesso restrito, apenas ao frontend | |
| Nível 1 | CWE-285 | Authentication | Implementação de controlo de acesso baseado em roles | Dependendo da role, é possivel decidir as paginas / conteudo a exibir para cada role.![alt text](./MarkdownImages/Auth/resourceServerFilterChainMethod.png) |
| Nível 1 | CWE-352 | Authentication | Prevenção de ataques Cross-Site Request Forgery (CSRF) | ![CSRF Attacks extraido da documentação do Keycloak](./MarkdownImages/Auth/CSRFAttacks.png) https://www.keycloak.org/docs/latest/server_admin/#csrf-attacks|
| Nível 1 | CWE-419 | Authentication | Verificação de acesso adequado | [Redirecionar para a pasta de implementação dos (Role)Guard](../../Code/FE/desofs-news/src/app/Services/guard/)|
| Nível 1 | CWE-602 | Authentication | Definição de permissões detalhadas |![alt text](./MarkdownImages/Auth/realmRoles1.png)|
| Nível 1 | CWE-639 | Authentication | Atribuição de roles específicos | ![alt text](./MarkdownImages/Auth/RealmRoles.png) |
| Nível 1 | CWE-639 | Infrastructure |  Apenas ser possível aceder frontend o que diminui a superfície de ataque | |
| Nível 1 | CWE-732 | Infrastructure | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | |
| Nível 1 | CWE-497 | Backend | Definição do nivel INFO para logs nas configurações do Spring Boot | [Link](../../Code/BE/src/main/resources/application.properties) |
| Nível 1    | CWE-89 | Backend  | Utilização de Hibernate ORM para evitar SQL Injection                                                                                                                                               | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/repositories/NewsRepository.java)                                                                                |
|  Nível 1    | CWE-643 | Backend | Utilização de json e assim evitar de xpath injection e de xml injection                                                                                                                             | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
|  Nível 1 | Backend  | CWE-532  | Não é efetuado nenhum log de objetos de domínio                                                                                                                                                     | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| Nivel 2    |  | Backend        | A aplicação usa s4j para logs, estes logs são emitidos na timezone do sistema, sendo este sempre UTC                                                                                                |                                                                                                                                                                                |
|  Nivel 1    | CWE-319 | Backend | Não são usados query string parameters, todos os parametros são passados no body da request                                                                                                         | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| Nível 1    | CWE-353 | Backend | As dependencias foram todas analisadas na iteração 1. São utilizados dois sistemas externos, o Keycloak e o Postegres, tendo o keycloak analisado em outro documento                                    | [Link](./Authentication.md)                                                                                                                                                    |
|  Nível 1    | CWE-841 | Backend | A lógica de negocio é testada com um grande número de testes unitários, existindo na aplicação completa um threshold 40% de code coverage e nas classes de dominio e de serviço um threshold de 80% | [Link](../../Code/BE/src/test/java/pt/ipp/isep/dei/desofsnews/services/NewsServiceTest.java) [Sonar](https://sonarcloud.io/project/overview?id=desofsm1a6_desofs2024_M1A_6_BE) |
| Nivel 1    | CWE-116 | Backend | Todos os enpoint usam como body json com encoding utf-8                                                                                                                                             | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| Nivel 1    | CWE-419 | Backend | Nenhum dos endpoints expõe informação além do nome do objecto                                                                                                                                       | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| Nivel 1    | CWE-20  | Backend | A aplicação utilizada Spring boot, que faz a validação de schema contra os DTOs                                                                                                                     | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| Nivel 1    | CWE-436 | Backend | Foi implementado um filtro que verifica o content-type da request, garantindo que apenas são aceites pedidos com content-type application/json                                                      | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/filters/ContentTypeCheckingFilter.java)                                                                          |



## Validação e Sanitização

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-732 | Frontend | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | |
| Nível 1 | CWE-235 | Frontend | Acesso apenas à frontend reduz o risco de exposição de informação sensível|Verificar se a aplicação implementa defesas contra ataques de poluição de parâmetros HTTP. Por exemplo, use devidamente as funções de validação e sanitização para todos os parâmetros recebidos pela aplicação, independentemente da fonte (GET, POST, cookies, headers, variáveis de ambiente). |
| Nível 1| CWE-138 | Frontend  | Verificar se a codificação de saída é relevante para o interpretador e contexto necessários. Por exemplo, use codificadores específicos para valores HTML, atributos HTML, JavaScript, parâmetros de URL, cabeçalhos HTTP. | |
| Nível 1 | CWE-830 | Frontend Verificar se a aplicação protege contra ataques de injeção JSON, ataques de avaliação JSON e avaliação de expressão JavaScript. | |


## Proteção de Informação

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-235 | Infrastructure | Proteção contra poluição de pedidos HTTP | Sanitizar Pedidos API ex.(ParameterSanitizerInterceptor - FE)  |
| Nível 1 | CWE-915 | Infrastructure | Proteção contra ataques de atribuição massiva de parâmetros | Utilização de DTO's e uso de permissões explícitas  |
| Nível 1 | CWE-732 | Frontend | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | 



## Gestão de Sessão Segura

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-16 | Authentication | Gestão segura de sessões | ![alt text](./MarkdownImages/Auth/clientSessionIdle.png) |
| Nível 1 | CWE-331 | Authentication | Geração de tokens seguros | ![alt text](./MarkdownImages/Auth/signatureAlgorithm.png) |
| Nível 1 | CWE-384 | Authentication | Implementação de binding de sessão | ![alt text](./MarkdownImages/Auth/pkceMethod.png) |
| Nível 1 | CWE-539 | Authentication | Configuração de expiração de sessão | ![alt text](./MarkdownImages/Auth/accessTokenLifespan.png) |
| Nível 1 | CWE-598 | Authentication | Utilização de cookies seguros | Por razões de custos, não foi implementado devido ao servidor estar por HTTP, o que não permite cookies seguros, mas que num ambiente organizacional |
| Nível 1 | CWE-613 | Authentication | Prevenção de fixação de sessão | ![alt text](./MarkdownImages/Auth/revokeRefreshToken.png) |
| Nível 1 | CWE-614 | Authentication | Proteção de cookies contra ataque de rede |  |
| Nível 1 | CWE-778 | Authentication | Defesas contra exploits de gestão de sessão | ![alt text](./MarkdownImages/Auth/revokeRefreshToken.png) ![alt text](./MarkdownImages/Auth/ssoSettings.png) |
| Nível 1 | CWE-1004 | Authentication | Verificação de tokens |  |


## Tratamento de Erro e Logging

| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-210 | Authentication | Proteção de logs contra acessos não autorizados | Apenas o administrador tem acesso à pagina de eventos, e o mesmo tem Multi Factor Authentication:![alt text](./MarkdownImages/Auth/eventPage.png) | 
| Nível 1 | CWE-210 | Frontend | Criação de métodos para tratamento de logs controlando a mensagem de erro exibida tendo em conta informações sensíveis. | private handleError - news.service.ts  |
| Nível 1 | CWE-532 | Authentication | Implementação de logging seguro |  | 
| Nível 2 | CWE-117 | Authentication | Sanitização de mensagens de erro | ![alt text](./MarkdownImages/Auth/loginError.png) ![alt text](./MarkdownImages/Auth/loginPageError.png) | 
| Nível 2 | CWE-200 | Authentication | Evitar a exposição de informações sensíveis | ![alt text](./MarkdownImages/Auth/userEventExample.png) ![alt text](./MarkdownImages/Auth/adminEventExample.png)| 
| Nível 2 | CWE-200 | Frontend | Criação de métodos para tratamento de logs sincronizados com a data e hora correta | private handleError - news.service.ts  |
| Nível 2 | CWE-285 | Authentication | Acesso controlado a logs | Apenas o administrador tem acesso à pagina de eventos, e o mesmo tem Multi Factor Authentication:![alt text](./MarkdownImages/Auth/eventPage.png) | 
| Nível 2 | CWE-544 | Authentication | Configuração de políticas de retenção de logs | ![alt text](./MarkdownImages/Auth/userEvents.png) ![alt text](./MarkdownImages/Auth/adminEvents.png) | 
| Nível 2 | CWE-544 | Frontend | Criação de métodos para tratamento de logs associados a operações realizadas no código (ex. API Requests) | private handleError - news.service.ts  |
| Nível 2 | CWE-778 | Authentication | Prevenção de exploits através de logs | | 

## File and Resource
| ASVS Level | CWE Code | Componente | Correção | Prova |
|------------|----------|----------|----------|----------|
| Nível 1 | CWE-400 | Frontend | verificar que não são aceites ficheiros muito grandes|   |
| Nível 1 | CWE-512 | Frontend | Aceita apenas algumas estenções de ficheiros| |
