This addon provides the following functions:
  getUPC(searchStr, console)
  getPrice(searchStr, console, upcStr, type)

getUPC will return the upc of the game for a given console, so that you don't have to manually look it up. It is preferred to provide the UPC to the getPrice function to reduce the load on VGPC's servers. Otherwise it does a search for the game instead of a direct lookup.
  
getPrice will retrieve the price of the game for a given console and type (i.e. loose, complete, new, etc)

Here is how you use it =getPrice(A17, "sega genesis", B17, "u") where...
  A17 is the name of the game
  The name of the console must match the name used in the URL on VGPC's website for that given console
  B17 is the UPC
  u & l = loose, c = complete, n = new, g = graded, b = box only, m = manual only
  
  The same goes for getUPC, =getUPC(A17, "sega genesis").
    After you get the UPC, you should Copy it and "Paste special > Values only" so that you don't constantly make a call to VGPC to lookup the UPC
