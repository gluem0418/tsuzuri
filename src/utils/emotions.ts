export const emotions = {
  1: 'ワクワク',
  2: '嬉しい',
  3: '感謝',
  4: '満足',
  5: '楽しい',
  6: '面白い',
  7: '興味',
  8: '好き',
  9: '穏やか',
  10: '安心',
  11: 'ドキドキ',
  12: 'スッキリ',
  13: '幸せ',
  14: '感動',
  101: 'モヤモヤ',
  102: '退屈',
  103: '孤独',
  104: 'がっかり',
  105: '混乱',
  106: '嫉妬',
  107: '罪悪感',
  108: '恥ずかしい',
  109: 'イライラ',
  110: '後悔',
  111: '緊張',
  112: '悲しい',
  113: '疲れた',
  114: '不安',
  115: '怖い',
  116: '怒り',
  117: '嫌い',
  118: '辛い',
  119: '苦しい',
} as const;

export type EmotionId = keyof typeof emotions;
export type EmotionName = typeof emotions[EmotionId];

export const getEmotionName = (id: EmotionId): EmotionName => {
  return emotions[id];
};

export const getEmotionNames = (ids: EmotionId[]): EmotionName[] => {
  return ids.map((id) => getEmotionName(id));
};