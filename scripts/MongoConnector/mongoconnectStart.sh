export PROJECT=$(gcloud info --format='value(config.project)')
docker build --no-cache -t myconnector:0.1 .					# Build the docker image
docker tag myconnector:0.1 gcr.io/$PROJECT/myconnector:0.1			# Tag the image
docker push gcr.io/$PROJECT/myconnector:0.1					# Push the image into google container registry (gcr)
kubectl create deployment myconnector --image gcr.io/$PROJECT/myconnector:0.1	# Create mongoconnector deployment (creates the pod)
