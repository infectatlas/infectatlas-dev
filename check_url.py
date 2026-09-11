import urllib.request
try:
    req = urllib.request.Request("https://www.cdc.gov/groupastrep/diseases-public/necrotizing-fasciitis.html", headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    print(res.getcode())
except Exception as e:
    print(e)
