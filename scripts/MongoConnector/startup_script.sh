apt-get update
apt-get install -y curl
apt-get install -y python3 python3-pip
curl --header 'Content-Type:application/json' --request PUT http://elasticsearch-0.es:9200/mydb_restaurants -d '{"mappings": {"properties": {"location": {"type": "geo_point"}}}}'
pip3 install 'mongo-connector[elastic5]' 'elastic2-doc-manager[elastic5]'
mongo-connector -m "mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo" -c mongoconnector.json	# Connects mongodb to elasticsearch
