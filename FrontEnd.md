

**Estrutura do FE**

A estrutura do frontend nestd projeto Angular foi organizada nas pastas principais como src, assets e environments. O app.module.ts declara os diferentes componentes, diretivas e serviços, já o ficheiro app-routing.module.ts define as rotas de navegação da aplicação. Os componentes interagem via injeção de dependência, propriedades de entrada e eventos de saída, para agilizar a comunicação entre os mesmos. Cada componente, como o app.component.ts, controla aspectos específicos da aplicação, como autenticação e navegação. A estrutura facilita a colaboração e manutenção do código,para desencadear um desenvolvimento de código mais eficiente com a utilização do Angular.

+ Tecnologia TC
+ Como funciona de forma geral TC 

**Como funciona com o BE**
A aplicação comunica com um backend para realizar operações de autenticação e gerenciamento das notícias. A comunicação é feita através de serviços Angular (Services), que utilizam o módulo HttpClient para enviar requisições HTTP para a API do backend. O backend é responsável pela autenticação, uma vez que verifica as credenciais do utilizador e retornar um token de autenticação.
Também gere as notícias do site, pois recebe, armazena e fornecer os dados das notícias, bem como os respetivos estados de submissão e validação.

**Como funciona a autenticação**
A autenticação é feita pelo AuthenticationService, que lida com o login, logout e verificação do estado de autenticação do utilizdor. O serviço utiliza Observables para atualizar o estado da aplicação em tempo real. O método de login envia as credenciais do utilizador para o backend e se as credenciais forem válidas, armazena o token de autenticação e atualiza o estado isLoggedIn. O logout limpa o token de autenticação e atualiza o estado isLoggedIn para false.

**Roles**
Os roles são gerenciados diretamente no ficheiro AppComponent, o que permite a mudança de role através de métodos específicos, tais como setRoleJornalista, setRoleEditor e setRoleLeitor. Dependendo do role do utilizador, a UI de navegação é adaptada para mostrar ou ocultar determinadas opções.No caso do leitor esto pode ver as últimas notícias e navegar na página inicial. Para o jornalista, além das permissões do Leitor, pode submeter novas notícias. Por fim o editor, além das permissões do Jornalista, pode validar notícias submetidas.