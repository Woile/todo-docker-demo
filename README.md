# TODO DEMO WITH DOCKER

This is a demo of a working system using docker, in theory,
this could be deployed with no inconvinience, though it has not been tested.

## Containers used

* Guniucorn Backend (Falcon Python)
* Nginx Frontend (Marionette JS)
* MongoDB


## Usage

### Install docker

Visit [docker web](https://docs.docker.com/linux/) for steps on how to install it in your OS.

### Clone this repo
`git clone https://github.com/Woile/todo-docker-demo.git`

### Build images
`docker-compose build`

### Start containers
`docker-compose start`
`docker-compose logs`
