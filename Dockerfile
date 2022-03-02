FROM mcr.microsoft.com/playwright:focal
COPY ./ ./
RUN apt-get update && npm install