export interface TasksInterface {
  $createdAt: string
  $updatedAt: string
  $id: string
  $sequence: number
  $tableId: string
  $databaseId: string
  isCompleted: boolean
  task: string
  $permissions: string[]
}
