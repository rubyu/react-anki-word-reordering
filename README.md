A POC implementation of word re-ordering card in Anki.
Written in new year holidays, 2023.

## How to introduce
1. download main.XXXXXXXX.js and main.XXXXXXXX.css from [here](https://github.com/rubyu/react-anki-word-reordering/releases/)
2. place the js file, downloaded in step 1, wherever under Anki's collection.media folder
3. create a new note type with an appropriate name and set the card template as follows

### Front
```
<div id="front">
<div id="front-inner">
{{Front}}
</div>
</div>
```

### Back
```
<div id="back">
<p id="sentence">{{Back}}</p>
<div id="root"></div>
</div>
<script defer="defer" src="main.XXXXXXXX.js"></script>
```
Note: src of the above script tag must be matched to the path of the file you located on step 2. If you located the file under a folder, the path must be the relative path from collection.media folder.

### Style
```
/* set basic UI setting for your deck  */
.card {
    font-family: arial;
    font-size: 12px;
}

/* copy and paste the content of main.XXXXXXXX.css file downloaded in step1 */
```

4. change the note type of an existing card to the note type created above or create a new one.
It's OK if it works as follows:
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Ankiで整序問題やるやつがAnkiDroidでも動くようになった。ﾜｲﾜｲ <a href="https://t.co/hHXUB3NiER">pic.twitter.com/hHXUB3NiER</a></p>&mdash; るびゅ (@ruby_U) <a href="https://twitter.com/ruby_U/status/1610145713912180737?ref_src=twsrc%5Etfw">January 3, 2023</a></blockquote>

