FROM python:3

RUN apt-get update && apt-get install -y openssh-server wget curl software-properties-common sudo
RUN sh -c "echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' > /etc/default/locale"

RUN mkdir /var/run/sshd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

# Expose a bunch of ports .. 22 for SSH
EXPOSE 22

RUN sh -c "echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' > /etc/default/locale"

#virtaulenv
RUN apt-get install -y git
RUN apt-get install -y libgeoip-dev

RUN apt-get install -y python-pip libmysqlclient-dev pkg-config \
                       libxslt1-dev python-lxml python-setuptools build-essential

#Listen for connections
CMD ["/usr/sbin/sshd", "-D"]

RUN /bin/bash -c "pip install pip -U"

