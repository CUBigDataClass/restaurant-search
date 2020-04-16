kubectl apply -f googlecloud_ssd.yaml   # Creates storage class (can update if resource already exists) in the cluster.
kubectl apply -f mongo-statefulset.yaml # Creates and manages the deployment & scaling of mongo-db replica set (3 pods)
