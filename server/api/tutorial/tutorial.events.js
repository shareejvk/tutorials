/**
 * Tutorial model events
 */

'use strict';

import {EventEmitter} from 'events';
var Tutorial = require('./tutorial.model');
var TutorialEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TutorialEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Tutorial.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TutorialEvents.emit(event + ':' + doc._id, doc);
    TutorialEvents.emit(event, doc);
  }
}

export default TutorialEvents;
