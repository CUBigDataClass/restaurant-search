kubectl apply -f elasticStorage.yaml  # Creates a storage class
kubectl apply -f elasticService.yaml  # Creates a headless service
kubectl apply -f elasticSearch.yaml   # Creates the elasticsearch pods
