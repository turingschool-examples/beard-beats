import DS from 'ember-data';

let Song = DS.Model.extend({
  title: DS.attr('string'),
  trackNumber: DS.attr('number'),
  timeInSeconds: DS.attr('number'),
  album: DS.belongsTo('album')
});

Song.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: "Lion's Mane",
      trackNumber: 1,
      timeInSeconds: 170,
      album: 1
    },
    {
      id: 2,
      title: "Promising Light",
      trackNumber: 2,
      timeInSeconds: 169,
      album: 1
    },
    {
      id: 3,
      title: "Faded from the Winter",
      trackNumber: 3,
      timeInSeconds: 198,
      album: 1
    },
    {
      id: 4,
      title: "Caught in the Briars",
      trackNumber: 1,
      timeInSeconds: 194,
      album: 1
    },
    {
      id: 5,
      title: "Lovers' Revolution",
      trackNumber: 11,
      timeInSeconds: 340,
      album: 1
    },
    {
      id: 6,
      title: "Low Light Buddy of Mine",
      trackNumber: 4,
      timeInSeconds: 210,
      album: 2
    },
    {
      id: 7,
      title: "Flume",
      trackNumber: 1,
      timeInSeconds: 219,
      album: 3
    },
    {
      id: 8,
      title: "Re: Stacks",
      trackNumber: 9,
      timeInSeconds: 401,
      album: 3
    },
    {
      id: 9,
      title: "Skinny Love",
      trackNumber: 3,
      timeInSeconds: 218,
      album: 3
    },
    {
      id: 10,
      title: "Perth",
      trackNumber: 1,
      timeInSeconds: 262,
      album: 4
    },
    {
      id: 11,
      title: "Towers",
      trackNumber: 4,
      timeInSeconds: 188,
      album: 4
    },
    {
      id: 12,
      title: "Holocene",
      trackNumber: 3,
      timeInSeconds: 337,
      album: 4
    },
    {
      id: 13,
      title: "Trouble",
      trackNumber: 1,
      timeInSeconds: 245,
      album: 5
    },
    {
      id: 14,
      title: "Hold You In My Arms",
      trackNumber: 3,
      timeInSeconds: 509,
      album: 5
    },
    {
      id: 15,
      title: "Jolene",
      trackNumber: 9,
      timeInSeconds: 234,
      album: 5
    },
    {
      id: 16,
      title: "You are the Best Thing",
      trackNumber: 1,
      timeInSeconds: 215,
      album: 6
    },
    {
      id: 17,
      title: "Meg White",
      trackNumber: 6,
      timeInSeconds: 234,
      album: 6
    },
    {
      id: 18,
      title: "Sarah",
      trackNumber: 3,
      timeInSeconds: 270,
      album: 6
    }
  ]
});

export default Song;
