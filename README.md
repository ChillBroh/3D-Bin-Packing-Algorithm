<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 3D Bin PackingAlgorithm

  <p align="center">The 3D Bin Packing Algorithm is a powerful solution designed to optimize the efficient packing of objects within three-dimensional containers. This algorithm is particularly useful in scenarios where maximizing space utilization is crucial, such as in logistics, manufacturing, or resource allocation.</p>
    <p align="center">
    <a ><img src="https://github.com/ChillBroh/3D-Bin-Packing-Algorithm/blob/main/D-bin-packing-problem.png" alt="NPM Version" /></a>
    </p>

## Sample Request

```bash
{
  "maxBin": {
      "width":100,
      "height" : 100,
      "length" : 100,
      "weight" : 22
  },
  "box": {
      "width":40,
      "height" : 10,
      "length" : 100,
      "weight" : 2
  },
  "numBoxes": 10
}
```

## Sample Response

```bash
{
    "result": [
        {
            "width": 100,
            "length": 100,
            "height": 100,
            "weight": 12,
            "boxes": [
                {
                    "index": 0,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    }
                },
                {
                    "index": 1,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 10
                    }
                },
                {
                    "index": 2,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 30
                    }
                },
                {
                    "index": 3,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 70
                    }
                },
                {
                    "index": 4,
                    "position": {
                        "x": 40,
                        "y": 0,
                        "z": 0
                    }
                },
                {
                    "index": 5,
                    "position": {
                        "x": 40,
                        "y": 0,
                        "z": 10
                    }
                }
            ]
        },
        {
            "width": 100,
            "length": 100,
            "height": 100,
            "weight": 8,
            "boxes": [
                {
                    "index": 6,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    }
                },
                {
                    "index": 7,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 10
                    }
                },
                {
                    "index": 8,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 30
                    }
                },
                {
                    "index": 9,
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 70
                    }
                }
            ]
        }
    ]
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
