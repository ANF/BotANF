<h1 align="center" style="position: relative;">
    <img width="200" style="border-radius: 50%;" src="./src/images/favicon.ico" /><br>
    BotANF
</h1>

<h3 align="center">The official ANF Studios Discord bot!</h3>

<p align="center">
    <a href="https://github.com/ANF-Studios/BotANF/blob/master/LICENSE">License</a> •
    <a href="https://github.com/ANF-Studios/BotANF/blob/master/CODE_OF_CONDUCT.md">Code of Conduct</a> •
    <a href="https://github.com/ANF-Studios/BotANF/blob/master/CONTRIBUTING.MD">Contributing</a> •
    <a href="https://github.com/ANF-Studios/BotANF/blob/master/CHANGELOG.MD">Changelog</a>
</p>

<h2>Building and Running</h2>
<p>There are two ways to build and run BotANF. One being an automated script and the other being a manual process.</p>

<p>The first way; running the automated script is really simple.<br />You first launch run the script and it'll install all dependencies, open up your default file explorer and launch VS Code (if it is found). However, there is one thing to beware of, if you do not have npm, it will ask you if you want to install it - this process uses some functions that are not available in PowerShell 5, that's the default installation on Windows which means it won't run. That's why there's an if check that verifies if the version if at least 6. You can modify that as long as you are assured that you have npm installed and accessible on the command line.</p>

<p>The second methos is to run <code>npm install</code> or <code>npm run restore</code> to install the packages. Make sure you have the required <code>.env</code> file which should look like this <a href=".sample.env">sample env file</a>.</p>

<h2>Versioning</h2>
<p>BotANF uses <a href="https://semver.org/">SemVer</a>.
    <blockquote>
        Given a version number MAJOR.MINOR.PATCH, increment the<br/>
        <code>MAJOR</code> version when you make incompatible API changes,<br/>
        <code>MINOR</code> version when you add functionality in a backwards compatible manner, and<br/>
        <code>PATCH</code> version when you make backwards compatible bug fixes.<br/>
        Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH
        format.
    </blockquote>
</p>

<h2>Further help</h2>
<p>You can <a href="https://github.com/ANF-Studios/BotANF/issues/new">create an issue</a> or just join the support
    server.</p>

<a href="https://discord.gg/fKWpK7A"><img
        src="https://discord.com/api/guilds/732064655396044840/embed.png?style=banner3"
        alt="Discuss in the server"></img></a>
