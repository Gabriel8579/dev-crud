export class Pagination<T> {
   data: T[]
   total: number
   page_total: number

   constructor(data: T[], total) {
      this.data = data
      this.total = total
      this.page_total = data.length
   }
}