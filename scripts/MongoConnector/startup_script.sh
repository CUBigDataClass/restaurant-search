apt-get update
apt-get install -y python3 python3-pip
pip3 install 'mongo-connector[elastic5]' 'elastic2-doc-manager[elastic5]'
mongo-connector -m "mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo" -c mongoconnector.json	# Connects mongodb to elasticsearch
