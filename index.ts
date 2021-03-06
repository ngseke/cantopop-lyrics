import { askKeyword } from './src/askKeyword'
import { searchLyricsOnGoogle } from './src/searchLyricsOnGoogle'
import { searchLyricsOnKkbox } from './src/searchLyricsOnKkbox'
import { fetchPingyam } from './src/fetchPingyam'
import { startAndOpen } from './src/server'

async function run () {
  const keyword = await askKeyword()
  if (!keyword) process.exit(1)

  console.log(`π Searching "${keyword}"...`)
  let lyrics = await searchLyricsOnKkbox(keyword)

  if (!lyrics) {
    console.log(`π Searching "${keyword}"....`)
    lyrics = await searchLyricsOnGoogle(keyword)
  }

  if (!lyrics) {
    console.log('πΆ ζΎδΈε°η΅ζ')
    process.exit()
  }

  console.log('π Converting...')
  const result = await fetchPingyam(lyrics)

  if (result) {
    startAndOpen(keyword, result)
    console.log('β')
  } else {
    console.log('πΆ θ½ζε€±ζ')
  }
}

run()
