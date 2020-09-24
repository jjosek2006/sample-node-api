# Zowe build - contains the docker build for zowe build agent.

All the required zowe plugins/ other binaries are to be provided in the Dockerfile.

This looks like a good starting point for the build agent image.

https://github.com/zowe/jenkins-slave-images/tree/master/ibm-jenkins-slave-nvm

its almost 820MB compressed for the image, if needed we can customize the original Dockerfile

This docker build will add additional zowe cli/plugins missing and later will be used the zowe builds.

The zowe cli install guide found here;

https://docs.zowe.org/v1-1-x/user-guide/cli-installcli.html#installing-zowe-cli-from-a-local-package

if the image is too big or require additional componenets we can slim down by starting with docker:stable-dind and only install required components.

In order to run;

./build.sh $(cat VERSION)

this can later be added to the pipeline build this docker automatically if a VERSION file change is detected