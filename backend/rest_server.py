from elasticsearch import Elasticsearch
from flask import Flask, request, jsonify
import json
import requests
import urllib.parse
import collections
app = Flask(__name__)
es = Elasticsearch(host='es')

YOUR_API_KEY = 'you wish you bitch'

app = Flask(__name__)
es = Elasticsearch([{'host':'elasticsearch-0.es','port':9200}])

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
def home_page():
    return "Restaurant App!!\n"

@app.route("/dashboard",methods=['GET'])
def reviews_query():
    query_word = request.args['word']
    latitude = str(request.args['lat'])
    longitude = str(request.args['long'])
    location = latitude+","+longitude
    #print("Request received: ",query_word,latitude,longitude,flush=True)
    res = es.search(index="mydb_reviews", body={"query":{"match":{"text":str(query_word)}},"aggs":{"by_business_id":{"terms":{"field":"business_id.keyword"}}}})
    buckets = res['aggregations']['by_business_id']['buckets']
    business_ids = set()
    for bucket in buckets:
        business_ids.add(str(bucket["key"]))
    #print(business_ids, flush=True)
    res1 = es.search(index="mydb_restaurants", body={"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"16km","location":location}}}}})
    hits = res1["hits"]["hits"]
    business_ids2 = set()
    for el in hits:
        business_ids2.add(str(el["_source"]["business_id"]))
    #print(business_ids2, flush=True)
    final_business_ids = business_ids.intersection(business_ids2)
    #print(final_business_ids, flush=True)

    res2 = es.search(index="mydb_restaurants", body={"query":{"terms":{"business_id.keyword":list(final_business_ids)}}})
    final_result = []
    hits = res2["hits"]["hits"]

    for ele in hits:
        temp = ele['_source']
        temp.update({'top_10_reviews': []})
        #final_result.append(temp)
        res3 = es.search(index="mydb_reviews",body={"query":{"bool":{"must":{"match":{"business_id.keyword":"FJo2jznp56MU_IdDcX038A"}},"filter":{"range":{"sentiment.score":{"gte": 0}}}}},"size":10,"from":0,"_source":["text", "reviewRating","datePublished"]})
        hits_rev = res3["hits"]["hits"]
        for review in hits_rev:
            #review['_source']['text'] = review['_source']['text'].encode('utf-8')
            temp['top_10_reviews'].append(review['_source'])

        final_result.append(temp)
        
    fr = jsonify(final_result)
    fr.headers.add('Access-Control-Allow-Origin', '*')
    return fr

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
    app.run(host='0.0.0.0',debug=True)
