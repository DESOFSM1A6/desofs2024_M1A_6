# Continous Integration

## Design CI e Deploy pipelines

De forma a executar a pipeline `ci.yml` é necessário ser realizado uma das 3 ações:

- Pull Request para o branch `main`;
- Push para `main` (e.g. após um Pull Request);
- Manualmente.

Já na pipeline `deploy.yml`, é apenas possível de uma forma:

- A pipeline `ci.yml` ser executada no branch `main`, uma vez que esta pipeline é apenas executada quando chamada.

As pipelines estão organizadas da seguinte forma, por ordem de execução:

- Na pipeline `ci.yml` que tem as mesmas ações mas em jobs diferentes para o Frontend e Backend:
  - Inicialmente é realizado um job de `Build & Test` do código.
  - De seguida é realizada uma análise estática ao código de forma a serem identificadas vulnerabilidades e assegurar a qualidade no código.
  - Após ser válido, é realizado a build da image de Docker
  - Após o build da imagem, é utilizada a ferramenta `Docker Scout` para realizar uma análise à imagem para tentar detetar vulnerabilidades de segurança e falhas em configurações.

- No fim da pipeline `ci.yml` é chamado a pipeline `deploy.yml` e caso as condições para ser executada existam, é realizado o seguinte:
  - A transferência da informação para a Máquina Virtual, na qual apenas as imagens Docker necessárias são construídas e levantadas de forma a correr a versão mais recente. Este deployment apenas é possível no branch `main` e após ser aprovada a release por 1 pessoa no ambiente `production`.

![alt text](./MarkdownImages/Pipeline/final_pipeline.png)

## Dependabot

Enquanto as pipelines previamente referidas são triggered a cada commit se alguma mudança no respetivo código for realizado (e.g. para o frontend na pasta ./Code/FE/), foi ainda implementada outra ferramenta de forma a manter todas as dependências atualizadas, Dependabot.

É uma tool criada pelo Github que dependendo das configurações, cria Pulll Requests com atualizações, envia notificações, entre outros.
Decidimos utilizá-la uma vez que adiciona mais uma camada de segurança à nossa aplicação.
