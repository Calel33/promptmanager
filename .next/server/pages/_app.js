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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/supabase */ \"./src/lib/supabase.ts\");\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Check active sessions and sets the user\n        _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession().then(({ data: { session } })=>{\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        // Listen for changes on auth state\n        const { data: { subscription } } = _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.onAuthStateChange((_event, session)=>{\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        return ()=>subscription.unsubscribe();\n    }, []);\n    const signIn = async (email, password)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signInWithPassword({\n            email,\n            password\n        });\n        return {\n            error\n        };\n    };\n    const signUp = async (email, password)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signUp({\n            email,\n            password\n        });\n        return {\n            error\n        };\n    };\n    const signOut = async ()=>{\n        await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signOut();\n    };\n    const resetPassword = async (email)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.resetPasswordForEmail(email, {\n            redirectTo: `${window.location.origin}/auth/update-password`\n        });\n        return {\n            error\n        };\n    };\n    const updatePassword = async (newPassword)=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.updateUser({\n            password: newPassword\n        });\n        return {\n            error\n        };\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            signIn,\n            signUp,\n            signOut,\n            resetPassword,\n            updatePassword\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\user1\\\\Desktop\\\\finial folder\\\\promptmanager\\\\src\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 72,\n        columnNumber: 5\n    }, this);\n}\nconst useAuth = ()=>{\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXVFO0FBRTVCO0FBWTNDLE1BQU1LLDRCQUFjTCxvREFBYUEsQ0FBa0IsQ0FBQztBQUU3QyxTQUFTTSxhQUFhLEVBQUVDLFFBQVEsRUFBaUM7SUFDdEUsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFjO0lBQzlDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBLENBQUM7UUFDUiwwQ0FBMEM7UUFDMUNFLG1EQUFRQSxDQUFDUSxJQUFJLENBQUNDLFVBQVUsR0FBR0MsSUFBSSxDQUFDLENBQUMsRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsRUFBRTtZQUNwRFAsUUFBUU8sU0FBU1IsUUFBUTtZQUN6QkcsV0FBVztRQUNiO1FBRUEsbUNBQW1DO1FBQ25DLE1BQU0sRUFBRUksTUFBTSxFQUFFRSxZQUFZLEVBQUUsRUFBRSxHQUFHYixtREFBUUEsQ0FBQ1EsSUFBSSxDQUFDTSxpQkFBaUIsQ0FBQyxDQUFDQyxRQUFRSDtZQUMxRVAsUUFBUU8sU0FBU1IsUUFBUTtZQUN6QkcsV0FBVztRQUNiO1FBRUEsT0FBTyxJQUFNTSxhQUFhRyxXQUFXO0lBQ3ZDLEdBQUcsRUFBRTtJQUVMLE1BQU1DLFNBQVMsT0FBT0MsT0FBZUM7UUFDbkMsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNcEIsbURBQVFBLENBQUNRLElBQUksQ0FBQ2Esa0JBQWtCLENBQUM7WUFDdkRIO1lBQ0FDO1FBQ0Y7UUFDQSxPQUFPO1lBQUVDO1FBQU07SUFDakI7SUFFQSxNQUFNRSxTQUFTLE9BQU9KLE9BQWVDO1FBQ25DLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTXBCLG1EQUFRQSxDQUFDUSxJQUFJLENBQUNjLE1BQU0sQ0FBQztZQUMzQ0o7WUFDQUM7UUFDRjtRQUNBLE9BQU87WUFBRUM7UUFBTTtJQUNqQjtJQUVBLE1BQU1HLFVBQVU7UUFDZCxNQUFNdkIsbURBQVFBLENBQUNRLElBQUksQ0FBQ2UsT0FBTztJQUM3QjtJQUVBLE1BQU1DLGdCQUFnQixPQUFPTjtRQUMzQixNQUFNLEVBQUVFLEtBQUssRUFBRSxHQUFHLE1BQU1wQixtREFBUUEsQ0FBQ1EsSUFBSSxDQUFDaUIscUJBQXFCLENBQUNQLE9BQU87WUFDakVRLFlBQVksQ0FBQyxFQUFFQyxPQUFPQyxRQUFRLENBQUNDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUM5RDtRQUNBLE9BQU87WUFBRVQ7UUFBTTtJQUNqQjtJQUVBLE1BQU1VLGlCQUFpQixPQUFPQztRQUM1QixNQUFNLEVBQUVYLEtBQUssRUFBRSxHQUFHLE1BQU1wQixtREFBUUEsQ0FBQ1EsSUFBSSxDQUFDd0IsVUFBVSxDQUFDO1lBQy9DYixVQUFVWTtRQUNaO1FBQ0EsT0FBTztZQUFFWDtRQUFNO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNuQixZQUFZZ0MsUUFBUTtRQUFDQyxPQUFPO1lBQzNCOUI7WUFDQUU7WUFDQVc7WUFDQUs7WUFDQUM7WUFDQUM7WUFDQU07UUFDRjtrQkFDRzNCOzs7Ozs7QUFHUDtBQUVPLE1BQU1nQyxVQUFVO0lBQ3JCLE9BQU90QyxpREFBVUEsQ0FBQ0k7QUFDcEIsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21wdC1tYW5hZ2VyLy4vc3JjL2NvbnRleHRzL0F1dGhDb250ZXh0LnRzeD8xZmEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJy4uL2xpYi9zdXBhYmFzZSc7XHJcblxyXG5pbnRlcmZhY2UgQXV0aENvbnRleHRUeXBlIHtcclxuICB1c2VyOiBVc2VyIHwgbnVsbDtcclxuICBsb2FkaW5nOiBib29sZWFuO1xyXG4gIHNpZ25JbjogKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8eyBlcnJvcjogRXJyb3IgfCBudWxsIH0+O1xyXG4gIHNpZ25VcDogKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8eyBlcnJvcjogRXJyb3IgfCBudWxsIH0+O1xyXG4gIHNpZ25PdXQ6ICgpID0+IFByb21pc2U8dm9pZD47XHJcbiAgcmVzZXRQYXNzd29yZDogKGVtYWlsOiBzdHJpbmcpID0+IFByb21pc2U8eyBlcnJvcjogRXJyb3IgfCBudWxsIH0+O1xyXG4gIHVwZGF0ZVBhc3N3b3JkOiAobmV3UGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTx7IGVycm9yOiBFcnJvciB8IG51bGwgfT47XHJcbn1cclxuXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGU+KHt9IGFzIEF1dGhDb250ZXh0VHlwZSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBDaGVjayBhY3RpdmUgc2Vzc2lvbnMgYW5kIHNldHMgdGhlIHVzZXJcclxuICAgIHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpLnRoZW4oKHsgZGF0YTogeyBzZXNzaW9uIH0gfSkgPT4ge1xyXG4gICAgICBzZXRVc2VyKHNlc3Npb24/LnVzZXIgPz8gbnVsbCk7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzIG9uIGF1dGggc3RhdGVcclxuICAgIGNvbnN0IHsgZGF0YTogeyBzdWJzY3JpcHRpb24gfSB9ID0gc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgoX2V2ZW50LCBzZXNzaW9uKSA9PiB7XHJcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzaWduSW4gPSBhc3luYyAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduSW5XaXRoUGFzc3dvcmQoe1xyXG4gICAgICBlbWFpbCxcclxuICAgICAgcGFzc3dvcmQsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7IGVycm9yIH07XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2lnblVwID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnblVwKHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4geyBlcnJvciB9O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNpZ25PdXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNldFBhc3N3b3JkID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGgucmVzZXRQYXNzd29yZEZvckVtYWlsKGVtYWlsLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2F1dGgvdXBkYXRlLXBhc3N3b3JkYCxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHsgZXJyb3IgfTtcclxuICB9O1xyXG5cclxuICBjb25zdCB1cGRhdGVQYXNzd29yZCA9IGFzeW5jIChuZXdQYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnVwZGF0ZVVzZXIoe1xyXG4gICAgICBwYXNzd29yZDogbmV3UGFzc3dvcmRcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHsgZXJyb3IgfTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IFxyXG4gICAgICB1c2VyLCBcclxuICAgICAgbG9hZGluZywgXHJcbiAgICAgIHNpZ25JbiwgXHJcbiAgICAgIHNpZ25VcCwgXHJcbiAgICAgIHNpZ25PdXQsXHJcbiAgICAgIHJlc2V0UGFzc3dvcmQsXHJcbiAgICAgIHVwZGF0ZVBhc3N3b3JkXHJcbiAgICB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcclxuICByZXR1cm4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XHJcbn07ICJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwic3VwYWJhc2UiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImF1dGgiLCJnZXRTZXNzaW9uIiwidGhlbiIsImRhdGEiLCJzZXNzaW9uIiwic3Vic2NyaXB0aW9uIiwib25BdXRoU3RhdGVDaGFuZ2UiLCJfZXZlbnQiLCJ1bnN1YnNjcmliZSIsInNpZ25JbiIsImVtYWlsIiwicGFzc3dvcmQiLCJlcnJvciIsInNpZ25JbldpdGhQYXNzd29yZCIsInNpZ25VcCIsInNpZ25PdXQiLCJyZXNldFBhc3N3b3JkIiwicmVzZXRQYXNzd29yZEZvckVtYWlsIiwicmVkaXJlY3RUbyIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwidXBkYXRlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInVwZGF0ZVVzZXIiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n");

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