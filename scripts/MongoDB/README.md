### Files:

mongoStart.sh: initiates a mongoDB replica set. To set up the MongoDB replica set, you need three things: A StorageClass, a Headless Service, and a StatefulSet. This script uses the following two files

googlecloud_ssd.yaml: This configuration creates a new StorageClass called "fast" that is backed by SSD volumes. The StatefulSet can now request a volume, and the StorageClass will automatically create it.
	
mongo-statefulset.yaml: This configuration deploys both the Headless Service and the StatefulSet. When a headless service is combined with StatefulSets, they can give you unique DNS addresses that let you directly access the pods.




### How to initialise a replica set:
	
kubectl exec -it mongo-0.mongo mongo

rs.initiate()

var cfg = rs.conf()

cfg.members[0].host="mongo-0.mongo:27017"

rs.reconfig(cfg)

rs.add("mongo-1.mongo:27017")

rs.add("mongo-2.mongo:27017")

rs.status()



### How to insert data into mongoDB:

kubectl cp restaurant_details.json mongo-0:/

kubectl cp restaurant_reviews.json mongo-0:/

kubectl exec -it mongo-0 bash

mongoimport --db bdata --collection restaurants --drop --file restaurant_details.json

mongoimport --db bdata --collection reviews --drop --file restaurant_reviews.json

