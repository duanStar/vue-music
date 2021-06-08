import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map(item => item.mid)
  }).then(res => {
    const map = res.map
    return songs.map(item => {
      item.url = map[item.mid]
      return item
    }).filter(item => {
      // 过滤出可以播放的音乐
      return item.url && item.url.indexOf('vkey') !== -1
    })
  })
}

const lyricMap = {}

export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  // 可能不同的song对象mid是相同的
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then(res => {
    const lyric = res ? res.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
