# SFIGS

This project presents good first issues for Bitcoin projects. It's made to simplify for developers new to working with open-source software to begin working on recognizable Bitcoin projects.

## Getting Started

### First copy the environment variables

```bash
cp .env.sample .env.local
```

You should populate the `GITHUB_ID` and `GITHUB_SECRET` with your oauth app information from Github.
See [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) on how to create one.

### Next, install the dependencies. We prefer to use yarn

```bash
yarn install
```

### Finally, start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
