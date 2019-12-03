---
title: About this Edition
date: 2019-11-27T19:39:21.795Z
layout: layouts/page.njk
permalink: /about/this-edition/index.html
eleventyNavigation:
  key: About this Edition
  order: '1'
  parent: About
pageNavigation:
  back: /about/index.html
  next: /credits/index.html
  nextLabel: Credits
---
We hope you enjoyed this year’s edition!

This chapter introduces the technical aspects of how it was made, and gives insight into how you can contribute to our project. 

We built the Web Book with [Eleventy](https://www.11ty.io/), a static site generator (SSG), with a Netlify CMS baked-in, and deployed and hosted it on [Netlify](https://www.netlify.com/) (a platform that offers serverless backends and hosting for static websites). Put simply, an SSG allows us to generate a static HTML-only website that uses a template similar to a CMS so that content can be added with ease of usability. The content files were created in Markdown, a lightweight markup language with plain text formatting syntax.

Whilst last year's edition was hand-coded, this year's approach gives us the opportunity to automate the publishing and editing process, making it easier to expand on this resource and collaborate with more individuals and cultural organisations. This approach also ensures that the web book loads faster and is available on older browsers, thus providing broader access to the resource. 

Static sites are extremely fast because all the web server needs to do is return a file. In comparison, every request on a traditional CMS-driven website is a database request, and requires every page to be built from scratch. This includes putting together all the template files and getting the content from the database. That stuff adds up! 

The most important objective for us was to be able to collaborate with individuals and cultural organisations to expand on this resource. That's why we used an SSG and placed everything, code and content, in an open-source repository on GitHub. You can [access it here](https://github.com/ArtRabbit/freshers/), and anyone (including you!) can make or suggest updates to be merged into the live web book. Simply create a pull request, add your changes and upload to master. 

The Git repository also means that we'll have a version history of every change added, and we'll have an offsite backup should we ever need to restore the web book.

Want to make your own web book using the source code? You're welcome to clone the repository for your own projects. The code is licensed under an [MIT License](https://github.com/ArtRabbit/freshers/blob/master/LICENSE). 

The content of this Web Book is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/). 

If you're not super tech-savvy but would still like to make a contribution, email us at <mailto:support@artrabbit.com> to let us know about any additions you'd like to make.

Read ArtRabbit’s [Privacy Notice](https://www.artrabbit.com/about-artrabbit/privacy).
