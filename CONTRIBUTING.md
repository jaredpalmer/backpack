# How to Contribute to Backpack

## Getting started
First fork the project to your GitHub account. Then clone it, checkout a new branch, and install the dependencies. 

```bash
git clone https://github.com/YOUR_USERNAME/backpack.git
cd backpack
git checkout -B YOUR_BRANCH_NAME
npm install
```

Backpack is a monorepo powered by [Lerna](https://lernajs.io/). After you install, Lerna will run its `bootstrap` command that will install all dependencies in each of the `packages` and `examples` folders, build each example, and symlink all interdependencies.

Now you can run all of the examples with your **local** version of Backpack. When you make edits to anything in `packages`, you (will probably) need to restart the example you are working with to pick up changes. Imagine the following workflow:

In one terminal tab, I open and run the `basic` example:

```
cd examples/basic
npm run dev
```

Next, I open up `packages/backpack-core/webpack.config.js` in my editor and make some changes to the webpack configuration focusing on development mode.

To try out these local changes, I would need to: 
 
- Kill the running example (i.e. `CMD + c`)
- Rerun it to pickup changes (i.e. `npm run dev`)

That's it. 

## Using Lerna

When moving between branches, it's a good idea to work with a fresh install.

In your project's root run the following:

```bash
./node_modules/bin/lerna clean 
./node_modules/bin/lerna bootstrap
```

This will clean out, reinstall, rebuild, and symlink all of the `examples` and `packages` properly.


## Support

- Join the #backpack channel in our public Slack group. Sign up at [https://palmer.chat](https://palmer.chat/)
- File an issue on GitHub
- Tweet to or DM [@jaredpalmer](https://twitter.com/jaredpalmer)


