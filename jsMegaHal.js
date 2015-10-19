/**
 * jsMegaHal
 * 
 * Adapted from https://github.com/seiyria/jsmegahal
 *
 * Apache Source License https://github.com/seiyria/jsmegahal/blob/master/LICENSE.md
 */

var Quad, exports, jsMegaHal,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Quad = (function() {
  function Quad(tokens1) {
    this.tokens = tokens1;
    this.canStart = false;
    this.canEnd = false;
  }

  Quad.prototype.hash = function() {
    return this.tokens.join(',');
  };

  return Quad;

})();


/*
TODO load from a big string
TODO load from a remote URL
TODO more punctuation
 */

jsMegaHal = (function() {
  jsMegaHal.prototype.wordRegex = /[^a-zA-Z0-9,']+/;

  jsMegaHal.prototype.sentenceRegex = /[!?\.]/;


  /*
    @markov - the markov order to use for this jsMegaHal instance, defaults to 4
   */

  function jsMegaHal(markov, defaultReply) {
    this.markov = markov != null ? markov : 4;
    this.defaultReply = defaultReply != null ? defaultReply : '';
    this.words = Object.create(null);
    this.quads = {};
    this.next = {};
    this.prev = {};
  }


  /*
    generate a number between min and max, inclusive
  
    @min the lower bound
    @max the upper bound
   */

  jsMegaHal.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


  /*
    a convenience method to add a quad to the quads list
  
    @quad the quad to add to the list
   */

  jsMegaHal.prototype.addQuad = function(quad) {
    if (!(quad.hash() in this.quads)) {
      return this.quads[quad.hash()] = quad;
    }
  };


  /*
    add a lot of text and split it by sentence
  
    @longSentence a lot of text separated by characters in @sentenceRegex
   */

  jsMegaHal.prototype.addMass = function(longSentence) {
    return longSentence.split(this.sentenceRegex).forEach((function(_this) {
      return function(e) {
        return _this.add(e);
      };
    })(this));
  };


  /*
    add a sentence to jsMegaHal
  
    @sentence the sentence to add to jsMegaHal.
        ignored if there are fewer than @markov words in it
   */

  jsMegaHal.prototype.add = function(sentence) {
    var i, j, k, len, nextToken, parts, partsLength, prevToken, quad, ref, ref1, results, token;
    sentence = sentence.trim();
    if (sentence.split(' ').length < this.markov) {
      return;
    }
    parts = sentence.split(this.wordRegex).filter(Boolean);
    partsLength = parts.length;
    results = [];
    for (i = j = 0, ref = partsLength - (this.markov - 1); j < ref; i = j += 1) {
      quad = new Quad(slice.call(parts.slice(i, i + this.markov)));
      this.addQuad(quad);
      quad.canStart = i === 0;
      quad.canEnd = i === partsLength - this.markov;
      ref1 = quad.tokens;
      for (k = 0, len = ref1.length; k < len; k++) {
        token = ref1[k];
        if (!(token in this.words)) {
          this.words[token] = [];
        }
        this.words[token].push(quad);
      }
      if (i !== 0) {
        prevToken = parts[i - 1];
        if (!(quad.hash() in this.prev)) {
          this.prev[quad.hash()] = [];
        }
        if (!(indexOf.call(this.prev[quad.hash()], prevToken) >= 0)) {
          this.prev[quad.hash()].push(prevToken);
        }
      }
      if (i < partsLength - this.markov) {
        nextToken = parts[i + this.markov];
        if (!(quad.hash() in this.next)) {
          this.next[quad.hash()] = [];
        }
        if (!(indexOf.call(this.next[quad.hash()], nextToken) >= 0)) {
          results.push(this.next[quad.hash()].push(nextToken));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /*
    generate a reply from a sentence instead of just a word
  
    @sentence the sentence to pick a token from
   */

  jsMegaHal.prototype.getReplyFromSentence = function(sentence) {
    var tokens;
    tokens = sentence.trim().split(' ');
    return this.getReply(tokens[this.randomInt(0, tokens.length - 1)]);
  };


  /*
    generate a reply from a single word
  
    @word the seed word, can be null/undefined
   */

  jsMegaHal.prototype.getReply = function(word) {
    var middleQuad, newQuad, nextToken, nextTokens, parts, prevToken, prevTokens, quad, quadHash, quads;
    word = word != null ? word.trim() : void 0;
    quads = [];
    if (word && (word in this.words)) {
      quads = this.words[word];
    } else {
      quads = Object.keys(this.quads);
    }
    if (quads.length === 0) {
      return this.defaultReply;
    }
    quadHash = quads[this.randomInt(0, quads.length - 1)];
    if (typeof quadHash !== 'string') {
      quadHash = quadHash.tokens.join(',');
    }
    quad = middleQuad = this.quads[quadHash];
    parts = quad.tokens.slice(0);
    while (!quad.canEnd) {
      nextTokens = this.next[quad.hash()];
      if (!nextTokens) {
        break;
      }
      nextToken = nextTokens[this.randomInt(0, nextTokens.length - 1)];
      newQuad = new Quad(slice.call(quad.tokens.slice(1, this.markov)).concat([nextToken]));
      this.addQuad(newQuad);
      quad = this.quads[newQuad.hash()];
      parts.push(nextToken);
    }
    quad = middleQuad;
    while (!quad.canStart) {
      prevTokens = this.prev[quad.hash()];
      if (!prevTokens) {
        break;
      }
      prevToken = prevTokens[this.randomInt(0, prevTokens.length - 1)];
      newQuad = new Quad([prevToken].concat(slice.call(quad.tokens.slice(0, this.markov - 1))));
      this.addQuad(newQuad);
      quad = this.quads[newQuad.hash()];
      parts.unshift(prevToken);
    }
    return parts.join(' ');
  };

  return jsMegaHal;

})();

