webpackJsonp([1,4],{

/***/ 139:
/***/ (function(module, exports) {

module.exports = "<h2 id=\"title\">D&amp;D 5e Spells <small><a href=\"./#help\" class=\"btn btn-primary\">Help</a></small></h2>\r\n<div class=\"row\">\r\n  <div class=\"col-md-6\">\r\n    <spell-list #list></spell-list>\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <div class=\"affix spell-view\">\r\n      <spell-view [spell]=\"list.selected\"></spell-view>\r\n    </div>\r\n  </div>\r\n</div>\r\n<hr />\r\n<div id=\"help\">\r\n  <h2>How to Use <small><a href=\"./#title\" class=\"btn btn-primary\">Back to Top</a></small></h2>\r\n  <ul>\r\n    <li>Type in the search box to find a specific spell</li>\r\n    <li>Click the top of a column to sort by that column</li>\r\n    <li>Click on a spell to view details about it</li>\r\n  </ul>\r\n</div>\r\n<br />\r\n<br />\r\n<div class=\"footer\">\r\n  <p>© 2017 - All Rights Reserved.</p>\r\n  <p>Wizards of the Coast, Dungeons &amp; Dragons, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries.\r\n    © 2015 Wizards. All Rights Reserved.</p>\r\n  <p>This site is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.\r\n    This site may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under <a href=\"https://dnd.wizards.com/articles/features/fan-site-kit\">Wizards' Fan Site Policy</a>.\r\n    For example, Dungeons &amp; Dragons® is a trademark[s] of Wizards of the Coast.\r\n    For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit <a href=\"https://www.wizards.com/\">their website at (www.wizards.com).</a></p>\r\n  <p>This site uses <a href=\"https://github.com/twbs/bootstrap\">Boostrap</a> with the <a href=\"https://github.com/FezVrasta/bootstrap-material-design\">Bootstrap Material Design</a> theme.</p>\r\n  <p>Built with <a href=\"https://github.com/angular/angular\">Angular 4</a> using <a href=\"https://github.com/angular/angular-cli\">Angular CLI</a>.</p>\r\n</div>\r\n"

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <br />\r\n  <input [(ngModel)]=\"filters.name\" placeholder=\"Search\" class=\"form-control\" />\r\n  <br />\r\n  <div class=\"form-group\">\r\n    <label for=\"schoolInput\">School</label>\r\n    <select [(ngModel)]=\"filters.school\" id=\"schoolInput\" class=\"form-control\">\r\n      <option label=\" \"></option>\r\n      <option>Abjuration</option>\r\n      <option>Conjuration</option>\r\n      <option>Divination</option>\r\n      <option>Enchantment</option>\r\n      <option>Evocation</option>\r\n      <option>Illusion</option>\r\n      <option>Necromancy</option>\r\n      <option>Transmutation</option>\r\n    </select>\r\n  </div>\r\n  <br />\r\n  <table class=\"table\">\r\n    <tr>\r\n      <th>Bard</th>\r\n      <th>Cleric</th>\r\n      <th>Druid</th>\r\n      <th>Paladin</th>\r\n      <th>Ranger</th>\r\n      <th>Sorcerer</th>\r\n      <th>Warlock</th>\r\n      <th>Wizard</th>\r\n    </tr>\r\n    <tr>\r\n      <td><input [(ngModel)]=\"bard\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"cleric\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"druid\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"paladin\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"ranger\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"sorcerer\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"warlock\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"wizard\" type=\"checkbox\" /></td>\r\n    </tr>\r\n  </table>\r\n  <table class=\"table\">\r\n    <tr>\r\n      <th>V</th>\r\n      <th>S</th>\r\n      <th>M</th>\r\n      <th>GP</th>\r\n    </tr>\r\n    <tr>\r\n      <td><input [(ngModel)]=\"verbal\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"somatic\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"material\" type=\"checkbox\" /></td>\r\n      <td><input [(ngModel)]=\"gold\" type=\"checkbox\" /></td>\r\n    </tr>\r\n  </table>\r\n  <button (click)=\"resetFilters()\" class=\"btn btn-info\">Reset Filters</button>\r\n</div>\r\n<br />\r\n<div>\r\n  <table class=\"table table-hover\">\r\n    <tr>\r\n      <th (click)=\"pushComparator('name')\">Name</th>\r\n      <th (click)=\"pushComparator('level')\">Level</th>\r\n      <th (click)=\"pushComparator('school')\">School</th>\r\n      <th>Classes</th>\r\n      <th>Components</th>\r\n    </tr>\r\n    <tr *ngFor=\"let spell of getSpellsForDisplay()\" (click)=\"selected = spell\">\r\n      <td>{{spell.name}}</td>\r\n      <td>{{spell.level}}</td>\r\n      <td>{{spell.school}}</td>\r\n      <td>{{spell.classes.join(', ')}}</td>\r\n      <td>{{displayComponents(spell.components)}}</td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"spell\">\r\n  <h2>{{spell.name}}</h2>\r\n  <br />\r\n  <p><em>{{formatLevel(spell)}} - {{spell.classes.join(', ')}} spell</em></p>\r\n  <table class=\"table\">\r\n    <tr>\r\n      <td>Casting Time</td>\r\n      <td>{{spell.castingTime}}</td>\r\n    </tr>\r\n    <tr>\r\n      <td>Range</td>\r\n      <td>{{spell.range}}</td>\r\n    </tr>\r\n    <tr>\r\n      <td>Components</td>\r\n      <td>{{spell.components.join(', ')}}</td>\r\n    </tr>\r\n    <tr>\r\n      <td>Duration</td>\r\n      <td>{{spell.duration}}</td>\r\n    </tr>\r\n  </table>\r\n  <p class=\"whitespace\">{{spell.description}}</p>\r\n</div>\r\n"

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(44)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spell__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpellService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SpellService = (function () {
    function SpellService(http) {
        var _this = this;
        this.http = http;
        this.spells = [];
        var subscription = this.http.get('./spells.json').map(function (response) { return response.json(); }).subscribe(function (spells) {
            var spellNames = Object.keys(spells).sort();
            for (var i = 0; i < spellNames.length; i++) {
                var spellObject = spells[spellNames[i]];
                try {
                    _this.spells.push(new __WEBPACK_IMPORTED_MODULE_3__spell__["a" /* Spell */](spellNames[i], spellObject.casting_time, _this.getComponents(spellObject.components), spellObject.description, spellObject.duration, spellObject.level, spellObject.range, spellObject.school, spellObject['class']));
                }
                catch (eror) {
                    console.log('Error converting to spell:');
                    console.log(spellObject);
                }
            }
            subscription.unsubscribe();
        }, function (error) {
            console.log(error);
        });
    }
    SpellService.prototype.getSpells = function () {
        return this.spells;
    };
    SpellService.prototype.getComponents = function (componentString) {
        var components = [];
        var baseComponents = ['V', 'S', 'M'];
        for (var _i = 0, baseComponents_1 = baseComponents; _i < baseComponents_1.length; _i++) {
            var component = baseComponents_1[_i];
            if (componentString.includes(component)) {
                components.push(component);
            }
        }
        var materialStart = componentString.indexOf('(');
        var materialEnd = componentString.indexOf(')');
        if (materialStart != -1 && materialEnd > materialStart) {
            var material = componentString.substring(materialStart + 1, materialEnd);
            components.push(material[0].toUpperCase() + material.slice(1));
        }
        return components;
    };
    return SpellService;
}());
SpellService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SpellService);

var _a;
//# sourceMappingURL=spell.service.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spell; });
var Spell = (function () {
    function Spell(name, castingTime, components, description, duration, level, range, school, classes) {
        this.name = name;
        this.castingTime = castingTime;
        this.components = components;
        this.description = description;
        this.duration = duration;
        this.level = level;
        this.range = range;
        this.school = school;
        this.classes = classes;
        if (level < 0 || level > 9) {
            throw new Error("Invalid Spell: Level out of range");
        }
    }
    return Spell;
}());

//# sourceMappingURL=spell.js.map

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 74;


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(85);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(139),
        styles: [__webpack_require__(45)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spell_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_component__ = __webpack_require__(84);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__list_component__["a" /* ListComponent */],
            __WEBPACK_IMPORTED_MODULE_7__view_component__["a" /* ViewComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__spell_service__["a" /* SpellService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spell_service__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListComponent = (function () {
    function ListComponent(spellService) {
        this.spellService = spellService;
        this.resetFilters();
    }
    ListComponent.prototype.resetFilters = function () {
        this.spells = this.spellService.getSpells();
        this.comparator = 'name';
        this.reverse = false;
        this.filters = {
            name: '',
            school: '',
            class: [],
            components: []
        };
        var classes = ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'];
        for (var i = 0; i < classes.length; i++) {
            this[classes[i]] = false;
        }
        var componentTypes = ['verbal', 'somatic', 'material', 'gold'];
        for (var i = 0; i < componentTypes.length; i++) {
            this[componentTypes[i]] = false;
        }
    };
    ListComponent.prototype.sort = function () {
        this.spells.sort(this.getComparator(this.comparator));
        if (this.reverse) {
            this.spells.reverse();
        }
    };
    ListComponent.prototype.getSpellsForDisplay = function () {
        var _this = this;
        this.sort();
        this.filters.class = [];
        this.filters.components = [];
        var classes = ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'];
        for (var i = 0; i < classes.length; i++) {
            if (this[classes[i]]) {
                this.filters.class.push(classes[i]);
            }
        }
        var shorthandComponents = {
            'verbal': 'V',
            'somatic': 'S',
            'material': 'M',
            'gold': 'GP'
        };
        var componentTypes = ['verbal', 'somatic', 'material', 'gold'];
        var empty = true;
        for (var i = 0; i < componentTypes.length; i++) {
            if (this[componentTypes[i]]) {
                empty = false;
                this.filters.components.push(shorthandComponents[componentTypes[i]]);
            }
        }
        var baseComponentFilter = this.getArrayFilter('components', this.filters.components.filter(function (element) {
            return element === 'V' || element === 'S' || element === 'M';
        }));
        var componentFilter = function (spell) {
            return empty || (baseComponentFilter(spell) && (_this['verbal'] || _this['somatic'] || _this['material'])) || (_this['gold'] && spell.components.reduce(function (acc, component) {
                return acc || component.toLowerCase().indexOf('gp') !== -1;
            }, false));
        };
        return this.spells.filter(this.composeFilters([
            this.getStringFilter('name', this.filters.name),
            this.getStringFilter('school', this.filters.school),
            this.getArrayFilter('classes', this.filters.class),
            componentFilter
        ]));
    };
    ListComponent.prototype.pushComparator = function (property) {
        if (this.comparator === property) {
            this.reverse = !this.reverse;
        }
        else {
            this.comparator = property;
            this.reverse = false;
        }
    };
    ListComponent.prototype.displayComponents = function (components) {
        var gp = false;
        var baseComponents = components.filter(function (element) {
            if (element.toLowerCase().indexOf('gp') !== -1) {
                gp = true;
            }
            return element === 'V' || element === 'S' || element === 'M';
        });
        if (gp) {
            baseComponents.push('GP');
        }
        return baseComponents.join(', ');
    };
    ListComponent.prototype.composeFilters = function (filters) {
        return function (spell) {
            var pass = true;
            for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                var filter = filters_1[_i];
                pass = pass && filter(spell);
            }
            return pass;
        };
    };
    ListComponent.prototype.getStringFilter = function (property, value) {
        if (!value || value === '') {
            return function (spell) { return true; };
        }
        return function (spell) {
            if (!spell.hasOwnProperty(property)) {
                console.log("Spell missing property " + property);
                return false;
            }
            return spell[property].toLowerCase().includes(value.toLowerCase());
        };
    };
    ListComponent.prototype.getArrayFilter = function (property, values) {
        if (!values || values.length === 0) {
            return function (spell) { return true; };
        }
        var individualFilters = values.map(function (value) {
            return function (array) {
                return array.reduce(function (acc, string) {
                    return acc || string.toLowerCase().includes(value.toLowerCase());
                }, false);
            };
        });
        return function (spell) {
            return individualFilters.reduce(function (valid, filter) {
                return valid || filter(spell[property]);
            }, false);
        };
    };
    ListComponent.prototype.getComparator = function (property) {
        return function (spell1, spell2) {
            if (!spell1.hasOwnProperty(property) || !spell2.hasOwnProperty(property)) {
                if (property !== '') {
                    console.log("Spell missing property " + property);
                }
                return 0;
            }
            if (spell1[property] === spell2[property]) {
                return 0;
            }
            return (spell1[property] < spell2[property]) ? -1 : 1;
        };
    };
    return ListComponent;
}());
ListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'spell-list',
        template: __webpack_require__(140),
        styles: [__webpack_require__(45)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__spell_service__["a" /* SpellService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__spell_service__["a" /* SpellService */]) === "function" && _a || Object])
], ListComponent);

var _a;
//# sourceMappingURL=list.component.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spell__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewComponent = (function () {
    function ViewComponent() {
    }
    ViewComponent.prototype.formatLevel = function (spell) {
        if (spell.level === undefined || spell.school === undefined) {
            console.log('Undefined level or school in:');
            console.log(spell);
        }
        if (spell.level === 0) {
            return spell.school + " cantrip";
        }
        var suffix = 'th';
        switch (spell.level % 10) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
        }
        return "" + spell.level + suffix + "-level " + spell.school.toLowerCase();
    };
    return ViewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__spell__["a" /* Spell */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__spell__["a" /* Spell */]) === "function" && _a || Object)
], ViewComponent.prototype, "spell", void 0);
ViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'spell-view',
        template: __webpack_require__(141),
        styles: [__webpack_require__(45)]
    })
], ViewComponent);

var _a;
//# sourceMappingURL=view.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[166]);
//# sourceMappingURL=main.bundle.js.map