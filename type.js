var is = new (function() {
  "use strict";

  var ISHTMLCollection = typeof(HTMLCollection) !== "undefined"
    ? HTMLCollection : false;

  var ISNodeList = typeof(NodeList) !== "undefined"
    ? NodeList : false;

  var ISEvent = typeof(Event) !== "undefined"
    ? Event : false;

  this.Undefined = function(s) {
    return typeof s === "undefined";
  };

  this.Null = function(s) {
    return s === null;
  };

  this.String = function(s) {
    return typeof s === "string"
        || (!!s && typeof s === "object"
          && (s.constructor === String
            || Object.prototype.toString.call(s) === "[object String]"));
  };

  this.String.empty = function(s) {
    if (!is.String(s)) {
      return true;
    }

    return s.length === 0;
  };

  this.String.blank = function(s) {
    if (!is.String(s)) {
      return true;
    }

    return is.String.empty(
        s.replace(/^\s+|\s+$/g, ""));
  };

  this.Number = function(s) {
    return (typeof s === "number"
        || (!!s && typeof s === "object"
          && (s.constructor === Number
            || Object.prototype.toString.call(s) === "[object Number]")))
        && !isNaN(s);
  };

  this.Boolean = function(s) {
    return typeof s === "boolean"
        || (!!s && typeof s === "object"
          && (s.constructor === Boolean
            || Object.prototype.toString.call(s) === "[object Boolean]"));
  };

  this.Enumerable = function(s) {
    if (typeof s !== "object"
				|| s === null) {
			return false;
		}

		try {
			for(var i in s) { break };
			return true;
		} catch(e) {};
		return false;
  };

  this.Enumerable.blank = function(s) {
    if (!is.Enumerable(s)) {
      return false;
    }

    var ln = 0;
    for(var i = 0; i < s.length; i++) {
      if (typeof s[i] !== "undefined"
          || s[i] !== null) {
        ln++;
      }
    }

    return ln > 0;
  };

  this.Enumerable.empty = function(s) {
    if (!is.Enumerable(s)) {
      return false;
    }

    return s.length > 0;
  };

  this.Array = function(s) {
    return (!!Array.isArray && Array.isArray(s))
        || (!!s && typeof s === "object"
          && (s.constructor === Array
            || Object.prototype.toString.call(s) === "[object Array]"));
  };

  this.Array.blank = function(s) {
    return is.Enumerable.blank(s);
  };

  this.Array.empty = function(s) {
    return is.Enumerable.empty(s);
  };

  this.Object = function(s) {
		return !!s && s === Object(s) && s.constructor === Object;
	};

  this.Function = function(s) {
    return typeof s === "function"
        || Object.prototype.toString.call(s) === "[object Function]";
  };

  this.Callable = function(s) {
    return (is.Function(s)
        && is.Function(s.call));
  };

  this.Event = function(s) {
    if (typeof s !== "object"
        || s === null) {
      return false;
    } else if (ISEvent) {
      var result = s instanceof Event;

      if (!result) {
        var type = Object.prototype.toString.call(s);
        if (type.substring(type.length - 6) === "Event]") {
          return true;
        }
      }

      return result;
    } else {
      // ie7
      return typeof s.type === 'string'
        && typeof s.preventDefault === 'function';
    }

    return false;
  };

  this.Date = function(s) {
    return !!s && typeof s === "object"
        && (s.constructor === Date
          || Object.prototype.toString.call(s) === "[object Date]");
  };

  this.RegExp = function(s) {
    return !!s && typeof s === "object"
        && (s.constructor === RegExp
          || Object.prototype.toString.call(s) === "[object RegExp]");
  };

  this.Error = function(s) {
    return !!s && typeof s === "object"
        && (s.constructor === Error
          || Object.prototype.toString.call(s) === "[object Error]");
  };

  this.NodeList = function(s) {
    if (typeof s !== "object"
        || s === null) {
      return false;
    } else if (ISNodeList || ISHTMLCollection) {
      var result = s.constructor === ISNodeList
          || s.constructor === ISHTMLCollection;

      if (!result) {
        var type = Object.prototype.toString.call(s);
        if (type === "[object NodeList]"
            || type === "[object HTMLCollection]") {
          return true;
        }
      }

      return result;
    } else if (!this.Array(s)) {
      // ie7
      return typeof s.length == 'number'
        && typeof s.item == 'string';
    }

    return false;
  };

	this.NodeList.empty = function(s) {
		return is.NodeList(s) && s.length > 0;
	};

	this.NodeList.blank = function(s) {
    if (!is.NodeList(s)) {
      return false;
    }

    var ln = 0;
    for(var i = 0; i < s.length; i++) {
      if (typeof s[i] !== "undefined"
          || s[i] !== null) {
        ln++;
      }
    }

    return ln > 0;
  };


  this.Node = function(s) {
    return typeof s === "object"
        && (!!s && !!s.nodeType);
  };

  this.Element = function(s) {
    return typeof s === "object"
        && (!!s && !!s.nodeType && s.nodeType === 1);
  };

  this.Attr = function(s) {
    return !!s && typeof s === "object"
        && (!!s.nodeType && s.nodeType === 2);
  };

  this.Text = function(s) {
    return !!s && typeof s === "object"
        && (!!s.nodeType && s.nodeType === 3);
  };

  this.Document = function(s) {
    return !!s && typeof s === "object"
        && (!!s.nodeType && s.nodeType === 9);
  };

});