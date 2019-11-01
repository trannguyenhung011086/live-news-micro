**Goal:** learn using Micro with simple routes to fetch result from News API

**Stack**

-   use Zeit Now platform for deployment (https://zeit.co)
-   use Zeit Micro for server (https://github.com/zeit/micro)
-   use Micro routes (https://github.com/amio/micro-fork)

## Steps

-   register free account at News API to get token
-   add token to `.env` file (add to .gitignore)
-   install now: `npm i -g now`
-   run `now login` to login with Zeit credentials
-   run `now secrets add news_token <NEWS_TOKEN>` to add News API secrets
-   run `now` to deploy
