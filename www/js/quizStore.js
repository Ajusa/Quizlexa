function quizStore() {
    var self = this;
    var temp;
    riot.observable(self);
    self.on('search', function(value) {
        JSONP('https://api.quizlet.com/2.0/search/sets?client_id=bU5rSEGmEs&q=' + value, function(json) {
            self.trigger('returnSearch', json);
        });


    });
    self.on('getSet', function(id) {
        JSONP('https://api.quizlet.com/2.0/sets/'+id+'?client_id=bU5rSEGmEs&whitespace=1', function(json) {
            console.log(json)
            self.trigger('returnSet', json);
        });
    });
}
