# Backend
## Linguagem
O backend foi desenvolvido em Java, utilizando o framework Spring Boot. A escolha desta linguagem foi feita com base na experiência prévia dos membros do grupo, bem como na facilidade de integração com o Keycloak, que foi escolhido para a autenticação. 

## Estrutura
O backend foi dividido em 4 módulos principais:
1. **Controller**: Responsável por receber os pedidos REST e encaminhá-los para os serviços adequados.
2. **Service**: Contém a lógica de negócio da aplicação.
3. **Repository**: Responsável por interagir com a base de dados.
4. **Model**: Contém as classes que representam as entidades da aplicação.
Esta arquitetura respeita a separação de responsabilidades, facilitando a manutenção e a escalabilidade do sistema. Baseia-se no padrão de arquitetura de software Onion Architecture.

Nesta fase do projeto foi implementado um endpoint para a criação de notícias, que recebe um objeto JSON com os dados da notícia e a guarda na base de dados. Foi também implementado um endpoint para a listagem de todas as notícias, que retorna um array JSON com todas as notícias guardadas na base de dados. A funcionalidade de criar outros value objects relacionados com a notício como os comentários ou likes não foi implementada nesta fase do projeto.

## Base de Dados
O DBMS escolhido foi mySQL, devido à sua popularidade e facilidade de integração com o Spring Boot. A base de dados foi modelada com base nas entidades da aplicação, utilizando o conceito de ORM (Object-Relational Mapping) para mapear as classes Java para tabelas no mySQL. Foi utilizado o Hibernate como biblioteca ORM, que facilita a interação com a base de dados e a escrita de queries em HQL (Hibernate Query Language).
Foi aplicada uma politica de acessos à base de dados. Nesta politica, existe um utilizador para aplicação que apenas tem acesso de leitura e escrita nas colunas necessárias para a aplicação funcionar. Este utilizador é utilizado pela aplicação para aceder à base de dados. Existe ainda um outro utilizado que tem acesso total à base de dados, este utilizador é utilizado para fazer a criação da base de dados e das tabelas.


## Requisitos de Segurança

### Configuration

| Number   | ASVS Level | CWE Code | Correção                                                                                                                                                                                            | Prova                                                                                                                                                                          |
|----------|------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| #14.3.2  | Nível 1    | CWE-497  | Definição do nivel INFO para logs nas configurações do Spring Boot                                                                                                                                  | [Link](../../Code/BE/src/main/resources/application.properties)                                                                                                                |
| #5.3.4   | Nível 1    | CWE-89   | Utilização de Hibernate ORM para evitar SQL Injection                                                                                                                                               | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/repositories/NewsRepository.java)                                                                                |
| #5.3.10  | Nível 1    | CWE-643  | Utilização de json e assim evitar de xpath injection e de xml injection                                                                                                                             | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #7.1.1/2 | Nível 1    | CWE-532  | Não é efetuado nenhum log de objetos de domínio                                                                                                                                                     | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #7.3.4   | Nivel 2    |          | A aplicação usa s4j para logs, estes logs são emitidos na timezone do sistema, sendo este sempre UTC                                                                                                |                                                                                                                                                                                |
| #8.3.1   | Nivel 1    | CWE-319  | Não são usados query string parameters, todos os parametros são passados no body da request                                                                                                         | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #10.3.2  | Nível 1    | CWE-353  | As dependencias foram todas analisadas na iteração 1. São utilizados dois sistemas externos, o Keycloak e o MySQL, tendo o keycloak analisado em outro documento                                    | [Link](./Authentication.md)                                                                                                                                                    |
| #11.1.5  | Nível 1    | CWE-841  | A lógica de negocio é testada com um grande número de testes unitários, existindo na aplicação completa um threshold 40% de code coverage e nas classes de dominio e de serviço um threshold de 80% | [Link](../../Code/BE/src/test/java/pt/ipp/isep/dei/desofsnews/services/NewsServiceTest.java) [Sonar](https://sonarcloud.io/project/overview?id=desofsm1a6_desofs2024_M1A_6_BE) |
| #13.1.1  | Nivel 1    | CWE-116  | Todos os enpoint usam como body json com encoding utf-8                                                                                                                                             | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #13.1.2  | Nivel 1    | CWE-419  | Nenhum dos endpoints expõe informação além do nome do objecto                                                                                                                                       | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #13.2.2  | Nivel 1    | CWE-20   | A aplicação utilizada Spring boot, que faz a validação de schema contra os DTOs                                                                                                                     | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/controllers/NewsController.java)                                                                                 |
| #13.2.5  | Nivel 1    | CWE-436  | Foi implementado um filtro que verifica o content-type da request, garantindo que apenas são aceites pedidos com content-type application/json                                                      | [Link](../../Code/BE/src/main/java/pt/ipp/isep/dei/desofsnews/filters/ContentTypeCheckingFilter.java)                                                                          |
