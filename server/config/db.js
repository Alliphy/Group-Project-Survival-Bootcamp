import { Sequelize } from "sequelize";
import "dotenv/config.js";

async function connectToPostgres(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: false, // set logging: false to disable outputting SQL queries to console
    define: {
      underscored: true,
      timestamps: false,
    },
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.RENDER_PG_URL
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }

  return sequelize;
}

export const db = await connectToPostgres(
  process.env.RENDER_PG_URL || "postgresql:///stinc"
);
