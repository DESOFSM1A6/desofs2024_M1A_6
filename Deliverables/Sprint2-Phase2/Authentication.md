# Keycloak

## O que é?
Keycloak é uma ferramenta de código aberto para gestão de identidades e acessos (Identity and Access Management, IAM). Desenvolvida pela Red Hat, esta solução facilita a autenticação e autorização de aplicações, seja para ambientes on-premise ou em nuvem.

Aqui estão as principais funcionalidades do Keycloak:

1.Single Sign-On (SSO):

* Permite que os utilizadores façam login uma vez e acessem múltiplas aplicações sem precisar reinserir credenciais.

2.Gestão de Utilizadores:

* Criação, modificação e remoção de utilizadores.
* Suporta grupos e funções de utilizadores.
* Integração com diretórios de utilizadores como LDAP e Active Directory.

3 Autenticação e Autorização:

* Suporte para diferentes métodos de autenticação, incluindo multifatorial (MFA).
* Gestão de permissões baseada em papéis (RBAC - Role-Based Access Control).

4.Federation:

* Integração com outros provedores de identidade (IdPs) como SAML 2.0, OpenID Connect, e OAuth 2.0.
* Permite a utilização de credenciais de serviços externos como Google, Facebook, GitHub, etc.

5.Configuração e Personalização:

* Interfaces de administração para configurar e gerir todos os aspectos do sistema.
* Personalização das páginas de login e outras interfaces para alinhar com a identidade visual da organização.

Devido a estas funcionalidades anteriores, decidiu-se implementar a ferramenta Keycloak como forma de autenticação.

## Implementação

O keycloak foi instalado recorrendo a um [Docker Compose](../../Code/BE/KeycloakConfigs/docker-compose.yml) que monta 2 containers, um para o keycloak, outro para a base de dados Postgre que irá guardar os dados, e o redis para a cache.

Após levantar os containers, é só ir à porta 9090 e fazer as configurações necessárias.
As configurações que estão implementadas de momento foram exportadas para um ficheiro JSON, que pode ser encontrado [aqui](../../Code/BE/KeycloakConfigs/realm-jn-desofs-v4.json).
