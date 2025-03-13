/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/AuthContext.tsx":
/*!**************************************!*\
  !*** ./src/contexts/AuthContext.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/supabase */ \"./src/lib/supabase.ts\");\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Check active sessions and sets the user\n        _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession().then(({ data: { session } })=>{\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        // Listen for changes on auth state\n        const { data: { subscription } } = _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.onAuthStateChange((_event, session)=>{\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        return ()=>subscription.unsubscribe();\n    }, []);\n    const signIn = async (email, password)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signInWithPassword({\n            email,\n            password\n        });\n        return {\n            error\n        };\n    };\n    const signUp = async (email, password)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signUp({\n            email,\n            password\n        });\n        return {\n            error\n        };\n    };\n    const signOut = async ()=>{\n        await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signOut();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            signIn,\n            signUp,\n            signOut\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\user1\\\\Desktop\\\\finial folder\\\\promptmanager\\\\src\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, this);\n}\nconst useAuth = ()=>{\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXVFO0FBRTVCO0FBVTNDLE1BQU1LLDRCQUFjTCxvREFBYUEsQ0FBa0IsQ0FBQztBQUU3QyxTQUFTTSxhQUFhLEVBQUVDLFFBQVEsRUFBaUM7SUFDdEUsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFjO0lBQzlDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBLENBQUM7UUFDUiwwQ0FBMEM7UUFDMUNFLG1EQUFRQSxDQUFDUSxJQUFJLENBQUNDLFVBQVUsR0FBR0MsSUFBSSxDQUFDLENBQUMsRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsRUFBRTtZQUNwRFAsUUFBUU8sU0FBU1IsUUFBUTtZQUN6QkcsV0FBVztRQUNiO1FBRUEsbUNBQW1DO1FBQ25DLE1BQU0sRUFBRUksTUFBTSxFQUFFRSxZQUFZLEVBQUUsRUFBRSxHQUFHYixtREFBUUEsQ0FBQ1EsSUFBSSxDQUFDTSxpQkFBaUIsQ0FBQyxDQUFDQyxRQUFRSDtZQUMxRVAsUUFBUU8sU0FBU1IsUUFBUTtZQUN6QkcsV0FBVztRQUNiO1FBRUEsT0FBTyxJQUFNTSxhQUFhRyxXQUFXO0lBQ3ZDLEdBQUcsRUFBRTtJQUVMLE1BQU1DLFNBQVMsT0FBT0MsT0FBZUM7UUFDbkMsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNcEIsbURBQVFBLENBQUNRLElBQUksQ0FBQ2Esa0JBQWtCLENBQUM7WUFDdkRIO1lBQ0FDO1FBQ0Y7UUFDQSxPQUFPO1lBQUVDO1FBQU07SUFDakI7SUFFQSxNQUFNRSxTQUFTLE9BQU9KLE9BQWVDO1FBQ25DLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTXBCLG1EQUFRQSxDQUFDUSxJQUFJLENBQUNjLE1BQU0sQ0FBQztZQUMzQ0o7WUFDQUM7UUFDRjtRQUNBLE9BQU87WUFBRUM7UUFBTTtJQUNqQjtJQUVBLE1BQU1HLFVBQVU7UUFDZCxNQUFNdkIsbURBQVFBLENBQUNRLElBQUksQ0FBQ2UsT0FBTztJQUM3QjtJQUVBLHFCQUNFLDhEQUFDdEIsWUFBWXVCLFFBQVE7UUFBQ0MsT0FBTztZQUFFckI7WUFBTUU7WUFBU1c7WUFBUUs7WUFBUUM7UUFBUTtrQkFDbkVwQjs7Ozs7O0FBR1A7QUFFTyxNQUFNdUIsVUFBVTtJQUNyQixPQUFPN0IsaURBQVVBLENBQUNJO0FBQ3BCLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9tcHQtbWFuYWdlci8uL3NyYy9jb250ZXh0cy9BdXRoQ29udGV4dC50c3g/MWZhMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcclxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tICcuLi9saWIvc3VwYWJhc2UnO1xyXG5cclxuaW50ZXJmYWNlIEF1dGhDb250ZXh0VHlwZSB7XHJcbiAgdXNlcjogVXNlciB8IG51bGw7XHJcbiAgbG9hZGluZzogYm9vbGVhbjtcclxuICBzaWduSW46IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPHsgZXJyb3I6IEVycm9yIHwgbnVsbCB9PjtcclxuICBzaWduVXA6IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPHsgZXJyb3I6IEVycm9yIHwgbnVsbCB9PjtcclxuICBzaWduT3V0OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aENvbnRleHRUeXBlPih7fSBhcyBBdXRoQ29udGV4dFR5cGUpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XHJcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gQ2hlY2sgYWN0aXZlIHNlc3Npb25zIGFuZCBzZXRzIHRoZSB1c2VyXHJcbiAgICBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKS50aGVuKCh7IGRhdGE6IHsgc2Vzc2lvbiB9IH0pID0+IHtcclxuICAgICAgc2V0VXNlcihzZXNzaW9uPy51c2VyID8/IG51bGwpO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExpc3RlbiBmb3IgY2hhbmdlcyBvbiBhdXRoIHN0YXRlXHJcbiAgICBjb25zdCB7IGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0gfSA9IHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoKF9ldmVudCwgc2Vzc2lvbikgPT4ge1xyXG4gICAgICBzZXRVc2VyKHNlc3Npb24/LnVzZXIgPz8gbnVsbCk7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2lnbkluID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluV2l0aFBhc3N3b3JkKHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4geyBlcnJvciB9O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNpZ25VcCA9IGFzeW5jIChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcCh7XHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICBwYXNzd29yZCxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHsgZXJyb3IgfTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzaWduT3V0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBsb2FkaW5nLCBzaWduSW4sIHNpZ25VcCwgc2lnbk91dCB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcclxuICByZXR1cm4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XHJcbn07ICJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwic3VwYWJhc2UiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImF1dGgiLCJnZXRTZXNzaW9uIiwidGhlbiIsImRhdGEiLCJzZXNzaW9uIiwic3Vic2NyaXB0aW9uIiwib25BdXRoU3RhdGVDaGFuZ2UiLCJfZXZlbnQiLCJ1bnN1YnNjcmliZSIsInNpZ25JbiIsImVtYWlsIiwicGFzc3dvcmQiLCJlcnJvciIsInNpZ25JbldpdGhQYXNzd29yZCIsInNpZ25VcCIsInNpZ25PdXQiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./src/lib/supabase.ts":
/*!*****************************!*\
  !*** ./src/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://crrldzkrdkstwnaebksr.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycmxkemtyZGtzdHduYWVia3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NzkxMzcsImV4cCI6MjA1NzE1NTEzN30.yY1LJsPFx069j2Qm-mPw4gMAlhirbf8bRezdjiusixg\";\nif (!supabaseUrl || !supabaseAnonKey) {\n    throw new Error(\"Missing Supabase environment variables\");\n}\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFxRDtBQUVyRCxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFakUsSUFBSSxDQUFDRCxlQUFlLENBQUNJLGlCQUFpQjtJQUNwQyxNQUFNLElBQUlFLE1BQU07QUFDbEI7QUFFTyxNQUFNQyxXQUFXUixtRUFBWUEsQ0FBQ0MsYUFBYUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbXB0LW1hbmFnZXIvLi9zcmMvbGliL3N1cGFiYXNlLnRzPzA2ZTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcclxuXHJcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMO1xyXG5jb25zdCBzdXBhYmFzZUFub25LZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWTtcclxuXHJcbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xyXG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBTdXBhYmFzZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpOyAiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJFcnJvciIsInN1cGFiYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/lib/supabase.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\user1\\\\Desktop\\\\finial folder\\\\promptmanager\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\user1\\\\Desktop\\\\finial folder\\\\promptmanager\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUN1RDtBQUN4QjtBQUUvQixTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUNFLDhEQUFDSCwrREFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21wdC1tYW5hZ2VyLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoUHJvdmlkZXI+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvQXV0aFByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwOyAiXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();