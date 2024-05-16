## Contents

- [Views](#views)
  - [Introduction](#introduction)
  - [Nível 1](#nível-1)
    - [Vista Lógica](#vista-lógica)
    - [Vista de Casos de Uso](#vista-de-casos-de-uso)
    - [Vista de Processos](#vista-de-processos)
      - [SSD UC1](#ssd-uc1)
      - [SSD UC2](#ssd-uc2)
      - [SSD UC3](#ssd-uc3)
      - [SSD UC4](#ssd-uc4)
      - [SSD UC5](#ssd-uc5)
      - [SSD UC6](#ssd-uc6)
      - [SSD UC7](#ssd-uc7)
      - [SSD UC8](#ssd-uc8)
      - [SSD UC9](#ssd-uc9)
      - [SSD UC10](#ssd-uc10)
      - [SSD UC11](#ssd-uc11)
      - [SSD UC12](#ssd-uc12)
      - [SSD UC13](#ssd-uc13)
  - [Nível 2](#nível-2)
    - [Vista Lógica](#vista-lógica-1)
    - [Vista de Processos](#vista-de-processos-1)
      - [SSD UC1](#ssd-uc1-1)
      - [SSD UC2](#ssd-uc2-1)
      - [SSD UC3](#ssd-uc3-1)
      - [SSD UC4](#ssd-uc4-1)
      - [SSD UC5](#ssd-uc5-1)
      - [SSD UC6](#ssd-uc6-1)
      - [SSD UC7](#ssd-uc7-1)
      - [SSD UC8](#ssd-uc8-1)
      - [SSD UC9](#ssd-uc9-1)
      - [SSD UC10](#ssd-uc10-1)
      - [SSD UC11](#ssd-uc11-1)
      - [SSD UC12](#ssd-uc12-1)
      - [SSD UC13](#ssd-uc13-1)
    - [Vista de Implementação](#vista-de-implementação)
    - [Vista Física](#vista-física)
  - [Nível 3 (MDA)](#nível-3-mda)
    - [Vista Lógica](#vista-lógica-2)
    - [Vista de Processos](#vista-de-processos-2)
      - [SD UC1](#sd-uc1)
      - [SD UC2](#sd-uc2)
      - [SD UC3](#sd-uc3)
      - [SD UC4](#sd-uc4)
      - [SD UC5](#sd-uc5)
      - [SD UC6](#sd-uc6)
    - [Vista de Implementação](#vista-de-implementação-1)
  - [Nível 3 (MDL)](#nível-3-mdl)
    - [Vista Lógica](#vista-lógica-3)
    - [Vista de Processos](#vista-de-processos-3)
      - [SD UC7](#sd-uc7)
      - [SD UC8](#sd-uc8)
      - [SD UC9](#sd-uc9)
      - [SD UC10](#sd-uc10)
      - [SD UC11](#sd-uc11)
      - [SD UC12](#sd-uc12)
      - [SD UC13](#sd-uc13)
    - [Vista de Implementação](#vista-de-implementação-2)
  - [Nível 3 (SPA)](#nível-3-spa)
    - [Vista Lógica](#vista-lógica-4)
    - [Vista de Processos](#vista-de-processos-4)
      - [SD UC1](#sd-uc1-1)
      - [SD UC2](#sd-uc2-1)
      - [SD UC4](#sd-uc4-1)
      - [SD UC5](#sd-uc5-1)
      - [SD UC7](#sd-uc7-1)
      - [SD UC8](#sd-uc8-1)
      - [SD UC10](#sd-uc10-1)
      - [SD UC11](#sd-uc11-1)
      - [SD UC13](#sd-uc13-1)
    - [Vista de Implementação](#vista-de-implementação-3)
  - [Nível 3 (Planeamento)](#nível-3-planeamento)
    - [Vista Lógica](#vista-lógica-5)
    - [Vista de Processos](#vista-de-processos-5)
    - [Vista de Implementação](#vista-de-implementação-4)

# Views

## Introduction

Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:

- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).

## Nível 1

### Vista Lógica

![N1-VL](diagramas/nivel1/N1VL.png)

### Vista de Casos de Uso

![N1_VC](diagramas/nivel1/N1_VC.png)

### Vista de Processos

#### SSD UC1

![N1-VP-UC1](diagramas/nivel1/N1VP_CriarArmazem.png)

#### SSD UC2

![N1-VP-UC2](diagramas/nivel1/N1VP_ListarArmazem.png)

#### SSD UC3

![N1-VP-UC3](diagramas/nivel1/N1VP_EditarArmazem.png)

#### SSD UC4

![N1-VP-UC4](diagramas/nivel1/N1VP_CriarEntrega.png)

#### SSD UC5

![N1-VP-UC5](diagramas/nivel1/N1VP_ListarEntregas.png)

#### SSD UC6

![N1-VP-UC6](diagramas/nivel1/N1VP_EditarEntrega.png)

#### SSD UC7

![N1-VP-UC7](diagramas/nivel1/N1_VP_UC7.jpg)

#### SSD UC8

![N1-VP-UC8](diagramas/nivel1/N1_VP_UC8.jpg)

#### SSD UC9

![N1-VP-UC9](diagramas/nivel1/N1_VP_UC9.jpg)

#### SSD UC10

![N1-VP-UC10](diagramas/nivel1/N1VP_CriarPercurso.png)

#### SSD UC11

![N1-VP-UC11](diagramas/nivel1/N1VP_ListarPercursos.png)

#### SSD UC12

![N1-VP-UC12](diagramas/nivel1/N1VP_EditarPercurso.png)

#### SSD UC13

![N1-VP-UC13](diagramas/nivel1/N1VP_VerRota.png)

## Nível 2

### Vista Lógica

![N2-VL](diagramas/nivel2/N2VL.png)

### Vista de Processos

#### SSD UC1

![N2-VP-UC1](diagramas/nivel2/N2VP_CriarArmazem.png)

#### SSD UC2

![N2-VP-UC2](diagramas/nivel2/N2VP_ListarArmazem.png)

#### SSD UC3

![N2-VP-UC3](diagramas/nivel2/N2VP_EditarArmazem.png)

#### SSD UC4

![N2-VP-UC4](diagramas/nivel2/N2VP_CriarEntrega.svg)

#### SSD UC5

![N2-VP-UC5](diagramas/nivel2/N2VP_ListarEntregas.svg)

#### SSD UC6

![N2-VP-UC6](diagramas/nivel2/N2VP_EditarEntrega.svg)

#### SSD UC7

![N2-VP-UC7](diagramas/nivel2/N2_VP_UC7.jpg)

#### SSD UC8

![N2-VP-UC8](diagramas/nivel2/N2_VP_UC8.jpg)

#### SSD UC9

![N2-VP-UC9](diagramas/nivel2/N2_VP_UC9.jpg)

#### SSD UC10

![N2-VP-UC10](diagramas/nivel2/N2VP_CriarPercurso.png)

#### SSD UC11

![N2-VP-UC11](diagramas/nivel2/N2VP_ListarPercursos.png)

#### SSD UC12

![N2-VP-UC12](diagramas/nivel2/N2VP_EditarPercurso.png)

#### SSD UC13

![N2-VP-UC13](diagramas/nivel2/N2VP_VerRota.png)

### Vista de Implementação

![N2-VI](diagramas/nivel2/N2VI.svg)

### Vista Física

![N2-VF](diagramas/nivel2/N2VF.jpg)

## Nível 3 (MDA)

### Vista Lógica

![N3-VL-MDA](diagramas/nivel3/MDA/N3_VL_MDA.png)

### Vista de Processos

#### SD UC1

![N3-VP-UC1](diagramas/nivel3/MDA/N3VP_CriarArmazem.png)

#### SD UC2

![N3-VP-UC2](diagramas/nivel3/MDA/N3VP_ListarArmazem.png)

#### SD UC3

![N3-VP-UC3](diagramas/nivel3/MDA/N3VP_EditarArmazem.png)

#### SD UC4

![N3-VP-UC4](diagramas/nivel3/MDA/N3VP_CriarEntrega.svg)

#### SD UC5

![N3-VP-UC5](diagramas/nivel3/MDA/N3VP_ListarEntregas.svg)

#### SD UC6

![N3-VP-UC6](diagramas/nivel3/MDA/N3VP_EditarEntrega.svg)

### Vista de Implementação

![N3-VI-MDA](diagramas/nivel3/MDA/N3_VI_MDA.png)

## Nível 3 (MDL)

### Vista Lógica

![N3-VL-MDL](diagramas/nivel3/MDL/N3_MDL_VL.jpg)

### Vista de Processos

#### SD UC7

![N3-VP-UC7](diagramas/nivel3/MDL/N3_VP_UC7.jpg)

#### SD UC8

![N3-VP-UC8](diagramas/nivel3/MDL/N3_VP_UC8.jpg)

#### SD UC9

![N3-VP-UC9](diagramas/nivel3/MDL/N3_VP_UC9.jpg)

#### SD UC10

![N3-VP-UC10](diagramas/nivel3/MDL/N3VP_CriarPercurso.png)

#### SD UC11

![N3-VP-UC11](diagramas/nivel3/MDL/N3VP_ListarPercursos.png)

#### SD UC12

![N3-VP-UC12](diagramas/nivel3/MDL/N3VP_EditarPercurso.png)

#### SD UC13

![N3-VP-UC13](diagramas/nivel3/MDL/N3VP_VerRota.png)

### Vista de Implementação

![N3-VI-MDL](diagramas/nivel3/MDL/N3_MDL_VI.jpg)

## Nível 3 (SPA)

### Vista Lógica

![N3-VL-SPA](diagramas/nivel3/SPA/N3_VL_SPA.png)

### Vista de Processos

#### SD UC1

![N3-VP-UC1](diagramas/nivel3/SPA/N3VP_SPA_CriarArmazem.png)

#### SD UC2

![N3-VP-UC2](diagramas/nivel3/SPA/N3VP_SPA_ListarArmazem.png)

#### SD UC4

![N3-VP-UC4](diagramas/nivel3/SPA/N3VP_SPA_CriarEntrega.png)

#### SD UC5

![N3-VP-UC5](diagramas/nivel3/SPA/N3VP_SPA_ListarEntregas.png)

#### SD UC7

![N3-VP-UC7](diagramas/nivel3/SPA/N3_CriarCamiao.png)

#### SD UC8

![N3-VP-UC8](diagramas/nivel3/SPA/N3_ListarCamioes.jpg)

#### SD UC10

![1670180319076](diagramas/nivel3/SPA/N3_CriarPercurso.jpg)

#### SD UC11

![1670180334567](diagramas/nivel3/SPA/N3_ListarPercursos.jpg)

#### SD UC13

![N3-VP-UC13](diagramas/nivel3/SPA/N3VP_SPA_VerRota.png)

### Vista de Implementação

![N3-VI-SPA](diagramas/nivel3/SPA/N3_VI_SPA.png)

## Nível 3 (Planeamento)

### Vista Lógica

TBD

### Vista de Processos

TBD

### Vista de Implementação

TBD
