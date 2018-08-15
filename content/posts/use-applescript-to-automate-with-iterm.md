---
title: "Use AppleScript to Automate with iTerm"
date: 2018-02-19T21:52:00+00:00
draft: false
categories: 

---
<p>Sometimes when you&#8217;re working on a project, be it work or personal, you might only be running a command in the terminal like <code>npm run dev</code>. Other times it might be a bit more involved. Maybe you have a local server running in one tab with another tab to run webpack and finally another one open for you to tap in your git commits.</p>
<p>This gives us an opportunity for automation if you find yourself doing this often. Let&#8217;s imagine the above scenario where we want to run a server, webpack and keep a tab free for other once-off commands that we might want to run like git.</p>
<p>To get started, we&#8217;ll need to open Script Editor from Applications &gt; Utilities &gt; Script Editor. We&#8217;ll use this blank canvas to line up some instructions. <em>Note:</em> this assumes iTerm is already running.</p>
<pre><code class="language-applescript">tell application "iTerm"
    tell the current window

    end tell
end tell</code></pre>
<p>With this we grab the currently running instance of iTerm and focus in on the current window that&#8217;s running.</p>
<p>Next we&#8217;ll create a new tab and run some commands. This will set a variable for the tab that we can interact with and run with the default profile. If you have other profiles set up with iTerm you can specify it here instead.</p>
<p>What&#8217;s nice as well is we can tell iTerm to split into panes so we don&#8217;t get overrun with tabs.</p>
<pre><code class="language-applescript">tell application "iTerm"
    tell the current window
        set appTasks to create tab with profile "Default"

        tell the appTasks
            tell the current session
                set name to "App"
                write text "cd ~/Code/my-app"
                write text "node index.js"

                set webpack to split horizontally with default profile
                tell webpack
                    write text "cd ~/Code/my-app"
                    write text "npm run dev"
                end tell
            end tell
        end tell

        set freeTab to create tab with profile "Default"

        tell freeTab
            tell the current session
                set name to "Free"
                write text "cd ~/Code/my-app"
            end tell
        end tell
    end tell
end tell</code></pre>
<p>You could also use this to launch it with your code editor of choice, so if you&#8217;re rocking Visual Studio Code you could update the last block to be:</p>
<pre><code class="language-applescript">tell freeTab
  tell the current session
    set name to "Free"
    write text "cd ~/Code/my-app"
    write text "code ."
  end tell
end tell</code></pre>
<p>Once you&#8217;re ready to go, you can click the play button in the toolbar of Script Editor to kick everything off. When you&#8217;re happy with the result you can save the script and the next time you launch Script Editor you&#8217;ll be able to choose it and run it again.</p>
<p>I&#8217;ve found this fairly useful for work where there might be multiple apps and services that need to be run in parallel. </p>