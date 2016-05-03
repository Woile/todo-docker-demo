FROM kyma/docker-nginx

RUN apt-get update
RUN apt-get -y install curl build-essential
RUN apt-get -y autoremove
RUN apt-get -y -f install

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

ADD ./run.sh /
CMD ["/run.sh"]