import {setupContainer} from "./init/container.ts";
import {initializeSequelize} from "@app/init/database.ts";

const container = setupContainer();
await initializeSequelize(container);
