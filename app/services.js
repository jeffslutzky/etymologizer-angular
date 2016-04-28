myApp.service('etymologyService', function(){

  this.findEtymology = function(word) {
      var entry = word.entry_list.entry;
      if (entry.length) {
        return this.findCorrectSubEntry(entry);
      } else {
        return entry.et;
      };
  };

  this.findCorrectSubEntry = function(entry) {

    for (i = 0; i < entry.length; i++) {
      if (entry[i].et && typeof entry[i].et === "string") {
        return entry[i].et;
      };
    };
  };

  this.getValidHTML = function(etymology) {
    etymology = etymology.replace(/<it>/g , "<em>").replace(/<\/\it>/g , "</em>");
    etymology = etymology.replace(/<ma>/g , " (more at <em>").replace(/<\/\ma>/g , "</em>)");
    return etymology;
  };

});


myApp.service('originLanguageService', function() {

  this.getLanguage = function(etymology) {
    if (etymology.includes("Anglo-French")) {
      return "anglo-french";
    } else if (etymology.includes("Old English")) {
      return "old-english";
    } else if (etymology.includes("Latin")) {
      return "latin";
    } else if (etymology.includes("Greek")) {
      return "greek";
    } else if (etymology === "null") {
      return;
    } else {
      return "other";
    };
  };

});
