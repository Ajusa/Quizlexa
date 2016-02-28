var database;
var data;

function setStore() {
    var self = this;
    database = new Firebase("http://quizlet.firebaseio.com/");
    database.on("value", function(snapshot) {
        RiotControl.trigger('new_data', snapshot.val());
        console.log('update')
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    var exists;

    riot.observable(self);
    self.on('addSet', function(value) {
        for (var i = value.terms.length - 1; i >= 0; i--) {
            value.terms[i].set_id = value.id;
            value.terms[i].title = value.title;
        }
        setSubject(value);
        setView(value);
        alert("Set Added")
    });
    self.on('deleteSet', function(category, id) {
        JSONP('http://quizlet.firebaseio.com/' + category + '/.json', function(json) {
            exists = json;
            var temp = database.child(category);
            for (var i = exists.length - 1; i >= 0; i--) {
                if (exists[i].set_id == id) {
                    exists.splice(i, 1)
                }
                temp.set(exists)
            }
        });
        JSONP('http://quizlet.firebaseio.com/view.json', function(json) {
            exists = json;

            var temp = database.child('view');
            for (var i = exists.length - 1; i >= 0; i--) {
                if (exists[i].id == id) {
                    exists.splice(i, 1)
                }
                temp.set(exists)
            }

        });
        alert("Set Removed")

    });
    self.on('refresh', function(value) {

    });

}

function setSubject(value) {
    var exists;
    JSONP('http://quizlet.firebaseio.com/' + value.type + '/.json', function(json) {
        exists = json;
        var temp = database.child(value.type);
        if (exists == null) {
            temp.set(value.terms)
        } else {
            exists.push(value.terms)
            temp.set(exists)
        }
    });

}

function setView(value) {
    var exists;
    JSONP('http://quizlet.firebaseio.com/view.json', function(json) {
        exists = json;
        temp = database.child('view');
        if (exists == null) {
            temp.set([value])
        } else {
            exists.push(value)
            temp.set(exists)
        }
    });
}

function getData() {
    riot.observable(this);
    JSONP('http://quizlet.firebaseio.com/.json', function(json) {
        RiotControl.trigger('new_data', json);
    });
}
