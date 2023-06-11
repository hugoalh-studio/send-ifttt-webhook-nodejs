import { type Response } from "node-fetch";
interface IFTTTWebhookStandardPayload {
    value1?: string;
    value2?: string;
    value3?: string;
}
declare const iftttMakerEventNameRegExp: RegExp;
declare const iftttMakerURLRegExp: RegExp;
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
     */
    constructor(key: string);
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} eventName Event name.
     * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    send(eventName: string, payload?: IFTTTWebhookStandardPayload): Promise<Response>;
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} eventName Event name.
     * @param {object} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    sendArbitrary(eventName: string, payload?: object): Promise<Response>;
    /**
     * @method send
     * @description Send an IFTTT webhook.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    static send(key: string, eventName: string, payload?: IFTTTWebhookStandardPayload): Promise<Response>;
    /**
     * @method sendArbitrary
     * @description Send an IFTTT webhook with arbitrary payload.
     * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
     * @param {string} eventName Event name.
     * @param {object} [payload={}] Payload.
     * @returns {Promise<Response>} Response.
     */
    static sendArbitrary(key: string, eventName: string, payload?: object): Promise<Response>;
}
/**
 * @function sendIFTTTWebhook
 * @description Send an IFTTT webhook.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {IFTTTWebhookStandardPayload} [payload={}] Payload.
 * @returns {Promise<Response>} Response.
 */
declare function sendIFTTTWebhook(key: string, eventName: string, payload?: IFTTTWebhookStandardPayload): Promise<Response>;
/**
 * @function sendIFTTTWebhookArbitrary
 * @description Send an IFTTT webhook with arbitrary payload.
 * @param {string} key Key (`"ifttt-webhook-key"`), or URL (`"https://maker.ifttt.com/use/ifttt-webhook-key"`).
 * @param {string} eventName Event name.
 * @param {object} [payload={}] Payload.
 * @returns {Promise<Response>} Response.
 */
declare function sendIFTTTWebhookArbitrary(key: string, eventName: string, payload?: object): Promise<Response>;
export default IFTTTWebhook;
export { iftttMakerEventNameRegExp, iftttMakerURLRegExp, IFTTTWebhook, sendIFTTTWebhook, sendIFTTTWebhookArbitrary, type IFTTTWebhookStandardPayload };
//# sourceMappingURL=main.d.ts.map