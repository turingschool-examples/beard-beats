import DS from 'ember-data';

let Album = DS.Model.extend({
  title: DS.attr('string'),
  releaseDate: DS.attr('date'),
  artist: DS.belongsTo('artist', { async: true }),
  songs: DS.hasMany('song', { async: true })
});

Album.reopenClass({
  FIXTURES: [
    { id: 1,
      title: "The Creek Drank the Cradle",
      releaseDate: 2002,
      artist: 1,
      songs: [ 1, 2, 3 ],
    },
    { id: 2,
      title: "Ghost on Ghost",
      releaseDate: 2000,
      artist: 1,
      songs: [ 4, 5, 6 ],
    },
    { id: 3,
      title: "For Emma, Forever Ago",
      releaseDate: 2007,
      artist: 2,
      songs: [ 7, 8, 9 ],
    },
    { id: 4,
      title: "Bon Iver, Bon Iver",
      releaseDate: 2011,
      artist: 2,
      songs: [ 10, 11, 12 ],
    },
    { id: 5,
      title: "Trouble",
      releaseDate: 2004,
      artist: 3,
      songs: [ 13, 14, 15 ],
    },
    { id: 6,
      title: "Gossip in the Grain",
      releaseDate: 2008,
      artist: 3,
      songs: [ 16, 17, 18 ],
    }
  ]
});

export default Album;
