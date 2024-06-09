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
O DBMS escolhido foi Postegres, devido à sua popularidade e facilidade de integração com o Spring Boot. A base de dados foi modelada com base nas entidades da aplicação, utilizando o conceito de ORM (Object-Relational Mapping) para mapear as classes Java para tabelas no Postegres. Foi utilizado o Hibernate como biblioteca ORM, que facilita a interação com a base de dados e a escrita de queries em HQL (Hibernate Query Language).
Foi aplicada uma politica de acessos à base de dados. Nesta politica, existe um utilizador para aplicação que apenas tem acesso de leitura e escrita nas colunas necessárias para a aplicação funcionar. Este utilizador é utilizado pela aplicação para aceder à base de dados. Existe ainda um outro utilizado que tem acesso total à base de dados, este utilizador é utilizado para fazer a criação da base de dados e das tabelas.
