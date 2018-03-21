# Docker Example

## How to use
Download the example [or clone the whole project](https://github.com/palmerhq/backpack.git):

```bash
curl https://codeload.github.com/palmerhq/backpack/tar.gz/master | tar -xz --strip=2 backpack-master/examples/with-docker
cd with-docker
```

Inside that directory, run:

```bash
docker-compose up --build
```

This will start the two containers referenced in `docker-compose.yml` in the foreground.

To test functionality, run in a separate tab:

```bash
curl localhost:8080
```

When done, stop the docker-compose process that is running in the foreground.

## Idea behind the example

This is a basic example of how to use Backpack with Docker.

`docker-compose` starts two services, one instance of app-1 and one instance of app-2, and it binds port 8080 of app-1 to port 8080 of the host machine.

Whenever app-1 receives a GET request at the root path, it contacts app-2 (using Docker's DNS scheme) and returns information about its own operating system and the operating system of app-2.

`docker-compose.yml` is configured to mount both app directories, allowing live reloading.
