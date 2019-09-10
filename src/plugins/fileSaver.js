/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = window.saveAs || (typeof navigator !== 'undefined' &&
  navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator)) ||
  (function (view) {
    'use strict';
    // IE <10 is explicitly unsupported
    if (typeof navigator !== 'undefined' &&
      /MSIE [1-9]\./.test(navigator.userAgent)) {
      return;
    }
    var doc = view.document;
    // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
    var getURL = function () {
      return view.URL || view.webkitURL || view;
    };
    var URL = view.URL || view.webkitURL || view;
    var saveLink = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    var canUseSaveLink = !view.externalHost && 'download' in saveLink;
    // var click = function (node) {
    //   var event = doc.createEvent('MouseEvents');
    //   event.initMouseEvent(
    //     'click', true, false, view, 0, 0, 0, 0, 0
    //     , false, false, false, false, 0, null
    //   );
    //   node.dispatchEvent(event);
    // };
    var webkitReqfs = view.webkitRequestFileSystem;
    var reqfs = view.requestFileSystem || webkitReqfs || view.mozRequestFileSystem;
    var throwOutside = function (ex) {
      (view.setImmediate || view.setTimeout)(function () {
        throw ex;
      }, 0);
    };
    var forceSaveableType = 'application/octet-stream';
    var fsMinSize = 0;
    var deletionQueue = [];
    var processDeletionQueue = function () {
      var i = deletionQueue.length;
      while (i--) {
        var file = deletionQueue[i];
        if (typeof file === 'string') { // file is an object URL
          URL.revokeObjectURL(file);
        }
        else { // file is a File
          file.remove();
        }
      }
      deletionQueue.length = 0; // clear queue
    };
    var dispatch = function (filesaver, eventTypes, event) {
      eventTypes = [].concat(eventTypes);
      var i = eventTypes.length;
      while (i--) {
        var listener = filesaver[`on${eventTypes[i]}`];
        if (typeof listener === 'function') {
          try {
            listener.call(filesaver, event || filesaver);
          }
          catch (ex) {
            throwOutside(ex);
          }
        }
      }
    };
    var FileSaver = function (blob, name) {
      // First try a.download, then web filesystem, then object URLs
      var filesaver = this;
      var type = blob.type;
      var blobChanged = false;
      var objectUrl, targetView;
      var getObjectUrl = function () {
        var objectUrl = getURL().createObjectURL(blob);
        deletionQueue.push(objectUrl);
        return objectUrl;
      };
      var dispatchAll = function () {
        dispatch(filesaver, 'writestart progress write writeend'.split(' '));
      };
      // on any filesys errors revert to saving with object URLs
      var fsError = function () {
        // don't create more object URLs than needed
        if (blobChanged || !objectUrl) {
          objectUrl = getObjectUrl();
        }
        if (targetView) {
          targetView.location.href = objectUrl;
        }
        else {
          if (navigator.userAgent.match(/7\.[\d\s.]+Safari/) && typeof window.FileReader !== 'undefined' && blob.size <= 1024 * 1024 * 150
          ) {
            var reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              var frame = doc.createElement('iframe');
              frame.src = reader.result;
              frame.style.display = 'none';
              doc.body.appendChild(frame);
              dispatchAll();
              return;
            };
            filesaver.readyState = filesaver.DONE;
            filesaver.savedAs = filesaver.SAVEDASUNKNOWN;
            return;
          }
          else {
            window.open(objectUrl, '_blank');
            filesaver.readyState = filesaver.DONE;
            filesaver.savedAs = filesaver.SAVEDASBLOB;
            dispatchAll();
            return;
          }
        }
      };
      var abortable = function (func) {
        return function () {
          if (filesaver.readyState !== filesaver.DONE) {
            return func.apply(this, arguments);
          }
        };
      };
      var createIfNotFound = {create: true, exclusive: false};
      var slice;
      filesaver.readyState = filesaver.INIT;
      if (!name) {
        name = 'download';
      }
      if (canUseSaveLink) {
        objectUrl = getObjectUrl();
        // FF for Android has a nasty garbage collection mechanism
        // that turns all objects that are not pure javascript into 'deadObject'
        // this means `doc` and `saveLink` are unusable and need to be recreated
        // `view` is usable though:
        doc = view.document;
        saveLink = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = objectUrl;
        saveLink.download = name;
        var event = doc.createEvent('MouseEvents');
        event.initMouseEvent(
          'click', true, false, view, 0, 0, 0, 0, 0
          , false, false, false, false, 0, null
        );
        saveLink.dispatchEvent(event);
        filesaver.readyState = filesaver.DONE;
        filesaver.savedAs = filesaver.SAVEDASBLOB;
        dispatchAll();
        return;
      }
      // Object and web filesystem URLs have a problem saving in Google Chrome when
      // viewed in a tab, so I force save with application/octet-stream
      // http://code.google.com/p/chromium/issues/detail?id=91158
      if (view.chrome && type && type !== forceSaveableType) {
        slice = blob.slice || blob.webkitSlice;
        blob = slice.call(blob, 0, blob.size, forceSaveableType);
        blobChanged = true;
      }
      // Since I can't be sure that the guessed media type will trigger a download
      // in WebKit, I append .download to the filename.
      // https://bugs.webkit.org/show_bug.cgi?id=65440
      if (webkitReqfs && name !== 'download') {
        name += '.download';
      }
      if (type === forceSaveableType || webkitReqfs) {
        targetView = view;
      }
      if (!reqfs) {
        fsError();
        return;
      }
      fsMinSize += blob.size;
      reqfs(view.TEMPORARY, fsMinSize, abortable(function (fs) {
        fs.root.getDirectory('saved', createIfNotFound, abortable(function (dir) {
          var save = function () {
            dir.getFile(name, createIfNotFound, abortable(function (file) {
              file.createWriter(abortable(function (writer) {
                writer.onwriteend = function (event) {
                  targetView.location.href = file.toURL();
                  deletionQueue.push(file);
                  filesaver.readyState = filesaver.DONE;
                  filesaver.savedAs = filesaver.SAVEDASBLOB;
                  dispatch(filesaver, 'writeend', event);
                };
                writer.onerror = function () {
                  var error = writer.error;
                  if (error.code !== error.ABORT_ERR) {
                    fsError();
                  }
                };
                'writestart progress write abort'.split(' ').forEach(function (event) {
                  writer[`on${event}`] = filesaver[`on${event}`];
                });
                writer.write(blob);
                filesaver.abort = function () {
                  writer.abort();
                  filesaver.readyState = filesaver.DONE;
                  filesaver.savedAs = filesaver.FAILED;
                };
                filesaver.readyState = filesaver.WRITING;
              }), fsError);
            }), fsError);
          };
          dir.getFile(name, {create: false}, abortable(function (file) {
            // delete file if it already exists
            file.remove();
            save();
          }), abortable(function (ex) {
            if (ex.code === ex.NOT_FOUND_ERR) {
              save();
            }
            else {
              fsError();
            }
          }));
        }), fsError);
      }), fsError);
    };
    var FSproto = FileSaver.prototype;
    var saveAs = function (blob, name) {
      return new FileSaver(blob, name);
    };
    FSproto.abort = function () {
      var filesaver = this;
      filesaver.readyState = filesaver.DONE;
      filesaver.savedAs = filesaver.FAILED;
      dispatch(filesaver, 'abort');
    };
    FSproto.readyState = FSproto.INIT = 0;
    FSproto.WRITING = 1;
    FSproto.DONE = 2;
    FSproto.FAILED = -1;
    FSproto.SAVEDASBLOB = 1;
    FSproto.SAVEDASURI = 2;
    FSproto.SAVEDASUNKNOWN = 3;

    FSproto.error =
      FSproto.onwritestart =
      FSproto.onprogress =
      FSproto.onwrite =
      FSproto.onabort =
      FSproto.onerror =
      FSproto.onwriteend =
      null;

    view.addEventListener('unload', processDeletionQueue, false);
    saveAs.unload = function () {
      processDeletionQueue();
      view.removeEventListener('unload', processDeletionQueue, false);
    };
    return saveAs;
  }(
    typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content
  ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== 'undefined' && module !== null) {
  module.exports = saveAs;
}
