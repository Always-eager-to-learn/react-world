// import { databases } from "./config-appwrite"
// import { type TasksInterface } from "../../types/TaskTypes"
// import { type Models, ID } from "appwrite"

// interface CollectionFunction<T> {
//   list: (queries?: string[]) => Promise<Models.RowList<TableTypes>>
//   create: (payload: T, id: string) => Promise<Models.DefaultRow>
// }

// type TableTypes = TasksInterface

// interface Database<T> {
//   [name: string]: CollectionFunction<T>
// }

// function createCollection<T extends Models.Row>(
//   collectionName: string,
// ): CollectionFunction<TableTypes> {
//   return {
//     list: (queries?: string[]) =>
//       databases.listRows<Models.RowList<TableTypes>>({
//         databaseId: databaseId,
//         tableId: collectionName,
//         queries: queries,
//       }),

//     create: (payload: T, id = ID.unique()) =>
//       databases.createRow({
//         databaseId: databaseId,
//         tableId: collectionName,
//         rowId: id,
//         data: {},
//       }),
//   }
// }

// const databaseId = import.meta.env.VITE_DATABASE_ID

// const collectionsId: Database = {
//   tasks: createCollection<TasksInterface>(
//     import.meta.env.VITE_COLLECTION_ID_TASKS,
//   ),
// }
