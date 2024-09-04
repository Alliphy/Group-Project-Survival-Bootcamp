import { db } from "../config/db.js";
import Client from "../models/client.js";

await db.sync({force: true});

const testUser = await Client.create({
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
    instructor: "Ellen Ripley",
})