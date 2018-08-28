---
title: "Contact"
---

If you have any questions, or just want to say hi, feel free to drop me a message via the form below. I’ll get back to you as soon as I can.
  
Alternatively, you can <a href="https://twitter.com/tj_fogarty" rel="noopener" target="_blank">find me on Twitter</a>.
  
<form method="post" action="/contact-thanks/" class="max-w-md mt-4" accept-charset="UTF-8" name="contact" netlify netlify-honeypot="thanks">
  <p class="hidden">
    <label for="thanks">Don’t fill this out if you're human: <input name="thanks" id="thanks" /></label>
  </p>
  <label for="name">Your Name</label>
  <input id="name" type="text" name="name" value="">

  <label for="email">Your Email (required)</label>
  <input id="email" type="email" name="email" value="" required>

  <label for="subject">Subject</label>
  <input id="subject" type="text" name="subject" value="">

  <label for="message">Message (required)</label>
  <textarea rows="10" cols="40" id="message" name="message" required></textarea>

  <button type="submit" value="Send" class="c-btn c-btn-primary">Send</button>
</form>