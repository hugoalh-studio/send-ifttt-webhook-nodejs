import nodeFetch, { type RequestInit, type Response } from "node-fetch";
const iftttMakerEventNameRegExp = /^[\dA-Za-z_]+$/u;
const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const iftttWebhookSendInit: RequestInit = {
	follow: 1,
	headers: {
		"Content-Type": "application/json",
		"User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendIFTTTWebhook/0.1.0`
	},
	method: "POST",
	redirect: "follow"
};
interface IFTTTWebhookConstructorOptions {
	/**
	 * @property arbitraryDefault
	 * @description Define a default value of whether to trigger with an arbitrary payload.
	 * @default false
	 */
	arbitraryDefault?: boolean;
	/**
	 * @property eventNameDefault
	 * @description Define a default value of the event name.
	 * @default undefined
	 */
	eventNameDefault?: string;
}
interface IFTTTWebhookSendOptions {
	/**
	 * @property arbitrary
	 * @description Whether to trigger with an arbitrary payload.
	 * @default arbitraryDefault
	 */
	arbitrary?: boolean;
	/**
	 * @property eventName
	 * @description Event name.
	 * @default eventNameDefault
	 */
	eventName?: string;
	/**
	 * @property payload
	 * @description Payload.
	 * @default {}
	 */
	payload?: object;
}
/**
 * @access private
 * @function $checkEventNamePattern
 * @param {string} value
 * @returns {void}
 */
function $checkEventNamePattern(value: string): void {
	if (!iftttMakerEventNameRegExp.test(value)) {
		throw new SyntaxError(`\`${value}\` is not a valid IFTTT webhook event name!`);
	}
}
/**
 * @class IFTTTWebhook
 * @description Use webhook to connect any of the 750+ apps and integrate other services on IFTTT with your DIY projects. You can create Applets that work with any device or app that can receive a web request.
 */
class IFTTTWebhook {
	#arbitraryDefault = false;
	#eventNameDefault?: string;
	#key: string;
	/**
	 * @constructor
	 * @description Create a new IFTTT webhook instance.
	 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
	 * @param {IFTTTWebhookConstructorOptions} [options={}] Options.
	 */
	constructor(key: string, options: IFTTTWebhookConstructorOptions = {}) {
		if (typeof key !== "string") {
			throw new TypeError(`Argument \`key\` must be type of string!`);
		}
		if (!iftttMakerURLRegExp.test(key)) {
			throw new SyntaxError(`Argument \`key\` is not a valid IFTTT webhook key!`);
		}
		this.#key = key.match(iftttMakerURLRegExp).groups.key;
		if (typeof options.arbitraryDefault === "boolean") {
			this.#arbitraryDefault = options.arbitraryDefault;
		} else if (typeof options.arbitraryDefault !== "undefined") {
			throw new TypeError(`Argument \`options.arbitraryDefault\` must be type of boolean or undefined!`);
		}
		if (typeof options.eventNameDefault === "string") {
			$checkEventNamePattern(options.eventNameDefault);
			this.#eventNameDefault = options.eventNameDefault;
		} else if (typeof options.eventNameDefault !== "undefined") {
			throw new TypeError(`Argument \`options.eventNameDefault\` must be type of string or undefined!`);
		}
	}
	/**
	 * @method send
	 * @description Send an IFTTT webhook.
	 * @param {IFTTTWebhookSendOptions} [options={}] Options.
	 * @returns {Promise<Response>} Response.
	 */
	send(options: IFTTTWebhookSendOptions = {}): Promise<Response> {
		let arbitrary: boolean = this.#arbitraryDefault;
		let eventName: string = this.#eventNameDefault;
		if (typeof options.arbitrary === "boolean") {
			arbitrary = options.arbitrary;
		} else if (typeof options.arbitrary !== "undefined") {
			throw new TypeError(`Argument \`options.arbitrary\` must be type of boolean or undefined!`);
		}
		if (typeof options.eventName === "string") {
			$checkEventNamePattern(options.eventName);
			eventName = options.eventName;
		} else if (typeof options.eventName !== "undefined") {
			throw new TypeError(`Argument \`options.eventName\` must be type of string or undefined!`);
		}
		if (typeof eventName === "undefined") {
			throw new Error(`Event name is not defined and does not have default value!`);
		}
		return nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${this.#key}`, {
			body: JSON.stringify(options.payload ?? {}),
			...iftttWebhookSendInit
		});
	}
	/**
	 * @method sendArbitrary
	 * @description Send an IFTTT webhook with arbitrary payload.
	 * @param {Omit<IFTTTWebhookSendOptions, "arbitrary">} [options={}] Options.
	 * @returns {Promise<Response>} Response.
	 */
	sendArbitrary(options: Omit<IFTTTWebhookSendOptions, "arbitrary"> = {}): Promise<Response> {
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
	static send(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "eventName"> = {}): Promise<Response> {
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
	static sendArbitrary(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName"> = {}): Promise<Response> {
		return new this(key).sendArbitrary({
			...options,
			eventName
		});
	}
}
/**
 * @function send
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {Omit<IFTTTWebhookSendOptions, "eventName">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
function send(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "eventName"> = {}): Promise<Response> {
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
function sendArbitrary(key: string, eventName: string, options: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName"> = {}): Promise<Response> {
	return new IFTTTWebhook(key).sendArbitrary({
		...options,
		eventName
	});
}
export default IFTTTWebhook;
export {
	IFTTTWebhook,
	send,
	sendArbitrary,
	type IFTTTWebhookConstructorOptions,
	type IFTTTWebhookSendOptions
};
