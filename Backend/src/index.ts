import cors from 'cors'
import csvParser from 'csv-parser'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { getPageNum } from './getPageNum'

const filePath = path.resolve(__dirname, 'article_def_v_orig.csv')
const CHUNK_SIZE = 10

const pagesAmount = getPageNum(filePath, CHUNK_SIZE)

const PORT = process.env.port || '5000'

const app = express()

app.use(cors())

function processChunk(chunk: Array<any>) {
  for (let i = 0; i < chunk.length; i++) {
    chunk[i] = {
      articleid: chunk[i].articleid,
      subarticleid: chunk[i].subarticleid,
      articlename: chunk[i].articlename,
      external_str_id: chunk[i].external_str_id,
      ecrlongname: chunk[i].ecrlongname,
    }
  }
}

app.get('/', (req, res) => {
  const page = Number(req.query.page) ?? 1
  const startIndex = CHUNK_SIZE * page - CHUNK_SIZE
  const endIndex = startIndex + CHUNK_SIZE
  let buffer: any[] = []
  let rowCount = 0
  const readStream = fs
    .createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      if (row.ecrlongname !== 'DO NOT USE') {
        if (rowCount >= startIndex && rowCount < endIndex) {
          buffer.push(row)
        }
        rowCount += 1

        if (rowCount === endIndex) {
          processChunk(buffer)
          readStream.destroy() // Прекращение чтения после обработки первых 20 строк
        }
      }
    })
    .on('close', () => {
      if (buffer.length > 0 && rowCount < endIndex) {
        processChunk(buffer) // обработка оставшихся строк, если их меньше 20
      }
      console.log('CSV file successfully processed')
      res.json(buffer)
      res.status(200)
    })
    .on('error', (error) => {
      console.error('Error while reading CSV file:', error)
    })
})

app.get('/pagesAmount', (req, res) => {
  pagesAmount.then((num) => {
    res.send({ pagesAmount: num })
    res.status(200)
  })
})

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
