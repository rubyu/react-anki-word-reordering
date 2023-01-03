A POC implementation of word re-ordering card in Anki.
Written in new year holidays, 2023.

## How to introduce
1. download main.f7fb95f5.js from [here](https://github.com/rubyu/react-anki-word-reordering/releases/tag/1.0)
2. place the file downloaded in step 1 in an appropriate path under Anki's collection.media folder 3.
3. create a new note type with an appropriate name and set the card template as follows

### Front
```
<div id="front">
{{Front}}
</div>
```

### Back
```
<div id="back">
{{Front}}
<p id="sentence">{{Back}}</p>
<div id="root"></div>
</div>
<script defer="defer" src="./react-anki-word-reordering/main.f7fb95f5.js"></script>
```
Note: src of the above script tag have to be matched to the path of the file you located on step 2.

### Style
```
.card {
    font-family: arial;
    font-size: 12px;
}

#sentence {
  display: none;
}

#app {
  text-align: left;
  color: black;
}
#app span {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#preview,
#editor {
  padding-top: 2em;
  margin: 2em;
}
#preview::before,
#editor::before {
  content: "";
  display: inline-block;
}
#preview span,
#editor span {
  padding: 0.5em;
  margin: 0.5em;
  display: inline-block;
}
#preview span {
  border: 1px solid #90b9fd;
  background-color: #b3d1ff;
}
#editor {
  border-top: 1px solid #c2c2c2;
}
#editor span {
  border: 1px solid #969696;
  background-color: #d9d9d9;
}

#result span {
  padding: 0.5em;
  margin: 0.5em;
  background-color: #d9d9d9;
  display: inline-block;
}
#result #expected,
#result #actual {
  margin: 2em;
}
#result #actual {
  border-top: 1px solid #c2c2c2;
  padding-top: 2em;
}
#result #actual .good {
  background-color: #62e576;
}
#result #actual .bad {
  background-color: #ea5a5a;
}

.nightMode #app {
  color: white;
}
.nightMode #preview span {
  border: 1px solid #6986b9;
  background-color: #6679a2;
}
.nightMode #editor {
  border-top: 1px solid #808080;
}
.nightMode #editor span {
  border: 1px solid #696969;
  background-color: #3d3d3d;
}
.nightMode #result #expected span {
  border: 1px solid #7c7c7c;
  background-color: #3d3d3d;
}
.nightMode #result #actual {
  border-top: 1px solid #808080;
  padding-top: 2em;
}
.nightMode #result #actual .good {
  border: 1px solid #3b8646;
  background-color: #27572e;
}
.nightMode #result #actual .bad {
  border: 1px solid #9d3b3b;
  background-color: #702c2c;
}
```

4. change the note type of an existing card to the note type created above or create a new one.
It's OK if it works as follows.
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Ankiで整序問題やるやつがAnkiDroidでも動くようになった。ﾜｲﾜｲ <a href="https://t.co/hHXUB3NiER">pic.twitter.com/hHXUB3NiER</a></p>&mdash; るびゅ (@ruby_U) <a href="https://twitter.com/ruby_U/status/1610145713912180737?ref_src=twsrc%5Etfw">January 3, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

