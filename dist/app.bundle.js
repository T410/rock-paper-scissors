/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateBorder": () => (/* binding */ calculateBorder)
/* harmony export */ });
function calculateBorder({ x, y, hitbox }) {
    return {
        top: y - hitbox / 2,
        right: x + hitbox / 2,
        bottom: y + hitbox / 2,
        left: x - hitbox / 2,
    };
}



/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RPS": () => (/* binding */ RPS)
/* harmony export */ });
//rock paper scissors enum
var RPS;
(function (RPS) {
    RPS["Rock"] = "\uD83E\uDDF1";
    RPS["Paper"] = "\uD83D\uDCC4";
    RPS["Scissors"] = "\u2702\uFE0F";
})(RPS || (RPS = {}));


/***/ }),

/***/ "./src/move.ts":
/*!*********************!*\
  !*** ./src/move.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/helper.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models */ "./src/models.ts");


//function that returns either MAX or -MAX
function getRandomMovement(speed) {
    return Math.random() > 0.5 ? speed : -speed;
}
function constraint({ x, y, border, hitbox }) {
    if (x) {
        if (x - hitbox < border.left) {
            x = border.left + hitbox;
        }
        if (x + hitbox > border.right) {
            x = border.right - hitbox;
        }
    }
    else if (y) {
        if (y - hitbox < border.top) {
            y = border.top + hitbox;
        }
        if (y + hitbox > border.bottom) {
            y = border.bottom - hitbox;
        }
    }
    return { x: Math.floor(x), y: Math.floor(y) };
}
function getNeighbours(item, items, range) {
    const x = item.x;
    const y = item.y;
    const neighbours = items.filter((i) => {
        if (i.id === item.id) {
            return false;
        }
        const dx = x - i.x;
        const dy = y - i.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        return d < range;
    });
    return neighbours;
}
function moveTowards(source, target, v, hitbox) {
    const { x: sourceX, y: sourceY } = source;
    const { x: targetX, y: targetY } = target;
    const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
    //move sourceX sourceY to targetX targetY by v amount in 2D coordinates system#
    const x = sourceX + v * Math.cos(angle);
    const y = sourceY + v * Math.sin(angle);
    const newItem = Object.assign(Object.assign({}, source), { x, y });
    const newItemBorder = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.calculateBorder)(Object.assign(Object.assign({}, newItem), { hitbox }));
    // const newX = sourceX + v * Math.cos(angle);
    // const newY = sourceY + v * Math.sin(angle);
    return Object.assign(Object.assign({}, source), { x,
        y, border: newItemBorder });
}
function move(positions, speed, range, hitbox) {
    return positions.map((item) => {
        const neighbours = getNeighbours(item, positions, range);
        if (item.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock && neighbours.some((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors)) {
            return moveTowards(item, neighbours.find((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors), speed, hitbox);
        }
        else if (item.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper && neighbours.some((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock)) {
            return moveTowards(item, neighbours.find((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock), speed, hitbox);
        }
        else if (item.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors && neighbours.some((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper)) {
            return moveTowards(item, neighbours.find((n) => n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper), speed, hitbox);
        }
        else {
            return Object.assign(Object.assign({}, item), { x: item.x + getRandomMovement(speed), y: item.y + getRandomMovement(speed) });
        }
    });
}
function checkCollision(origin, target) {
    if (origin.right > target.left &&
        origin.left < target.right &&
        origin.bottom > target.top &&
        origin.top < target.bottom) {
        return true;
    }
    return false;
}
function checkConverts(item, _index, array, hitbox) {
    let r = Object.assign({}, item);
    array.forEach((n) => {
        if (item.id !== n.id && checkCollision(item.border, n.border)) {
            switch (item.item) {
                case _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock: {
                    if (n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper) {
                        r = Object.assign(Object.assign({}, item), { item: _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper });
                    }
                    break;
                }
                case _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Paper: {
                    if (n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors) {
                        r = Object.assign(Object.assign({}, item), { item: _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors });
                    }
                    break;
                }
                case _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Scissors: {
                    if (n.item === _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock) {
                        r = Object.assign(Object.assign({}, item), { item: _models__WEBPACK_IMPORTED_MODULE_1__.RPS.Rock });
                    }
                    break;
                }
            }
        }
    });
    return r;
}
function init({ border, speed, range, hitbox, }) {
    return function moveInit(positions) {
        positions = move(positions, speed, range, hitbox).map((x) => {
            return Object.assign(Object.assign({}, x), { border: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.calculateBorder)(Object.assign(Object.assign({}, x), { hitbox })) });
        });
        positions = positions.map((item, i, a) => {
            const c = checkConverts(item, i, a, hitbox);
            const { x, y } = item;
            return Object.assign(Object.assign({}, c), { x: constraint({ x, border, hitbox }).x, y: constraint({ y, border, hitbox }).y });
        });
        return positions;
        // return newPositions.map((item) => {
        // 	const { x, y } = item;
        // 	return {
        // 		...item,
        // 		x: constraint({ x, border, hitbox }).x,
        // 		y: constraint({ y, border, hitbox }).y,
        // 	};
        // });
    };
}


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move */ "./src/move.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./src/helper.ts");



function init(options) {
    const { canvas, count, speed, range, FPS, hitbox } = options;
    const context = canvas.getContext("2d");
    let frame;
    context.textBaseline = "middle";
    context.textAlign = "center";
    const _items = [_models__WEBPACK_IMPORTED_MODULE_0__.RPS.Rock, _models__WEBPACK_IMPORTED_MODULE_0__.RPS.Paper, _models__WEBPACK_IMPORTED_MODULE_0__.RPS.Scissors];
    function resetCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    resetCanvas();
    function getRandomNumber(val) {
        return Math.floor(Math.random() * val * 0.95 + hitbox);
    }
    function generateRandomPosition() {
        return {
            x: getRandomNumber(canvas.width),
            y: getRandomNumber(canvas.height),
        };
    }
    function createPositionObjects() {
        return _items
            .map((item, id) => {
            return new Array(count).fill(undefined).map(() => {
                const pos = generateRandomPosition();
                return Object.assign(Object.assign({ id, item }, pos), { border: (0,_helper__WEBPACK_IMPORTED_MODULE_2__.calculateBorder)(Object.assign(Object.assign({}, pos), { hitbox })) });
            });
        })
            .flat();
    }
    const items = createPositionObjects();
    items.forEach(({ item, x, y }) => {
        for (let i = 0; i < count; i++) {
            context.font = `${hitbox}px Arial`;
            context.fillStyle = "white";
            context.fillText(item, x, y);
        }
    });
    const canvasBorder = {
        top: 0,
        right: canvas.width,
        bottom: canvas.height,
        left: 0,
    };
    const move = (0,_move__WEBPACK_IMPORTED_MODULE_1__["default"])({ border: canvasBorder, speed, range, hitbox });
    let prevDate = Date.now();
    const throttleAmount = 1000 / FPS;
    function animate(positions) {
        let newPositions;
        if (Date.now() - prevDate > throttleAmount) {
            prevDate = Date.now();
            resetCanvas();
            //draw the rect again
            newPositions = move(positions);
            newPositions.forEach(({ item, x, y }) => {
                for (let i = 0; i < count; i++) {
                    context.font = `${hitbox}px Arial`;
                    context.fillStyle = "white";
                    context.fillText(item, x, y);
                    //draw a cube around the text side as hitbox amount
                    context.strokeStyle = "red";
                    context.strokeRect(x - hitbox / 2, y - hitbox / 2, hitbox, hitbox);
                }
            });
        }
        frame = requestAnimationFrame(() => {
            animate(newPositions !== null && newPositions !== void 0 ? newPositions : positions);
        });
    }
    frame = requestAnimationFrame(() => {
        animate(items);
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.ts");

function init() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const canvas = document.querySelector("canvas");
    function prepareCanvas(canvas) {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
    }
    prepareCanvas(canvas);
    const renderOptions = {
        canvas,
        count: 10,
        range: 300,
        speed: 2,
        FPS: 60,
        hitbox: 50,
    };
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(renderOptions);
}
init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqQyx3QkFBd0IsV0FBVztBQUNuQyw4QkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlEQUFRLEdBQUcsNENBQTRDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxZQUFZO0FBQ2hELGdDQUFnQyxXQUFXO0FBQzNDLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDN0VBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFNO0FBQ1Y7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvLi9zcmMvaGVscGVyLnRzIiwid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvLi9zcmMvbW9kZWxzLnRzIiwid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvLi9zcmMvbW92ZS50cyIsIndlYnBhY2s6Ly9yb2NrLXBhcGVyLXNjaXNzb3JzLy4vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly9yb2NrLXBhcGVyLXNjaXNzb3JzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb2NrLXBhcGVyLXNjaXNzb3JzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcm9jay1wYXBlci1zY2lzc29ycy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjYWxjdWxhdGVCb3JkZXIoeyB4LCB5LCBoaXRib3ggfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogeSAtIGhpdGJveCAvIDIsXG4gICAgICAgIHJpZ2h0OiB4ICsgaGl0Ym94IC8gMixcbiAgICAgICAgYm90dG9tOiB5ICsgaGl0Ym94IC8gMixcbiAgICAgICAgbGVmdDogeCAtIGhpdGJveCAvIDIsXG4gICAgfTtcbn1cbmV4cG9ydCB7IGNhbGN1bGF0ZUJvcmRlciB9O1xuIiwiLy9yb2NrIHBhcGVyIHNjaXNzb3JzIGVudW1cbmV4cG9ydCB2YXIgUlBTO1xuKGZ1bmN0aW9uIChSUFMpIHtcbiAgICBSUFNbXCJSb2NrXCJdID0gXCJcXHVEODNFXFx1RERGMVwiO1xuICAgIFJQU1tcIlBhcGVyXCJdID0gXCJcXHVEODNEXFx1RENDNFwiO1xuICAgIFJQU1tcIlNjaXNzb3JzXCJdID0gXCJcXHUyNzAyXFx1RkUwRlwiO1xufSkoUlBTIHx8IChSUFMgPSB7fSkpO1xuIiwiaW1wb3J0IHsgY2FsY3VsYXRlQm9yZGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgeyBSUFMgfSBmcm9tIFwiLi9tb2RlbHNcIjtcbi8vZnVuY3Rpb24gdGhhdCByZXR1cm5zIGVpdGhlciBNQVggb3IgLU1BWFxuZnVuY3Rpb24gZ2V0UmFuZG9tTW92ZW1lbnQoc3BlZWQpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IHNwZWVkIDogLXNwZWVkO1xufVxuZnVuY3Rpb24gY29uc3RyYWludCh7IHgsIHksIGJvcmRlciwgaGl0Ym94IH0pIHtcbiAgICBpZiAoeCkge1xuICAgICAgICBpZiAoeCAtIGhpdGJveCA8IGJvcmRlci5sZWZ0KSB7XG4gICAgICAgICAgICB4ID0gYm9yZGVyLmxlZnQgKyBoaXRib3g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggKyBoaXRib3ggPiBib3JkZXIucmlnaHQpIHtcbiAgICAgICAgICAgIHggPSBib3JkZXIucmlnaHQgLSBoaXRib3g7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoeSkge1xuICAgICAgICBpZiAoeSAtIGhpdGJveCA8IGJvcmRlci50b3ApIHtcbiAgICAgICAgICAgIHkgPSBib3JkZXIudG9wICsgaGl0Ym94O1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgaGl0Ym94ID4gYm9yZGVyLmJvdHRvbSkge1xuICAgICAgICAgICAgeSA9IGJvcmRlci5ib3R0b20gLSBoaXRib3g7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgeDogTWF0aC5mbG9vcih4KSwgeTogTWF0aC5mbG9vcih5KSB9O1xufVxuZnVuY3Rpb24gZ2V0TmVpZ2hib3VycyhpdGVtLCBpdGVtcywgcmFuZ2UpIHtcbiAgICBjb25zdCB4ID0gaXRlbS54O1xuICAgIGNvbnN0IHkgPSBpdGVtLnk7XG4gICAgY29uc3QgbmVpZ2hib3VycyA9IGl0ZW1zLmZpbHRlcigoaSkgPT4ge1xuICAgICAgICBpZiAoaS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGR4ID0geCAtIGkueDtcbiAgICAgICAgY29uc3QgZHkgPSB5IC0gaS55O1xuICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgcmV0dXJuIGQgPCByYW5nZTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmVpZ2hib3Vycztcbn1cbmZ1bmN0aW9uIG1vdmVUb3dhcmRzKHNvdXJjZSwgdGFyZ2V0LCB2LCBoaXRib3gpIHtcbiAgICBjb25zdCB7IHg6IHNvdXJjZVgsIHk6IHNvdXJjZVkgfSA9IHNvdXJjZTtcbiAgICBjb25zdCB7IHg6IHRhcmdldFgsIHk6IHRhcmdldFkgfSA9IHRhcmdldDtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIodGFyZ2V0WSAtIHNvdXJjZVksIHRhcmdldFggLSBzb3VyY2VYKTtcbiAgICAvL21vdmUgc291cmNlWCBzb3VyY2VZIHRvIHRhcmdldFggdGFyZ2V0WSBieSB2IGFtb3VudCBpbiAyRCBjb29yZGluYXRlcyBzeXN0ZW0jXG4gICAgY29uc3QgeCA9IHNvdXJjZVggKyB2ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIGNvbnN0IHkgPSBzb3VyY2VZICsgdiAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICBjb25zdCBuZXdJdGVtID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzb3VyY2UpLCB7IHgsIHkgfSk7XG4gICAgY29uc3QgbmV3SXRlbUJvcmRlciA9IGNhbGN1bGF0ZUJvcmRlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG5ld0l0ZW0pLCB7IGhpdGJveCB9KSk7XG4gICAgLy8gY29uc3QgbmV3WCA9IHNvdXJjZVggKyB2ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIC8vIGNvbnN0IG5ld1kgPSBzb3VyY2VZICsgdiAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzb3VyY2UpLCB7IHgsXG4gICAgICAgIHksIGJvcmRlcjogbmV3SXRlbUJvcmRlciB9KTtcbn1cbmZ1bmN0aW9uIG1vdmUocG9zaXRpb25zLCBzcGVlZCwgcmFuZ2UsIGhpdGJveCkge1xuICAgIHJldHVybiBwb3NpdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBnZXROZWlnaGJvdXJzKGl0ZW0sIHBvc2l0aW9ucywgcmFuZ2UpO1xuICAgICAgICBpZiAoaXRlbS5pdGVtID09PSBSUFMuUm9jayAmJiBuZWlnaGJvdXJzLnNvbWUoKG4pID0+IG4uaXRlbSA9PT0gUlBTLlNjaXNzb3JzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVUb3dhcmRzKGl0ZW0sIG5laWdoYm91cnMuZmluZCgobikgPT4gbi5pdGVtID09PSBSUFMuU2Npc3NvcnMpLCBzcGVlZCwgaGl0Ym94KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpdGVtLml0ZW0gPT09IFJQUy5QYXBlciAmJiBuZWlnaGJvdXJzLnNvbWUoKG4pID0+IG4uaXRlbSA9PT0gUlBTLlJvY2spKSB7XG4gICAgICAgICAgICByZXR1cm4gbW92ZVRvd2FyZHMoaXRlbSwgbmVpZ2hib3Vycy5maW5kKChuKSA9PiBuLml0ZW0gPT09IFJQUy5Sb2NrKSwgc3BlZWQsIGhpdGJveCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbS5pdGVtID09PSBSUFMuU2Npc3NvcnMgJiYgbmVpZ2hib3Vycy5zb21lKChuKSA9PiBuLml0ZW0gPT09IFJQUy5QYXBlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlVG93YXJkcyhpdGVtLCBuZWlnaGJvdXJzLmZpbmQoKG4pID0+IG4uaXRlbSA9PT0gUlBTLlBhcGVyKSwgc3BlZWQsIGhpdGJveCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSwgeyB4OiBpdGVtLnggKyBnZXRSYW5kb21Nb3ZlbWVudChzcGVlZCksIHk6IGl0ZW0ueSArIGdldFJhbmRvbU1vdmVtZW50KHNwZWVkKSB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gY2hlY2tDb2xsaXNpb24ob3JpZ2luLCB0YXJnZXQpIHtcbiAgICBpZiAob3JpZ2luLnJpZ2h0ID4gdGFyZ2V0LmxlZnQgJiZcbiAgICAgICAgb3JpZ2luLmxlZnQgPCB0YXJnZXQucmlnaHQgJiZcbiAgICAgICAgb3JpZ2luLmJvdHRvbSA+IHRhcmdldC50b3AgJiZcbiAgICAgICAgb3JpZ2luLnRvcCA8IHRhcmdldC5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNoZWNrQ29udmVydHMoaXRlbSwgX2luZGV4LCBhcnJheSwgaGl0Ym94KSB7XG4gICAgbGV0IHIgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICBhcnJheS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmlkICE9PSBuLmlkICYmIGNoZWNrQ29sbGlzaW9uKGl0ZW0uYm9yZGVyLCBuLmJvcmRlcikpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBSUFMuUm9jazoge1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pdGVtID09PSBSUFMuUGFwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pLCB7IGl0ZW06IFJQUy5QYXBlciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBSUFMuUGFwZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaXRlbSA9PT0gUlBTLlNjaXNzb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSwgeyBpdGVtOiBSUFMuU2Npc3NvcnMgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgUlBTLlNjaXNzb3JzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLml0ZW0gPT09IFJQUy5Sb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSwgeyBpdGVtOiBSUFMuUm9jayB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcjtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoeyBib3JkZXIsIHNwZWVkLCByYW5nZSwgaGl0Ym94LCB9KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1vdmVJbml0KHBvc2l0aW9ucykge1xuICAgICAgICBwb3NpdGlvbnMgPSBtb3ZlKHBvc2l0aW9ucywgc3BlZWQsIHJhbmdlLCBoaXRib3gpLm1hcCgoeCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgeCksIHsgYm9yZGVyOiBjYWxjdWxhdGVCb3JkZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB4KSwgeyBoaXRib3ggfSkpIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcG9zaXRpb25zID0gcG9zaXRpb25zLm1hcCgoaXRlbSwgaSwgYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYyA9IGNoZWNrQ29udmVydHMoaXRlbSwgaSwgYSwgaGl0Ym94KTtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gaXRlbTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGMpLCB7IHg6IGNvbnN0cmFpbnQoeyB4LCBib3JkZXIsIGhpdGJveCB9KS54LCB5OiBjb25zdHJhaW50KHsgeSwgYm9yZGVyLCBoaXRib3ggfSkueSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbnM7XG4gICAgICAgIC8vIHJldHVybiBuZXdQb3NpdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIC8vIFx0Y29uc3QgeyB4LCB5IH0gPSBpdGVtO1xuICAgICAgICAvLyBcdHJldHVybiB7XG4gICAgICAgIC8vIFx0XHQuLi5pdGVtLFxuICAgICAgICAvLyBcdFx0eDogY29uc3RyYWludCh7IHgsIGJvcmRlciwgaGl0Ym94IH0pLngsXG4gICAgICAgIC8vIFx0XHR5OiBjb25zdHJhaW50KHsgeSwgYm9yZGVyLCBoaXRib3ggfSkueSxcbiAgICAgICAgLy8gXHR9O1xuICAgICAgICAvLyB9KTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgUlBTIH0gZnJvbSBcIi4vbW9kZWxzXCI7XG5pbXBvcnQgbW92ZUluaXQgZnJvbSBcIi4vbW92ZVwiO1xuaW1wb3J0IHsgY2FsY3VsYXRlQm9yZGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGNhbnZhcywgY291bnQsIHNwZWVkLCByYW5nZSwgRlBTLCBoaXRib3ggfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgbGV0IGZyYW1lO1xuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgY29uc3QgX2l0ZW1zID0gW1JQUy5Sb2NrLCBSUFMuUGFwZXIsIFJQUy5TY2lzc29yc107XG4gICAgZnVuY3Rpb24gcmVzZXRDYW52YXMoKSB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgcmVzZXRDYW52YXMoKTtcbiAgICBmdW5jdGlvbiBnZXRSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwgKiAwLjk1ICsgaGl0Ym94KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21Qb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGdldFJhbmRvbU51bWJlcihjYW52YXMud2lkdGgpLFxuICAgICAgICAgICAgeTogZ2V0UmFuZG9tTnVtYmVyKGNhbnZhcy5oZWlnaHQpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVQb3NpdGlvbk9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBfaXRlbXNcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0sIGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGNvdW50KS5maWxsKHVuZGVmaW5lZCkubWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBnZW5lcmF0ZVJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IGlkLCBpdGVtIH0sIHBvcyksIHsgYm9yZGVyOiBjYWxjdWxhdGVCb3JkZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwb3MpLCB7IGhpdGJveCB9KSkgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mbGF0KCk7XG4gICAgfVxuICAgIGNvbnN0IGl0ZW1zID0gY3JlYXRlUG9zaXRpb25PYmplY3RzKCk7XG4gICAgaXRlbXMuZm9yRWFjaCgoeyBpdGVtLCB4LCB5IH0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBgJHtoaXRib3h9cHggQXJpYWxgO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGl0ZW0sIHgsIHkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY2FudmFzQm9yZGVyID0ge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHJpZ2h0OiBjYW52YXMud2lkdGgsXG4gICAgICAgIGJvdHRvbTogY2FudmFzLmhlaWdodCxcbiAgICAgICAgbGVmdDogMCxcbiAgICB9O1xuICAgIGNvbnN0IG1vdmUgPSBtb3ZlSW5pdCh7IGJvcmRlcjogY2FudmFzQm9yZGVyLCBzcGVlZCwgcmFuZ2UsIGhpdGJveCB9KTtcbiAgICBsZXQgcHJldkRhdGUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHRocm90dGxlQW1vdW50ID0gMTAwMCAvIEZQUztcbiAgICBmdW5jdGlvbiBhbmltYXRlKHBvc2l0aW9ucykge1xuICAgICAgICBsZXQgbmV3UG9zaXRpb25zO1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHByZXZEYXRlID4gdGhyb3R0bGVBbW91bnQpIHtcbiAgICAgICAgICAgIHByZXZEYXRlID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHJlc2V0Q2FudmFzKCk7XG4gICAgICAgICAgICAvL2RyYXcgdGhlIHJlY3QgYWdhaW5cbiAgICAgICAgICAgIG5ld1Bvc2l0aW9ucyA9IG1vdmUocG9zaXRpb25zKTtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9ucy5mb3JFYWNoKCh7IGl0ZW0sIHgsIHkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBgJHtoaXRib3h9cHggQXJpYWxgO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChpdGVtLCB4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgLy9kcmF3IGEgY3ViZSBhcm91bmQgdGhlIHRleHQgc2lkZSBhcyBoaXRib3ggYW1vdW50XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QoeCAtIGhpdGJveCAvIDIsIHkgLSBoaXRib3ggLyAyLCBoaXRib3gsIGhpdGJveCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgYW5pbWF0ZShuZXdQb3NpdGlvbnMgIT09IG51bGwgJiYgbmV3UG9zaXRpb25zICE9PSB2b2lkIDAgPyBuZXdQb3NpdGlvbnMgOiBwb3NpdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBhbmltYXRlKGl0ZW1zKTtcbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9yZW5kZXJcIjtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgV0lEVEggPSAxMDAwO1xuICAgIGNvbnN0IEhFSUdIVCA9IDEwMDA7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2FudmFzKGNhbnZhcykge1xuICAgICAgICBjYW52YXMud2lkdGggPSBXSURUSDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICB9XG4gICAgcHJlcGFyZUNhbnZhcyhjYW52YXMpO1xuICAgIGNvbnN0IHJlbmRlck9wdGlvbnMgPSB7XG4gICAgICAgIGNhbnZhcyxcbiAgICAgICAgY291bnQ6IDEwLFxuICAgICAgICByYW5nZTogMzAwLFxuICAgICAgICBzcGVlZDogMixcbiAgICAgICAgRlBTOiA2MCxcbiAgICAgICAgaGl0Ym94OiA1MCxcbiAgICB9O1xuICAgIHJlbmRlcihyZW5kZXJPcHRpb25zKTtcbn1cbmluaXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==