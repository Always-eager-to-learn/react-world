import { Client, TablesDB } from "appwrite"

const client = new Client()
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const databases = new TablesDB(client)

export { client, databases }
