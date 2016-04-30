FROM python:3

RUN apt-get update && apt-get install -y wget curl software-properties-common sudo
RUN sh -c "echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' > /etc/default/locale"

#virtaulenv
RUN apt-get install -y git
RUN apt-get install -y libgeoip-dev

RUN apt-get install -y python-pip libmysqlclient-dev pkg-config \
                       libxslt1-dev python-lxml python-setuptools build-essential
RUN apt-get -y autoremove
RUN apt-get -y -f install

RUN /bin/bash -c "pip install pip -U"
ADD ./run.sh /
CMD ["/run.sh"]

