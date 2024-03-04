from wordcloud import WordCloud
import matplotlib.pyplot as plt
import json


max_words = 1000

def makeImage(frequencies):
    wc = WordCloud(background_color="white", max_words=max_words)

    # generate word cloud
    wc.generate_from_frequencies(frequencies)

    # show
    plt.imshow(wc, interpolation="bilinear")
    plt.axis("off")
    plt.show()

def parseFrequencies():
    """given product_keywords.json is in the same directory as this script"""
    
    reviews = {}
    
    with open("product_keywords.json", 'r') as file:
        products = json.load(file)
        r = products.get('Product One')
        print(r)
        reviews = r

   
    """
     Let's say you have a total weight of 100
    and all of your words are like 10, 50, 29
    The frequency will be weight / weight total = 10 / 100
    then 10% from the total words percentage * max_words = 10% * 1000
    """
    
    total = sum(weights for weights in reviews.values())
    
    for key in reviews:
        percentage = reviews[key] / total
        frequency = int(percentage * max_words)
        reviews[key] = frequency
        
    print(reviews)        
    return reviews

parseFrequencies()
makeImage(parseFrequencies())