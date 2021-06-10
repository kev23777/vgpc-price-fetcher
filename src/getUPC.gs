function getUPC(searchStr, console)
{
  if(searchStr.substr(0,7).toLowerCase() == "http://")
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
  
  match = new RegExp('UPC:(?:.|\n)*([0-9]{12})', 'g').exec(sHTML);
  return match==null?"":match[1];
};
