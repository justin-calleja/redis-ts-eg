declare module "repl" {
  import * as events from "events";

  interface ReplEventEmitter extends events.EventEmitter {
    context: any;
  }

  export function start(options: ReplOptions): ReplEventEmitter;
}
