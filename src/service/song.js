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
      return item.url.indexOf('vkey') !== -1
    })
  })
}
