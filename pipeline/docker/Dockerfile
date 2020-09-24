FROM jackjiaibm/zowe-jenkins-slave-nvm
RUN apt install sshpass
RUN npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
RUN npm install -g @brightside/core@lts-incremental
RUN npm install -g npm-cli-login
CMD ["/bin/bash"]