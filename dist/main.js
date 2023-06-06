var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IFTTTWebhook_arbitraryDefault, _IFTTTWebhook_eventNameDefault, _IFTTTWebhook_key;
import nodeFetch from "node-fetch";
const iftttMakerEventNameRegExp = /^[\dA-Za-z_]+$/u;
const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const iftttWebhookSendInit = {
    follow: 1,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendIFTTTWebhook/0.1.0`
    },
    method: "POST",
    redirect: "follow"
};
/**
 * @access private
 * @function $checkEventNamePattern
 * @param {string} value
 * @returns {void}
 */
function $checkEventNamePattern(value) {
    if (!iftttMakerEventNameRegExp.test(value)) {
        throw new SyntaxError(`\`${value}\` is not a valid IFTTT webhook event name!`);
    }
}
/**
 * @class IFTTTWebhook
 * @description Use webhook to connect any of the 750+ apps and integrate other services on IFTTT with your DIY projects. You can create Applets that work with any device or app that can receive a web request.
 */
class IFTTTWebhook {
    /**
     * @constructor
     * @description Create a new IFTTT webhook instance.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {IFTTTWebhookConstructorOptions} [options={}] Options.
     */
    constructor(key, options = {}) {
        _IFTTTWebhook_arbitraryDefault.set(this, false);
        _IFTTTWebhook_eventNameDefault.set(this, void 0);
        _IFTTTWebhook_key.set(this, void 0);
        if (typeof key !== "string") {
            throw new TypeError(`Argument \`key\` must be type of string!`);
        }
        if (!iftttMakerURLRegExp.test(key)) {
            throw new SyntaxError(`Argument \`key\` is not a valid IFTTT webhook key!`);
        }
        __classPrivateFieldSet(this, _IFTTTWebhook_key, key.match(iftttMakerURLRegExp).groups.key, "f");
        if (typeof options.arbitraryDefault === "boolean") {
            __classPrivateFieldSet(this, _IFTTTWebhook_arbitraryDefault, options.arbitraryDefault, "f");
        }
        else if (typeof options.arbitraryDefault !== "undefined") {
            throw new TypeError(`Argument \`options.arbitraryDefault\` must be type of boolean or undefined!`);
        }
        if (typeof options.eventNameDefault === "string") {
            $checkEventNamePattern(options.eventNameDefault);
            __classPrivateFieldSet(this, _IFTTTWebhook_eventNameDefault, options.eventNameDefault, "f");
        }
        else if (typeof options.eventNameDefault !== "undefined") {
            throw new TypeError(`Argument \`options.eventNameDefault\` must be type of string or undefined!`);
        }
    }
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {IFTTTWebhookSendOptions} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    send(options = {}) {
        var _a;
        let arbitrary = __classPrivateFieldGet(this, _IFTTTWebhook_arbitraryDefault, "f");
        let eventName = __classPrivateFieldGet(this, _IFTTTWebhook_eventNameDefault, "f");
        if (typeof options.arbitrary === "boolean") {
            arbitrary = options.arbitrary;
        }
        else if (typeof options.arbitrary !== "undefined") {
            throw new TypeError(`Argument \`options.arbitrary\` must be type of boolean or undefined!`);
        }
        if (typeof options.eventName === "string") {
            $checkEventNamePattern(options.eventName);
            eventName = options.eventName;
        }
        else if (typeof options.eventName !== "undefined") {
            throw new TypeError(`Argument \`options.eventName\` must be type of string or undefined!`);
        }
        if (typeof eventName === "undefined") {
            throw new Error(`Event name is not defined and does not have default value!`);
        }
        return nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${__classPrivateFieldGet(this, _IFTTTWebhook_key, "f")}`, {
            body: JSON.stringify((_a = options.payload) !== null && _a !== void 0 ? _a : {}),
            ...iftttWebhookSendInit
        });
    }
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {Omit<IFTTTWebhookSendOptions, "arbitrary">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    sendArbitrary(options = {}) {
        return this.send({
            ...options,
            arbitrary: true
        });
    }
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {Omit<IFTTTWebhookSendOptions, "eventName">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static send(key, eventName, options = {}) {
        return new this(key).send({
            ...options,
            eventName
        });
    }
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static sendArbitrary(key, eventName, options = {}) {
        return new this(key).sendArbitrary({
            ...options,
            eventName
        });
    }
}
_IFTTTWebhook_arbitraryDefault = new WeakMap(), _IFTTTWebhook_eventNameDefault = new WeakMap(), _IFTTTWebhook_key = new WeakMap();
/**
 * @function send
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {Omit<IFTTTWebhookSendOptions, "eventName">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
function send(key, eventName, options = {}) {
    return new IFTTTWebhook(key).send({
        ...options,
        eventName
    });
}
/**
 * @function sendArbitrary
 * @description Send an IFTTT webhook with arbitrary payload.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
function sendArbitrary(key, eventName, options = {}) {
    return new IFTTTWebhook(key).sendArbitrary({
        ...options,
        eventName
    });
}
export default IFTTTWebhook;
export { IFTTTWebhook, send, sendArbitrary };
