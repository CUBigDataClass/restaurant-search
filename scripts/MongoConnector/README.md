### Files:
mongoconnectStart.sh: builds a docker image using the Dockerfile, tags it and creates a mongo-connector pod using this image.

startup_script.sh: contains installation requirements to run the mongo-connector onto our pod.

Dockerfile: used to create the docker image for mongo-connector

mongoconnector.json: configuration file containing information about the elastic search document manager, the elastic search cluster associated and the mongoldb cluster. Used by the mongo-connector process.
