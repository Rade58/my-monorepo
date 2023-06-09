## running commands with pnpm and turbo as a global package

example for dev script

```sh
pnpm exec -- turbo dev --filter <app>
```

alising the `pnpm exec --` to be `px`

put this into ~/.bashrc (or ~/.zshrc): `alias px="pnpm exec --"` and do `source ~/.bashrc` or `source ~/.zshrc` command

you can now execute like this

```sh
px turbo dev --filter <app>
```

## To run specific script in workspace

```sh
pnpm --filter <workspace> run <script> 
```

FOR EXAMPLE TO RUN `dev` SCRIPT

```
pnpm --filter my_app run dev
```

## to install/uninstall packages win pnpm in a specific workspace

```
pnpm --filter <workspace> <add/remove> @remix-run/node
```

<https://pnpm.io/cli/add#tldr>

For dev dependancies just ad `-D` flag, and for globals ad `-g` FLAG

there are more flags (peer) `--save-peer`

# Turborepo starter related info

This monorepo was started upon an official starter Turborepo.

## Started like this

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

<!-- ### Apps and Packages -->
<!-- 
- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo -->
<!-- 
Each package/app is 100% [TypeScript](https://www.typescriptlang.org/). -->

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

