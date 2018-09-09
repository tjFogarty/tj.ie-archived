---
title: "Improving Client-Side Performance"
description: "A few ways in which we can improve client-side performance focusing on images, third-party scripts and more."
date: 2018-09-09T10:54:10+01:00
draft: true
toc: true
---

Below are some ways I've found to optimise the performance of a site when getting it ready for a production environment, or patching an existing site. Where possible I'll list some common implementations, though understandably we don't always have the kind of access we want to make changes.

These opportunities for client-side improvements are typically more common among websites rather than web apps. I think this is because of the tooling that comes with modern web app development e.g., <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener noreferrer">vue-cli</a> handles code-splitting, and generates a service worker. With build tools like webpack, or Gulp, it also means you can install a plugin to slot somewhere in the process that takes care of some of these. Others need some tlc, and a sympathetic ear.

## Images

A picture paints a thousand words, but that's no good when many of those words are synonyms for "slow". People aren't always aware of the specifics of an image, nor should they have to be in some cases. If it's possible to upload a 5mb image, then chances are it'll happen at some point. That's just how it goes. 

There are some methods we can use to automate the reduction of overall bloat, and still preserve image quality. Where automation isn't always available (for things like static sites, or non-CMS based projects) there's still plenty of tools we can employ.

### Resize

The first port of call is to resize the image. Generally speaking, we don't need a higher-than-usual-res image for something that only takes up a portion of the page, or isn't the reason for the page existing. If photography is your gig, then you can serve a smaller image with an option to view the high-res version if they so wish.

If you do a search for "resize image" you'll find a whole host of online solutions that will do the job for you. This is great if you're only concerned with one or two images at any given time, but what if you have a folder full of them?

#### Batch Resize on MacOS

MacOS comes with a program called Preview which lets you batch resize images. To do this, select all your images, right click and open with Preview.

From here you'll see the preview window:

{{< post-image src="preview-1_hsqbl9.jpg" alt="Preview app" >}}

Pressing CMD + A, you can select all the images, then go to Tools > Adjust Size. The dialog that appears will let you set a value for the width and height, though you might only set the width and let it scale the image for you so no part of the picture is clipped.

{{< post-image src="preview-2_kelj5v.jpg" alt="Preview app resize dialog" >}}

#### Batch Resize on Windows

It's been a while since I've worked on a Windows machine, so pardon my ignorance here.

One solution I've seen is to <a href="https://www.easytechguides.com/resize-pictures.html" target="_blank" rel="noopener noreferrer">send your images as a mail attachment</a>, at which point you'll be presented with an option to resize them and preserve their aspect ratio.

Another, possibly more ideal, option is some software called <a href="https://github.com/bricelam/ImageResizer" target="_blank" rel="noopener noreferrer">ImageResizer</a>. When you select a group of images, and right click, it adds an option to resize from the context menu that appears.

### Optimise

Once the images have been resized to your liking, the next step involves analysing them to identify any cruft that can be removed to reduce the file size. Some approaches include:

- Removing metadata that might have been attached from the camera that took the original picture
- Optimising JPEGs to reduce the number of colours required to render the picture
- Converting from PNG to a lossy format if transparency isn't required

Long before software existed, we would have had to parlay with an image, and barter for pixels. We would have lengthy discussions trying to convince it that it looked just as good with 80 shades of red rather than 200. Or that JPEG suited it better than PNG. It was sparse times for all involved.

Luckily, there's tools available to make this quick and simple. We're happy, and the images are happy.

#### Reduce File Size

<a href="https://imageoptim.com/mac" target="_blank" rel="noopener noreferrer">ImageOptim</a> is my favourite for optimising images. You drag your images onto the program and it does the rest, replacing the existing ones by default. It lets you know how much it's saved as well. If you're not happy, you can update the preferences for more aggressive optimisation.

{{< post-image src="imageoptim.jpg" alt="ImageOptim app results" >}}

The ImageOptim website has <a href="https://imageoptim.com/versions.html" target="_blank" rel="noopener noreferrer">a page that suggests alternatives for other platforms</a>. Again, apologies for my MacOS-centric state of mind.

#### Convert PNG to JPEG

If you're images don't need transparency, you can convert them to JPEG and reap the benefits of a smaller file size.

On MacOS you can open your images in Preview, as before, then after selecting everything you can go to File > Export Selected Items. In the dialog that appears, in the bottom left is a button labelled Options. From here you can select a different format.

{{< post-image src="png-to-jpeg.jpg" alt="Converting PNG to JPEG with the Preview app" >}}

There's also plenty of online tools that do this. On Windows, an option might be some software like <a href="https://www.irfanview.com/" target="_blank" rel="noreferrer noopener">IrfanView</a> which I _believe_ lets you batch convert images. I don't know if I've said this yet Windows users, but I'm sorry. I haven't even apologised to Linux users yet.

### Responsive

Making your images responsive involves more than:

{{< highlight css >}}
img {
  max-width: 100%;
  height: auto;
}
{{< / highlight >}}

Sure, it resizes, but you could be wasting a lot of bandwidth here. If I need a sticky note I don't fold an A4 sheet into a small square. That would be a waste of paper.

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