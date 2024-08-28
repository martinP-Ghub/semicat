import { setupWorker } from "msw/browser";
import { UserHandlers } from "./UserHandlers";
import { ProjectHandlers } from "./ProjectHandlers";

export const worker = setupWorker(...UserHandlers, ...ProjectHandlers);

