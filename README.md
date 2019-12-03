# Art Freshers’ Guide to the Art World

A practical guide and web book for anyone starting out in art and culture, with a special focus on various cities in the UK.

## [Live site](https://freshers.artrabbit.com)

## What is in this repository

The source code and content for the ebook. Freshers is build as a static website using the [Eleventy](https://www.11ty.io/) static site generator, with a [Netlify CMS](https://www.netlifycms.org/) baked-in, and is deployed and hosted on [Netlify](https://www.netlify.com).

## Technology used

* Static site generated with Eleventy
* Gulp for workflow tooling and responsive images
* Netlify CMS with editor previews
* Uses Markdown files for content
* Continuous Deployment workflow via Netlify

## Install locally

### 1. Clone this repository:

```
git clone https://github.com/ArtRabbit/freshers.git my-clone
```


### 2. Navigate to the directory

```
cd my-clone
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
yarn
```

### 4. Edit src/_data/metadata.json

This file contains your site title and author details.

### 5. Start eleventy and watch for changes

```
yarn start
```

Or build:
```
yarn build
```

## Bug reports, feature requests, etc

This is an ongoing project and we welcome contributions. Feel free to submit a PR.
