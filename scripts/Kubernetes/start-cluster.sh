gcloud config set compute/zone us-west1-b
gcloud container clusters create --preemptible bigdata-cluster --tags=allow-5000
gcloud container clusters get-credentials bigdata-cluster
kubectl get nodes
