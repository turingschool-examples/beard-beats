import DS from 'ember-data';

let Artist = DS.Model.extend({
  name: DS.attr('string'),
  onTour: DS.attr('boolean', { defaultValue: false }),
  albums: DS.hasMany('album', { async: true })
});

Artist.reopenClass({
  FIXTURES: [
    { id: 1, name: "Iron and Wine", albums: [ 1, 2 ] },
    { id: 2, name: "Bon Iver", albums: [ 3, 4 ] },
    { id: 3, name: "Ray Lamontagne", albums: [ 5, 6 ] }
  ]
});

export default Artist;
