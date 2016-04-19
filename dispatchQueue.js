document.dispatcher = (function() {
	var eventId = 0;
	function EventItem(func, args, eid) {
		this.func = func;
		this.args = args;
		this.eid = eid;
	}
	var eventQueue = new Array();
	var eventInterval;

	function addEventItem(eventItem) {
		eventQueue.push(eventItem);
		eventItemsChanged();
	};

	function removeEventItem(eid) {
		var originLength = eventQueue.length;
		eventQueue = eventQueue.filter(function(o){return o.eid != eid});
		if (originLength != eventQueue.length) {
			eventItemsChanged();
		};
	};

	function eventItemsChanged() {
		if (eventInterval) {
			if (eventQueue.length == 0) {
				clearInterval(eventInterval)
			};
			return;
		};
		eventInterval = setInterval(function() {
			var item = eventQueue.shift();
			try {
				item.func.apply(null, item.args);
			} catch (e) {};
			if (eventQueue.length == 0) {
				clearInterval(eventInterval);
			}
		}, 100);
	};

	var dispatcher = {
		async: function(func) {
			var id = eventId;
			addEventItem(new EventItem(func, Array.prototype.slice.call(arguments, 1), id));
			eventId++;
			return id;
		},
		cancel: function(eid) {
			removeEventItem(eid);
		}
	};
	return dispatcher;
}());

/* test */
function abc(a) {
	console.log('----'+a);
}

document.dispatcher.async(abc, 1)
var eid = document.dispatcher.async(abc, 2)
document.dispatcher.async(abc, 3)
document.dispatcher.cancel(eid)
