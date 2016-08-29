import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Shows} from '/imports/api/shows/shows.js';


/*Meteor.publish('seasons', function(season){
  var showId = HTTP.get('http://api.themoviedb.org/3/tv/' + id + '&api_key=750bf13867ffdeadf92768f357cea8c0', {
  });
});*/


Meteor.publish('shows', function(query) {
  console.log("query on server side", query);
  var self = this;
  try {
    var response = HTTP.get('http://api.themoviedb.org/3/search/tv?query=' + encodeURI(query) + '&api_key=750bf13867ffdeadf92768f357cea8c0&page=1', {
    });

    //var id = response.data.results[0].id;
    //console.log("id", id);


    _.each(response.data.results, function(item) {
      var doc = {
        //thumb: item.poster_path,
        title: item.name,
        //show_id: item.id,
        //link: item.id + encodeURI(query),
        //snippet: item.overview
      };

      console.log("doc: ", doc);
      //upsert = update or insert
    /*  var shows = Shows.findOne({title: item.name});
      console.log("shows",shows);
      if(!shows){
        Shows.insert({title: item.name});
        console.log("Shows.insert", item.name);
      }*/

      self.added('shows', Random.id(), doc);
    });


    self.ready();

  } catch(error) {
    console.log(error);
  }
});

/*Meteor.methods({
  getShowsAPI:function(query){
    console.log("Query server side/API call ", encodeURI(query));
    try {
      var response = HTTP.get('http://api.themoviedb.org/3/search/tv?query=' + encodeURI(query) + '&api_key=750bf13867ffdeadf92768f357cea8c0&page=1', {
      });
      //console.log("response", response);
      for(var i = 0; i < response.data.results.length; i++){
      console.log("TITLE:", response.data.results[i].name);
    }
      //console.log("OVERVIEW: ", response.data.results[0].overview);
      _.each(response.data.items, function(item) {

        var doc = {
          thumb:response.data.results[0].poster_path,
          title:response.data.results[0].name,
          overview:response.data.results[0].overview,
        };

      });


    } catch(error) {
      console.log(error);
    }
  }
});
*/
