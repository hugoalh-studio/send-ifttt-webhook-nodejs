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
var _IFTTTWebhook_instances, _IFTTTWebhook_key, _IFTTTWebhook_sender;
import nodeFetch from "node-fetch";
const iftttMakerEventNameRegExp = /^[\dA-Za-z_]+$/u;
const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const iftttWebhookSendInit = {
    follow: 1,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendIFTTTWebhook/0.2.0`
    },
    method: "POST",
    redirect: "follow"
};
/**
 * @access private
 * @function $checkEventName
 * @param {string} value
 * @returns {void}
 */
function $checkEventName(value) {
    if (typeof value !== "string") {
        throw new TypeError(`Argument \`eventName\` must be type of string!`);
    }
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
     */
    constructor(key) {
        _IFTTTWebhook_instances.add(this);
        _IFTTTWebhook_key.set(this, void 0);
        if (typeof key !== "string") {
            throw new TypeError(`Argument \`key\` must be type of string!`);
        }
        if (!iftttMakerURLRegExp.test(key)) {
            throw new SyntaxError(`Argument \`key\` is not a valid IFTTT webhook key!`);
        }
        __classPrivateFieldSet(this, _IFTTTWebhook_key, key.match(iftttMakerURLRegExp).groups.key, "f");
    }
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} eventName Event name.
     * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    send(eventName, payload = {}) {
        $checkEventName(eventName);
        if (!(typeof payload === "object" && payload !== null)) {
            throw new TypeError(`Argument \`payload\` must be type of object or undefined!`);
        }
        return __classPrivateFieldGet(this, _IFTTTWebhook_instances, "m", _IFTTTWebhook_sender).call(this, {
            arbitrary: false,
            eventName,
            payload
        });
    }
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} eventName Event name.
     * @param {object} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    sendArbitrary(eventName, payload = {}) {
        $checkEventName(eventName);
        if (!(typeof payload === "object" && payload !== null)) {
            throw new TypeError(`Argument \`payload\` must be type of object or undefined!`);
        }
        return __classPrivateFieldGet(this, _IFTTTWebhook_instances, "m", _IFTTTWebhook_sender).call(this, {
            arbitrary: true,
            eventName,
            payload
        });
    }
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    static send(key, eventName, payload = {}) {
        return new this(key).send(eventName, payload);
    }
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {object} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    static sendArbitrary(key, eventName, payload = {}) {
        return new this(key).sendArbitrary(eventName, payload);
    }
}
_IFTTTWebhook_key = new WeakMap(), _IFTTTWebhook_instances = new WeakSet(), _IFTTTWebhook_sender = function _IFTTTWebhook_sender({ arbitrary = false, eventName, payload }) {
    return nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${__classPrivateFieldGet(this, _IFTTTWebhook_key, "f")}`, {
        body: JSON.stringify(payload),
        ...iftttWebhookSendInit
    });
};
/**
 * @function sendIFTTTWebhook
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
 * @returns {Promise<Response>} Response.
 */
function sendIFTTTWebhook(key, eventName, payload = {}) {
    return new IFTTTWebhook(key).send(eventName, payload);
}
/**
 * @function sendIFTTTWebhookArbitrary
 * @description Send an IFTTT webhook with arbitrary payload.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {object} [payload={}] Payload.
 * @returns {Promise<Response>} Response.
 */
function sendIFTTTWebhookArbitrary(key, eventName, payload = {}) {
    return new IFTTTWebhook(key).sendArbitrary(eventName, payload);
}
export default IFTTTWebhook;
export { iftttMakerEventNameRegExp, iftttMakerURLRegExp, IFTTTWebhook, sendIFTTTWebhook, sendIFTTTWebhookArbitrary };
