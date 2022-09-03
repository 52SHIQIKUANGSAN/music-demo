//统一的出口
import { recommendMusic, newsMusic } from '@/api/Home'
import { hotSerach, searchResult } from '@/api/Search.js'
import { getSongById, getLyricById } from '@/api/Play'
import { getCommentList } from '@/api/Comment'
export const recommendMusicAPI = recommendMusic
export const newsMusicAPI = newsMusic

export const hotSerachAPI = hotSerach
export const searchResultAPI = searchResult

export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById

export const getCommentListAPI = getCommentList
