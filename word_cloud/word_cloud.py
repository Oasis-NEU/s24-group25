from wordcloud import WordCloud
import matplotlib.pyplot as plt
import json

# https://amueller.github.io/word_cloud/auto_examples/index.html

max_words = 1000

def makeImage(products):
    wc = WordCloud(background_color="white", max_words=max_words)

    # generate word cloud
    for product_name,product in products.items():
        wc.generate_from_frequencies(product)

        # show
        plt.figure()
        plt.imshow(wc, interpolation="bilinear")
        plt.title(product_name)
        plt.axis("off")
        
    plt.show()

    
def parseFrequencies():
    """given product_keywords.json is in the same directory as this script"""
    
    products = {}
    
    with open("product_keywords.json", 'r') as file:
        p = json.load(file)
        products = p
   
    """
     Let's say you have a total weight of 100
    and all of your words are like 10, 50, 29
    The frequency will be weight / weight total = 10 / 100
    then 10% from the total words percentage * max_words = 10% * 1000
    """
    
    for reviews in products.values():
        total = sum(weights for weights in reviews.values())
        for key in reviews:
            percentage = reviews[key] / total
            frequency = int(percentage * max_words)
            reviews[key] = frequency
            
    print(products)
    return products

# parseFrequencies()
makeImage(parseFrequencies())