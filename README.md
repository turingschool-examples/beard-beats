# Ember Routing with Beard Beats

We're going to be building a music catalog with Ember. The purpose of this application is to illustrate how routes work in Ember.

To get started, clone down this repository and run the following:

```
npm install && bower install
```

In a perfect world, all of the dependencies will be installed and you can file up a server with `ember server`.

If you head over to `http://localhost:4200`, you won't see much. We're just getting started.

## The Models

This sample project comes equipped with three models:

* `artists`
* `album`
* `song`

Artists have many albums. Albums have many songs and belong to an artists. Songs belong to an album. The project comes with fixtures, so everything is wired up properly.

## The Anatomy of a Route

By the time we've drilled down to a song, we're going to end up with something like this:

```
/artists/1/albums/3/songs/1
```

In Rails, this might fire off one controller action that matches the above route.

In Ember, things work a little differently. Each segment kicks off a route and a controller. We'll have an artists route, an artist route, an albums route, an album route, a songs route, and a song route—each with their respective controllers, templates, and views.

Sounds crazy, right? Let's take a slow and deliberate walk through how this works.

## The Application Route

In the beginning there was the Application route. It lives at the very top level of your application. It's one of those things in Ember, where it's there and working even if you don't define it.

We get the Application route for free.

You can add custom functionality by creating a file in `app/routes/application.js`. But, we're going to leave it alone for now. We're more interested in `app/templates/application.hbs` right now, anyway.

If you open up `app/templates/application.hbs`, you'll see "Welcome to Ember.js". That's boring, lt's change it.

```html
<div class="application template">
  <h1>Welcome to Beard Beats</h1>
  <p>This is <em>application.hbs</em>.</p>
  {{outlet}}
</div>
```

In Ember, `{{outlet}}` is where the next view gets rendered. Right now, that's our Index route.

## The Index Route

We get another route for free as well: the Index route.

You might notice that we don't have an `app/routes/index.js` or `app/templates/index.hbs` in our project. Ember is whipping them up on the fly on our behalf.

Let's create a template in `app/templates/index.hbs`.

```
ember g template index
```

Great. We'll also give it the following content in order to confirm its existence.

```html
<div class="index template">
  <p>This is <em>index.hbs</em>.</p>
  {{outlet}}
</div>
```

If all went well, you should see that `index.hbs` was rendered inside of `application.hbs`. To be more specific, it was rendered in `application.hbs`'s `{{outlet}}`.

Those are all of the routes we're going to get for free. If we want anymore, we'll have to generate them ourselves.

## The Artists Route

Let's just go ahead and generate an Artists route, shall we?

```
ember g resource artists
```

(Make sure you *do not* override the model.)

It's probably a good idea to update `index.hbs` with a link to our new route.

```html
<div class="index template">
  <p>This is <em>index.hbs</em>.</p>
  {{#link-to 'artists'}}Artists &rarr;{{/link-to}}
  {{outlet}}
</div>
```

If you click that link right now, you'll notice two things:

* The URL updated to `/artists`
* The `index.hbs` template vanished

That's because the we swapped in the `artists.hbs` template into the Application's outlet—and the Artists template is currently blank. Let's fix that.

Just to prove everything works, let's put something in `artists.hbs`:

```html
<div class="artists template">
  <p>This is <em>artists.hbs</em>.</p>
  {{outlet}}
</div>
```

### Loading Up the Models

This is the first occasion where we're going to need to grab some models. As a result, it's also the first time we're going to have to write some custom functionality in our route.

Let's crack open `app/routes/artists.js`:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('artist');
  }
});
```

This fill fetch all of our artists fixtures from Ember Data's store.

Now, let's update `app/templates/artists.hbs` with a listing of our artists.

```html
<div class="artists template">
  <p>This is <em>artists.hbs</em>.</p>

  <ul class="artists">
    {{#each model as |artist|}}
    <li>{{artist.name}}</li>
    {{/each}}
  </ul>

  {{outlet}}
</div>
```

Head back over the browser and you should see each of our three bearded artists.

## The Artist Route

We can see our list of artists, but now we want to drill down to see an individual artist. Let's start by generating another route.

```
ember g resource artist
```

### The Router

In our URL scheme, `/artist` will trigger the Artists route and then `/artist/1` will trigger the singular Artist route and render it's template into Artists `{{outlet}}`. Simple, right?

So, our generators have secretly been modifying `app/router.js` behind our backs. We're going to have to modify this a bit, in our to get that nested functionality we're looking for.

```js
// Some boiler plate code lives above.

export default Router.map(function() {
  this.resource('artists', function () {
    this.resource('artist', { path: ':artist_id' });
  });
});
```

### Index and Substate Routes

If you head over to the Ember Inspector, you'll see we have more than just `artist` nested under `artists`. We also have a few friends: `index`, `loading`, and `error`.

`index` should look somewhat familiar from before. It's what the `{{outlet}}` will hold before we place an artist in there. `loading` and `error` are special substates that will render in the `{{outlet}}` when it's—umm—loading or if there is an error.

These special routes go in a subdirectory—in this case, it's an `artists` directory. Let's generate an `artists/index` template.

```
ember g template artists/index
```

This created an `artists` folder in our `app/templates` directory and placed an `index.hbs` in there on our behalf. Let's give it some content.

```html
<div class="artist-index template">
  <p>This is <em>artist/index.hbs</em>.</p>
</div>
```

Take a look at your browser, you should now see this template loaded at `/artists`.

### Rendering an Artist

Our routes are mostly set up, but we actually link an individual artist.

```html
<ul class="artists">
  {{#each model as |artist|}}
  <li>{{#link-to 'artist' artist}}{{artist.name}}{{/link-to}}</li>
  {{/each}}
</ul>
```

So, what's going on with this syntax? We're linking to the `artist` route and passing the artist instance that we're iterating through as the second argument in order to make it clear, which artist we're linking to.

When we click on a given artist, we'll see the `index.hbs` vanish, but the URL is updated as expected. Let's also put some content in `app/templates/artists.hbs`.

```html
<div class="artist-index template">
  <p>This is <em>artists/index.hbs</em>.</p>
</div>
```

Head over to `/artists` and click on an artist. It looks like it works, doesn't it?

Well, not so fast. Go ahead and refresh the page. Uh oh. Something is not right.

Why? Well, everything works when we pass in the artist to the view, if we just the route without going through the `artists` route, then Ember isn't being passed a model and we haven't told it how to go find one. So, let's go do that.

In `app/routes/artist.js`:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.find('artist', params.artist_id);
  }
});
```

Much better. On our way into the route, if we haven't already been given a model, we'll go to Ember Data's store and find one with the `id` we were handed in the URL. Everything should work at this point.

### The Artist Index and Albums Route

Those index routes could potentially be used to—you know—index things, right? I think so. Let's generate an index route for our individual artist and list our all of their albums there. When we click on album, we'll then swap out the list of albums for an individual album—as opposed to our previous approach where keep the list artists on an outer level.

So, artists have many albums, right? Let's generate a route for albums.

```
ember g resource albums
```

We'll continue the nesting in our `app/router.js` as well:

```js
export default Router.map(function() {
  this.resource('artists', function () {
    this.resource('artist', { path: ':artist_id' }, function () {
      this.resource('albums');
    });
  });
});
```

Adding a sub-route to `artist` will give it a set of substates as well. So, we can now define an `artist/index.hbs`.

```
ember g template artist/index
```

And, we'll populate it with the following content.

```html
<div class="artist-index template">
  <p>This is <em>artists/index.hbs</em>.</p>

  <div class="biography">
    <h3>Artist Biography</h3>
    <p>Something about {{model.name}}. Lorem ipsum…</p>
  </div>

  <p>{{#link-to 'albums' class="button"}}Albums &rarr;{{/link-to}}</p>
</div>
```

Go ahead and click on another artist and see what happens. Everything should update up and down the stack of routes. Let's also throw a steak in the ground with our `albums.hbs`.

```html
<div class="albums template">
  <p>This is <em>albums.hbs</em>.</p>
  {{#link-to 'artist.index' class="button"}}&larr; Back{{/link-to}}
</div>
```

### Getting Models from Another Route

It makes sense that we would want to list out an artists albums in `albums.hbs`, right? We could make another call to our API. That seems reasonable, I suppose. But, if you think about it, we are nested within the artist route—and an artist knows about their albums.

So, why don't we just ask the model of the `artist` route for its albums?

Let's try this in `app/routes/albums.js`:

```js
export default Ember.Route.extend({
  model: function () {
    return this.modelFor('artist').get('albums');
  }
});
```

The model hook read just like our hypothesis—and it actually works too. Let's update `app/templates/albums.hbs` to list out our albums.

```html
<div class="albums template">
  <p>This is <em>albums.hbs</em>.</p>

  <h3>Albums</h3>

  <ul class="albums">
    {{#each model as |album|}}
    <li>{{album.title}} ({{album.releaseDate}})</li>
    {{/each}}
  </ul>
</div>
```

### Rendering One Template in Another

I don't really like I have to keep click on albums every time I switch artists.

We could just list the albums in the `artists.index` template as well, but that's not very dry. If we change the way we choose to lay everything out in the `albums` route, we're going to have to change it here to. Let's face it, that kind of stinks.

What if we could just render the `albums` template within the `artists.index` template?

Well, we can. Let's modify `app/templates/artist/index.hbs` and add the following below the artist biography:

```html
{{render 'albums' model.albums}}
```

We pass the `render` helper two arguments, the route we want to render and the model we want it to use.

## The Album Route

We want to do the same thing for songs as we did for albums.

Just as we needed a singular `artist` route, we'll need a singular `album` route. Let's go ahead and generate that now.

```
ember g resource album
```

We'll have to continue our nesting in `app/router.js` as well.


```js
export default Router.map(function () {
  this.resource('artists', function () {
    this.resource('artist', { path: ':artist_id' }, function () {
      this.resource('albums', function () {
        this.resource('album', { path: ':album_id' });
      });
    });
  });
});
```

Based on our previous experience, we know that we're going to need to fetch an album in `app/routes/album.js`.

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.find('album', params.album_id);
  }
});
```

And we'll link to our new `album` route in `app/templates/albums.hbs`:

```html
<div class="albums template">
  <p>This is <em>albums.hbs</em>.</p>

  <h3>Albums</h3>

  <ul class="albums">
    {{#each model as |album|}}
    <li>{{#link-to 'album' album}}{{album.title}} ({{album.releaseDate}}){{/link-to}}</li>
    {{/each}}
  </ul>
</div>
```

Our generator created `app/templates/album.hbs`, so let's populate fill that in with some content as well:

```html
<div class="album template">

  <h4>{{model.title}}</h4>

  <ul class="songs">
    {{#each model.songs as |song|}}
    <li>{{song.trackNumber}} - {{song.title}} ({{song.timeInSeconds}} seconds)</li>
    {{/each}}
  </ul>

  {{outlet}}
</div>
```

## Conclusion and Extensions

And there we have it: we've implemented a deeply nested URL schema in Ember.js.

So, what didn't we touch on?

* Controllers: we could add properties like song and album counts in each of the routes by decorating the model with a controller.
* Helpers: it's a little wonky that we're displaying the time in seconds. Could we write a helper that took the time in seconds and displayed it as minutes and seconds?
* Standalone Controllers: what if we had a "Now Playing" box and we implemented the ability to click on a song and update the "Now Playing" controller—and subsequently, the box on the page?
* Components: Could we refactor some of our more complicated DOM into components?
