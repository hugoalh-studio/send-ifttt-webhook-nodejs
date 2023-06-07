import { type Response } from "node-fetch";
declare const iftttMakerEventNameRegExp: RegExp;
declare const iftttMakerURLRegExp: RegExp;
interface IFTTTWebhookConstructorOptions {
    /**
     * @property arbitraryDefault
     * @description Define a default value of whether to send with an arbitrary payload.
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
     * @description Whether to send with an arbitrary payload.
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
 * @class IFTTTWebhook
 * @description Use webhook to connect any of the 750+ apps and integrate other services on IFTTT with your DIY projects. You can create Applets that work with any device or app that can receive a web request.
 */
declare class IFTTTWebhook {
    #private;
    /**
     * @constructor
     * @description Create a new IFTTT webhook instance.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {IFTTTWebhookConstructorOptions} [options={}] Options.
     */
    constructor(key: string, options?: IFTTTWebhookConstructorOptions);
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {IFTTTWebhookSendOptions} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    send(options?: IFTTTWebhookSendOptions): Promise<Response>;
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {Omit<IFTTTWebhookSendOptions, "arbitrary">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    sendArbitrary(options?: Omit<IFTTTWebhookSendOptions, "arbitrary">): Promise<Response>;
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {Omit<IFTTTWebhookSendOptions, "eventName">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static send(key: string, eventName: string, options?: Omit<IFTTTWebhookSendOptions, "eventName">): Promise<Response>;
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static sendArbitrary(key: string, eventName: string, options?: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">): Promise<Response>;
}
/**
 * @function sendIFTTTWebhook
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {Omit<IFTTTWebhookSendOptions, "eventName">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
declare function sendIFTTTWebhook(key: string, eventName: string, options?: Omit<IFTTTWebhookSendOptions, "eventName">): Promise<Response>;
/**
 * @function sendIFTTTWebhookArbitrary
 * @description Send an IFTTT webhook with arbitrary payload.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
declare function sendIFTTTWebhookArbitrary(key: string, eventName: string, options?: Omit<IFTTTWebhookSendOptions, "arbitrary" | "eventName">): Promise<Response>;
export default IFTTTWebhook;
export { iftttMakerEventNameRegExp, iftttMakerURLRegExp, IFTTTWebhook, sendIFTTTWebhook, sendIFTTTWebhookArbitrary, type IFTTTWebhookConstructorOptions, type IFTTTWebhookSendOptions };
//# sourceMappingURL=main.d.ts.map