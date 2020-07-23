<h1 align="center">Event Tracker</h1>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"/></a>
  <img alt="SpringBoot" src="https://img.shields.io/badge/Spring--boot-2.1.4-green"/>
  <a href="https://nextjs.org/learn/excel/typescript"><img alt="Typescript" src="https://img.shields.io/badge/Typescript-Next.js-blue"/></a>
   <a href="https://www.klaytn.com"><img alt="Blockchain" src="https://img.shields.io/badge/Blockchain-Klaytn-blue"/></a>
  <img alt="Typescript" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"/>
</p>

<p align="center">  
  Event Tracker is a blockchain smart contract in event tracking application on Klaytn.<br>
  This project was developed to view the event log for blockchain development.<br>
  Batch work to takes Klaytn blocks and collects event logs.
</p>
</br>

<p align="center">
  <img src="/preview/diagram.jpg"/>
</p>


## Multi Module Project
- [Kotlin](https://kotlinlang.org/) based
- use [Spring Boot](https://spring.io/projects/spring-boot)

### Tracker-api
Respond to the REST-API request of the web page.
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring jPA](https://spring.io/projects/spring-data-jpa)
- [caver.java](https://github.com/klaytn/caver-java) Klaytn Dapp API
- [Jackson](https://github.com/FasterXML/jackson)

### Tracker-batch
Takes Klaytn blocks and collects event logs
- [Spring Batch](https://spring.io/projects/spring-batch)
- [Spring jPA](https://spring.io/projects/spring-data-jpa)
- [Flyway](https://flywaydb.org/)
- [caver.java](https://github.com/klaytn/caver-java) Klaytn Dapp API
- [Jackson](https://github.com/FasterXML/jackson)

### Tracker-common
Share entities and repositories
- [Spring jPA](https://spring.io/projects/spring-data-jpa)

### Tracker-app
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MATERIAL-UI](https://material-ui.com/)
- [material-table](https://material-table.com/#/)
- [styled-components](https://styled-components.com/)

## Previews
All data is a sample.

### Smart Contract List
Manage the [Smart Contract](https://docs.klaytn.com/klaytn/design/computation/klaytn-smart-contract) you want to see.
<p align="center">
  <img src="/preview/contract.png"/>
</p>

### Event List
Manage the [Event](https://solidity.readthedocs.io/en/v0.6.12/contracts.html?highlight=event#events) you want to see.
<p align="center">
  <img src="/preview/event.png"/>
</p>

### Event Log List
Output of the matched data.
<p align="center">
  <img src="/preview/transfer.png"/>
</p>

<p align="center">
  <img src="/preview/signup.png"/>
</p>

## Uasge
1. Setup Mysql
2. Set `SyncProperties`
3. Run Batch App
4. Run Api App
5. Install Web App Packages `yarn install`
6. Set baseURL `uesAPI.tsx`
7. Run Web App

# License
```xml
Copyright (c) 2020 Piction

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
