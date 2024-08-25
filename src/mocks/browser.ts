import { setupWorker } from "msw/browser";
import { UserHandlers } from "./UserHandlers";

export const worker = setupWorker(...UserHandlers);
