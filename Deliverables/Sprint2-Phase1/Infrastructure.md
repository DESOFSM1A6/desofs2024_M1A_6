# Infraestrutura

## Design

De forma a manter todas as comunicações de forma privada para cumprir requisitos de segurança, foi adotada a estrutura demonstrada na imagem. É constituida por uma Máquina Virtual (VM), na qual estão presentes todos os containers e uma Reverse Proxy. 

![alt text](./MarkdownImages/Infra/infraestrutura.drawio.png)

### VM

A VM está configurada para permitir tráfego apenas através da porta onde a Reverse Proxy (Nginx) está à escuta.

### Reverse Proxy

A Reverse Proxy utilizada é o Nginx. O Nginx foi implementado com o objetivo de garantir que os usuários apenas consigam aceder o frontend da aplicação. Dessa forma, o acesso é restrito e controlado exclusivamente pelas configurações definidas no Nginx, protegendo os serviços backend, base de dados e o de autenticação de acessos diretos não autorizados.

### Containers

Cada um dos container tem o seu respetivo Dockerfile, que será inicializado com o seu respetivo IP utilizado um ```docker-compose.yml```. Com isto, a configuração do Nginx apenas redireciona o IP atribuído ao container do Frontend, e os restantes containers comunicam entre si, como demonstrado no diagrama.

Para os administradores conseguirem configurar a base de dados e/ou o Keycloak, têm que aceder à VM e a partir daí sim, conseguem aplicar as mudanças desejadas. No caso dos utilizadores, apenas têm de acederem ao IP da VM para ter acesso à aplicação.

## Requisitos de Segurança


### Arquitetura, Design e Ameaça

| ASVS Level | CWE Code | Correção | Prova |
|------------|----------|----------|----------|
| Nível 2    | CWE-284  | Restrição de tráfego a portas especificas e serviços, reduz o acesso não autorizado | |
| Nível 2    | CWE-306  | Apenas ser possível aceder o backend através do frontend com autenticação apropriada | |

### Autenticação Segura

| ASVS Level | CWE Code | Correção | Prova |
|------------|----------|----------|----------|
| Nível 3    | CWE-319  | Utilização de 2 containers distintos | |

### Controlo de Acesso Adequado

| ASVS Level | CWE Code | Correção | Prova |
|------------|----------|----------|----------|
| Nível 1    | CWE-285  | Implementação da Reverse Proxy | |
| Nível 1    | CWE-285  | Acesso restrito, apenas ao frontend | |
| Nível 1    | CWE-732  | Aceder apenas ao frontend reduz o risco de atribuição de permissões a recursos ao qual utilizadores não deveriam ter acesso | |
| Nível 1    | CWE-639  | Apenas ser possível aceder frontend o que diminui a superfície de ataque | |

### Proteção de Informação

| ASVS Level | CWE Code | Correção | Prova |
|------------|----------|----------|----------|
| Nível 2    | CWE-285  | Acesso apenas à frontend reduz o risco de exposição de informação sensível | |