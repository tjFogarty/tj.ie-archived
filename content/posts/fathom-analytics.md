---
title: "Fathom Analytics"
description: "Installing Fathom analytics on Heroku."
date: 2018-08-24T19:06:48+01:00
draft: false
---

I've been going without any sort of analytics for my website for a number of months as I just wasn't happy with giving all that information to third parties. Plus, this is a fairly small operation here, so it's not exactly a requirement of mine.

That being said, I've been keeping an eye on <a href="https://usefathom.com/" target="_blank" rel="noopener noreferrer">Fathom Analytics</a> as it looks like an ideal solution:

> It tracks users on a website (without collecting personal data) and give you a non-nerdy breakdown of your top content and top referrers. It does so with user-centric rights and privacy, and without selling, sharing or giving away the data you collect. It's a simple and easy to use for website owners at any technical level.

<a href="https://github.com/usefathom/fathom/blob/master/pkg/api/collect.go#L47" target="_blank" rel="noopener noreferrer">Looking at the source</a>, it also respects the "do not track" preference of the user.

I've been holding off on giving it a go because I had no idea how to install it, until a nice person on Github gave <a href="https://github.com/usefathom/fathom/issues/59#issuecomment-413469001" target="_blank" rel="noopener noreferrer">a quick run-through of how to get it running on Heroku</a>. I'm trialing it using a Hobby dyno which costs $7 a month, so if it all works out I'll happily front that cost.

You'll need a <a href="https://www.heroku.com/" target="_blank" rel="noopener noreferrer">Heroku</a> account, and the <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noopener noreferrer">Heroku CLI</a> to follow along. You'll need to have your billing details filled in as well as it makes use of addons for getting a database. You don't have to use a Hobby dyno either if you just want to see what's involved.

So without further ado, the commands are as follows: 

{{< highlight shell >}}
# Get the code
$ git clone https://github.com/usefathom/fathom.git
$ cd fathom

# Create a new heroku app
$ heroku create

# Push the fathom container to heroku's registry
$ heroku container:push web

# Release the container
$ heroku container:release web

# Configure fathon to use msql and a secret
$ heroku config:set FATHOM_DATABASE_DRIVER=mysql FATHOM_SECRET=whateverGeneratedSecretYouWantToUse

# Create a new mysql database
$ heroku addons:create jawsdb:kitefin

# Get the mysql connection url
$ heroku config:get JAWSDB_URL //mysql://user:password@host:3306/database_name

# Set database variables from the above url
$ heroku config:set FATHOM_DATABASE_NAME=database_name FATHOM_DATABASE_USER="user" FATHOM_DATABASE_PASSWORD="password" FATHOM_DATABASE_HOST="host:3306"

# Register a new user
$ heroku run ./fathom register --email=something@email.com --password='yourpassword'
{{< / highlight >}}

To clarify a comment when running `heroku config:get JAWSDB_URL ...`, what it gives back is what you plug into the next command when setting the Fathom environment variables in the same format `//mysql://user:password@host:3306/database_name`. I know it kinda explains it already, but I missed it because I was too eager.

After that, it's almost ready. The last step is to link to the tracking script as follows:

{{< highlight html >}}
<!-- Fathom - simple website analytics - https://github.com/usefathom/fathom -->
<script>
(function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
    m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
})(document, window, '//your-app-name.herokuapp.com/tracker.js', 'fathom');
fathom('trackPageview');
</script>
<!-- / Fathom -->
{{< / highlight >}}

I'd say it took about 15 minutes to get up and running, which is pretty good going for me. I'm looking forward to what the future holds for Fathom.