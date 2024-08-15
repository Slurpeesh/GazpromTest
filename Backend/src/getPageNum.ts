import csvParser from 'csv-parser'
import fs from 'fs'

export function getPageNum(
  filePath: string,
  itemsPerPage: number
): Promise<number> {
  return new Promise((resolve, reject) => {
    let lineCount = 0

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row.ecrlongname !== 'DO NOT USE') {
          lineCount += 1
        }
      })
      .on('end', () => {
        resolve(Math.ceil(lineCount / itemsPerPage))
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}
