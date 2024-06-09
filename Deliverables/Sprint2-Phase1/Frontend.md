# FrontEnd

O FrontEnd de um portal de notícias online é a interface principal com a qual os utilizadores interagem. Responsável pela apresentação visual e pela navegação, permite aos utilizadores ler e explorar notícias, além de realizar funções específicas como edição de conteúdo, caso tenham as permissões necessárias.

O código de FrontEnd associado ao portal de noticias online, pode ser encontrado no seguinte caminho:

Code > FE > login_Auth0 > newsMain

## Tecnologia

O front end foi desenvolvido utilizando a framework Angular. Angular é uma plataforma que permite a criação de aplicações web. Suporta modularidade e injeção de dependência, facilitando a gestão de estados e a organização do código para o desenvolvimento de interfaces de utilizador interativas.

## Como funciona de forma geral

O Frontend é composto por uma infrastrutura interligada por componentes e serviços.

**Componentes** são os blocos de construção fundamentais da aplicação Angular. Cada componente controla uma parte da tela chamada de vista e consiste em um ficheirode template HTML para o desgin da página, um ficheiro TypeScript para a lógica, e um ficheiro de estilo CSS para o estilo. Os componentes são responsáveis por renderizar a interface do utilizador, responder a eventos do utilizador e interagir com os dados através de serviços.

**Serviços** são classes que fornecem funcionalidades específicas que não estão diretamente relacionadas à visualização, como a comunicação de dados com um servidor backend, validação de dados ou log de informações. Os serviços são projetados para serem reutilizáveis em diferentes partes da aplicação e podem ser injetados nos componentes através do sistema de injeção de dependência do Angular. Isso promove uma arquitetura de baixo acoplamento e alta coesão, facilitando a manutenção e teste da aplicação.

No contexto prático:

O componente App é a base principal da página web, as restantes interfaces são direcionadas através de rotas, definidas no app-routing.module.ts., estas rotas associam-se a modulos definidos no app.module.ts.

Exemplo de Rotas:

![1716151506885](image/FrontEnd/1716151506885.png)

## Como funciona com o BackEnd

A aplicação comunica com um backend para realizar operações de autenticação e gerenciamento das notícias. A comunicação é feita através de serviços Angular (Services), que utilizam o módulo HttpClient para enviar requisições HTTP para a API do backend. O backend é responsável pela autenticação, uma vez que verifica as credenciais do utilizador e retornar um token de autenticação.
Também gere as notícias do site, pois recebe, armazena e fornecer os dados das notícias, bem como os respetivos estados de submissão e validação.

## Como funciona a autenticação

A autenticação é feita pelo AuthenticationService, que lida com o login, logout e verificação do estado de autenticação do utilizador. O serviço utiliza Observables para atualizar o estado da aplicação em tempo real. O método de login envia as credenciais do utilizador para o backend e se as credenciais forem válidas, armazena o token de autenticação e atualiza o estado isLoggedIn. O logout limpa o token de autenticação e atualiza o estado isLoggedIn para false.

## Roles

Os roles são gerenciados diretamente no ficheiro AppComponent, o que permite a mudança de role através de métodos específicos, tais como setRoleJornalista, setRoleEditor e setRoleLeitor. Dependendo do role do utilizador, a UI de navegação é adaptada para mostrar ou ocultar determinadas opções.No caso do leitor esto pode ver as últimas notícias e navegar na página inicial. Para o jornalista, além das permissões do Leitor, pode submeter novas notícias. Por fim o editor, além das permissões do Jornalista, pode validar notícias submetidas.

## Estrotura da parte de backend
src/app: Contém o código da aplicação

components: Contém os componentes da aplicação (e.g., home, login, news, etc.)

services: Contém os serviços que fazem a comunicação com o backend

models: Contém as classes que representam os dados da aplicação

dto: Contém os objetos de transferência de dados (Data Transfer Objects)

messages: Contém mensagens e constantes usadas na aplicação

app.module.ts: O módulo principal da aplicação

app-routing.module.ts: Configura as rotas da aplicação