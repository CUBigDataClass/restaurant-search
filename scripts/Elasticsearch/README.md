# Elastic Search files

elasticSearch.sh: 

Initiates a pod with elastic search. It uses the following files:
	
	elasticSearch.yaml: configuration to create the elastic search pods
	
	elasticService.yaml: configuration to create the headless service
	
	elasticStorage.yaml: configuration to create Storage class.

	kubectl get all: command to check if elasticsearch pods are up


