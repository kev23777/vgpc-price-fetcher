This addon provides the following functions:
- getUPC(searchStr, console)</br>
  - getUPC will return the UPC of the game for a given console, so that you don't have to manually look it up.
  - It is preferred to provide the UPC to the getPrice function to reduce the load on VGPC's servers, otherwise it does a search for the game instead of a direct lookup.
  - After you get the UPC, you should Copy it and "Paste special > Values only" so that you don't constantly make a call to VGPC to lookup the UPC
- getPrice(searchStr, console, upcStr, type)
  - getPrice will retrieve the price of the game for a given console and type (i.e. loose, complete, etc)</br></br></br>

Here is how you use it =getPrice(A17, "sega genesis", B17, "u") where...
- A17 is the name of the game
- The name of the console must match the name used in the URL on VGPC's website for that given console (e.g. "wonderswan" from https://www.pricecharting.com/console/wonderswan)
- B17 is the UPC
- the type is one of the following letters: u & l = loose, c = complete, n = new, g = graded, b = box only, m = manual only
  
The same goes for getUPC, =getUPC(A17, "sega genesis")
