
//////////////////////////////////////////////////////////////////////////////
//		arjs-hit-testing
//////////////////////////////////////////////////////////////////////////////
AFRAME.registerComponent('a-frame-space-station', {
	schema: {
		url : {		// Url of the content - may be video or image
			type: 'string',
		},
		doorWidth : {	// width of the door
			type: 'number',
			default: 1,
		},
		doorHeight : {	// height of the door
			type: 'number',
			default: 2,
		},
	},
	init: function () {
	},
	tick: function(){
		this._portalDoor.update()
	}
})


AFRAME.registerPrimitive('a-frame-space-station', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
	defaultComponents: {
		'a-frame-space-station': {},
	},
	mappings: {
		'url': 'a-frame-space-station.url',
	}
}))
