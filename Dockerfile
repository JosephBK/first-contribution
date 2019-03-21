FROM node:slim

LABEL "name"="first-contribution"
LABEL "maintainer"="GitHub Actions <support+actions@github.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="First-time Contributor"
LABEL "com.github.actions.description"="A filter for determining if a pull request is by a first-time contributor"
LABEL "com.github.actions.icon"="user-plus"
LABEL "com.github.actions.color"="green"

COPY *.md /
COPY package*.json ./

RUN npm ci

COPY entrypoint.js /entrypoint.js

ENTRYPOINT ["node", "/entrypoint.js"]
