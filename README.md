# try-playwright
Run simple test using Playwright with and without its docker.

# Run tests

Run locally:

```
npm run test:local
```

Run locally headless:

```
npm run test:local:headless
```

Run locally in docker:

```
docker build -t "pwdocker:Dockerfile" . && docker run -it pwdocker:Dockerfile
```

```
npm run test:docker
```
or headless:
```
npm run test:docker:headless
```