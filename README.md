[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/radixdlt/radixdlt-js/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/radixdlt/radixdlt-js.svg?branch=develop)](https://travis-ci.com/radixdlt/radixdlt-js)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=radixdlt-js&metric=alert_status)](https://sonarcloud.io/dashboard?id=radixdlt-js) 
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=radixdlt-js&metric=reliability_rating)](https://sonarcloud.io/component_measures?id=radixdlt-js&metric=reliability_rating)
[![Security](https://sonarcloud.io/api/project_badges/measure?project=radixdlt-js&metric=security_rating)](https://sonarcloud.io/component_measures?id=radixdlt-js&metric=security_rating) 
[![Code Corevage](https://sonarcloud.io/api/project_badges/measure?project=radixdlt-js&metric=coverage)](https://sonarcloud.io/component_measures?id=radixdlt-js&metric=Coverage)

# radixdlt-js library

A JavaScript client library for interacting with a [Radix](https://www.radixdlt.com) Distributed Ledger. 

This library and the network itself are currently in **Alpha** development phase. Please report any issues in the [GitHub issue tracker](https://github.com/radixdlt/radixdlt-js/issues).

## Introduction

For an overview of the main components of the library and how they fit together, read this [blog post](https://www.radixdlt.com/post/introducing-the-radix-javascript-library).

## Table of contents

- [Changelog](CHANGELOG.md)
- [Features](#features)
- [Installation](#installation)
- [Development](#development)
- [Example applications](#example-applications)
- [Code examples](#code-examples)
- [Known issues](#known-issues)
- [Contribute](#contribute)
- [Links](#links)
- [License](#license)

## Features

- Full Typescript support
- Follow the reactive programming pattern using [RxJS](https://rxjs-dev.firebaseapp.com/)
- Cryptography using the [elliptic](https://github.com/indutny/elliptic) library
- Automatically manage connection to the Radix Universe in a sharded environment
- Communication with the Radix network usign RPC over websockets
- Read Atoms in any address
- Write Atoms to the ledger
- End-to-end data encryption using ECIES

## Installation

To install the library in your own project using [yarn package manager](https://yarnpkg.com/):

`yarn add radixdlt`


## Development

### Build

To build the library using your preferred package manager:

`yarn install && yarn build`

## Example applications

- [Front-end example using Vue.js](https://github.com/radixdlt/radixdlt-js-skeleton)
- [Express.js server example](https://github.com/radixdlt/radixdlt-js-server-example)

## Code examples

You can find detailed documentation as well as a number of code examples covering main functions of the library in our [Knowledge Base](https://docs.radixdlt.com/radixdlt-js/v/betanet/):

- [Initializing a Universe](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/general-use#initializing-a-universe)
- [Reading Atoms from a public address](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/atom-management#reading-atoms-from-a-public-address)
- [Reading and decrypting Atoms from an owned address](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/atom-management#reading-and-decrypting-atoms-from-an-owned-address)
- [Sending a Transaction](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/transaction-management#sending-a-transaction)
- [Sending a Message](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/transaction-management#sending-a-message)
- [Storing an application Payload](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/transaction-management#storing-an-application-payload)
- [Caching Atoms](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/atom-management#caching-atoms)
- [Storing private Keys](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/private-key-management#storing-private-keys)
- [Loading private Keys](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/private-key-management#loading-private-keys)
- [Setting a log level](https://docs.radixdlt.com/radixdlt-js/examples/code-examples/general-use#setting-a-log-level)


## Known issues

### Angular 6+

`Error: Can't resolve 'crypto'`

On Angular 6+ versions, the node module polyfills from webpack are not bundled. To fix your issue with crypto, path, etc. use the fix described in this answer [https://github.com/angular/angular-cli/issues/1548#issuecomment-427653778]

## Contribute

Contributions are welcome, we simply ask to:

* Fork the codebase
* Make changes
* Submit a pull request for review

When contributing to this repository, we recommend discussing with the development team the change you wish to make using a [GitHub issue](https://github.com/radixdlt/radixdlt-js/issues) before making changes.

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all your interactions with the project.

## Links

| Link | Description |
| :----- | :------ |
[radixdlt.com](https://radixdlt.com/) | Radix DLT Homepage
[documentation](https://docs.radixdlt.com/) | Radix Knowledge Base
[forum](https://forum.radixdlt.com/) | Radix Technical Forum
[@radixdlt](https://twitter.com/radixdlt) | Follow Radix DLT on Twitter

## License

The radixdlt-js library is released under the [MIT License](LICENSE).
