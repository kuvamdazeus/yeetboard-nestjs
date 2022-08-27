"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasActions = exports.SocketActions = void 0;
var SocketActions;
(function (SocketActions) {
    SocketActions[SocketActions["JOIN_ROOM"] = 0] = "JOIN_ROOM";
    SocketActions[SocketActions["LEAVE_ROOM"] = 1] = "LEAVE_ROOM";
    SocketActions[SocketActions["UPDATE_PEOPLE_COUNT"] = 2] = "UPDATE_PEOPLE_COUNT";
    SocketActions[SocketActions["LOAD_CANVAS"] = 3] = "LOAD_CANVAS";
    SocketActions[SocketActions["CANVAS_ACTION"] = 4] = "CANVAS_ACTION";
})(SocketActions = exports.SocketActions || (exports.SocketActions = {}));
var CanvasActions;
(function (CanvasActions) {
    CanvasActions[CanvasActions["OBJECT_ADDED"] = 0] = "OBJECT_ADDED";
    CanvasActions[CanvasActions["OBJECTS_REMOVED"] = 1] = "OBJECTS_REMOVED";
    CanvasActions[CanvasActions["OBJECT_MODIFIED"] = 2] = "OBJECT_MODIFIED";
    CanvasActions[CanvasActions["UNDO_ACTION"] = 3] = "UNDO_ACTION";
})(CanvasActions = exports.CanvasActions || (exports.CanvasActions = {}));
//# sourceMappingURL=events.js.map