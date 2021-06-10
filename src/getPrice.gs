function statusCode(url, user, pwd)
{
    try
    {
        var response = UrlFetchApp.fetch(url,
          {
            muteHttpExceptions: true,
            followRedirects: false,
            headers: {'Authorization': 'Basic ' + Utilities.base64Encode(user+':'+pwd)}
          }
        );
        
        return response.getResponseCode();
    }
    catch (error)
    {
        return "Error";
    }
}

function getPrice(searchStr, console, upcStr, type)
{
  var url;
  var sHTML;
  var priceString;

  if(upcStr != null && upcStr.toString().match(/[0-9]{12}/))
  {
    url = "https://www.pricecharting.com/search-products?q=" + upcStr.toString().match(/[0-9]{12}/) + "&type=videogames";
  }
  else if(searchStr.toString().substr(0,7).toLowerCase() == "http://")
  {
    url = searchStr;
  }
  else
  {
    searchStr = searchStr.toString();                        // ensure that games like 1942 don't throw an error
    searchStr = searchStr.replace(/^\s+|\s+$|[.!?/:]/g, ''); // strip leading and trailing spaces and remove certain punctuation
    searchStr = searchStr.replace(/\s+/g, '-');              // convert spaces into a single dash
    searchStr = searchStr.replace(/-{2,}/g, '-');            // consolidate consecutive dashes
    searchStr = searchStr.toLowerCase();
    
    console = console.toString();                // don't throw an error if something other than a string is passed in
    console = console.replace(/^\s+|\s+$/g, ''); // strip leading and trailing spaces
    console = console.replace(/\s/g,'-');        // convert spaces into a single dash

    url = "http://www.pricecharting.com/game/" + console + "/" + searchStr;
  }
  
  try
  {
    sHTML = UrlFetchApp.fetch(url).getContentText();
  }
  catch (e)
  {
    if(e.message.match(/urlfetch/g))
      return "Service invoked too many times";
    else if(e.message.match(/returned code 404/g))
      return "Not Found";
    else
      return e.message;
  }
  
  var doc = Cheerio.load(sHTML);

  try
  {
    // u & l = loose, c = complete, n = new, g = graded, b = box, m = manual
    switch (type)
    {
      case "c":
        priceString = doc('#complete_price .price').text();
        break;
      case "n":
        priceString = doc('#new_price .price').text();
        break;
      case "g":
        priceString = doc('#graded_price .price').text();
        break;
      case "b":
        priceString = doc('#box_only_price .price').text();
        break;
      case "m":
        priceString = doc('#manual_only_price .price').text();
        break;
      case "u":
      case "l":
      default:
        priceString = doc('#used_price .price').text();
        break;
    }
  }
  catch(e)
  {
    if(statusCode(url) == 301)
      return url;
    else
      return "VGPC's HTML has changed and broken the getPrice script.";
  }
  
  var match = new RegExp('.*?(\\$[0-9]+(?:\\.[0-9][0-9])?)(?![\\d])',"i").exec(priceString.trim());
  
  if (match != null)
    return parseFloat(match[0].replace("$","")); //Return a Float value so that SUM will work
  else
    return "NA"
};
