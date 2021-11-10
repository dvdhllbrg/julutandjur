"use strict";
(() => {
var exports = {};
exports.id = 156;
exports.ids = [156];
exports.modules = {

/***/ 2678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Recipes),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_RecipeInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7735);
/* harmony import */ var _util_mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7942);





function Recipes({ recipes  }) {
    const { 0: allCategoryNames  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        ...new Set(recipes.map((r)=>r.category
        ))
    ]);
    const { 0: visibleRecipes , 1: setVisibleRecipes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(recipes);
    const { 0: visibleCategoryNames , 1: setVisibleCategoryNames  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(allCategoryNames);
    const filter = (sought)=>{
        let foundRecipes;
        let foundCategoryNames;
        if (sought === '') {
            foundRecipes = recipes;
            foundCategoryNames = allCategoryNames;
        } else {
            foundRecipes = recipes.filter((r)=>{
                const search = new RegExp(`.*${sought}.*`, 'i');
                return search.test(r.name) || search.test(r.category);
            });
            foundCategoryNames = [
                ...new Set(foundRecipes.map((r)=>r.category
                ))
            ];
        }
        setVisibleRecipes(foundRecipes);
        setVisibleCategoryNames(foundCategoryNames);
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: "Mat - Jul utan djur"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "search",
                        className: "u-full-width searchbar",
                        placeholder: "S\xf6k p\xe5 recept eller kategori",
                        onChange: (e)=>filter(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_RecipeInfo__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        visibleCategoryNames: visibleCategoryNames,
                        visibleRecipes: visibleRecipes
                    })
                ]
            })
        ]
    }));
};
const getStaticProps = async ()=>{
    const { db  } = await (0,_util_mongodb__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const recipes = await db.collection('recipes').find({
    }).project({
        _id: 0
    }).limit(40).toArray();
    return {
        props: {
            recipes
        }
    };
};


/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 8028:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 3018:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,675,942,735], () => (__webpack_exec__(2678)));
module.exports = __webpack_exports__;

})();