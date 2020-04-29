apt-get update
apt-get install -y curl
apt-get install -y python3 python3-pip git

mkdir flask
git clone https://github.com/pallets/flask.git flask
cd flask/examples/tutorial
python3 setup.py install
pip3 install -e .

pip3 install elasticsearch
pip3 install requests
cd /app

curl --header 'Content-Type:application/json' --request PUT http://elasticsearch-0.es:9200/mydb_reviews -d '{"mappings":{"properties":{"business_id":{"type":"text","fields":{"keyword":{"type":"keyword"}}}}}}'
python3 elasticRest.py
