'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));


var TutorialSchema = new mongoose.Schema({
  title: String,
  
});
export default mongoose.model('Tutorial', TutorialSchema);

