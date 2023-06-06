# Send IFTTT Webhook (NodeJS)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/send-ifttt-webhook-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/send-ifttt-webhook-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/send-ifttt-webhook-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/send-ifttt-webhook-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/send-ifttt-webhook-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/send-ifttt-webhook-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/send-ifttt-webhook-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/send-ifttt-webhook-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/send-ifttt-webhook-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/send-ifttt-webhook-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/send-ifttt-webhook-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/send-ifttt-webhook-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/send-ifttt-webhook) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/send-ifttt-webhook?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/send-ifttt-webhook/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/send-ifttt-webhook/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to send IFTTT webhook.

> **🔗 Other Edition:**
>
> - [Deno](https://github.com/hugoalh-studio/send-ifttt-webhook-deno)
> - [GitHub Action](https://github.com/hugoalh/send-ifttt-webhook-ghaction)

## 📚 Documentation

### Getting Started

- NodeJS ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0

```sh
npm install @hugoalh/send-ifttt-webhook
```

```js
/* Either */
import { ... } from "@hugoalh/send-ifttt-webhook";// Named Import
import * as sendIFTTTWebhook from "@hugoalh/send-ifttt-webhook";// Namespace Import
import IFTTTWebhook from "@hugoalh/send-ifttt-webhook";// Default Import (Class `IFTTTWebhook`)
```

### API

#### Class

- ```ts
  new IFTTTWebhook(key: string, options: IFTTTWebhookConstructorOptions = {}): IFTTTWebhook;
    .send(options: IFTTTWebhookSendOptions = {}): Promise<Response>;
    .sendArbitrary(options: Omit<IFTTTWebhookSendOptions, "arbitrary"> = {}): Promise<Response>;

  IFTTTWebhook.send(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "eventName"> = {}): Promise<Response>;
  IFTTTWebhook.sendArbitrary(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName"> = {}): Promise<Response>;
  ```

#### Function

- ```ts
  send(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "eventName"> = {}): Promise<Response>;
  ```
- ```ts
  sendArbitrary(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName"> = {}): Promise<Response>;
  ```

#### Interface / Type

- ```ts
  interface IFTTTWebhookConstructorOptions {
    /* Define a default value of whether to send with an arbitrary payload. */
    arbitraryDefault: boolean = false;
    /* Define a default value of the event name. */
    eventNameDefault?: string;
  }
  ```
- ```ts
  interface IFTTTWebhookSendOptions {
    /* Whether to send with an arbitrary payload. */
    arbitrary: boolean = arbitraryDefault;
    /* Event name. */
    eventName: string = eventNameDefault;
    /* Payload. */
    payload: object = {};
  }
  ```

### Example

```js
new IFTTTWebhook("my-ifttt-webhook-key", { eventNameDefault: "test" }).sendArbitrary({ payload: { message: "Hello, world!" } })
```
