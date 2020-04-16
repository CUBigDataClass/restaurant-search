export PROJECT=$(gcloud info --format='value(config.project)')			    # Set PROJECT=project_id
gcloud config set compute/zone us-west1-b
gcloud container clusters create --preemptible bigdata-cluster --tags=allow-5000    # Create the cluster; by default 3 nodes are present in the cluster
gcloud container clusters get-credentials bigdata-cluster                           # Fetch credentials for a running cluster; credentials are written to HOME/.kube/config
kubectl get nodes                                                                   # Gets details on the nodes of the cluster created
