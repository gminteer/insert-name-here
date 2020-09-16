# Pair-Pro

![License: Apache-2.0](https://img.shields.io/badge/license-Apache%202.0-green.svg)

![screenshot](docs/assets/screenshot.png)

## Description

---

What if connecting mentors and aspiring and/or junior developers worked like a dating app?

No, wait, we're actually serious about this.

## Installation

---

- Clone this repository.
- Run `npm install`.
- Create an .env file in the project route (.env.example lays out what environment variables need to be set)

## Usage

---

### Production

You should be able to push to Heroku without needing to do anything manually (you'll need to `git push heroku (YOUR LOCAL BRANCH):master` if you want to test a branch without opening a PR)

---

### Development

- `npm run start:dev` will launch with nodemon for hot-reloading support.
- `npm run watch` will launch webpack in watch mode for hot-recompiling style changes (you have to manually hit refresh in the browser though)

## License

---

Copyright 2020 [insert names here]

Licensed under the Apache-2.0 License (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://opensource.org/licenses/Apache-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Tests

TODO: I haven't actually written any tests, but jest and supertest are set up as DevDependencies and eslint's configured if anyone actually wants to write unit tests.

![Powered by <3 emojis](https://img.shields.io/badge/made%20with-%F0%9F%92%96-lightgrey.svg)
