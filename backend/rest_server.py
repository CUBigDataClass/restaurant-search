from elasticsearch import Elasticsearch
from flask import Flask, request, jsonify
import json
app = Flask(__name__)
es = Elasticsearch(host='es')

@app.route("/")
def hello():
  return "Restaurant App"

@app.route("/q")
def query():
  q = request.args.get('query')
  res = es.search(index="review-index", body={
  "query":{
    "match":{
      "text":str(q)
     }
   },
   "aggs":{
    "by_business_id": {
    "terms":{
    "field":"business_id.keyword"
  }
  }
  }
  })
  return jsonify(res['aggregations']['by_business_id']['buckets'])
if __name__ == "__main__":
  app.run(host="0.0.0.0")