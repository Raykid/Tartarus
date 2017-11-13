"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = require("../../dist/core/injector/Injector");
const Core_1 = require("../../dist/core/Core");
const Injector_2 = require("../../dist/engine/injector/Injector");
const SystemUtil_1 = require("../../dist/utils/SystemUtil");
const Engine_1 = require("../../dist/engine/Engine");
let Mod1 = class Mod1 {
    async exec(ctx) {
        console.log("before sleep. " + new Date().toTimeString());
        await SystemUtil_1.sleep(2000);
        console.log(this._engine);
        Core_1.core.dispatch("fuck", 1);
        console.log("after sleep. " + new Date().toTimeString());
        // 这里返回值
        ctx.body = "This is Mod1!!!";
    }
    async onFuck() {
        await SystemUtil_1.sleep(2000);
        console.log(arguments[0]);
    }
};
__decorate([
    Injector_1.Inject,
    __metadata("design:type", Engine_1.default)
], Mod1.prototype, "_engine", void 0);
__decorate([
    Injector_1.MessageHandler("fuck"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Mod1.prototype, "onFuck", null);
Mod1 = __decorate([
    Injector_2.ModuleClass
], Mod1);
exports.default = Mod1;
//# sourceMappingURL=mod1.js.map