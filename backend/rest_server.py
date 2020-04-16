from elasticsearch import Elasticsearch
from flask import Flask, request, jsonify
import json
import requests
import urllib.parse
import collections
app = Flask(__name__)
es = Elasticsearch(host='es')

YOUR_API_KEY = 'you wish you bitch'

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = collections.OrderedDict()

    def get(self, key):
        try:
            value = self.cache.pop(key)
            self.cache[key] = value
            return value
        except KeyError:
            return -1

    def set(self, key, value):
        try:
            self.cache.pop(key)
        except KeyError:
            if len(self.cache) >= self.capacity:
                self.cache.popitem(last=False)
        self.cache[key] = value

# Increase cache size
cache = LRUCache(100)

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

@app.route("/pics")
def pics():
  res = []
  q = request.args.get('query')
  cached_response = cache.get(q)
  if cached_response != -1:
    return cached_response
  url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + q + '&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id&key=' + YOUR_API_KEY
  places_response = requests.get(url)
  places_response_json = places_response.json()
  candidate = places_response_json['candidates'][0]
  place_id = candidate['place_id']
  url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=photo&key=' + YOUR_API_KEY
  details_response = requests.get(url)
  details_response_json = details_response.json()
  for photo in details_response_json['result']['photos']:
    url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo['photo_reference'] + '&key=' + YOUR_API_KEY
    response = requests.get(url, allow_redirects=False)
    res.append({
      'img': response.headers['Location']
    })
  res = jsonify(res)
  res.headers.add('Access-Control-Allow-Origin', '*')
  cache.set(q, res)
  return res


if __name__ == "__main__":
  app.run(host="0.0.0.0")