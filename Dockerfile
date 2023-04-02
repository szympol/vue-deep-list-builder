FROM mcr.microsoft.com/playwright:v1.32.1-focal

ENV HOME=/home/node
WORKDIR ${HOME}
RUN mkdir -p .npm .cache

RUN npm install --location=global npm@9.6.3

RUN chmod -R 777 ${HOME}
WORKDIR /app
