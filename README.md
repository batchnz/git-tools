[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/batchnz/git-tools">
    <img src="https://www.batch.nz/batch-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Batch Git-Tools</h3>

  <p align="center">
    A package to add Conventional Commits and Semantic Releases to your project
    <br />
    <a href="https://github.com/batchnz/git-tools"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/batchnz/git-tools/issues">Report Bug</a>
    ·
    <a href="https://github.com/batchnz/git-tools/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

This package provides a series of Git tools for running repositories the "Batch way", following the conventional commits specification. We've bundled `commitizen`, `commitlint` and `semantic-release` to automatically format and lint commit messages and tag and generate changelogs based on your commit messages for each release.

Our workflow goes something like this:
1. A new branch is created from master
2. Changes are committed using Commitizen and linted with Commitlint
3. A pull request is raised targeting the master branch
4. Once merged, a GitLab pipeline will run analysing the new commits and generating a changelog, release notes and semver tag

The idea behind this project was to create a simple installable dev tool that enforces consistest, high quality commit messages with auto-generated changelogs/release notes and to remove human emotion from the versioning.


### Built With

* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
* [Commitlint](https://commitlint.js.org)
* [Commitizen](https://github.com/commitizen)
* [Husky](https://github.com/typicode/husky)
* [Semantic Release](https://github.com/semantic-release/semantic-release)



<!-- GETTING STARTED -->
## Getting Started

To add this tool to your project simply follow these steps:

### Prerequisites

You'll need a package.json file to add the `git-tools` package. 

You will also need to have a minimum of git `2.9`

If you don't have one simply run:

```sh
npm init
```

### Installation

1. Add the package as a dev dependency
```sh
npm i @batch/git-tools -D
```
2. That's it!

On installation an install script will run that does the following:
- Adds configurations to your package.json file
- Adds a GitLab CI pipeline file for running semantic-commit

The pipeline file will not overwrite an existing file and the configuration is added using a deep merge and will not overwrite existing config.


<!-- USAGE EXAMPLES -->
## Usage

This package can be used in multiple ways depending on your workflow and team's preferences. We've bundled commitizen for CLI git usage and husky for GUI (e.g. Tower/SourceTree) usage.

### CLI usage (Commitizen)

When it's time to commit a change either run `git cz` if you have commitizen installed globally or `npm run commit` for local usage. Both methods will run Commitizen and pick up on the standard Commitlint configuration bundled in the package.

### GUI usage

You can use your GUI of choice and Husky will kick in at the pre-commit hook stage to run commitlint and validate your commit messages.

_Note: MacOS users will need to follow [this step](https://github.com/typicode/husky/issues/390#issuecomment-545855628) to get the pre-commit hook to work with Tower/SourceTree (and probably other GUI's)._

### GitLab Pipeline

The default GitLab pipeline that's copied into your project is setup to generate a new release, changelog and tag when new changes are pushed to the `master` branch.

You'll need to add a `GITLAB_TOKEN` secret to your repo's CI/CD variables with a personal access token that has access to the `api` scope.

<!-- EXTENDING -->
## Extending

This package is fully configurable and can be extended in the following ways:

### Commitlint config

#### Moving Configurations from .huskyrc

`npx husky install`

Note: It will create the .husky directory at the current directory you are when running this.

#### Adding a Hook
You will use the basis command every time you want to add a new hook to Husky, like:
npx husky add .husky/<HOOK NAME> "<SCRIPTS TO RUN>"

Add the commit hook;  
`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

### Commitizen config

You can alter the Commitizen config used by altering the `config.commitzen.path` object in your package.json. See the [Commitizen documentation](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) for more information.

### Semantic Release config

You can change the Semantic Release config by updating the `release.extends` property in your package.json. By default it points to Batch's own config but you can change this to use your own.

```
"release": {
  "extends": "my-custom-config-package"
}
```

_Note: `config['@batch/git-tools'].installed` must be `true` otherwise it will overwrite any custom package.json config in CI environments_

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/batchnz/git-tools/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Josh Smith - [@batchnz](https://twitter.com/batchnz) - josh@batch.nz

Project Link: [https://github.com/batchnz/git-tools](https://github.com/batchnz/git-tools)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

Thanks to all the hard work by the teams behind the tools used in this project.



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/batchnz/git-tools.svg?style=flat-square
[contributors-url]: https://github.com/batchnz/git-tools/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/batchnz/git-tools.svg?style=flat-square
[forks-url]: https://github.com/batchnz/git-tools/network/members
[stars-shield]: https://img.shields.io/github/stars/batchnz/git-tools.svg?style=flat-square
[stars-url]: https://github.com/batchnz/git-tools/stargazers
[issues-shield]: https://img.shields.io/github/issues/batchnz/git-tools.svg?style=flat-square
[issues-url]: https://github.com/batchnz/git-tools/issues
[license-shield]: https://img.shields.io/github/license/batchnz/git-tools.svg?style=flat-square
[license-url]: https://github.com/batchnz/git-tools/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/batchnz
[product-screenshot]: images/screenshot.png
