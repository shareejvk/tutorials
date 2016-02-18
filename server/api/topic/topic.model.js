'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TopicSchema = new mongoose.Schema({
  name: String,
  
});

export default mongoose.model('Topic', TopicSchema);
