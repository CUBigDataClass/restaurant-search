export PROJECT=$(gcloud info --format='value(config.project)')
docker build --no-cache -t myserver:0.1 .						# Build docker image (from Dockerfile)
docker tag myserver:0.1 gcr.io/$PROJECT/myserver:0.1				# Tag the image
docker push gcr.io/$PROJECT/myserver:0.1						# Push the image into google cloud registry (gcr)

kubectl create deployment myserver --image gcr.io/$PROJECT/myserver:0.1		# Create deployment (create myserver pod)
kubectl expose deployment myserver --type=LoadBalancer --port 80 --target-port 5000	# Expose the application (to access outside the cluster)
