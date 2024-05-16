## Contents
- [Architecture Background](#architecture-background)
	- [Problem Background](#problem-background)
		- [System Overview](#system-overview)
		- [Context](#context)
		- [Driving Requirements](#driving-requirements)
			- [Functional requirements](#functional-requirements)
			- [Quality attributes](#quality-attributes)
				- [Funcionalidade](#funcionalidade)
				- [Usabilidade](#usabilidade)
				- [Confiabilidade (Reliability)](#confiabilidade-reliability)
				- [Desempenho (Performance)](#desempenho-performance)
				- [Suportabilidade](#suportabilidade)
				- [Design constraints](#design-constraints)
				- [Implementation constraints](#implementation-constraints)
				- [Interface constraints](#interface-constraints)
				- [Physical constraints](#physical-constraints)
	- [Solution Background](#solution-background)
		- [Architectural Approaches](#architectural-approaches)
		- [Analysis Results](#analysis-results)

# Architecture Background
>Architecture Background provides information about the software architecture, by:
>- describing the background and rationale for the software architecture;
>- explaining the constraints and influences that led to the current architecture;
>- describing the major architectural approaches that have been utilized in the architecture.

## Problem Background

### System Overview

A empresa ElectricGo pretende um sistema que lhe permita gerir a sua frota de camiões elétricos na distribuição de encomendas entre os vários armazéns da empresa.

### Context
A empresa EletricAcme, S.A1. pretende um sistema que lhe permita gerir a sua frota de camiões.
elétricos na distribuição de mercadorias entre os vários armazéns da empresa.
A empresa tem lojas numa série de municípios (Arouca; Espinho; Gondomar; Maia; Matosinhos;
Oliveira de Azeméis; Paredes; Porto; Póvoa do Varzim; Santa Maria da Feira; Santo Tirso; São
João da Madeira; Trofa; Vale de Cambra; Valongo; Vila do Conde; Vila Nova de Gaia) e todas as
lojas têm um armazém, onde estão produtos para irem depois para venda na loja.
Devido à existência do porto de Leixões, a loja de Matosinhos foi escolhida para ter o armazém
principal, onde chegam lotes de produtos para depois irem para os armazéns das lojas nos vários
municípios onde a empresa tem lojas. Este armazém é também a sede da empresa onde se situa
o Centro de Processamento de Dados (CPD), ao qual estão ligados postos em todos os armazéns.

### Driving Requirements

#### Functional requirements
1. Como gestor de armazéns, pretendo criar um armazém.
2. Como gestor de armazéns, pretendo criar uma entrega.
3. Como gestor de frota, pretendo criar um camião.
4. Como gestor de logística, pretendo criar um percurso entre 2 armazéns.
5. Como gestor de logística pretendo obter o Planeamento da rota para 1 camião e 1 dado dia  
6. Como gestor de logística pretendo visualizar graficamente em 3D a rede viária.
7. Como gestor de logística pretendo visualizar graficamente os armazéns existentes. Criar ou importar os modelos 3D correspondentes.
8. Como gestor de logística pretendo controlar a visualização. Adicionar os comandos da câmara pan, zoom e orbit.
9. Efetuar Planeamento de frota para 1 camião e 1 dado dia.
10. Recebendo os dados das entregas a fazer por 1 camião  e dos troços entre armazéns: gerar todas as trajetórias possíveis através de sequências de armazéns onde deverão ser feitas as entregas.
11. Avaliar as trajetórias de armazéns de acordo com o tempo para completar todas as entregas e voltar ao armazém base de Matosinhos e escolher a solução que permite a volta do camião mais cedo.
12. Aumentar a dimensão do problema anterior (colocando mais armazéns a visitar) e verificar até que dimensão é viável proceder do modo adotado (com um gerador de todas as soluções) efetuando um estudo de complexidade do problema.
13. Implementar heurísticas que possam rapidamente gerar uma solução (não necessariamente a melhor) e avaliar a qualidade dessas heurísticas (por exemplo, entregar no armazém mais próximo; efetuar de seguida a entrega com maior massa; combinar distância para a entrega com massa entregue).
14. Pipeline de build contínuo para módulo master data.
15. Deployment automático de um dos módulos via pipeline num ambiente cloud  
16. Como administrador do sistema quero que apenas os clientes da rede interna do DEI (cablada ou via VPN) possam aceder à solução.
17. Como administrador quero identificar e quantificar os riscos envolvidos na solução preconizada.
18. Como administrador do sistema quero que seja definido o MBCO (Minimum Business Continuity Objective) a propor aos stakeholders.


#### Quality attributes

##### Funcionalidade
1. Cada sistema só poderá aceder aos dados que lhe dizem respeito.
2. Deve ser auditada e verificada a integridade da informação a que os sistemas acedem.
3. Com vista à necessidade de saber e necessidade de conhecer, toda a informação deve estar protegida de acessos indevidos. Ou seja, o princípio de minimização de acesso ao que é essencial para cada utilizador/aplicação, criação de túneis para transferência de informação, avaliação da integridade de dados e aplicações, e encriptação/minimização dos dados.

##### Usabilidade
4. A SPA deve permitir acesso a todos os módulos do sistema: MDA, planeamento e MDL.

##### Confiabilidade (Reliability)
n/a

##### Desempenho (Performance)
n/a

##### Suportabilidade
5. Embora não esteja no âmbito atual do projeto, deve ser levado em conta na arquitetura da solução, a extensão futura para aplicações móveis.

##### Design constraints
6. O sistema deve ser composto por uma aplicação web do tipo Single Page Application (SPA) que permite aos utilizadores acederem aos diferentes módulos da aplicação.

De um modo geral, as principais funcionalidades de cada módulo são as seguintes:

- MDA – permite a gestão de armazéns
- Planeamento – permite a gestão de criar rotas de armazéns para uma frota de camiões elétricos
- Visualizador 3D –  permite visualizar graficamente em 3D a rede viária e os armazéns existentes
- UI – interface com o utilizador
- MDL - permite a gestão de camiões e percursos

##### Implementation constraints
7.   Todos os módulos devem fazer parte do código fonte da mesma SPA e serem disponibilizados como um único artefacto.

##### Interface constraints
8.  A SPA deve permitir acesso aos seguintes módulos do sistema: Módulo de Armazéns(MDA) e Módulo de Logística(MDL).
9.  A SPA deve produzir histórico no browser.
10.  O módulo de Planeamento deve ser acedido através do MDL.

##### Physical constraints
20. Os componentes devem estar implementados em IaaS e PaaS.

![Vista-fisica](diagramas/nivel2/N2VF.jpg)

## Solution Background

### Architectural Approaches

Baseado nos requisitos não funcionais e restrições de design, serão adotadas as seguintes abordagens/padrões/estilos:

- Web Application, em que o frontend é desempenhado por uma SPA (Single Page Application), e que o backend é desempenhado pelos módulos MDA, MDL e Planeamento;
- N-Tier, pois as várias aplicações devem ser implantadas em diferentes máquinas *on premises* e IaaS e PaaS (*on cloud*), de acordo com os requisitos não funcionais;
- Layered architecture, mais especificamente Onion Architecture, por razões académicas.

### Analysis Results

Não existem por agora resultados de análise ou avaliação. Estudos qualitativos acerca dos estilos/padrões adotados (nomeadamente Onion em MDR e MDV, mas também Dependency Injection na UI), permitem empiricamente advogar que a manutenibilidade, evolutabilidade e testabilidade do software são elevadas, ao mesmo tempo que permitem atingir as funcionalidades desejadas.
