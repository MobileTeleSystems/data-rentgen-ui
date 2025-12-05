# Contributing Guide

Welcome! There are many ways to contribute, including submitting bug
reports, improving documentation, submitting feature requests, reviewing
new submissions, or contributing code that can be incorporated into the
project.

## Review process

For any **significant** changes please create a new GitHub issue and
enhancements that you wish to make. Describe the feature you would like
to see, why you need it, and how it will work. Discuss your ideas
transparently and get community feedback before proceeding.

Small changes can directly be crafted and submitted to the GitHub
Repository as a Pull Request. This requires creating a **repo fork** using
[instruction](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

## Initial setup for local development

### Install Git

Please follow
[instruction](https://docs.github.com/en/get-started/quickstart/set-up-git).

### Clone the repo

Open terminal and run these commands:

```bash
git clone git@github.com:myuser/data-rentgen-ui.git

cd data-rentgen-ui
```

### Setup environment

To install all necessary dependencies, run these commands:

```bash
npm ci
npm run pre-commit-install
```

# How to

## Run development server

```bash
npm run dev
```

### Create pull request

Commit your changes:

```bash
git commit -m "Commit message"
git push
```

Then open Github interface and [create pull request](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#making-a-pull-request).
Please follow guide from PR body template.

After pull request is created, it get a corresponding number, e.g. 123
(`pr_number`).

## Release Process

Note: this is only for repo maintainers

0. Checkout to ``develop`` branch and update it to the actual state

```bash
git checkout develop
git pull -p
```

1. Merge ``develop`` branch to ``master``, **WITHOUT** squashing

```bash
git checkout master
git pull
git merge develop
git push
```

2. Add git tag to the latest commit in ``master`` branch

```bash
git tag "$VERSION"
git push origin "$VERSION"
```

VERSION should be the same as for backend.

3. Update version in ``develop`` branch **after release**:

```bash
sed -i "s#\"version\": \"[[:digit:]]\.[[:digit:]]\.[[:digit:]]\"#\"version\": \"$VERSION\"#" package.json package-lock.json
npm i
```
