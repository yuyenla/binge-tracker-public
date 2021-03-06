import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Shows} from '/imports/api/shows/shows.js';
import './addShows.html';

var showTitle='';

Session.setDefault('searching', false);

Tracker.autorun(function() {
  //console.log("before if: ", Session.get('query'));
  if (typeof(Session.get('query')) != "undefined") {
    //console.log("session.getQuery", Session.get('query'));
    var searchHandle = Meteor.subscribe('shows', Session.get('query'));
    Session.set('searching', !searchHandle.ready());
  }
  if (typeof(Session.get('showId')) != "undefined") {
    var searchHandle = Meteor.subscribe('showReturn', Session.get('showId'));
    Session.set('searching', !searchHandle.ready());
  }
});

Template.addShows.onRendered(function(){
  $('.ui.dropdown').dropdown();
  $('.dropdown').dropdown();
  $('#search-select').dropdown();
});

Template.addShows.events({
  'click .item' : function(event, template) {
    id = $('.selected').attr('id');
    showTitle = $('.selected').attr('data-value');
    Session.set('title', showTitle);
    Session.set('showId', id);
    console.log("i clicked on:", Session.get('showId'));

  },
  //you need to pass in the event target! as long as it's keyup, then it can tell.
  'keydown .search' : function(event,template) {
    var query = $(event.target).val();
    //console.log("keydown",query);
    if(query.length >= 3){
      setTimeout(function() {
        //console.log("query length", query.length);
        Session.set('query', query);
      }, 1000);

    }
  }
});

Template.addShows.helpers({
  shows: function() {
    return Shows.find();
  },
  searching: function() {
    return Session.get('searching');
  }
});

Template.foundShows.helpers({
  show: function() {
    console.log("i made it here");
    console.log("show id!!!",Session.get('showId'));
    console.log("fetch", Shows.find({show_id: 37680}).fetch());
    console.log("session type", typeof(Session.get('showId')));
    return Shows.find({show_id: Session.get('showId')});
  },
});



/*
Template.addShows.events({
  'submit .form-horizontal'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    var query = $('input[type=text]').val();
    console.log("getting the value of query on client side ", query)
    Meteor.call("getShowsAPI", query, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log("result", result);
      }
    });
  } */
/*
    // Get value from form element, you can use the jquery library for this
    const showName = $('#title').val();
    const season=$('#season').val();
    const episode=$('#episode').val();
    console.log("title: ", showName);
    console.log("season: ", season);
    console.log("episode: ", episode);
    var info = {'title' : showName,
                'season' : season,
                'episode' : episode,};
    Meteor.call('shows.insert', info, function(error, result) {
      console.log(result);
      if( result == true)
      {
        $('.message').show();
      }
    });
  },*/
//});
