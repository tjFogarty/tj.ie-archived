---
title: "Getting Started with WordPress and Unit Testing"
date: 2015-07-10T00:00:00+01:00
draft: false
categories: 
- PHP
- WordPress
---
<p>Recently, I&#8217;ve begun working on a project built with WordPress. One of the requirements involves writing tests and outputting a report.</p>
<p>In this post, I hope to show how I&#8217;ve set up the project to utilise PHPUnit and <code>WP_UnitTestCase</code>. I&#8217;ve had minimal exposure to PHPUnit in the past, so I was delighted to start learning more.</p>
<p>Hey, you might read this and know a better way! Feel free to leave a comment.</p>
<h2 id="setup">Setup <a class="anchor" href="#setup" title="Setup">#</a></h2>
<p>You&#8217;ll need an install of WordPress. This might be an existing project, or a fresh install. <a href="http://wp-cli.org/">WP-CLI</a> is a very handy tool for quickly setting this up, but it&#8217;ll also do many, many other things for you that I won&#8217;t cover here e.g. <a href="http://wp-cli.org/commands/db/export/">exporting a database</a>, and even <a href="http://wp-cli.org/commands/plugin/install/">installing plugins</a>.</p>
<p>Next up, you&#8217;ll need <a href="https://getcomposer.org/">Composer</a> installed. I&#8217;m using this to install PHPUnit globally with the command <code>composer global require "phpunit/phpunit=4.7.*</code>. You can verify the successful installation with <code>phpunit --version</code> in your terminal provided you have Composer packages added to your path. (To do this, see this <a href="http://akrabat.com/global-installation-of-php-tools-with-composer/">useful post</a>.)</p>
<p>Within the root of your WordPress project you&#8217;ll need to run <code>svn co http://develop.svn.wordpress.org/trunk/tests/phpunit/includes/</code>.
This integrates with PHPUnit to make writing our tests a little easier. Want to create a post? <code>$this->factory->post->create()</code>. Want to create 30 posts? <code>$this->factory->post->create_many(30)</code>. This goes for posts, users, comments, categories&#8230; anything you might need to generate. You can <a href="https://core.trac.wordpress.org/browser/trunk/tests/phpunit/includes/factory.php">browse the source</a> to learn more about it.</p>
<p>This doesn&#8217;t <em>have</em> to be in the root of your project, but this just happens to be where I&#8217;ve set up mine. You should now see an <code>includes</code> folder in your project root.</p>
<p>You&#8217;ll need a <code>phpunit.xml</code> file in your root to specify some configuration. It&#8217;ll tell PHPUnit which files to use for it&#8217;s tests.</p>

{{< highlight xml >}}
<?xml version="1.0" encoding="UTF-8"?>
<phpunit
    bootstrap="./tests/bootstrap.php"
    backupGlobals="false"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true">
    <testsuites>
        <testsuite>
            <directory prefix="test-" suffix=".php">./tests/</directory>
        </testsuite>
    </testsuites>
</phpunit>
{{< / highlight >}}

<p>What this is saying is it&#8217;s looking for a folder called <code>tests</code> and a file called <code>bootstrap.php</code>. This is what will kick it all off, and <code><directory prefix="test-" suffix=".php"></code> says that test files begin with <code>test-</code> and have the extension of <code>.php</code>. So go ahead and create that <code>tests</code> folder and <code>bootstrap.php</code>.</p>
<p>For starters, here&#8217;s what your bootstrap file might look like -</p>

{{< highlight php >}}
<?php

require_once dirname( dirname( __FILE__ ) ) . '/includes/functions.php';

function _manually_load_environment() {
    // Add your theme
    switch_theme('your-theme');

    // Update array with plugins to include ...
    $plugins_to_active = array(
        'some-plugin/some-plugin.php',
        'another-plugin/another-plugin.php'
    );

    update_option( 'active_plugins', $plugins_to_active );
}
tests_add_filter( 'muplugins_loaded', '_manually_load_environment' );

require dirname( dirname( __FILE__ ) ) . '/includes/bootstrap.php';
{{< / highlight >}}

<p>What we&#8217;re doing here is setting up some initial state for our tests. I&#8217;m setting the theme and the plugins that I want to be active, and that&#8217;s about it.</p>
<p>Now, what are we going to test on? We&#8217;ll need to create an empty database in order to run our tests against.
Create a file called <code>wp-tests-config.php</code> in the root of your project. It&#8217;ll contain information regarding your test database which you&#8217;ll need to create.</p>

{{< highlight php >}}
<?php

/* Path to the WordPress codebase you'd like to test. Add a backslash in the end. */
define( 'ABSPATH', dirname( __FILE__ ) . '/' );

// Test with multisite enabled.
// Alternatively, use the tests/phpunit/multisite.xml configuration file.
// define( 'WP_TESTS_MULTISITE', true );

// Force known bugs to be run.
// Tests with an associated Trac ticket that is still open are normally skipped.
// define( 'WP_TESTS_FORCE_KNOWN_BUGS', true );

// Test with WordPress debug mode (default).
define( 'WP_DEBUG', true );

// ** MySQL settings ** //

// This configuration file will be used by the copy of WordPress being tested.
// wordpress/wp-config.php will be ignored.

// WARNING WARNING WARNING!
// These tests will DROP ALL TABLES in the database with the prefix named below.
// DO NOT use a production database or one that is shared with something else.

define( 'DB_NAME', 'test_db' );
define( 'DB_USER', 'user' );
define( 'DB_PASSWORD', 'password' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

$table_prefix  = 'wptests_';   // Only numbers, letters, and underscores please!

define( 'WP_TESTS_DOMAIN', 'custom-domain.dev' );
define( 'WP_TESTS_EMAIL', 'test@domain.com' );
define( 'WP_TESTS_TITLE', 'Test Blog' );

define( 'WP_PHP_BINARY', 'php' );

define( 'WPLANG', '' );
{{< / highlight >}}

<p>No more set up, let&#8217;s start writing tests!</p>
<h2 id="creating-tests">Creating Tests <a class="anchor" href="#creating-tests" title="Creating Tests">#</a></h2>
<p>So now you have this <code>tests</code> directory with a lonely <code>bootstrap.php</code> file sitting in it. Let&#8217;s give it some company with a simple test to see if the active theme is the one we set in that bootstrap file.</p>
<p>Create a new file called <code>test-active-theme.php</code> and put in the following:</p>

{{< highlight php >}}
<?php

    class TestActiveTheme extends WP_UnitTestCase {
        /**
         * Test that the correct theme is active (set in bootstrap.php)
         */
        function testCorrectActiveTheme() {
            $this->assertTrue('your-theme' == wp_get_theme());
        }
    }
{{< / highlight >}}

<p>Have a look there and you&#8217;ll see we&#8217;re extending <code>WP_UnitTestCase</code>. This affords us some useful perks in that when we run our tests it re-creates the database for a fresh WordPress install.</p>
<hr />
<p>Success! In your own tests, you can access your regular WordPress functions, and your active plugin classes/functions. You might even include some Composer packages to mock your data (like <a href="https://github.com/fzaninotto/Faker">Faker</a>).</p>
<p>See the <a href="https://phpunit.de/documentation.html">PHPUnit documentation</a> for more information on the tests you can run, and how you can <a href="https://phpunit.de/manual/current/en/textui.html">export</a> the results.</p>
<p>For further reading, have a look at the <a href="https://core.trac.wordpress.org/browser/trunk/tests/phpunit/tests">tests written for WordPress Core</a>.</p>
<p>Happy testing!</p>