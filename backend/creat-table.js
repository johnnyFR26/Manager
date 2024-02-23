import { sql } from "../db.js";

sql`
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    checklist TEXT[],
    observation TEXT
);
`.then(() => {
    console.log("created table!")
})