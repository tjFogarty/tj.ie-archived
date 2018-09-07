---
title: "Improving Client-Side Performance"
description: "A few ways in which we can improve client-side performance focusing on images, third-party scripts and more."
date: 2018-09-02T14:54:10+01:00
draft: true
toc: true
---

Below are some ways I've found to optimise the performance of a site when getting it ready for a production environment, or patching an existing site. Where possible I'll list some common implementations, though understandably we don't always have the kind of access we want to make changes.

These opportunities for client-side improvements are typically more common among websites rather than web apps. I think this is because of the tooling that comes with modern web app development e.g., <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener noreferrer">vue-cli</a> handles code-splitting, and generates a service worker. With build tools like webpack, or Gulp, it also means you can install a plugin to slot somewhere in the process that takes care of some of these. Others need some tlc, and a sympathetic ear.

## Images

A picture paints a thousand words, but that's no good when many of those words are synonyms for "slow". People aren't always aware of the specifics of an image, nor should they have to be in some cases. If it's possible to upload a 5mb image, then chances are it'll happen at some point. That's just how it goes. 

There are some methods we can use to automate the reduction of overall bloat, and still preserve image quality. Where automation isn't always available (for things like static sites, or non-CMS based projects) there's still plenty of tools we can employ.

Let's run with that 5mb image...

### Resize & Optimise

The first port of call is to resize the image. Do that.

### Responsive
#### Solutions

### Lazy loading
#### Solutions

## Third-Party Plugins/Scripts

### Sharing widgets
#### Solutions

### Social media feeds
#### Solutions


## Bundling Assets

### Combining multpile JS + CSS files
#### Solutions

## Service Workers

- Save on future networks requests for things like CSS, JS, and fonts

## Bonus Research

- `<link rel="preload|dns-prefetch" ... />` [Link rel preload](https://developers.google.com/web/updates/2016/03/link-rel-preload)
- Cloudflare 

While writing this I became aware of https://progressivetooling.com/ which is a fantastic resource.