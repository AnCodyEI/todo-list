import { Sequelize } from '@sequelize/core';
import { Container } from "inversify";
import { Environment } from "@app/config/environment.ts";

export const initializeSequelize = async (container: Container) => {
    const sequelize = new Sequelize({
        dialect: 'mariadb',
        url: container.get(Environment).getDbURL(),
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
