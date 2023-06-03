import { type Response } from "node-fetch";
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
 * @class IFTTTWebhook
 * @description Use webhook to connect any of the 750+ apps and integrate other services on IFTTT with your DIY projects. You can create Applets that work with any device or app that can receive a web request.
 */
declare class IFTTTWebhook {
    #private;
    /**
     * @constructor
     * @description Create a new IFTTT webhook instance.
     * @param {string} key IFTTT webhook key/URL. (Format: `"ifttt-webhook-key"` or `"https://maker.ifttt.com/use/ifttt-webhook-key"`)
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
     * @param {string} key IFTTT webhook key/URL. (Format: `"ifttt-webhook-key"` or `"https://maker.ifttt.com/use/ifttt-webhook-key"`)
     * @param {IFTTTWebhookSendOptions} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static send(key: string, options?: IFTTTWebhookSendOptions): Promise<Response>;
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} key IFTTT webhook key/URL. (Format: `"ifttt-webhook-key"` or `"https://maker.ifttt.com/use/ifttt-webhook-key"`)
     * @param {Omit<IFTTTWebhookSendOptions, "arbitrary">} [options={}] Options.
     * @returns {Promise<Response>} Response.
     */
    static sendArbitrary(key: string, options?: Omit<IFTTTWebhookSendOptions, "arbitrary">): Promise<Response>;
}
/**
 * @function send
 * @description Send an IFTTT webhook.
 * @param {string} key IFTTT webhook key/URL. (Format: `"ifttt-webhook-key"` or `"https://maker.ifttt.com/use/ifttt-webhook-key"`)
 * @param {IFTTTWebhookSendOptions} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
declare function send(key: string, options?: IFTTTWebhookSendOptions): Promise<Response>;
/**
 * @function sendArbitrary
 * @description Send an IFTTT webhook with arbitrary payload.
 * @param {string} key IFTTT webhook key/URL. (Format: `"ifttt-webhook-key"` or `"https://maker.ifttt.com/use/ifttt-webhook-key"`)
 * @param {Omit<IFTTTWebhookSendOptions, "arbitrary">} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
declare function sendArbitrary(key: string, options?: Omit<IFTTTWebhookSendOptions, "arbitrary">): Promise<Response>;
export default IFTTTWebhook;
export { IFTTTWebhook, send, sendArbitrary, type IFTTTWebhookConstructorOptions, type IFTTTWebhookSendOptions };
//# sourceMappingURL=main.d.ts.map