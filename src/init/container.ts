import {Container} from "inversify";
import {Environment} from "../config/environment.ts";

export const setupContainer = () => {
    const container = new Container();

    for (const BindClass of [Environment]) {
        container.bind(BindClass).toSelf().inSingletonScope();
    }

    return container;
};
