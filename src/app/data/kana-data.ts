import { KanaItem } from '../models/japanese.models';

export const HIRAGANA_DATA: KanaItem[] = [
  // Fila A
  { id: 'h-a', type: 'hiragana', char: 'あ', romaji: 'a', group: 'basic', row: 'a' },
  { id: 'h-i', type: 'hiragana', char: 'い', romaji: 'i', group: 'basic', row: 'a' },
  { id: 'h-u', type: 'hiragana', char: 'u', romaji: 'u', group: 'basic', row: 'a' },
  { id: 'h-e', type: 'hiragana', char: 'え', romaji: 'e', group: 'basic', row: 'a' },
  { id: 'h-o', type: 'hiragana', char: 'お', romaji: 'o', group: 'basic', row: 'a' },

  // Fila Ka
  { id: 'h-ka', type: 'hiragana', char: 'か', romaji: 'ka', group: 'basic', row: 'ka' },
  { id: 'h-ki', type: 'hiragana', char: 'き', romaji: 'ki', group: 'basic', row: 'ka' },
  { id: 'h-ku', type: 'hiragana', char: 'く', romaji: 'ku', group: 'basic', row: 'ka' },
  { id: 'h-ke', type: 'hiragana', char: 'け', romaji: 'ke', group: 'basic', row: 'ka' },
  { id: 'h-ko', type: 'hiragana', char: 'こ', romaji: 'ko', group: 'basic', row: 'ka' },

  // Fila Sa (con excepción shi)
  { id: 'h-sa', type: 'hiragana', char: 'さ', romaji: 'sa', group: 'basic', row: 'sa' },
  {
    id: 'h-shi',
    type: 'hiragana',
    char: 'し',
    romaji: 'shi',
    group: 'basic',
    row: 'sa',
    isException: true,
    exceptionNote: 'Excepción fonética: En la fila Sa no existe "si", se pronuncia siempre SHI (como "she" en inglés).'
  },
  { id: 'h-su', type: 'hiragana', char: 'す', romaji: 'su', group: 'basic', row: 'sa' },
  { id: 'h-se', type: 'hiragana', char: 'せ', romaji: 'se', group: 'basic', row: 'sa' },
  { id: 'h-so', type: 'hiragana', char: 'そ', romaji: 'so', group: 'basic', row: 'sa' },

  // Fila Ta (con excepciones chi y tsu)
  { id: 'h-ta', type: 'hiragana', char: 'た', romaji: 'ta', group: 'basic', row: 'ta' },
  {
    id: 'h-chi',
    type: 'hiragana',
    char: 'ち',
    romaji: 'chi',
    group: 'basic',
    row: 'ta',
    isException: true,
    exceptionNote: 'Excepción fonética: En la fila Ta no existe "ti", se pronuncia siempre CHI (como "ch" en español).'
  },
  {
    id: 'h-tsu',
    type: 'hiragana',
    char: 'つ',
    romaji: 'tsu',
    group: 'basic',
    row: 'ta',
    isException: true,
    exceptionNote: 'Excepción fonética: En la fila Ta no existe "tu", se pronuncia siempre TSU (sonido "ts").'
  },
  { id: 'h-te', type: 'hiragana', char: 'て', romaji: 'te', group: 'basic', row: 'ta' },
  { id: 'h-to', type: 'hiragana', char: 'と', romaji: 'to', group: 'basic', row: 'ta' },

  // Fila Na
  { id: 'h-na', type: 'hiragana', char: 'な', romaji: 'na', group: 'basic', row: 'na' },
  { id: 'h-ni', type: 'hiragana', char: 'に', romaji: 'ni', group: 'basic', row: 'na' },
  { id: 'h-nu', type: 'hiragana', char: 'ぬ', romaji: 'nu', group: 'basic', row: 'na' },
  { id: 'h-ne', type: 'hiragana', char: 'ね', romaji: 'ne', group: 'basic', row: 'na' },
  { id: 'h-no', type: 'hiragana', char: 'の', romaji: 'no', group: 'basic', row: 'na' },

  // Fila Ha (con excepción fu y regla de partícula wa)
  {
    id: 'h-ha',
    type: 'hiragana',
    char: 'は',
    romaji: 'ha / wa',
    group: 'basic',
    row: 'ha',
    isException: true,
    exceptionNote: 'Excepción de partícula: Como palabra se lee HA, pero cuando actúa como partícula de tema se pronuncia WA (ej. わたしは = watashi wa).'
  },
  { id: 'h-hi', type: 'hiragana', char: 'ひ', romaji: 'hi', group: 'basic', row: 'ha' },
  {
    id: 'h-fu',
    type: 'hiragana',
    char: 'ふ',
    romaji: 'fu',
    group: 'basic',
    row: 'ha',
    isException: true,
    exceptionNote: 'Excepción fonética: No es "hu". Se pronuncia FU con soplo suave bilabial sin tocar los dientes inferiores.'
  },
  {
    id: 'h-he',
    type: 'hiragana',
    char: 'へ',
    romaji: 'he / e',
    group: 'basic',
    row: 'ha',
    isException: true,
    exceptionNote: 'Excepción de partícula: Como palabra se lee HE, pero cuando actúa como partícula de dirección se pronuncia E (ej. 日本へ = Nihon e).'
  },
  { id: 'h-ho', type: 'hiragana', char: 'ほ', romaji: 'ho', group: 'basic', row: 'ha' },

  // Fila Ma
  { id: 'h-ma', type: 'hiragana', char: 'ま', romaji: 'ma', group: 'basic', row: 'ma' },
  { id: 'h-mi', type: 'hiragana', char: 'み', romaji: 'mi', group: 'basic', row: 'ma' },
  { id: 'h-mu', type: 'hiragana', char: 'む', romaji: 'mu', group: 'basic', row: 'ma' },
  { id: 'h-me', type: 'hiragana', char: 'め', romaji: 'me', group: 'basic', row: 'ma' },
  { id: 'h-mo', type: 'hiragana', char: 'も', romaji: 'mo', group: 'basic', row: 'ma' },

  // Fila Ya (solo 3 vocales)
  { id: 'h-ya', type: 'hiragana', char: 'や', romaji: 'ya', group: 'basic', row: 'ya' },
  { id: 'h-yu', type: 'hiragana', char: 'ゆ', romaji: 'yu', group: 'basic', row: 'ya' },
  { id: 'h-yo', type: 'hiragana', char: 'よ', romaji: 'yo', group: 'basic', row: 'ya' },

  // Fila Ra
  { id: 'h-ra', type: 'hiragana', char: 'ら', romaji: 'ra', group: 'basic', row: 'ra' },
  { id: 'h-ri', type: 'hiragana', char: 'り', romaji: 'ri', group: 'basic', row: 'ra' },
  { id: 'h-ru', type: 'hiragana', char: 'る', romaji: 'ru', group: 'basic', row: 'ra' },
  { id: 'h-re', type: 'hiragana', char: 'れ', romaji: 're', group: 'basic', row: 'ra' },
  { id: 'h-ro', type: 'hiragana', char: 'ろ', romaji: 'ro', group: 'basic', row: 'ra' },

  // Fila Wa & N
  { id: 'h-wa', type: 'hiragana', char: 'わ', romaji: 'wa', group: 'basic', row: 'wa' },
  {
    id: 'h-wo',
    type: 'hiragana',
    char: 'を',
    romaji: 'o (wo)',
    group: 'basic',
    row: 'wa',
    isException: true,
    exceptionNote: 'Excepción fonética: Se escribe wo pero en japonés actual se pronuncia O. Se reserva exclusivamente como partícula de objeto directo.'
  },
  {
    id: 'h-n',
    type: 'hiragana',
    char: 'ん',
    romaji: 'n',
    group: 'basic',
    row: 'n',
    isException: true,
    exceptionNote: 'Excepción estructural: Es la única consonante que puede pronunciarse y escribirse sola sin vocal acompañante.'
  },

  // Dakuten (consonantes sonoras ゛)
  { id: 'h-ga', type: 'hiragana', char: 'が', romaji: 'ga', group: 'dakuten', row: 'ga' },
  { id: 'h-gi', type: 'hiragana', char: 'ぎ', romaji: 'gi', group: 'dakuten', row: 'ga' },
  { id: 'h-gu', type: 'hiragana', char: 'ぐ', romaji: 'gu', group: 'dakuten', row: 'ga' },
  { id: 'h-ge', type: 'hiragana', char: 'げ', romaji: 'ge', group: 'dakuten', row: 'ga' },
  { id: 'h-go', type: 'hiragana', char: 'ご', romaji: 'go', group: 'dakuten', row: 'ga' },

  { id: 'h-za', type: 'hiragana', char: 'ざ', romaji: 'za', group: 'dakuten', row: 'za' },
  {
    id: 'h-ji',
    type: 'hiragana',
    char: 'じ',
    romaji: 'ji',
    group: 'dakuten',
    row: 'za',
    isException: true,
    exceptionNote: 'Excepción de sonido: De さ (sa) sonoriza a じ (JI, como en inglés "jeep").'
  },
  { id: 'h-zu', type: 'hiragana', char: 'ず', romaji: 'zu', group: 'dakuten', row: 'za' },
  { id: 'h-ze', type: 'hiragana', char: 'ぜ', romaji: 'ze', group: 'dakuten', row: 'za' },
  { id: 'h-zo', type: 'hiragana', char: 'ぞ', romaji: 'zo', group: 'dakuten', row: 'za' },

  { id: 'h-da', type: 'hiragana', char: 'だ', romaji: 'da', group: 'dakuten', row: 'da' },
  {
    id: 'h-dji',
    type: 'hiragana',
    char: 'ぢ',
    romaji: 'ji (dji)',
    group: 'dakuten',
    row: 'da',
    isException: true,
    exceptionNote: 'Excepción fonética: Suena idéntico a じ (ji). En la escritura se usa casi siempre じ, salvo casos históricos o duplicaciones.'
  },
  {
    id: 'h-dzu',
    type: 'hiragana',
    char: 'づ',
    romaji: 'zu (dzu)',
    group: 'dakuten',
    row: 'da',
    isException: true,
    exceptionNote: 'Excepción fonética: Suena prácticamente idéntico a ず (zu). Se utiliza en palabras derivadas de つ (ej. つづく).'
  },
  { id: 'h-de', type: 'hiragana', char: 'で', romaji: 'de', group: 'dakuten', row: 'da' },
  { id: 'h-do', type: 'hiragana', char: 'ど', romaji: 'do', group: 'dakuten', row: 'da' },

  { id: 'h-ba', type: 'hiragana', char: 'ば', romaji: 'ba', group: 'dakuten', row: 'ba' },
  { id: 'h-bi', type: 'hiragana', char: 'び', romaji: 'bi', group: 'dakuten', row: 'ba' },
  { id: 'h-bu', type: 'hiragana', char: 'ぶ', romaji: 'bu', group: 'dakuten', row: 'ba' },
  { id: 'h-be', type: 'hiragana', char: 'べ', romaji: 'be', group: 'dakuten', row: 'ba' },
  { id: 'h-bo', type: 'hiragana', char: 'ぼ', romaji: 'bo', group: 'dakuten', row: 'ba' },

  // Handakuten (consonantes semi-sonoras ゜)
  { id: 'h-pa', type: 'hiragana', char: 'ぱ', romaji: 'pa', group: 'handakuten', row: 'pa' },
  { id: 'h-pi', type: 'hiragana', char: 'ぴ', romaji: 'pi', group: 'handakuten', row: 'pa' },
  { id: 'h-pu', type: 'hiragana', char: 'ぷ', romaji: 'pu', group: 'handakuten', row: 'pa' },
  { id: 'h-pe', type: 'hiragana', char: 'ぺ', romaji: 'pe', group: 'handakuten', row: 'pa' },
  { id: 'h-po', type: 'hiragana', char: 'ぽ', romaji: 'po', group: 'handakuten', row: 'pa' },

  // Especiales: Pausa consonántica Sokuon
  {
    id: 'h-sokuon',
    type: 'hiragana',
    char: 'っ',
    romaji: '(pausa consonántica)',
    group: 'special',
    row: 'special',
    isException: true,
    exceptionNote: 'Tsu pequeño (Sokuon): No tiene sonido vocal. Genera una pausa corta y duplica la consonante siguiente (ej. ちょっと = chotto, きって = kitte).'
  }
];

export const KATAKANA_DATA: KanaItem[] = [
  // Fila A
  { id: 'k-a', type: 'katakana', char: 'ア', romaji: 'a', group: 'basic', row: 'a' },
  { id: 'k-i', type: 'katakana', char: 'イ', romaji: 'i', group: 'basic', row: 'a' },
  { id: 'k-u', type: 'katakana', char: 'ウ', romaji: 'u', group: 'basic', row: 'a' },
  { id: 'k-e', type: 'katakana', char: 'エ', romaji: 'e', group: 'basic', row: 'a' },
  { id: 'k-o', type: 'katakana', char: 'オ', romaji: 'o', group: 'basic', row: 'a' },

  // Fila Ka
  { id: 'k-ka', type: 'katakana', char: 'カ', romaji: 'ka', group: 'basic', row: 'ka' },
  { id: 'k-ki', type: 'katakana', char: 'キ', romaji: 'ki', group: 'basic', row: 'ka' },
  { id: 'k-ku', type: 'katakana', char: 'ク', romaji: 'ku', group: 'basic', row: 'ka' },
  { id: 'k-ke', type: 'katakana', char: 'ケ', romaji: 'ke', group: 'basic', row: 'ka' },
  { id: 'k-ko', type: 'katakana', char: 'コ', romaji: 'ko', group: 'basic', row: 'ka' },

  // Fila Sa (con excepción shi)
  { id: 'k-sa', type: 'katakana', char: 'サ', romaji: 'sa', group: 'basic', row: 'sa' },
  {
    id: 'k-shi',
    type: 'katakana',
    char: 'シ',
    romaji: 'shi',
    group: 'basic',
    row: 'sa',
    isException: true,
    exceptionNote: 'Excepción y confusión común: Se pronuncia SHI. ¡Cuidado al escribirlo! Sus trazos van de abajo hacia arriba, a diferencia de ツ (tsu).'
  },
  { id: 'k-su', type: 'katakana', char: 'ス', romaji: 'su', group: 'basic', row: 'sa' },
  { id: 'k-se', type: 'katakana', char: 'セ', romaji: 'se', group: 'basic', row: 'sa' },
  { id: 'k-so', type: 'katakana', char: 'ソ', romaji: 'so', group: 'basic', row: 'sa' },

  // Fila Ta (con excepciones chi y tsu)
  { id: 'k-ta', type: 'katakana', char: 'タ', romaji: 'ta', group: 'basic', row: 'ta' },
  {
    id: 'k-chi',
    type: 'katakana',
    char: 'チ',
    romaji: 'chi',
    group: 'basic',
    row: 'ta',
    isException: true,
    exceptionNote: 'Excepción fonética: Se pronuncia CHI (como "ch" en español).'
  },
  {
    id: 'k-tsu',
    type: 'katakana',
    char: 'ツ',
    romaji: 'tsu',
    group: 'basic',
    row: 'ta',
    isException: true,
    exceptionNote: 'Excepción y confusión común: Se pronuncia TSU. Sus trazos caen de arriba hacia abajo, a diferencia de シ (shi).'
  },
  { id: 'k-te', type: 'katakana', char: 'テ', romaji: 'te', group: 'basic', row: 'ta' },
  { id: 'k-to', type: 'katakana', char: 'ト', romaji: 'to', group: 'basic', row: 'ta' },

  // Fila Na
  { id: 'k-na', type: 'katakana', char: 'ナ', romaji: 'na', group: 'basic', row: 'na' },
  { id: 'k-ni', type: 'katakana', char: 'ニ', romaji: 'ni', group: 'basic', row: 'na' },
  { id: 'k-nu', type: 'katakana', char: 'ヌ', romaji: 'nu', group: 'basic', row: 'na' },
  { id: 'k-ne', type: 'katakana', char: 'ネ', romaji: 'ne', group: 'basic', row: 'na' },
  { id: 'k-no', type: 'katakana', char: 'ノ', romaji: 'no', group: 'basic', row: 'na' },

  // Fila Ha (con excepción fu)
  { id: 'k-ha', type: 'katakana', char: 'ハ', romaji: 'ha', group: 'basic', row: 'ha' },
  { id: 'k-hi', type: 'katakana', char: 'ヒ', romaji: 'hi', group: 'basic', row: 'ha' },
  {
    id: 'k-fu',
    type: 'katakana',
    char: 'フ',
    romaji: 'fu',
    group: 'basic',
    row: 'ha',
    isException: true,
    exceptionNote: 'Excepción fonética: No es "hu". Se pronuncia FU con soplo bilabial.'
  },
  { id: 'k-he', type: 'katakana', char: 'ヘ', romaji: 'he', group: 'basic', row: 'ha' },
  { id: 'k-ho', type: 'katakana', char: 'ホ', romaji: 'ho', group: 'basic', row: 'ha' },

  // Fila Ma
  { id: 'k-ma', type: 'katakana', char: 'マ', romaji: 'ma', group: 'basic', row: 'ma' },
  { id: 'k-mi', type: 'katakana', char: 'ミ', romaji: 'mi', group: 'basic', row: 'ma' },
  { id: 'k-mu', type: 'katakana', char: 'ム', romaji: 'mu', group: 'basic', row: 'ma' },
  { id: 'k-me', type: 'katakana', char: 'メ', romaji: 'me', group: 'basic', row: 'ma' },
  { id: 'k-mo', type: 'katakana', char: 'モ', romaji: 'mo', group: 'basic', row: 'ma' },

  // Fila Ya
  { id: 'k-ya', type: 'katakana', char: 'ヤ', romaji: 'ya', group: 'basic', row: 'ya' },
  { id: 'k-yu', type: 'katakana', char: 'ユ', romaji: 'yu', group: 'basic', row: 'ya' },
  { id: 'k-yo', type: 'katakana', char: 'ヨ', romaji: 'yo', group: 'basic', row: 'ya' },

  // Fila Ra
  { id: 'k-ra', type: 'katakana', char: 'ラ', romaji: 'ra', group: 'basic', row: 'ra' },
  { id: 'k-ri', type: 'katakana', char: 'リ', romaji: 'ri', group: 'basic', row: 'ra' },
  { id: 'k-ru', type: 'katakana', char: 'ル', romaji: 'ru', group: 'basic', row: 'ra' },
  { id: 'k-re', type: 'katakana', char: 'レ', romaji: 're', group: 'basic', row: 'ra' },
  { id: 'k-ro', type: 'katakana', char: 'ロ', romaji: 'ro', group: 'basic', row: 'ra' },

  // Fila Wa & N
  { id: 'k-wa', type: 'katakana', char: 'ワ', romaji: 'wa', group: 'basic', row: 'wa' },
  { id: 'k-wo', type: 'katakana', char: 'ヲ', romaji: 'o (wo)', group: 'basic', row: 'wa' },
  {
    id: 'k-n',
    type: 'katakana',
    char: 'ン',
    romaji: 'n',
    group: 'basic',
    row: 'n',
    isException: true,
    exceptionNote: 'Excepción y confusión común: Se pronuncia N. Se distingue de ソ (so) porque el trazo principal asciende.'
  },

  // Katakana Dakuten
  { id: 'k-ga', type: 'katakana', char: 'ガ', romaji: 'ga', group: 'dakuten', row: 'ga' },
  { id: 'k-gi', type: 'katakana', char: 'ギ', romaji: 'gi', group: 'dakuten', row: 'ga' },
  { id: 'k-gu', type: 'katakana', char: 'グ', romaji: 'gu', group: 'dakuten', row: 'ga' },
  { id: 'k-ge', type: 'katakana', char: 'ゲ', romaji: 'ge', group: 'dakuten', row: 'ga' },
  { id: 'k-go', type: 'katakana', char: 'ゴ', romaji: 'go', group: 'dakuten', row: 'ga' },

  { id: 'k-za', type: 'katakana', char: 'ザ', romaji: 'za', group: 'dakuten', row: 'za' },
  {
    id: 'k-ji',
    type: 'katakana',
    char: 'ジ',
    romaji: 'ji',
    group: 'dakuten',
    row: 'za',
    isException: true,
    exceptionNote: 'Excepción: Se pronuncia JI (sonido sonoro de シ).'
  },
  { id: 'k-zu', type: 'katakana', char: 'ズ', romaji: 'zu', group: 'dakuten', row: 'za' },
  { id: 'k-ze', type: 'katakana', char: 'ゼ', romaji: 'ze', group: 'dakuten', row: 'za' },
  { id: 'k-zo', type: 'katakana', char: 'ゾ', romaji: 'zo', group: 'dakuten', row: 'za' },

  { id: 'k-da', type: 'katakana', char: 'ダ', romaji: 'da', group: 'dakuten', row: 'da' },
  { id: 'k-de', type: 'katakana', char: 'デ', romaji: 'de', group: 'dakuten', row: 'da' },
  { id: 'k-do', type: 'katakana', char: 'ド', romaji: 'do', group: 'dakuten', row: 'da' },

  { id: 'k-ba', type: 'katakana', char: 'バ', romaji: 'ba', group: 'dakuten', row: 'ba' },
  { id: 'k-bi', type: 'katakana', char: 'ビ', romaji: 'bi', group: 'dakuten', row: 'ba' },
  { id: 'k-bu', type: 'katakana', char: 'ブ', romaji: 'bu', group: 'dakuten', row: 'ba' },
  { id: 'k-be', type: 'katakana', char: 'ベ', romaji: 'be', group: 'dakuten', row: 'ba' },
  { id: 'k-bo', type: 'katakana', char: 'ボ', romaji: 'bo', group: 'dakuten', row: 'ba' },

  // Katakana Handakuten
  { id: 'k-pa', type: 'katakana', char: 'パ', romaji: 'pa', group: 'handakuten', row: 'pa' },
  { id: 'k-pi', type: 'katakana', char: 'ピ', romaji: 'pi', group: 'handakuten', row: 'pa' },
  { id: 'k-pu', type: 'katakana', char: 'プ', romaji: 'pu', group: 'handakuten', row: 'pa' },
  { id: 'k-pe', type: 'katakana', char: 'ペ', romaji: 'pe', group: 'handakuten', row: 'pa' },
  { id: 'k-po', type: 'katakana', char: 'ポ', romaji: 'po', group: 'handakuten', row: 'pa' },

  // Katakana Especial: Chouon (Guion de vocal larga) y Sokuon
  {
    id: 'k-sokuon',
    type: 'katakana',
    char: 'ッ',
    romaji: '(pausa consonántica)',
    group: 'special',
    row: 'special',
    isException: true,
    exceptionNote: 'Tsu pequeño en katakana (Sokuon): Duplica la consonante siguiente y genera pausa rítmica (ej. ベッド = beddo, サッカー = sakkaa).'
  },
  {
    id: 'k-chouon',
    type: 'katakana',
    char: 'ー',
    romaji: '(alarga vocal anterior)',
    group: 'special',
    row: 'special',
    isException: true,
    exceptionNote: 'Chouonpu (guion largo): Alarga la vocal previa un tiempo. Indispensable en palabras extranjeras (ej. コーヒー koohii, ノート nooto).'
  }
];

export const ALL_KANA_DATA: KanaItem[] = [...HIRAGANA_DATA, ...KATAKANA_DATA];
