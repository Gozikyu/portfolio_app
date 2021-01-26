"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var PageButton_1 = require("./PageButton");
var core_1 = require("./core");
var styles = styles_1.createStyles({
    root: {},
    rootCurrent: {},
    rootEllipsis: {},
    rootEnd: {},
    rootStandard: {},
    label: {},
    text: {},
    textPrimary: {},
    textSecondary: {},
    colorInherit: {},
    colorInheritCurrent: {},
    colorInheritOther: {},
    disabled: {},
    sizeSmall: {},
    sizeSmallCurrent: {},
    sizeSmallEllipsis: {},
    sizeSmallEnd: {},
    sizeSmallStandard: {},
    sizeLarge: {},
    sizeLargeCurrent: {},
    sizeLargeEllipsis: {},
    sizeLargeEnd: {},
    sizeLargeStandard: {},
    fullWidth: {},
});
var Pagination = function (_a) {
    var _b = _a.limit, limit = _b === void 0 ? 1 : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c, _d = _a.total, total = _d === void 0 ? 0 : _d, _e = _a.centerRipple, centerRipple = _e === void 0 ? false : _e, classes = _a.classes, classNameProp = _a.className, _f = _a.component, component = _f === void 0 ? 'div' : _f, _g = _a.currentPageColor, currentPageColor = _g === void 0 ? 'secondary' : _g, _h = _a.disabled, disabled = _h === void 0 ? false : _h, _j = _a.disableFocusRipple, disableFocusRipple = _j === void 0 ? false : _j, _k = _a.disableRipple, disableRipple = _k === void 0 ? false : _k, _l = _a.fullWidth, fullWidth = _l === void 0 ? false : _l, _m = _a.innerButtonCount, innerButtonCountProp = _m === void 0 ? 2 : _m, _o = _a.nextPageLabel, nextPageLabel = _o === void 0 ? '>' : _o, onClick = _a.onClick, _p = _a.otherPageColor, otherPageColor = _p === void 0 ? 'primary' : _p, _q = _a.outerButtonCount, outerButtonCountProp = _q === void 0 ? 2 : _q, _r = _a.previousPageLabel, previousPageLabel = _r === void 0 ? '<' : _r, _s = _a.reduced, reduced = _s === void 0 ? false : _s, renderButton = _a.renderButton, _t = _a.size, size = _t === void 0 ? 'medium' : _t, other = __rest(_a, ["limit", "offset", "total", "centerRipple", "classes", "className", "component", "currentPageColor", "disabled", "disableFocusRipple", "disableRipple", "fullWidth", "innerButtonCount", "nextPageLabel", "onClick", "otherPageColor", "outerButtonCount", "previousPageLabel", "reduced", "renderButton", "size"]);
    var root = classes.root, buttonClasses = __rest(classes, ["root"]);
    var className = classnames_1.default(root, classNameProp);
    var innerButtonCount = reduced ? 1 : innerButtonCountProp;
    var outerButtonCount = reduced ? 1 : outerButtonCountProp;
    var Component = component;
    return (React.createElement(Component, __assign({ className: className }, other), core_1.computePages(limit, offset, total, innerButtonCount, outerButtonCount).map(function (pp) {
        var key;
        var children;
        var pageVariant;
        switch (pp.position) {
            case 0:
                key = pp.position;
                children = pp.page;
                pageVariant = 'current';
                break;
            case 1:
            case 2:
                key = -pp.position;
                children = '...';
                pageVariant = 'ellipsis';
                break;
            case 3:
            case 4:
                key = -pp.position;
                children = pp.position === 3 ? previousPageLabel : nextPageLabel;
                pageVariant = 'end';
                break;
            default:
                key = pp.page;
                children = pp.page;
                pageVariant = 'standard';
                break;
        }
        return (React.createElement(PageButton_1.default, { limit: limit, page: pp.page, total: total, centerRipple: centerRipple, classes: buttonClasses, currentPageColor: currentPageColor, disabled: disabled, disableFocusRipple: disableFocusRipple, disableRipple: disableRipple, fullWidth: fullWidth, key: key, onClick: onClick, renderButton: renderButton, otherPageColor: otherPageColor, pageVariant: pageVariant, size: size }, children));
    })));
};
var PaginationWithStyles = styles_1.withStyles(styles, {
    name: 'MuiFlatPagination',
})(Pagination);
exports.default = PaginationWithStyles;
