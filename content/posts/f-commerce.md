---
title: "F-Commerce"
description: "What happens when a store isn't really a store after all?"
date: 2018-12-19T15:08:08Z
draft: false
---

"We need an e-commerce site."

The developer peeled away from a desk in the corner, squinting into the light of the open-plan office. 

"When do we need it for?" 

Deadlines were short and time was in shorter supply. 

"Soon. Follow me." 

The PM and the developer ascended to the top floor of the building and entered the conference room where a large 50-inch display sat ready for a video call.

"Don't worry, we're only designing this one. Another company will look after the build."

The developer relaxed a little, easing up their grip on a pack of cigarettes stashed in a front pocket.

"Hello?"

A new face flashed onto the screen. The floating head introduced themselves as the tech lead of a company well versed in online shops. The screen latency gave a ghostly quality to the figure as they nodded and inquisitively tilted their head during questions, and after discussing the technical requirements a reassuring smile filled the space with a confidence seldom felt in this room. 

"That won't be a problem. We've looked over the designs and spec, and we're confident we can deliver on time, and within budget."

It was like everyone was performing a script rehearsal for a screenplay of The Perfect Project. The project would be a site that would sell a single subscription that customers could purchase for access to online lessons, with the rest of the pages being purely informational.

"That went pretty well." 

The PM paused before replying to the developer's optimism. 

"Mmm... we'll have a better feel for it after the first week or so."

The PM had been through a few wars in a previous life and was slower to warm to the situation, but for now, a positive report was due for the client.

---

As the weeks went by, check-ins revealed good progress. 

"So we're on course for our designer and developer to have a sweep of the site for our own internal QA soon?" 

"Absolutely. I'll send details to your developer on how to access the staging server in a few days." 

After the call, the PM still couldn't shake that uneasy feeling.

"We haven't seen any real functionality yet, besides what they're showing in screenshots and videos. I mean... it looks good, but it's only _looks_, you know? They have a good track record, so I probably shouldn't be worrying, but they're very positive for a crowd that hasn't revealed anything yet." 

The developer understood, but with all the other work that needed to get done it was out of sight, out of mind. However, priorities tend to leave a vacuum of complacency in their wake that panic will rush to fill.

---

One morning the developer arrived at work to the promised credentials that would dissolve the vague dread surrounding the project. They pasted the address into the location bar, hoping the destination would be a pleasant place. 

"How is it?" asked the PM, who was hovering nervously behind the developer. 

"It looks ok on the surface. A few spacing issues the designer will point out, some font size issues... nothing critical yet. I haven't done any deeper inspection, but I'll give you a shout before lunch with a more detailed report." 

The PM closed their eyes, embracing a brief moment of relief. 

"Ok... Ok, call me if there's anything urgent. This needs to be out the door by next week." 

The developer settled in with a test plan: inspect the functionality, the markup, and the performance, page by page. There was no access to the source code itself; any issues would be reported and then fixed by the other company. In the meantime, the designer would perform their own sweep and log any visual bugs.

Right-click and inspect... Unfolding the head tag opened a pandora's box of link tags. They spilled out like oil, overflowing into the body tag. 

"That's a lot of plugins... They'll probably be concatenated into one file before launch... and there must be an unclosed tag somewhere causing some to break out." 

The developer took note, not overly worried at this point. 

The intro panel was next, and a warning shot flew past the developer's ear. There was no heading, but a paragraph tag styled like an `h1`. Despite the early start, the developer was now fully awake. The PM wouldn't be called yet, not when they were still enjoying a modicum of reprieve. Halfway through the first page, the issues began to mount; headings were styled paragraph tags, links were styled span tags with an inline `onclick` handler. With 8 pages to go, there was a clear pattern that would no doubt be pervasive throughout the site. The developer compiled a list of such issues from the first page and approached the PM. 

"What are you giving me that look for?"
"It's nothing that can't be fixed, but..."
"Fuck, I fucking knew it! What is it?"

They went over the report and arrived at the conclusion that while, yes, it was a mess, it still worked and mostly looked the part. However, they would inform their boss, and the company would be informed immediately in an effort to get the issues fixed.

"Alright, I'll set up a Google doc. Put issues in there and I'll share it with the company and organise a call. You stay here and test what you can. We'll catch up again soon." 

The PM hurridly tapped out an email and darted upstairs to the conference room. The developer opened page number two. More of the same. Leaving nothing to chance, the developer logged duplicate after duplicate issue. The boss called and asked the developer to come upstairs.

"I need you to write me up a report I can send in an email to the company. Everything that's wrong, and what needs to be done to fix it."

The developer complied the report taking care not to sound too harsh or accusatory, though had little control over what the boss might add to accompanying the email. During the lunch break, the developer checked some personal emails, social media, and noticed some notifications on LinkedIn. The developer went cold, two people from that company had just viewed their profile; one was the tech lead, and the other was a developer. Well, they fucking hate me, the developer thought, and they know my face. After taking a shorter lunch break the developer continued testing and logging issues with the image of those LinkedIn profile pictures watching and judging every keystroke. 

---

"The e-commerce functionality doesn't work."
"Oh, Christ..."

The PM was now back on the cigarettes after years of staying off them. 

"I'm calling them."

This back-and-forth went on for a couple of days until everyone concluded that the project would not be ready on time. Fixes that were pushed to staging ending up breaking something else entirely, so testing had to be restarted with every new day. The client was furious, and the launch date was pushed back with each weekly report. Everything began unraveling, people were panicking and staff worked overtime to help the project along.

---

"We're taking over the build." 

The boss sat down with the developer, who was now 90% coffee and 60% stress because math.

"They'll give us access to the server where we can do what we need to do." 

What they needed to do was work 14 hour days to rebuild the site from scratch. 

"And take our logo off the footer."

The developer worked flat out until 11 pm most nights getting the site ready for a launch on Saturday. The client was doing a live stream from the site, and due to the unreliable nature of the project, someone needed to be on-hand should any issues arise during the unveiling.

---

That Saturday morning, the developer awoke for an 8 am launch. They put on the coffee and worked from their apartment feeling only slightly confident. After much testing and fixing, everything worked as it should. The developer had a direct line to the PM who was also awake for the launch. 

"Everything's looking good so far, haven't heard a peep from the client yet." 

The developer was beginning to think of the lovely nap that would be had when it was all over. At 10 am the live-stream started, and the client informed the PM that everything was working well and thanked us for our hard work.

Spirits were most definitely high until reports trickled in about customers being over-charged. 

"How? We tested this all week and payments went through without a hitch!" 

The ground began to open up beneath the developer and PM once more.

The developer scoured the dashboard looking for any settings that may have been overlooked and noticed the client reduced the price of the subscription to entice customers on their opening day. 

"No way... they can't..." 

The developer dove into the plugins folder and located the e-commerce module, then the payment gateway add-on. There it was. A call was made immediately to the PM. 

"The price is hard-coded... they hard-coded the price into the commercial plugin." 

The fury from the PM was unnatural. "WHAT THE ACTUAL SHIT?! WHY THOUGH?!" 

There was no time to re-install it without the risk of breaking payments entirely. "What price did they change it to? I'll put that in instead." At that moment, the developer could only imagine the pressure that was placed on the person tasked to take a drastic step like this. There was no hatred or anger. Though there wasn't much of anything left at this point. While the hard-coded price was changed to reflect the clients updated amount, a small patch was deployed to accept whatever they put in from the dashboard.

The client, distraught from overcharging customers and unsure about their footing with each change they made, eventually shut down the project. It was never spoken of again. The team, before finally getting a full nights rest, prayed for a dreamless void. The code still sits on a server somewhere with the hard-coded price commented out, like a lighthouse to remind passing ships where the limits lie. If you get closer, you'll see it's a beached ship signaling for help. Don't get too close, though, the passengers are long gone. Watch the light fade as the power dies.

