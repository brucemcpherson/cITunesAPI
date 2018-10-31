
/**
* use the itunes API
* @constructor ITunes
*/
var ITunesAPI = function() {

  var self = this;

  function getBaseUrl_  () {
    return "https://itunes.apple.com/";
  }
  
  
 
 /**
  * lookup by id
  * @param {string} id the ids
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupById = function (id,extraParams) {
    return self.lookup (id, extraParams , "id");
  };
 
   /**
  * lookup by amgartistid
  * @param {Array.string || string} id the id
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupByAmgArtistId = function (id,extraParams) {
    return self.lookup (id, extraParams , "amgArtistId");
  };
  
  /**
  * lookup by amgvideoid
  * @param {Array.string || string} id the id
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupByAmgVideoId = function (id,extraParams) {
    return self.lookup (id, extraParams , "amgVideoId");
  };
  
  /**
  * lookup by amgalbumid
  * @param {Array.string || string} id the id
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupByAmgAlbumId = function (id,extraParams) {
    return self.lookup (id, extraParams , "amgAlbumId");
  };
  
   /**
  * lookup by upc
  * @param {Array.string || string} id the ids
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupByUpc = function (id,extraParams) {
    return self.lookup (id, extraParams , "upc");
  };
  
  
     /**
  * lookup by isbn
  * @param {Array.string || string} id the ids
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.lookupByIsbn = function (id,extraParams) {
    return self.lookup (id, extraParams , "isbn");
  };
  
 /**
  * lookup 
  * @param {Array.string || string} id the id
  * @param {Array.string} [extraParams] any extra parameters
  * @param {string} [key="id"]
  * @return {object} the result
  */
  self.lookup = function (id,extraParams,key) {
    key = key || "id";
    if (!Array.isArray(id)) {
      id = [id];
    }
    extraParams = extraParams || [];
    extraParams.push(key + "="+id.join(","));
    return urlExecute_ ('lookup', extraParams);
  };
  
 /**
  * lookup by id
  * @param {string} searchTerm the id
  * @param {Array.string} [extraParams] any extra parameters
  * @return {object} the result
  */
  self.searchTerm = function (searchTerm, extraParams) {
    extraParams = extraParams || [];
    extraParams.push('term' + "=" + searchTerm);
    return urlExecute_ ('search', extraParams);
  };
  

  /**
  * execute a API request
  * @param {string} urlTail the url appendage
  * @param {[string]} [params] the params
  * @param {string} [options] any options to be merged in
  * @return {object} a standard response object
  */
  function urlExecute_ ( urlTail , params , options) {
    
    // set default options
    options = cUseful.Utils.vanMerge ([{
      method:"GET",
      muteHttpExceptions:true
    }, options]);

    
    // the api key etc.
    paramString = "?" + (params || []).map(function(d) {
      var s = d.split("=");
      if (s.length === 2) {
        return s[0] + "=" + encodeURIComponent (s[1]);
      }
      else {
        return d;
      }
    }).join("&");
    
    var u = getBaseUrl_ () + urlTail + paramString;
    
    var response = cUseful.Utils.expBackoff( function () {
      return UrlFetchApp.fetch(u, options);
    });
    
    // trnsmit what happened
    if (response.getResponseCode() !== 200) {
      
      return {
        response:response, 
        success:false,
        err:response.getContentText()
      }
    }
    else {
      try {
        
        var ob = JSON.parse (response.getContentText());
        
        return {
          response:response,
          data:ob,
          success:!ob.error,
          err:ob.error
        }; 
        
        
      }
      catch (err) {
        return {
          response:response,
          success:false,
          err:err
        }
      }
    }
  };
  
 
  
  
};

