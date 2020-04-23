from textblob import TextBlob
import json


with open('reviews.json', 'r') as data_file:
    json_data = json.load(data_file)
for review in json_data:
    text = TextBlob(review["text"])
    
    review.update({"sentiment" : {"score": text.sentiment.polarity, "magnitude": text.sentiment.subjectivity}})
    print(json.dumps(review, indent=2))
    # print(",")
