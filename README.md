# hippo

## Hacker News Top Stories App

hippo is a small web app that uses [Hacker News API](https://github.com/HackerNews/API) to present the news. It's always live! So you don't need to refresh the page to see the changes for stories and comments.

Go to this [link](https://hacker-news-top-stories.herokuapp.com) to visit hippo on heroku.

### Developing:

Open up a terminal and install the dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn run dev-server
```

### Running tests:

In your terminal:

```bash
yarn run test
```

and if you want to have the tests running as you develop (in watch mode):

```bash
yarn run test --watchAll
```

### Building:

hippo has two build types development and production:

```bash
yarn run build:dev
```

```bash
yarn run build:prod
```

The assets, once built, are going to be under the `/public/dist` directory.

### Deploying:

You can also deploy the app using the assets and a small node server that is also included in this repo. Make sure your deployment machine either builds the assets or has access to the assets and then also make sure it runs:

```bash
yarn run start
```

to fire up a small web server that hosts the assets.

hippo is also deployed to heroku!!
