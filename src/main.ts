import nodeFetch, { type RequestInit, type Response } from "node-fetch";
type IFTTTWebhookStandardPayload = {
	value1?: string;
	value2?: string;
	value3?: string;
};
const iftttMakerEventNameRegExp = /^[\dA-Za-z_]+$/u;
const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const iftttWebhookSendInit: RequestInit = {
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
function $checkEventName(value: string): void {
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
	#key: string;
	/**
	 * @constructor
	 * @description Create a new IFTTT webhook instance.
	 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
	 */
	constructor(key: string) {
		if (typeof key !== "string") {
			throw new TypeError(`Argument \`key\` must be type of string!`);
		}
		if (!iftttMakerURLRegExp.test(key)) {
			throw new SyntaxError(`Argument \`key\` is not a valid IFTTT webhook key!`);
		}
		this.#key = key.match(iftttMakerURLRegExp).groups.key;
	}
	/**
	 * @access private
	 * @method #sender
	 * @returns {Promise<Response>} Response.
	 */
	#sender({
		arbitrary = false,
		eventName,
		payload
	}: {
		arbitrary?: boolean;
		eventName: string;
		payload: object;
	}): Promise<Response> {
		return nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${this.#key}`, {
			body: JSON.stringify(payload),
			...iftttWebhookSendInit
		});
	}
	/**
	 * @method send
	 * @description Send an IFTTT webhook.
	 * @param {string} eventName Event name.
	 * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
	 * @returns {Promise<Response>} Response.
	 */
	send(eventName: string, payload: IFTTTWebhookStandardPayload = {}): Promise<Response> {
		$checkEventName(eventName);
		if (!(typeof payload === "object" && payload !== null)) {
			throw new TypeError(`Argument \`payload\` must be type of object or undefined!`);
		}
		return this.#sender({
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
	sendArbitrary(eventName: string, payload: object = {}): Promise<Response> {
		$checkEventName(eventName);
		if (!(typeof payload === "object" && payload !== null)) {
			throw new TypeError(`Argument \`payload\` must be type of object or undefined!`);
		}
		return this.#sender({
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
	static send(key: string, eventName: string, payload: IFTTTWebhookStandardPayload = {}): Promise<Response> {
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
	static sendArbitrary(key: string, eventName: string, payload: object = {}): Promise<Response> {
		return new this(key).sendArbitrary(eventName, payload);
	}
}
/**
 * @function sendIFTTTWebhook
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
 * @returns {Promise<Response>} Response.
 */
function sendIFTTTWebhook(key: string, eventName: string, payload: IFTTTWebhookStandardPayload = {}): Promise<Response> {
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
function sendIFTTTWebhookArbitrary(key: string, eventName: string, payload: object = {}): Promise<Response> {
	return new IFTTTWebhook(key).sendArbitrary(eventName, payload);
}
export default IFTTTWebhook;
export {
	iftttMakerEventNameRegExp,
	iftttMakerURLRegExp,
	IFTTTWebhook,
	sendIFTTTWebhook,
	sendIFTTTWebhookArbitrary,
	type IFTTTWebhookStandardPayload
};
