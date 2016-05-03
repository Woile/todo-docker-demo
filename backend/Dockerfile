FROM python:3

RUN apt-get update
RUN apt-get install -y python-pip libmysqlclient-dev pkg-config \
                       libxslt1-dev python-lxml python-setuptools build-essential python-dev
RUN apt-get -y autoremove
RUN apt-get -y -f install

RUN /bin/bash -c "pip install pip -U"
ADD ./run.sh /
CMD ["/run.sh"]

