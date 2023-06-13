# Contributing

Make sure this is the ['develop' branch's version of CONTRIBUTING.md](https://github.com/grasslandnetwork/substrate_node_front_end/blob/develop/CONTRIBUTING.md). It's the most up-to-date.

## Make a fork of this repo. Then, run:


```shell
git clone git@github.com:<username>/substrate_node_front_end.git
cd substrate_node_front_end
```

## Workflow
Grassland development follows the [git flow](https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/git-flow/) methodology.

There are a number of scripts that make this easier by bunding git commands into this workflow. We recommend [gitflow-avh](https://github.com/petervanderdoes/gitflow-avh/wiki) with the following settings.

```
Branch name for production releases: master 
Branch name for "next release" development: develop 
Feature branch prefix: feature/ 
Bugfix branch prefix: bugfix/ 
Release branch prefix: release/ 
Hotfix branch prefix: hotfix/ 
Support branch prefix: support/ 
Version tag prefix: v
Hooks and filters directory: [default]
```

## Semantic Git Commit Messages

Feel free to use the "[Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)" format in your commit messages to provide helpful information.

so instead of

```
git commit -m"bumped version number"
```
do

```
git commit -m"chore: bumped version number"
```

fix – a bug fix has occurred
chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
refactor – refactored code that neither fixes a bug nor adds a feature 
docs – updates to documentation such as a the README or other markdown files
style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on
perf – performance improvements
test – including new or correcting previous tests 
ci – continuous integration related
build – changes that affect the build system or external dependencies 
revert – reverts a previous commit 
