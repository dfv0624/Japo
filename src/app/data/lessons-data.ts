import {
  VocabularyItem,
  GrammarPoint,
  SentenceBuilderExercise,
  ParticleExercise,
  DemonstrativeScenario,
  DialogueScenario,
  QuizQuestion
} from '../models/japanese.models';

export const VOCABULARY_DATA: VocabularyItem[] = [
  // LECCIÓN 1 - Personas y Pronombres
  {
    id: 'l1-watashi',
    lesson: 1,
    kanji: '私',
    kana: 'わたし',
    romaji: 'watashi',
    spanish: 'yo',
    category: 'persona',
    notes: 'Pronombre de primera persona neutro y educado.',
    examples: [
      { jp: 'わたしは マイク・ミラーです。', kana: 'わたしは マイク・ミラーです。', romaji: 'Watashi wa Maiku Miraa desu.', es: 'Yo soy Mike Miller.' }
    ]
  },
  {
    id: 'l1-anata',
    lesson: 1,
    kanji: '貴方',
    kana: 'あなた',
    romaji: 'anata',
    spanish: 'usted / tú',
    category: 'persona',
    notes: 'Nota: En japonés suele evitarse y se prefiere llamar a la persona por su apellido + さん.',
    examples: [
      { jp: 'あなたは 学生ですか。', kana: 'あなたは がくせいですか。', romaji: 'Anata wa gakusei desu ka.', es: '¿Es usted estudiante?' }
    ]
  },
  {
    id: 'l1-anohito',
    lesson: 1,
    kanji: 'あの人',
    kana: 'あのひと',
    romaji: 'ano hito',
    spanish: 'aquella persona, él, ella',
    category: 'persona',
    notes: 'Forma estándar para referirse a una tercera persona a distancia.',
    examples: [
      { jp: 'あの人は だれですか。', kana: 'あのひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', es: '¿Quién es aquella persona?' }
    ]
  },
  {
    id: 'l1-anokata',
    lesson: 1,
    kanji: 'あの方',
    kana: 'あのかた',
    romaji: 'ano kata',
    spanish: 'aquella persona, él, ella (muy cortés)',
    category: 'persona',
    notes: 'Forma cortés y respetuosa de あのひと.',
    examples: [
      { jp: 'あの方は どなたですか。', kana: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', es: '¿Quién es aquella distinguida persona?' }
    ]
  },
  {
    id: 'l1-san',
    lesson: 1,
    kana: '〜さん',
    romaji: '~san',
    spanish: 'Sr., Sra., Srta. (sufijo de respeto)',
    category: 'expresion',
    notes: 'Nunca se añade al propio nombre, solo al de los demás.',
    examples: [
      { jp: 'こちらは サントスさんです。', kana: 'こちらは サントスさんです。', romaji: 'Kochira wa Santosu-san desu.', es: 'Le presento al Sr. Santos.' }
    ]
  },
  {
    id: 'l1-chan',
    lesson: 1,
    kana: '〜ちゃん',
    romaji: '~chan',
    spanish: 'sufijo cariñoso (para niños o afecto)',
    category: 'expresion',
    notes: 'Sufijo afectuoso usado con niños o jóvenes en vez de 〜さん.',
    examples: [
      { jp: 'テレサちゃんは ９歳です。', kana: 'テレサちゃんは きゅうさいです。', romaji: 'Teresa-chan wa kyuusai desu.', es: 'Teresa tiene 9 años.' }
    ]
  },
  {
    id: 'l1-jin',
    lesson: 1,
    kanji: '〜人',
    kana: '〜じん',
    romaji: '~jin',
    spanish: 'nacionalidad (ej: アメリカ人 = estadounidense)',
    category: 'pais',
    notes: 'Se añade detrás del país para indicar la nacionalidad.',
    examples: [
      { jp: 'ミラーさんは アメリカ人です。', kana: 'ミラーさんは アメリカじんです。', romaji: 'Miraa-san wa Amerika-jin desu.', es: 'El Sr. Miller es estadounidense.' }
    ]
  },
  {
    id: 'l1-sensei',
    lesson: 1,
    kanji: '先生',
    kana: 'せんせい',
    romaji: 'sensei',
    spanish: 'maestro, profesor (para dirigirse a otros)',
    category: 'profesion',
    notes: 'No se usa para referirse a la profesión de uno mismo.',
    examples: [
      { jp: '山田先生、こんにちは。', kana: 'やまだせんせい、こんにちは。', romaji: 'Yamada sensei, konnichiwa.', es: 'Profesor Yamada, buenas tardes.' }
    ]
  },
  {
    id: 'l1-kyoushi',
    lesson: 1,
    kanji: '教師',
    kana: 'きょうし',
    romaji: 'kyoushi',
    spanish: 'profesor, maestro (profesión propia)',
    category: 'profesion',
    notes: 'Se usa cuando uno habla de su propia profesión docente.',
    examples: [
      { jp: 'わたしは 教師です。', kana: 'わたしは きょうしです。', romaji: 'Watashi wa kyoushi desu.', es: 'Yo soy profesor.' }
    ]
  },
  {
    id: 'l1-gakusei',
    lesson: 1,
    kanji: '学生',
    kana: 'がくせい',
    romaji: 'gakusei',
    spanish: 'estudiante',
    category: 'profesion',
    examples: [
      { jp: 'カリナさんは 学生です。', kana: 'カリナさんは がくせいです。', romaji: 'Karina-san wa gakusei desu.', es: 'Karina es estudiante.' }
    ]
  },
  {
    id: 'l1-kaishain',
    lesson: 1,
    kanji: '会社員',
    kana: 'かいしゃいん',
    romaji: 'kaishain',
    spanish: 'empleado de una compañía / oficinista',
    category: 'profesion',
    examples: [
      { jp: 'わたしは 会社員です。', kana: 'わたしは かいしゃいんです。', romaji: 'Watashi wa kaishain desu.', es: 'Soy empleado de empresa.' }
    ]
  },
  {
    id: 'l1-shain',
    lesson: 1,
    kanji: '社員',
    kana: 'しゃいん',
    romaji: 'shain',
    spanish: 'empleado de la empresa ~ (con el nombre)',
    category: 'profesion',
    notes: 'Se usa con el nombre de la empresa: IMCの社員.',
    examples: [
      { jp: 'ミラーさんは IMCの 社員です。', kana: 'ミラーさんは アイエムシーの しゃいんです。', romaji: 'Miraa-san wa IMC no shain desu.', es: 'El Sr. Miller es empleado de IMC.' }
    ]
  },
  {
    id: 'l1-ginkouin',
    lesson: 1,
    kanji: '銀行員',
    kana: 'ぎんこういん',
    romaji: 'ginkouin',
    spanish: 'empleado de banco',
    category: 'profesion',
    examples: [
      { jp: '山内さんは 銀行員です。', kana: 'やまうちさんは ぎんこういんです。', romaji: 'Yamauchi-san wa ginkouin desu.', es: 'El Sr. Yamauchi es bancario.' }
    ]
  },
  {
    id: 'l1-isha',
    lesson: 1,
    kanji: '医者',
    kana: 'いしゃ',
    romaji: 'isha',
    spanish: 'médico, doctor',
    category: 'profesion',
    examples: [
      { jp: '健さんは 医者です。', kana: 'けんさんは いしゃです。', romaji: 'Ken-san wa isha desu.', es: 'Ken es médico.' }
    ]
  },
  {
    id: 'l1-kenkyuusha',
    lesson: 1,
    kanji: '研究者',
    kana: 'けんきゅうしゃ',
    romaji: 'kenkyuusha',
    spanish: 'investigador',
    category: 'profesion',
    examples: [
      { jp: 'ワンさんは 研究者です。', kana: 'ワンさんは けんきゅうしゃです。', romaji: 'Wan-san wa kenkyuusha desu.', es: 'El Sr. Wang es investigador.' }
    ]
  },
  {
    id: 'l1-daigaku',
    lesson: 1,
    kanji: '大学',
    kana: 'だいがく',
    romaji: 'daigaku',
    spanish: 'universidad',
    category: 'lugar',
    examples: [
      { jp: 'さくら大学は 有名です。', kana: 'さくらだいがくは ゆうめいです。', romaji: 'Sakura daigaku wa yuumei desu.', es: 'La Universidad Sakura es famosa.' }
    ]
  },
  {
    id: 'l1-byouin',
    lesson: 1,
    kanji: '病院',
    kana: 'びょういん',
    romaji: 'byouin',
    spanish: 'hospital',
    category: 'lugar',
    examples: [
      { jp: '神戸病院は 大きいです。', kana: 'こうべびょういんは おおきいです。', romaji: 'Koube byouin wa ookii desu.', es: 'El hospital de Kobe es grande.' }
    ]
  },
  {
    id: 'l1-dare',
    lesson: 1,
    kanji: '誰',
    kana: 'だれ',
    romaji: 'dare',
    spanish: 'quién',
    category: 'persona',
    examples: [
      { jp: 'あの人は だれですか。', kana: 'あのひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', es: '¿Quién es aquella persona?' }
    ]
  },
  {
    id: 'l1-donata',
    lesson: 1,
    kanji: '何方',
    kana: 'どなた',
    romaji: 'donata',
    spanish: 'quién (forma cortés)',
    category: 'persona',
    notes: 'Forma cortés de だれ.',
    examples: [
      { jp: 'あの方は どなたですか。', kana: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', es: '¿Quién es aquella distinguida persona?' }
    ]
  },
  {
    id: 'l1-sai',
    lesson: 1,
    kanji: '〜歳',
    kana: '〜さい',
    romaji: '~sai',
    spanish: '〜 años de edad',
    category: 'otro',
    examples: [
      { jp: 'わたしは ２８歳です。', kana: 'わたしは にじゅうはっさいです。', romaji: 'Watashi wa nijuuhassai desu.', es: 'Tengo 28 años.' }
    ]
  },
  {
    id: 'l1-nansai',
    lesson: 1,
    kanji: '何歳',
    kana: 'なんさい',
    romaji: 'nansai',
    spanish: '¿cuántos años?',
    category: 'otro',
    examples: [
      { jp: '何歳ですか。', kana: 'なんさいですか。', romaji: 'Nansai desu ka.', es: '¿Cuántos años tienes/tiene?' }
    ]
  },
  {
    id: 'l1-oikutsu',
    lesson: 1,
    kana: 'おいくつ',
    romaji: 'oikutsu',
    spanish: '¿cuántos años? (forma cortés)',
    category: 'otro',
    notes: 'Forma cortés de なんさい.',
    examples: [
      { jp: 'おいくつですか。', kana: 'おいくつですか。', romaji: 'Oikutsu desu ka.', es: '¿Cuál es su edad? (cortés)' }
    ]
  },
  {
    id: 'l1-hai',
    lesson: 1,
    kana: 'はい',
    romaji: 'hai',
    spanish: 'sí',
    category: 'expresion'
  },
  {
    id: 'l1-iie',
    lesson: 1,
    kana: 'いいえ',
    romaji: 'iie',
    spanish: 'no',
    category: 'expresion'
  },
  {
    id: 'l1-hajimemashite',
    lesson: 1,
    kanji: '初めまして',
    kana: 'はじめまして',
    romaji: 'hajimemashite',
    spanish: 'Mucho gusto (primera vez que nos vemos)',
    category: 'expresion',
    notes: 'Literalmente: es la primera vez. Se usa como saludo inicial al presentarse.'
  },
  {
    id: 'l1-karakimashita',
    lesson: 1,
    kanji: '〜から来ました',
    kana: '〜からきました',
    romaji: '~kara kimashita',
    spanish: 'Soy de ~ / Vengo de ~',
    category: 'expresion',
    examples: [
      { jp: 'アメリカから 来ました。', kana: 'アメリカから きました。', romaji: 'Amerika kara kimashita.', es: 'Vengo de Estados Unidos.' }
    ]
  },
  {
    id: 'l1-yoroshiku',
    lesson: 1,
    kanji: '[どうぞ]よろしく[お願いします]',
    kana: '[どうぞ]よろしく[おねがいします]',
    romaji: '[douzo] yoroshiku [onegaishimasu]',
    spanish: 'Encantado / Cuento con su favor',
    category: 'expresion',
    notes: 'Se dice al final de una autopresentación.'
  },
  {
    id: 'l1-shitsureidesuga',
    lesson: 1,
    kanji: '失礼ですが',
    kana: 'しつれいですが',
    romaji: 'shitsurei desu ga',
    spanish: 'Disculpe, pero...',
    category: 'expresion',
    notes: 'Se usa antes de hacer una pregunta personal como nombre o edad.'
  },
  {
    id: 'l1-onamaewa',
    lesson: 1,
    kanji: 'お名前は？',
    kana: 'おなまえは？',
    romaji: 'onamae wa?',
    spanish: '¿Cuál es su nombre?',
    category: 'expresion'
  },
  {
    id: 'l1-kochirawa',
    lesson: 1,
    kana: 'こちらは〜さんです',
    romaji: 'kochira wa ~san desu',
    spanish: 'Le presento al Sr./Sra. ~',
    category: 'expresion'
  },
  // Países de Lección 1
  { id: 'l1-amerika', lesson: 1, kana: 'アメリカ', romaji: 'Amerika', spanish: 'Estados Unidos', category: 'pais' },
  { id: 'l1-igirisu', lesson: 1, kana: 'イギリス', romaji: 'Igirisu', spanish: 'Reino Unido', category: 'pais' },
  { id: 'l1-indo', lesson: 1, kana: 'インド', romaji: 'Indo', spanish: 'India', category: 'pais' },
  { id: 'l1-indoneshia', lesson: 1, kana: 'インドネシア', romaji: 'Indoneshia', spanish: 'Indonesia', category: 'pais' },
  { id: 'l1-kankoku', lesson: 1, kanji: '韓国', kana: 'かんこく', romaji: 'Kankoku', spanish: 'Corea del Sur', category: 'pais' },
  { id: 'l1-tai', lesson: 1, kana: 'タイ', romaji: 'Tai', spanish: 'Tailandia', category: 'pais' },
  { id: 'l1-chuugoku', lesson: 1, kanji: '中国', kana: 'ちゅうごく', romaji: 'Chuugoku', spanish: 'China', category: 'pais' },
  { id: 'l1-doitsu', lesson: 1, kana: 'ドイツ', romaji: 'Doitsu', spanish: 'Alemania', category: 'pais' },
  { id: 'l1-nihon', lesson: 1, kanji: '日本', kana: 'にほん', romaji: 'Nihon', spanish: 'Japón', category: 'pais' },
  { id: 'l1-burajiru', lesson: 1, kana: 'ブラジル', romaji: 'Burajiru', spanish: 'Brasil', category: 'pais' },

  // LECCIÓN 2 - Demostrativos
  {
    id: 'l2-kore',
    lesson: 2,
    kana: 'これ',
    romaji: 'kore',
    spanish: 'éste, ésta, esto (cerca del hablante)',
    category: 'demostrativo',
    notes: 'Pronombre independiente: sustituye al objeto cercano a ti.',
    examples: [
      { jp: 'これは 本です。', kana: 'これは ホンです。', romaji: 'Kore wa hon desu.', es: 'Esto es un libro.' }
    ]
  },
  {
    id: 'l2-sore',
    lesson: 2,
    kana: 'それ',
    romaji: 'sore',
    spanish: 'ése, ésa, eso (cerca del oyente)',
    category: 'demostrativo',
    notes: 'Pronombre independiente: objeto que tiene la otra persona.',
    examples: [
      { jp: 'それは 辞書ですか。', kana: 'それは じしょですか。', romaji: 'Sore wa jisho desu ka.', es: '¿Eso es un diccionario?' }
    ]
  },
  {
    id: 'l2-are',
    lesson: 2,
    kana: 'あれ',
    romaji: 'are',
    spanish: 'aquél, aquélla, aquello (lejos de ambos)',
    category: 'demostrativo',
    notes: 'Pronombre independiente: objeto alejado de ambos interlocutores.',
    examples: [
      { jp: 'あれは だれのかばんですか。', kana: 'あれは だれのかばんですか。', romaji: 'Are wa dare no kaban desu ka.', es: '¿De quién es aquel bolso?' }
    ]
  },
  {
    id: 'l2-kono',
    lesson: 2,
    kana: 'この〜',
    romaji: 'kono ~',
    spanish: 'este ~, esta ~ (acompaña sustantivo)',
    category: 'demostrativo',
    notes: 'Modificador: siempre va seguido de un sustantivo (este libro = この本).',
    examples: [
      { jp: 'この本は わたしのです。', kana: 'このほんは わたしのです。', romaji: 'Kono hon wa watashi no desu.', es: 'Este libro es mío.' }
    ]
  },
  {
    id: 'l2-sono',
    lesson: 2,
    kana: 'その〜',
    romaji: 'sono ~',
    spanish: 'ese ~, esa ~ (acompaña sustantivo)',
    category: 'demostrativo',
    notes: 'Modificador: siempre seguido de sustantivo (esa maleta = そのかばん).',
    examples: [
      { jp: 'その傘は あなたのですか。', kana: 'そのかさは あなたのですか。', romaji: 'Sono kasa wa anata no desu ka.', es: '¿Ese paraguas es tuyo?' }
    ]
  },
  {
    id: 'l2-ano',
    lesson: 2,
    kana: 'あの〜',
    romaji: 'ano ~',
    spanish: 'aquel ~, aquella ~ (acompaña sustantivo)',
    category: 'demostrativo',
    notes: 'Modificador: siempre seguido de sustantivo (aquella persona = あの人).',
    examples: [
      { jp: 'あの方は どなたですか。', kana: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', es: '¿Quién es aquella persona?' }
    ]
  },
  // LECCIÓN 2 - Objetos cotidianos
  { id: 'l2-hon', lesson: 2, kanji: '本', kana: 'ほん', romaji: 'hon', spanish: 'libro', category: 'objeto' },
  { id: 'l2-jisho', lesson: 2, kanji: '辞書', kana: 'じしょ', romaji: 'jisho', spanish: 'diccionario', category: 'objeto' },
  { id: 'l2-zasshi', lesson: 2, kanji: '雑誌', kana: 'ざっし', romaji: 'zasshi', spanish: 'revista', category: 'objeto' },
  { id: 'l2-shinbun', lesson: 2, kanji: '新聞', kana: 'しんぶん', romaji: 'shinbun', spanish: 'periódico', category: 'objeto' },
  { id: 'l2-nooto', lesson: 2, kana: 'ノート', romaji: 'nooto', spanish: 'cuaderno', category: 'objeto' },
  { id: 'l2-techou', lesson: 2, kanji: '手帳', kana: 'てちょう', romaji: 'techou', spanish: 'agenda, libreta de bolsillo', category: 'objeto' },
  { id: 'l2-meishi', lesson: 2, kanji: '名刺', kana: 'めいし', romaji: 'meishi', spanish: 'tarjeta de visita / de presentación', category: 'objeto' },
  { id: 'l2-kaado', lesson: 2, kana: 'カード', romaji: 'kaado', spanish: 'tarjeta', category: 'objeto' },
  { id: 'l2-enpitsu', lesson: 2, kanji: '鉛筆', kana: 'えんぴつ', romaji: 'enpitsu', spanish: 'lápiz', category: 'objeto' },
  { id: 'l2-boorupen', lesson: 2, kana: 'ボールペン', romaji: 'boorupen', spanish: 'bolígrafo', category: 'objeto' },
  { id: 'l2-shaapupenshiru', lesson: 2, kana: 'シャープペンシル', romaji: 'shaapu penshiru', spanish: 'portaminas, lapicero', category: 'objeto' },
  { id: 'l2-kagi', lesson: 2, kana: 'かぎ', romaji: 'kagi', spanish: 'llave', category: 'objeto' },
  { id: 'l2-tokei', lesson: 2, kanji: '時計', kana: 'とけい', romaji: 'tokei', spanish: 'reloj', category: 'objeto' },
  { id: 'l2-kasa', lesson: 2, kanji: '傘', kana: 'かさ', romaji: 'kasa', spanish: 'paraguas', category: 'objeto' },
  { id: 'l2-kaban', lesson: 2, kana: 'かばん', romaji: 'kaban', spanish: 'bolso, maletín, cartera', category: 'objeto' },
  { id: 'l2-cd', lesson: 2, kana: 'CD', romaji: 'shiidii', spanish: 'CD / disco compacto', category: 'objeto' },
  { id: 'l2-terebi', lesson: 2, kana: 'テレビ', romaji: 'terebi', spanish: 'televisión, televisor', category: 'objeto' },
  { id: 'l2-rajio', lesson: 2, kana: 'ラジオ', romaji: 'rajio', spanish: 'radio', category: 'objeto' },
  { id: 'l2-kamera', lesson: 2, kana: 'カメラ', romaji: 'kamera', spanish: 'cámara fotográfica', category: 'objeto' },
  { id: 'l2-pasokon', lesson: 2, kana: 'コンピューター / パソコン', romaji: 'konpyuutaa / pasokon', spanish: 'computadora, ordenador', category: 'objeto' },
  { id: 'l2-kuruma', lesson: 2, kanji: '車', kana: 'くるま', romaji: 'kuruma', spanish: 'automóvil, coche', category: 'objeto' },
  { id: 'l2-tsukue', lesson: 2, kanji: '机', kana: 'つくえ', romaji: 'tsukue', spanish: 'escritorio, mesa de trabajo', category: 'objeto' },
  { id: 'l2-isu', lesson: 2, kana: 'いす', romaji: 'isu', spanish: 'silla', category: 'objeto' },

  // LECCIÓN 2 - Alimentos, regalos, idiomas y expresiones
  { id: 'l2-chokoreeto', lesson: 2, kana: 'チョコレート', romaji: 'chokoreeto', spanish: 'chocolate', category: 'objeto' },
  { id: 'l2-koohii', lesson: 2, kana: 'コーヒー', romaji: 'koohii', spanish: 'café', category: 'objeto' },
  {
    id: 'l2-omiyage',
    lesson: 2,
    kanji: '[お]土産',
    kana: '[お]みやげ',
    romaji: '[o]miyage',
    spanish: 'recuerdo de un viaje, regalo de cortesía',
    category: 'objeto',
    notes: 'Lleva el prefijo de cortesía [お]. Se suele dar a vecinos, colegas o amigos.'
  },
  { id: 'l2-eigo', lesson: 2, kanji: '英語', kana: 'えいご', romaji: 'eigo', spanish: 'el idioma inglés', category: 'otro' },
  { id: 'l2-nihongo', lesson: 2, kanji: '日本語', kana: 'にほんご', romaji: 'nihongo', spanish: 'el idioma japonés', category: 'otro' },
  { id: 'l2-go', lesson: 2, kanji: '〜語', kana: '〜ご', romaji: '~go', spanish: 'sufijo para idioma (ej: スペイン語 = español)', category: 'otro' },
  { id: 'l2-nan', lesson: 2, kanji: '何', kana: 'なん', romaji: 'nan', spanish: '¿qué?', category: 'otro' },
  { id: 'l2-sou', lesson: 2, kana: 'そう', romaji: 'sou', spanish: 'así, eso', category: 'expresion' },
  { id: 'l2-anou', lesson: 2, kana: 'あのう', romaji: 'anou', spanish: 'eh..., esto... (vacilación cortés)', category: 'expresion' },
  { id: 'l2-e', lesson: 2, kana: 'えっ', romaji: 'e!', spanish: '¿cómo? / ¿eh? (sorpresa)', category: 'expresion' },
  { id: 'l2-douzo', lesson: 2, kana: 'どうぞ', romaji: 'douzo', spanish: 'tome / adelante / aquí tiene', category: 'expresion' },
  { id: 'l2-arigatou', lesson: 2, kana: '[どうも] ありがとう [ございます]', romaji: '[doumo] arigatou [gozaimasu]', spanish: '[muchas] gracias', category: 'expresion' },
  { id: 'l2-soudesuka', lesson: 2, kana: 'そうですか', romaji: 'sou desu ka', spanish: '¿Ah, sí? / Ya veo (entonación descendente)', category: 'expresion' },
  { id: 'l2-chigaimasu', lesson: 2, kanji: '違います', kana: 'ちがいます', romaji: 'chigaimasu', spanish: 'No, no es así / es distinto', category: 'expresion' },
  { id: 'l2-a', lesson: 2, kana: 'あ', romaji: 'a', spanish: '¡Ah! (al notar o recordar algo)', category: 'expresion' },
  {
    id: 'l2-osewa',
    lesson: 2,
    kanji: 'これから お世話に なります',
    kana: 'これから おせわに なります',
    romaji: 'korekara osewa ni narimasu',
    spanish: 'Le agradezco de antemano su gentil apoyo / espero contar con su ayuda',
    category: 'expresion',
    notes: 'Frase típica que se dice a nuevos vecinos o compañeros de trabajo al mudarse o integrarse.'
  },
  {
    id: 'l2-kochirakoso',
    lesson: 2,
    kanji: 'こちらこそ [どうぞ] よろしく [お願いします]',
    kana: 'こちらこそ [どうぞ] よろしく [おねがいします]',
    romaji: 'kochirakoso [douzo] yoroshiku [onegaishimasu]',
    spanish: 'Al contrario, el gusto es mío / igualmente',
    category: 'expresion',
    notes: 'Respuesta formal y recíproca a どうぞよろしく.'
  },
  // LECCIÓN 3 - Lugares, Demostrativos y Comercio
  {
    id: 'l3-koko',
    lesson: 3,
    kana: 'ここ',
    romaji: 'koko',
    spanish: 'aquí, en este lugar',
    category: 'lugar',
    notes: 'Lugar donde se encuentra el hablante (o ambos si comparten territorio).',
    examples: [
      { jp: 'ここは 食堂です。', kana: 'ここは しょくどうです。', romaji: 'Koko wa shokudou desu.', es: 'Aquí es el comedor.' },
      { jp: 'ここは 新大阪ですか。', kana: 'ここは しんおおさかですか。', romaji: 'Koko wa Shin-Osaka desu ka.', es: '¿Esto es Shin-Osaka?' }
    ]
  },
  {
    id: 'l3-soko',
    lesson: 3,
    kana: 'そこ',
    romaji: 'soko',
    spanish: 'ahí, en ese lugar',
    category: 'lugar',
    notes: 'Lugar donde se encuentra el oyente.',
    examples: [
      { jp: '受付は そこですか。', kana: 'うけつけは そこですか。', romaji: 'Uketsuke wa soko desu ka.', es: '¿Ahí es la recepción?' }
    ]
  },
  {
    id: 'l3-asoko',
    lesson: 3,
    kana: 'あそこ',
    romaji: 'asoko',
    spanish: 'allí, en aquel lugar',
    category: 'lugar',
    notes: 'Lugar distante tanto del hablante como del oyente.',
    examples: [
      { jp: 'お手洗いは あそこです。', kana: 'おてあらいは あそこです。', romaji: 'Otearai wa asoko desu.', es: 'El baño está allí.' },
      { jp: 'エレベーターは あそこです。', kana: 'エレベーターは あそこです。', romaji: 'Erebeetaa wa asoko desu.', es: 'El ascensor está allí.' }
    ]
  },
  {
    id: 'l3-doko',
    lesson: 3,
    kana: 'どこ',
    romaji: 'doko',
    spanish: 'dónde, en qué lugar',
    category: 'lugar',
    notes: 'Pronombre interrogativo de lugar. También se usa para preguntar a qué escuela o entidad se pertenece.',
    examples: [
      { jp: 'トイレは どこですか。', kana: 'トイレは どこですか。', romaji: 'Toire wa doko desu ka.', es: '¿Dónde está el baño?' },
      { jp: '学校は どこですか。', kana: 'がっこうは どこですか。', romaji: 'Gakkou wa doko desu ka.', es: '¿Cuál es el nombre de tu escuela?' }
    ]
  },
  {
    id: 'l3-kochira',
    lesson: 3,
    kana: 'こちら',
    romaji: 'kochira',
    spanish: 'por aquí, aquí (forma cortés de ここ)',
    category: 'demostrativo',
    notes: 'Indica dirección hacia el hablante o ubicación con mayor cortesía y respeto.',
    examples: [
      { jp: '電話は こちらです。', kana: 'でんわは こちらです。', romaji: 'Denwa wa kochira desu.', es: 'El teléfono está por aquí.' }
    ]
  },
  {
    id: 'l3-sochira',
    lesson: 3,
    kana: 'そちら',
    romaji: 'sochira',
    spanish: 'por ahí, ahí (forma cortés de そこ)',
    category: 'demostrativo',
    notes: 'Indica dirección hacia el oyente o ubicación con mayor cortesía y respeto.',
    examples: [
      { jp: 'エスカレーターは そちらです。', kana: 'エスカレーターは そちらです。', romaji: 'Esukareetaa wa sochira desu.', es: 'La escalera mecánica está por ahí.' }
    ]
  },
  {
    id: 'l3-achira',
    lesson: 3,
    kana: 'あちら',
    romaji: 'achira',
    spanish: 'por allí, allí (forma cortés de あそこ)',
    category: 'demostrativo',
    notes: 'Indica dirección a la distancia o ubicación con mayor cortesía y respeto.',
    examples: [
      { jp: 'エレベーターは あちらです。', kana: 'エレベーターは あちらです。', romaji: 'Erebeetaa wa achira desu.', es: 'El ascensor está por allí.' }
    ]
  },
  {
    id: 'l3-dochira',
    lesson: 3,
    kana: 'どちら',
    romaji: 'dochira',
    spanish: 'por dónde, dónde (forma cortés de どこ)',
    category: 'demostrativo',
    notes: 'Interrogativo de dirección y forma cortés para preguntar por ubicación, país, empresa o institución.',
    examples: [
      { jp: '事務所は どちらですか。', kana: 'じむしょは どちらですか。', romaji: 'Jimusho wa dochira desu ka.', es: '¿Por dónde queda la oficina?' },
      { jp: 'お国は どちらですか。', kana: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', es: '¿De qué país es usted?' }
    ]
  },
  {
    id: 'l3-kyoushitsu',
    lesson: 3,
    kanji: '教室',
    kana: 'きょうしつ',
    romaji: 'kyoushitsu',
    spanish: 'aula, clase',
    category: 'lugar',
    examples: [
      { jp: 'テレーザちゃんは 教室です。', kana: 'テレーザちゃんは きょうしつです。', romaji: 'Tereeza-chan wa kyoushitsu desu.', es: 'Teresa está en el aula.' }
    ]
  },
  {
    id: 'l3-shokudou',
    lesson: 3,
    kanji: '食堂',
    kana: 'しょくどう',
    romaji: 'shokudou',
    spanish: 'comedor, cafetería',
    category: 'lugar',
    examples: [
      { jp: '食堂は 地下です。', kana: 'しょくどうは ちかです。', romaji: 'Shokudou wa chika desu.', es: 'El comedor está en el sótano.' }
    ]
  },
  {
    id: 'l3-jimusho',
    lesson: 3,
    kanji: '事務所',
    kana: 'じむしょ',
    romaji: 'jimusho',
    spanish: 'oficina',
    category: 'lugar',
    examples: [
      { jp: '山田さんは 事務所です。', kana: 'やまださんは じむしょです。', romaji: 'Yamada-san wa jimusho desu.', es: 'El Sr. Yamada está en la oficina.' }
    ]
  },
  {
    id: 'l3-kaigishitsu',
    lesson: 3,
    kanji: '会議室',
    kana: 'かいぎしつ',
    romaji: 'kaigishitsu',
    spanish: 'sala de reuniones',
    category: 'lugar',
    examples: [
      { jp: '会議室は どこですか。', kana: 'かいぎしつは どこですか。', romaji: 'Kaigishitsu wa doko desu ka.', es: '¿Dónde está la sala de reuniones?' }
    ]
  },
  {
    id: 'l3-uketsuke',
    lesson: 3,
    kanji: '受付',
    kana: 'うけつけ',
    romaji: 'uketsuke',
    spanish: 'recepción, mesa de informes',
    category: 'lugar',
    examples: [
      { jp: '受付は あそこです。', kana: 'うけつけは あそこです。', romaji: 'Uketsuke wa asoko desu.', es: 'La recepción está allí.' }
    ]
  },
  {
    id: 'l3-robii',
    lesson: 3,
    kana: 'ロビー',
    romaji: 'robii',
    spanish: 'vestíbulo, recepción, lobby',
    category: 'lugar',
    examples: [
      { jp: 'ロビーで 待っています。', kana: 'ロビーで まっています。', romaji: 'Robii de matte imasu.', es: 'Estoy esperando en el lobby.' }
    ]
  },
  {
    id: 'l3-heya',
    lesson: 3,
    kanji: '部屋',
    kana: 'へや',
    romaji: 'heya',
    spanish: 'habitación, cuarto',
    category: 'lugar',
    examples: [
      { jp: 'カリナさんの 部屋は 3階です。', kana: 'カリナさんの へやは さんがいです。', romaji: 'Karina-san no heya wa sangai desu.', es: 'La habitación de Karina está en el piso 3.' }
    ]
  },
  {
    id: 'l3-toire',
    lesson: 3,
    kana: 'トイレ',
    romaji: 'toire',
    spanish: 'baño, servicio, inodoro',
    category: 'lugar',
    notes: 'Término estándar tomado del inglés toilet.',
    examples: [
      { jp: 'トイレは どこですか。', kana: 'トイレは どこですか。', romaji: 'Toire wa doko desu ka.', es: '¿Dónde está el baño?' }
    ]
  },
  {
    id: 'l3-otearai',
    lesson: 3,
    kanji: 'お手洗い',
    kana: 'おてあらい',
    romaji: 'otearai',
    spanish: 'baño, servicio (forma cortés)',
    category: 'lugar',
    notes: 'Literalmente "lavado de manos". Es más elegante y refinado que トイレ.',
    examples: [
      { jp: 'お手洗いは あそこです。', kana: 'おてあらいは あそこです。', romaji: 'Otearai wa asoko desu.', es: 'El servicio está allí.' }
    ]
  },
  {
    id: 'l3-kaidan',
    lesson: 3,
    kanji: '階段',
    kana: 'かいだん',
    romaji: 'kaidan',
    spanish: 'escalera',
    category: 'lugar',
    examples: [
      { jp: '階段は どちらですか。……あちらです。', kana: 'かいだんは どちらですか。……あちらです。', romaji: 'Kaidan wa dochira desu ka. ... Achira desu.', es: '¿Por dónde está la escalera? ... Por allí.' }
    ]
  },
  {
    id: 'l3-erebeetaa',
    lesson: 3,
    kana: 'エレベーター',
    romaji: 'erebeetaa',
    spanish: 'ascensor, elevador',
    category: 'objeto',
    examples: [
      { jp: 'エレベーターは あそこです。', kana: 'エレベーターは あそこです。', romaji: 'Erebeetaa wa asoko desu.', es: 'El ascensor está allí.' }
    ]
  },
  {
    id: 'l3-esukareetaa',
    lesson: 3,
    kana: 'エスカレーター',
    romaji: 'esukareetaa',
    spanish: 'escalera mecánica',
    category: 'objeto',
    examples: [
      { jp: 'エスカレーターは そちらです。', kana: 'エスカレーターは そちらです。', romaji: 'Esukareetaa wa sochira desu.', es: 'La escalera mecánica está por ahí.' }
    ]
  },
  {
    id: 'l3-jidouhanbaiki',
    lesson: 3,
    kanji: '自動販売機',
    kana: 'じどうはんばいき',
    romaji: 'jidouhanbaiki',
    spanish: 'máquina de venta automática, expendedora',
    category: 'objeto',
    examples: [
      { jp: '自動販売機は 2階です。', kana: 'じどうはんばいきは にかいです。', romaji: 'Jidouhanbaiki wa nikai desu.', es: 'La máquina expendedora está en el 2º piso.' }
    ]
  },
  {
    id: 'l3-denwa',
    lesson: 3,
    kanji: '電話',
    kana: 'でんわ',
    romaji: 'denwa',
    spanish: 'teléfono, llamada telefónica',
    category: 'objeto',
    examples: [
      { jp: '電話は こちらです。', kana: 'でんわは こちらです。', romaji: 'Denwa wa kochira desu.', es: 'El teléfono está por aquí.' }
    ]
  },
  {
    id: 'l3-okuni',
    lesson: 3,
    kanji: '［お］国',
    kana: '［お］くに',
    romaji: '[o]kuni',
    spanish: '[su] país, patria',
    category: 'pais',
    notes: 'Lleva el prefijo de cortesía お para dirigirse al país del interlocutor.',
    examples: [
      { jp: 'お国は どちらですか。……アメリカです。', kana: 'おくには どちらですか。……アメリカです。', romaji: 'Okuni wa dochira desu ka. ... Amerika desu.', es: '¿De qué país es usted? ... De Estados Unidos.' }
    ]
  },
  {
    id: 'l3-kaisha',
    lesson: 3,
    kanji: '会社',
    kana: 'かいしゃ',
    romaji: 'kaisha',
    spanish: 'empresa, compañía, firma',
    category: 'lugar',
    examples: [
      { jp: '会社は どちらですか。', kana: 'かいしゃは どちらですか。', romaji: 'Kaisha wa dochira desu ka.', es: '¿En qué empresa trabaja usted?' }
    ]
  },
  {
    id: 'l3-uchi',
    lesson: 3,
    kana: 'うち',
    romaji: 'uchi',
    spanish: 'casa, hogar',
    category: 'lugar',
    notes: 'Se refiere a la casa o domicilio propio.',
    examples: [
      { jp: 'うちは 大阪です。', kana: 'うちは おおさかです。', romaji: 'Uchi wa Oosaka desu.', es: 'Mi casa está en Osaka.' }
    ]
  },
  {
    id: 'l3-uriba',
    lesson: 3,
    kanji: '売り場',
    kana: 'うりば',
    romaji: 'uriba',
    spanish: 'sección (en un gran almacén), mostrador de ventas',
    category: 'lugar',
    examples: [
      { jp: 'ワイン売り場は どこですか。', kana: 'ワインうりばは どこですか。', romaji: 'Wain uriba wa doko desu ka.', es: '¿Dónde está la sección de vinos?' }
    ]
  },
  {
    id: 'l3-chika',
    lesson: 3,
    kanji: '地下',
    kana: 'ちか',
    romaji: 'chika',
    spanish: 'sótano, subsuelo',
    category: 'lugar',
    examples: [
      { jp: 'ワイン売り場は 地下1階です。', kana: 'ワインうりばは ちかいっかいです。', romaji: 'Wain uriba wa chika ikkai desu.', es: 'La sección de vinos está en el sótano 1.' }
    ]
  },
  {
    id: 'l3-kai',
    lesson: 3,
    kanji: '〜階',
    kana: '〜かい（〜がい）',
    romaji: '~kai (~gai)',
    spanish: '〜º piso, planta',
    category: 'lugar',
    notes: 'Contador de pisos. Nota: 1階 (いっかい), 3階 (さんがい), 6階 (ろっかい), 8階 (はっかい), 10階 (じゅっかい).',
    examples: [
      { jp: '食堂は 2階です。', kana: 'しょくどうは にかいです。', romaji: 'Shokudou wa nikai desu.', es: 'El comedor está en el 2º piso.' }
    ]
  },
  {
    id: 'l3-nangai',
    lesson: 3,
    kanji: '何階',
    kana: 'なんがい',
    romaji: 'nangai',
    spanish: '¿qué piso?',
    category: 'lugar',
    examples: [
      { jp: '事務所は 何階ですか。', kana: 'じむしょは なんがいですか。', romaji: 'Jimusho wa nangai desu ka.', es: '¿En qué piso está la oficina?' }
    ]
  },
  {
    id: 'l3-depaato',
    lesson: 3,
    kana: 'デパート',
    romaji: 'depaato',
    spanish: 'grandes almacenes, tienda departamental',
    category: 'lugar',
    examples: [
      { jp: 'デパートへ 行きます。', kana: 'デパートへ いきます。', romaji: 'Depaato e ikimasu.', es: 'Voy a los grandes almacenes.' }
    ]
  },
  {
    id: 'l3-okujou',
    lesson: 3,
    kanji: '屋上',
    kana: 'おくじょう',
    romaji: 'okujou',
    spanish: 'azotea, terraza superior',
    category: 'lugar',
    examples: [
      { jp: '屋上は 遊園地です。', kana: 'おくじょうは ゆうえんちです。', romaji: 'Okujou wa yuuenchi desu.', es: 'En la azotea hay un parque de diversiones.' }
    ]
  },
  {
    id: 'l3-kutsu',
    lesson: 3,
    kanji: '靴',
    kana: 'くつ',
    romaji: 'kutsu',
    spanish: 'zapatos, calzado',
    category: 'objeto',
    examples: [
      { jp: 'それは イタリアの 靴です。', kana: 'それは イタリアの くつです。', romaji: 'Sore wa Itaria no kutsu desu.', es: 'Esos son zapatos de Italia.' }
    ]
  },
  {
    id: 'l3-nekutai',
    lesson: 3,
    kana: 'ネクタイ',
    romaji: 'nekutai',
    spanish: 'corbata',
    category: 'objeto',
    examples: [
      { jp: 'この ネクタイは いくらですか。', kana: 'この ネクタイは いくらですか。', romaji: 'Kono nekutai wa ikura desu ka.', es: '¿Cuánto cuesta esta corbata?' }
    ]
  },
  {
    id: 'l3-wain',
    lesson: 3,
    kana: 'ワイン',
    romaji: 'wain',
    spanish: 'vino',
    category: 'objeto',
    examples: [
      { jp: 'これは 日本の ワインです。', kana: 'これは にほんの ワインです。', romaji: 'Kore wa Nihon no wain desu.', es: 'Este es vino de Japón.' }
    ]
  },
  {
    id: 'l3-tokei',
    lesson: 3,
    kanji: '時計',
    kana: 'とけい',
    romaji: 'tokei',
    spanish: 'reloj',
    category: 'objeto',
    examples: [
      { jp: 'この 時計は 18,600円です。', kana: 'この とけいは いちまんはっせんろっぴゃくえんです。', romaji: 'Kono tokei wa ichiman hassen roppyaku en desu.', es: 'Este reloj cuesta 18.600 yenes.' }
    ]
  },
  {
    id: 'l3-megane',
    lesson: 3,
    kanji: '眼鏡',
    kana: 'めがね',
    romaji: 'megane',
    spanish: 'gafas, lentes',
    category: 'objeto',
    examples: [
      { jp: '眼鏡売り場は 7階です。', kana: 'めがねうりばは ななかいです。', romaji: 'Megane uriba wa nanakai desu.', es: 'La sección de gafas está en el piso 7.' }
    ]
  },
  {
    id: 'l3-shokuhin',
    lesson: 3,
    kanji: '食品',
    kana: 'しょくひん',
    romaji: 'shokuhin',
    spanish: 'alimentos, comestibles',
    category: 'objeto',
    examples: [
      { jp: '食品は 地下1階です。', kana: 'しょくひんは ちかいっかいです。', romaji: 'Shokuhin wa chika ikkai desu.', es: 'Los alimentos están en el sótano 1.' }
    ]
  },
  {
    id: 'l3-en',
    lesson: 3,
    kanji: '〜円',
    kana: '〜えん',
    romaji: '~en',
    spanish: '〜 yen(es)',
    category: 'numero',
    notes: 'Unidad monetaria del Japón (¥).',
    examples: [
      { jp: 'これは 600円です。', kana: 'これは ろっぴゃくえんです。', romaji: 'Kore wa roppyaku en desu.', es: 'Esto cuesta 600 yenes.' }
    ]
  },
  {
    id: 'l3-ikura',
    lesson: 3,
    kana: 'いくら',
    romaji: 'ikura',
    spanish: 'cuánto (término limitado a cantidad de dinero)',
    category: 'numero',
    notes: 'Interrogativo para indagar el precio de un bien o servicio.',
    examples: [
      { jp: 'これは いくらですか。……2,500円です。', kana: 'これは いくらですか。……にせんごひゃくえんです。', romaji: 'Kore wa ikura desu ka. ... Nisen gohyaku en desu.', es: '¿Cuánto cuesta esto? ... Cuesta 2.500 yenes.' }
    ]
  },
  {
    id: 'l3-hyaku',
    lesson: 3,
    kanji: '百',
    kana: 'ひゃく',
    romaji: 'hyaku',
    spanish: 'cien (100)',
    category: 'numero',
    notes: 'Variaciones fonéticas: 300 (さんびゃく), 600 (ろっぴゃく), 800 (はっぴゃく).'
  },
  {
    id: 'l3-sen',
    lesson: 3,
    kanji: '千',
    kana: 'せん',
    romaji: 'sen',
    spanish: 'mil (1.000)',
    category: 'numero',
    notes: 'Variaciones fonéticas: 3.000 (さんぜん), 8.000 (はっせん).'
  },
  {
    id: 'l3-man',
    lesson: 3,
    kanji: '万',
    kana: 'まん',
    romaji: 'man',
    spanish: 'diez mil (10.000)',
    category: 'numero',
    notes: 'Unidad decimal fundamental en japonés: 10.000 = 一万 (いちまん).'
  },
  {
    id: 'l3-sumimasen',
    lesson: 3,
    kana: 'すみません',
    romaji: 'sumimasen',
    spanish: 'Disculpe / Por favor / Con permiso',
    category: 'expresion',
    notes: 'Fórmula para llamar la atención de dependientes o disculparse educadamente.',
    examples: [
      { jp: 'すみません。トイレは どこですか。', kana: 'すみません。トイレは どこですか。', romaji: 'Sumimasen. Toire wa doko desu ka.', es: 'Disculpe, ¿dónde está el baño?' }
    ]
  },
  {
    id: 'l3-doumo',
    lesson: 3,
    kana: 'どうも',
    romaji: 'doumo',
    spanish: 'Gracias (breve)',
    category: 'expresion',
    notes: 'Forma abreviada de cortesía común en intercambios cotidianos.',
    examples: [
      { jp: 'あそこです。……どうも。', kana: 'あそこです。……どうも。', romaji: 'Asoko desu. ... Doumo.', es: 'Está allí. ... Gracias.' }
    ]
  },
  {
    id: 'l3-irasshaimase',
    lesson: 3,
    kana: 'いらっしゃいませ',
    romaji: 'irasshaimase',
    spanish: 'Buenos días / Bienvenido (expresión con que se recibe a clientes)',
    category: 'expresion',
    notes: 'Saludo ceremonial e imprescindible con el que todo comercio recibe al cliente a su llegada.'
  },
  {
    id: 'l3-misetekudasai',
    lesson: 3,
    kanji: '［〜を］見せて ください',
    kana: '［〜を］みせて ください',
    romaji: '[~o] misete kudasai',
    spanish: 'Por favor, puede mostrarme/enseñarme [〜]',
    category: 'expresion',
    examples: [
      { jp: 'その ワインを 見せて ください。', kana: 'その ワインを みせて ください。', romaji: 'Sono wain o misete kudasai.', es: 'Por favor, muéstreme ese vino.' }
    ]
  },
  {
    id: 'l3-ja',
    lesson: 3,
    kana: 'じゃ',
    romaji: 'ja',
    spanish: 'bueno, entonces',
    category: 'expresion',
    notes: 'Conector de toma de decisión ante lo conversado.',
    examples: [
      { jp: 'じゃ、これを ください。', kana: 'じゃ、これを ください。', romaji: 'Ja, kore o kudasai.', es: 'Bueno, entonces deme este, por favor.' }
    ]
  },
  {
    id: 'l3-kudasai',
    lesson: 3,
    kana: '［〜を］ください',
    romaji: '[~o] kudasai',
    spanish: 'Déme [〜], por favor',
    category: 'expresion',
    notes: 'Fórmula estándar para pedir la compra de un producto.',
    examples: [
      { jp: 'これを ください。', kana: 'これを ください。', romaji: 'Kore o kudasai.', es: 'Deme este, por favor.' }
    ]
  },
  {
    id: 'l3-itaria',
    lesson: 3,
    kana: 'イタリア',
    romaji: 'Itaria',
    spanish: 'Italia',
    category: 'pais'
  },
  {
    id: 'l3-suisu',
    lesson: 3,
    kana: 'スイス',
    romaji: 'Suisu',
    spanish: 'Suiza',
    category: 'pais'
  },
  {
    id: 'l3-furansu',
    lesson: 3,
    kana: 'フランス',
    romaji: 'Furansu',
    spanish: 'Francia',
    category: 'pais'
  },
  {
    id: 'l3-jakaruta',
    lesson: 3,
    kana: 'ジャカルタ',
    romaji: 'Jakaruta',
    spanish: 'Yakarta (capital de Indonesia)',
    category: 'pais'
  },
  {
    id: 'l3-bankoku',
    lesson: 3,
    kana: 'バンコク',
    romaji: 'Bankoku',
    spanish: 'Bangkok (capital de Tailandia)',
    category: 'pais'
  },
  {
    id: 'l3-berurin',
    lesson: 3,
    kana: 'ベルリン',
    romaji: 'Berurin',
    spanish: 'Berlín (capital de Alemania)',
    category: 'pais'
  },
  {
    id: 'l3-shin-osaka',
    lesson: 3,
    kanji: '新大阪',
    kana: 'しんおおさか',
    romaji: 'Shin-Oosaka',
    spanish: 'Shin-Osaka (nombre de estación de tren de Shinkansen en Osaka)',
    category: 'lugar'
  }

];

export const GRAMMAR_DATA: GrammarPoint[] = [
  // LECCIÓN 1
  {
    id: 'g1-wa-desu',
    lesson: 1,
    pattern: 'S1 は S2 です',
    title: '1. Afirmación: "S1 es S2"',
    explanation: 'La partícula は (pronunciada "wa") marca el tema de la oración (S1). です funciona como cópula de afirmación cortés equivalente a "ser" en tiempo presente/futuro afirmativo.',
    keyRule: 'は se escribe con el carácter de "ha", pero como partícula gramatical SIEMPRE se pronuncia "wa".',
    examples: [
      {
        jp: 'わたしは マイク・ミラーです。',
        kana: 'わたしは マイク・ミラーです。',
        romaji: 'Watashi wa Maiku Miraa desu.',
        es: 'Yo soy Mike Miller.',
        breakdown: 'わたし (Yo) + は (partícula de tema) + マイク・ミラー (Mike Miller) + です (afirmación cortés).'
      },
      {
        jp: 'わたしは 会社員です。',
        kana: 'わたしは かいしゃいんです。',
        romaji: 'Watashi wa kaishain desu.',
        es: 'Yo soy empleado de una empresa.',
        breakdown: 'わたし (Yo) + は + 会社員 (empleado) + です.'
      }
    ],
    tips: [
      'Recuerda: は no significa "es". は solo señala el foco del que hablamos. El "es" cortés lo aporta です al final.'
    ]
  },
  {
    id: 'g1-ja-arimasen',
    lesson: 1,
    pattern: 'S1 は S2 じゃ(では) ありません',
    title: '2. Negación: "S1 no es S2"',
    explanation: 'じゃ ありません es la forma negativa cortés de です, comúnmente usada en la conversación diaria. では ありません es más formal y habitual en discursos o textos escritos.',
    keyRule: 'En では ありません, el carácter は también se pronuncia "wa" (de wa arimasen).',
    examples: [
      {
        jp: 'サントスさんは 学生じゃ ありません。',
        kana: 'サントスさんは がくせいじゃ ありません。',
        romaji: 'Santosu-san wa gakusei ja arimasen.',
        es: 'El Sr. Santos no es estudiante.',
        breakdown: 'サントスさん (Sr. Santos) + は + 学生 (estudiante) + じゃ ありません (no es).'
      },
      {
        jp: 'ミラーさんは 先生では ありません。',
        kana: 'ミラーさんは せんせいでは ありません。',
        romaji: 'Miraa-san wa sensei dewa arimasen.',
        es: 'El Sr. Miller no es profesor (formal).',
        breakdown: 'ミラーさん + は + 先生 + では ありません.'
      }
    ]
  },
  {
    id: 'g1-ka',
    lesson: 1,
    pattern: 'S1 は S2 ですか',
    title: '3. Pregunta interrogativa con la partícula か',
    explanation: 'Se añade la partícula か al final de la oración para convertirla en pregunta. No se requiere signo de interrogación en japonés tradicional y la entonación se vuelve ascendente. Se responde con はい (sí) o いいえ (no).',
    keyRule: 'El orden de las palabras se mantiene idéntico al de una afirmación; solo agregas か al final.',
    examples: [
      {
        jp: 'ミラーさんは アメリカ人ですか。……はい、アメリカ人です。',
        kana: 'ミラーさんは アメリカじんですか。……はい、アメリカじんです。',
        romaji: 'Miraa-san wa Amerika-jin desu ka? ... Hai, Amerika-jin desu.',
        es: '¿Es el Sr. Miller estadounidense? ... Sí, es estadounidense.'
      },
      {
        jp: 'ミラーさんは 先生ですか。……いいえ、先生じゃ ありません。',
        kana: 'ミラーさんは せんせいですか。……いいえ、せんせいじゃ ありません。',
        romaji: 'Miraa-san wa sensei desu ka? ... Iie, sensei ja arimasen.',
        es: '¿Es el Sr. Miller profesor? ... No, no es profesor.'
      }
    ]
  },
  {
    id: 'g1-interrogative-word',
    lesson: 1,
    pattern: 'あの方は どなたですか / だれですか',
    title: '4. Preguntas con pronombres interrogativos (quién)',
    explanation: 'Para preguntar "quién", se usa だれ (estándar) o どなた (cortés). El pronombre interrogativo sustituye al dato que se desea saber en la misma posición de la oración.',
    keyRule: 'あの方 (ano kata) va acompañado de どなた (donata). あの人 (ano hito) va acompañado de だれ (dare).',
    examples: [
      {
        jp: 'あの方は どなたですか。……[あの方は] ミラーさんです。',
        kana: 'あのかたは どなたですか。……[あのかたは] ミラーさんです。',
        romaji: 'Ano kata wa donata desu ka? ... [Ano kata wa] Miraa-san desu.',
        es: '¿Quién es aquella persona? ... Es el Sr. Miller.'
      }
    ]
  },
  {
    id: 'g1-mo',
    lesson: 1,
    pattern: 'S も (también)',
    title: '5. Partícula も: "también"',
    explanation: 'La partícula も sustituye a は cuando se repite un atributo o afirmación que ya se mencionó sobre otra persona o cosa.',
    keyRule: 'Reemplaza por completo a は. Nunca digas はも o もは juntas.',
    examples: [
      {
        jp: 'ミラーさんは 会社員です。グプタさんも 会社員です。',
        kana: 'ミラーさんは かいしゃいんです。グプタさんも かいしゃいんです。',
        romaji: 'Miraa-san wa kaishain desu. Guta-san mo kaishain desu.',
        es: 'El Sr. Miller es oficinista. El Sr. Gupta también es oficinista.'
      }
    ]
  },
  {
    id: 'g1-no',
    lesson: 1,
    pattern: 'S1 の S2 (pertenencia o afiliación)',
    title: '6. Partícula の: Conexión y afiliación',
    explanation: 'S1 modifica a S2. En la Lección 1, representa un organismo o empresa al que pertenece S2 (afiliación institucional).',
    keyRule: 'El orden en japonés es: [Organización / Entidad] の [Puesto / Persona].',
    examples: [
      {
        jp: 'ミラーさんは IMCの 社員です。',
        kana: 'ミラーさんは アイエムシーの しゃいんです。',
        romaji: 'Miraa-san wa IMC no shain desu.',
        es: 'El Sr. Miller es empleado de IMC.',
        breakdown: 'IMC (empresa) + の (conector de pertenencia) + 社員 (empleado).'
      }
    ]
  },
  {
    id: 'g1-san-usage',
    lesson: 1,
    pattern: 'Uso de 〜さん frente a あなた',
    title: '7. Trato de cortesía: Evitar "anata"',
    explanation: 'En japonés rara vez se usa あなた directamente porque puede sonar distante o poco cortés. Lo natural es dirigirse al interlocutor por su apellido seguido de 〜さん.',
    keyRule: '¡Regla de oro! Jamás te pongas 〜さん a ti mismo. Solo se usa para mostrar respeto a otros.',
    examples: [
      {
        jp: '鈴木：ミラーさんは 学生ですか。 ミラー：いいえ、会社員です。',
        kana: 'すずき：ミラーさんは がくせいですか。 ミラー：いいえ、かいしゃいんです。',
        romaji: 'Suzuki: Miraa-san wa gakusei desu ka? Miraa: Iie, kaishain desu.',
        es: 'Suzuki: ¿Miller-san, usted es estudiante? Miller: No, soy oficinista.'
      }
    ]
  },

  // LECCIÓN 2
  {
    id: 'g2-kore-sore-are',
    lesson: 2,
    pattern: 'これ / それ / あれ (Pronombres)',
    title: '1. Demostrativos independientes: Esto / Eso / Aquello',
    explanation: 'Funcionan por sí solos como pronombres sustantivos (actúan como sujeto con は):\n• これ: objeto próximo al hablante.\n• それ: objeto próximo al oyente.\n• あれ: objeto distante tanto del hablante como del oyente.',
    keyRule: 'これ / それ / あれ nunca van seguidos directamente de un sustantivo. Llevan partículas como は, が, を o です.',
    examples: [
      {
        jp: 'それは 辞書ですか。',
        kana: 'それは じしょですか。',
        romaji: 'Sore wa jisho desu ka.',
        es: '¿Eso (que tienes ahí) es un diccionario?'
      },
      {
        jp: 'これは だれの 傘ですか。',
        kana: 'これは だれの かさですか。',
        romaji: 'Kore wa dare no kasa desu ka.',
        es: '¿De quién es este paraguas (que tengo aquí)?'
      },
      {
        jp: 'あれは 車です。',
        kana: 'あれは くるまです。',
        romaji: 'Are wa kuruma desu.',
        es: 'Aquello (a lo lejos) es un automóvil.'
      }
    ]
  },
  {
    id: 'g2-kono-sono-ano',
    lesson: 2,
    pattern: 'この S / その S / あの S (Modificadores)',
    title: '2. Demostrativos modificadores de sustantivo: Este S / Ese S / Aquel S',
    explanation: 'A diferencia de これ/それ/あれ, この/その/あの SIEMPRE deben acompañar inmediatamente a un sustantivo (S):\n• この本: este libro (junto a mí)\n• その傘: ese paraguas (junto a ti)\n• あの人: aquella persona (lejos de los dos)',
    keyRule: 'Fórmula fija: [この / その / あの] + [Sustantivo]. ¡No puedes decir "この です"! Debe ser "これ です" o "この本です".',
    examples: [
      {
        jp: 'この本は わたしのです。',
        kana: 'このほんは わたしのです。',
        romaji: 'Kono hon wa watashi no desu.',
        es: 'Este libro es mío.'
      },
      {
        jp: 'あの方は どなたですか。',
        kana: 'あのかたは どなたですか。',
        romaji: 'Ano kata wa donata desu ka.',
        es: '¿Quién es aquella persona de allí?'
      }
    ]
  },
  {
    id: 'g2-sou-desu',
    lesson: 2,
    pattern: 'そうです / いいえ、違います',
    title: '3. Respuestas afirmativas y negativas a preguntas sobre identidad',
    explanation: 'Al responder si algo es un objeto ("¿Es eso una revista?"), en vez de repetir todo el sustantivo:\n• Afirmativo: はい、そうです。(Sí, así es / Sí, lo es).\n• Negativo: いいえ、違います (ちがいます)。(No, no es así / es distinto) o bien いいえ、[objeto correcto] です。',
    keyRule: 'Para negar algo erróneo sobre un objeto, es sumamente común usar 違います (chigaimasu).',
    examples: [
      {
        jp: 'それは 辞書ですか。……はい、そうです。',
        kana: 'それは じしょですか。……はい、そうです。',
        romaji: 'Sore wa jisho desu ka? ... Hai, sou desu.',
        es: '¿Es eso un diccionario? ... Sí, lo es.'
      },
      {
        jp: 'それは ミラーさんのですか。……いいえ、違います。',
        kana: 'それは ミラーさんのですか。……いいえ、ちがいます。',
        romaji: 'Sore wa Miraa-san no desu ka? ... Iie, chigaimasu.',
        es: '¿Es eso del Sr. Miller? ... No, no lo es.'
      },
      {
        jp: 'それは シャープペンシルですか。……いいえ、ボールペンです。',
        kana: 'それは シャープペンシルですか。……いいえ、ボールペンです。',
        romaji: 'Sore wa shaapu penshiru desu ka? ... Iie, boorupen desu.',
        es: '¿Es eso un portaminas? ... No, es un bolígrafo.'
      }
    ]
  },
  {
    id: 'g2-alternative-ka',
    lesson: 2,
    pattern: '〜ですか、〜ですか (Preguntas alternativas)',
    title: '4. Pregunta alternativa entre dos opciones',
    explanation: 'Cuando se presentan dos o más opciones alternativas ("¿Es A o es B?"), se repite ですか en cada una. No se responde con はい ni いいえ; se responde directamente con la alternativa correcta.',
    keyRule: '¡Nunca respondas con "Sí" o "No" a una pregunta alternativa! Se dice directamente la opción elegida + です.',
    examples: [
      {
        jp: 'これは「９」ですか、「７」ですか。……「９」です。',
        kana: 'これは「きゅう」ですか、「なな」ですか。……「きゅう」です。',
        romaji: 'Kore wa "kyuu" desu ka, "nana" desu ka? ... "Kyuu" desu.',
        es: '¿Esto es un "9" o un "7"? ... Es un "9".'
      },
      {
        jp: 'それは ノートですか、手帳ですか。……手帳です。',
        kana: 'それは ノートですか、てちょうですか。……てちょうです。',
        romaji: 'Sore wa nooto desu ka, techou desu ka? ... Techou desu.',
        es: '¿Eso es un cuaderno o una agenda? ... Es una agenda.'
      }
    ]
  },
  {
    id: 'g2-no-possessive-topic',
    lesson: 2,
    pattern: 'S1 の S2 (Contenido o Posesión)',
    title: '5. Partícula の: Tema/Contenido o Posesión',
    explanation: 'En la Lección 2, S1 の S2 tiene dos funciones principales:\n1) Aclarar sobre qué trata S2: コンピューターの本 (libro sobre computadoras)\n2) Aclarar a quién pertenece S2: わたしの本 (mi libro)',
    keyRule: '[Materia / Poseedor] の [Objeto].',
    examples: [
      {
        jp: 'これは コンピューターの 本です。',
        kana: 'これは コンピューターの ホンです。',
        romaji: 'Kore wa konpyuutaa no hon desu.',
        es: 'Este es un libro de computadoras.'
      },
      {
        jp: 'これは わたしの 本です。',
        kana: 'これは わたしの ホンです。',
        romaji: 'Kore wa watashi no hon desu.',
        es: 'Este es mi libro.'
      }
    ]
  },
  {
    id: 'g2-no-pronoun-substitution',
    lesson: 2,
    pattern: 'S の (El / La de ~ como pronombre)',
    title: '6. の como sustituto del sustantivo ("El de...")',
    explanation: 'Cuando el objeto ya está claro por el contexto, se puede omitir el sustantivo tras の:\n• あれは だれのかばんですか。 -> 佐藤さんのです。(Es de Sato-san).\n• このかばんは あなたのですか。 -> いいえ、わたしのでは ありません。(No, no es mía).\n\n[ATENCIÓN] Excepción importante: Cuando S2 se refiere a una PERSONA, NO se puede omitir.\nEj: ミラーさんは IMCの社員ですか。 -> はい、IMCの社員です。(¡No se dice IMCのです!).',
    keyRule: 'Sustituye objetos ya conocidos (el mío = わたしのです), pero NUNCA se omite si el término es un ser humano/empleado.',
    examples: [
      {
        jp: 'あれは だれの かばんですか。……佐藤さんのです。',
        kana: 'あれは だれの かばんですか。……さとうさんのです。',
        romaji: 'Are wa dare no kaban desu ka? ... Satou-san no desu.',
        es: '¿De quién es aquel bolso? ... Es de la Srta. Sato.'
      },
      {
        jp: 'この傘は あなたのですか。……いいえ、わたしのでは ありません。',
        kana: 'このかさは あなたのですか。……いいえ、わたしのでは ありません。',
        romaji: 'Kono kasa wa anata no desu ka? ... Iie, watashi no dewa arimasen.',
        es: '¿Este paraguas es tuyo? ... No, no es el mío.'
      }
    ]
  },
  {
    id: 'g2-o-prefix',
    lesson: 2,
    pattern: 'Prefijo de cortesía お〜',
    title: '7. Prefijo embellecedor de cortesía [お]',
    explanation: 'Se antepone a ciertas palabras para mostrar respeto, cortesía o elegancia: お土産 (omiyage - recuerdo/regalo), お酒 (osake - licor), お名前 (onamae - nombre), お茶 (ocha - té).',
    keyRule: 'Refleja refinamiento y respeto hacia el oyente.',
    examples: [
      {
        jp: 'これは お土産です。どうぞ。',
        kana: 'これは おみやげです。どうぞ。',
        romaji: 'Kore wa omiyage desu. Douzo.',
        es: 'Este es un regalo/recuerdo. Aquí tiene.'
      }
    ]
  },
  {
    id: 'g2-sou-desu-ka',
    lesson: 2,
    pattern: 'そうですか (Entonación descendente)',
    title: '8. Expresión そうですか: "Ah, ya veo"',
    explanation: 'Cuando se dice con entonación descendente (hacia abajo), significa que el hablante ha comprendido o recibido una información que no sabía ("Ah, ¿sí?", "Ya veo", "Entiendo").',
    keyRule: 'Con entonación descendente = asentir y asimilar. Con entonación ascendente = preguntar de verdad "¿Es así?".',
    examples: [
      {
        jp: 'この傘は あなたのですか。……いいえ、違います。シュミットさんのです。……そうですか。',
        kana: 'このかさは あなたのですか。……いいえ、ちがいます。シュミットさんのです。……そうですか。',
        romaji: 'Kono kasa wa anata no desu ka? ... Iie, chigaimasu. Shumitto-san no desu. ... Sou desu ka.',
        es: '¿Este paraguas es suyo? ... No, es distinto. Es del Sr. Schmidt. ... Ah, ya veo.'
      }
    ]
  },
  // LECCIÓN 3
  {
    id: 'g3-koko-soko-asoko',
    lesson: 3,
    pattern: 'ここ / そこ / あそこ / どこ',
    title: '1. Adverbios demostrativos de Lugar (Sistema Ko-So-A-Do espacial)',
    explanation: 'Los adverbios ここ, そこ, あそこ indican lugares:\n• ここ: Se refiere al lugar donde está el hablante.\n• そこ: Se refiere al lugar donde está el oyente.\n• あそこ: Se refiere a un lugar distante tanto del hablante como del oyente.\n• どこ: Pronombre interrogativo que significa "¿dónde?".\n\n[Nota territorial]: Cuando el hablante considera que el oyente se encuentra dentro de su mismo territorio o habitación, el lugar donde ambos están se indica con ここ. En este caso, そこ designa un punto un poco distante de ambos, y あそこ un lugar todavía más alejado.',
    keyRule: 'Indican ubicación física espacial: ここ (aquí), そこ (ahí), あそこ (allí / allá), どこ (dónde).',
    examples: [
      {
        jp: 'ここは 食堂です。',
        kana: 'ここは しょくどうです。',
        romaji: 'Koko wa shokudou desu.',
        es: 'Aquí es el comedor.',
        breakdown: 'ここ (aquí) + は (tema) + 食堂 (comedor) + です (es)'
      },
      {
        jp: 'お手洗いは あそこです。',
        kana: 'おてあらいは あそこです。',
        romaji: 'Otearai wa asoko desu.',
        es: 'El servicio está allí.',
        breakdown: 'お手洗い (baño) + は + あそこ (allí) + です (está)'
      },
      {
        jp: 'トイレは どこですか。……あそこです。',
        kana: 'トイレは どこですか。……あそこです。',
        romaji: 'Toire wa doko desu ka. ... Asoko desu.',
        es: '¿Dónde está el baño? ... Está allí.',
        breakdown: 'どこですか (¿dónde está?)'
      }
    ],
    tips: [
      'Al igual que これ・それ・あれ, siguen la pauta Ko (cerca de mí), So (cerca de ti), A (lejos de ambos), Do (pregunta).'
    ]
  },
  {
    id: 'g3-kochira-sochira-achira',
    lesson: 3,
    pattern: 'こちら / そちら / あちら / どちら',
    title: '2. Demostrativos de Dirección y Cortesía',
    explanation: 'こちら, そちら, あちら son adverbios que se refieren primordialmente a direcciones ("por aquí", "por ahí", "por allí"). No obstante, en la vida diaria y en los comercios se emplean habitualmente para indicar lugares con un nivel de respeto y cortesía notablemente superior a ここ, そこ, あそこ.\n\nどちら es el interrogativo correspondiente: se usa para preguntar "¿por cuál dirección?" o cortésmente "¿dónde?".',
    keyRule: 'Forma cortés y refinada: こちら (por aquí), そちら (por ahí), あちら (por allí), どちら (¿por dónde? / ¿dónde?).',
    examples: [
      {
        jp: 'エレベーターは どちらですか。……あちらです。',
        kana: 'エレベーターは どちらですか。……あちらです。',
        romaji: 'Erebeetaa wa dochira desu ka. ... Achira desu.',
        es: '¿Dónde / Por dónde está el ascensor? ... Está por allí.',
        breakdown: 'どちら (forma cortés de どこ) + あちら (forma cortés de あそこ)'
      },
      {
        jp: '事務所は どちらですか。……あちらです。',
        kana: 'じむしょは どちらですか。……あちらです。',
        romaji: 'Jimusho wa dochira desu ka. ... Achira desu.',
        es: '¿Por dónde queda la oficina? ... Está por allá.'
      }
    ],
    tips: [
      'En tiendas, hoteles y empresas japonesas, el personal siempre usará こちら/そちら/あちら/どちら para atender al público.'
    ]
  },
  {
    id: 'g3-wa-lugar-desu',
    lesson: 3,
    pattern: 'S は [Lugar / Piso] です',
    title: '3. Localización de Objetos, Personas e Instalaciones',
    explanation: 'Esta frase modelo sirve para indicar con precisión el lugar o piso donde se encuentran objetos, lugares, secciones o personas:\n[Sustantivo] は [Lugar o Piso] です。\n\nCuando el lugar es una planta o piso, se acompaña del contador 〜階 (かい / がい): 1階 (いっかい), 2階 (にかい), 3階 (さんがい), 地下1階 (ちかいっかい).',
    keyRule: 'Estructura: [Sujeto/Instalación] は [Ubicación / Piso] です。',
    examples: [
      {
        jp: '電話は 2階です。',
        kana: 'でんわは にかいです。',
        romaji: 'Denwa wa nikai desu.',
        es: 'El teléfono está en el piso 2.',
        breakdown: '電話 (teléfono) + は + 2階 (segundo piso) + です'
      },
      {
        jp: '山田さんは 事務所です。',
        kana: 'やまださんは じむしょです。',
        romaji: 'Yamada-san wa jimusho desu.',
        es: 'El Sr. Yamada está en la oficina.',
        breakdown: 'Indica la ubicación actual de una persona.'
      },
      {
        jp: 'ワイン売り場は 地下1階です。',
        kana: 'ワインうりばは ちかいっかいです。',
        romaji: 'Wain uriba wa chika ikkai desu.',
        es: 'La sección de vinos está en el primer piso del subsuelo.'
      }
    ]
  },
  {
    id: 'g3-doko-dochira-org',
    lesson: 3,
    pattern: '学校 / 会社 は どこ / どちら ですか',
    title: '4. Preguntar por Entidades, Empresas o Países con どこ o どちら',
    explanation: 'Al preguntar por el nombre del país, compañía, escuela u organización a la que pertenece una persona, en japonés se emplean どこ o どちら en vez de なん (qué).\n\nどちら es una variante mucho más cortés que どこ. Si alguien te pregunta 会社は どちらですか, no te está pidiendo la dirección física de la calle, sino el nombre de la empresa donde trabajas.',
    keyRule: 'Preguntar por país, empresa o escuela requiere どこ o どちら (nunca なん).',
    examples: [
      {
        jp: '学校は どこですか。',
        kana: 'がっこうは どこですか。',
        romaji: 'Gakkou wa doko desu ka.',
        es: '¿Cuál es el nombre de tu escuela / universidad?'
      },
      {
        jp: '会社は どちらですか。……パワー電気です。',
        kana: 'かいしゃは どちらですか。……パワーでんきです。',
        romaji: 'Kaisha wa dochira desu ka. ... Pawaa Denki desu.',
        es: '¿En qué empresa trabaja Ud.? ... En Power Electric.'
      },
      {
        jp: '［お］国は どちらですか。……アメリカです。',
        kana: '［お］くには どちらですか。……アメリカです。',
        romaji: '[O]kuni wa dochira desu ka. ... Amerika desu.',
        es: '¿De qué país es Ud.? ... De Estados Unidos.'
      }
    ],
    tips: [
      'Recuerda: "¿Cuál es tu empresa?" = 会社は どこ/どちら ですか (literal: "¿Dónde es tu empresa?").'
    ]
  },
  {
    id: 'g3-no-origin-maker',
    lesson: 3,
    pattern: 'S1 の S2 (País de procedencia o Empresa fabricante)',
    title: '5. Partícula の: Origen geográfico o Fabricante del producto',
    explanation: 'Cuando S1 representa el nombre de un país y S2 un producto, [S1 の S2] indica el lugar o país donde se fabricó S2 (ej. 日本のワイン = vino producido en Japón).\n\nCuando S1 representa el nombre de una empresa y S2 el producto, [S1 の S2] significa que S2 está fabricado por esa empresa (ej. パワー電気のコンピューター = computadora de Power Electric).\n\nEn ambos casos la pregunta interrogativa se formula con: これは どこの [Producto] ですか。',
    keyRule: 'どこの [Producto] ですか → [País o Marca] の [Producto] です。',
    examples: [
      {
        jp: 'これは どこの コンピューターですか。……日本の コンピューターです。',
        kana: 'これは どこの コンピューターですか。……にほんの コンピューターです。',
        romaji: 'Kore wa doko no konpyuutaa desu ka. ... Nihon no konpyuutaa desu.',
        es: '¿De dónde es esta computadora? ... Es una computadora japonesa / hecha en Japón.',
        breakdown: 'どこの (de qué país/fabricante) + コンピューター (computadora)'
      },
      {
        jp: 'それは どこの 靴ですか。……イタリアの 靴です。',
        kana: 'それは どこの くつですか。……イタリアの くつです。',
        romaji: 'Sore wa doko no kutsu desu ka. ... Itaria no kutsu desu.',
        es: '¿De dónde son esos zapatos? ... Son zapatos de Italia.'
      }
    ]
  },
  {
    id: 'g3-o-kuni',
    lesson: 3,
    pattern: 'Prefijo honorífico de cortesía お〜 (［お］国)',
    title: '6. El Prefijo de Respeto [お] ante pertenencias del interlocutor',
    explanation: 'El prefijo お se agrega a una palabra que se refiere al oyente o a una tercera persona a fin de expresar el respeto y consideración del hablante hacia él.\n\nEjemplo: 国 (país) se transforma en お国 (su respetable país) al preguntar por el origen del interlocutor. Jamás se debe usar お delante de las propias cosas o del propio país.',
    keyRule: 'お + Palabra = Demuestra deferencia hacia el oyente (ej. お国, お手洗い, お土産, お名前).',
    examples: [
      {
        jp: 'お国は どちらですか。',
        kana: 'おくには どちらですか。',
        romaji: 'Okuni wa dochira desu ka.',
        es: '¿De qué país es usted? / ¿Cuál es su país natal?',
        breakdown: 'お国 (su país) + は + どちら (dónde con cortesía) + ですか'
      }
    ]
  },
  {
    id: 'g3-ikura-en',
    lesson: 3,
    pattern: 'いくらですか / 〜円です',
    title: '7. Preguntar y Expresar Precios en Yenes (円)',
    explanation: 'いくら es el término interrogativo específico para preguntar por el precio de una mercancía ("¿cuánto cuesta?").\n\nLas respuestas usan la cifra monetaria seguida de la unidad 円 (えん):\n• 100円: ひゃくえん\n• 1.000円: せんえん\n• 10.000円: いちまんえん\n• 18.600円: いちまんはっせんろっぴゃくえん',
    keyRule: 'Pregunta: [Objeto] は いくらですか。 Respuesta: [Precio] 円です。',
    examples: [
      {
        jp: 'この 時計は いくらですか。……18,600円です。',
        kana: 'この とけいは いくらですか。……いちまんはっせんろっぴゃくえんです。',
        romaji: 'Kono tokei wa ikura desu ka. ... Ichiman hassen roppyaku en desu.',
        es: '¿Cuánto cuesta este reloj? ... Cuesta 18.600 yenes.'
      },
      {
        jp: 'これは いくらですか。……2,500円です。',
        kana: 'これは いくらですか。……にせんごひゃくえんです。',
        romaji: 'Kore wa ikura desu ka. ... Nisen gohyaku en desu.',
        es: '¿Cuánto es esto? ... Son 2.500 yenes.'
      }
    ]
  }

];

export const SENTENCE_BUILDER_DATA: SentenceBuilderExercise[] = [
  // LECCIÓN 1
  {
    id: 'sb-1',
    lesson: 1,
    promptEs: 'Yo soy Mike Miller.',
    targetJp: 'わたしは マイク・ミラーです。',
    targetKana: 'わたし は マイク・ミラー です',
    tokens: ['です', 'わたし', 'マイク・ミラー', 'は'],
    correctOrder: ['わたし', 'は', 'マイク・ミラー', 'です'],
    explanation: 'Tema (わたし) + partícula は + nombre (マイク・ミラー) + です.'
  },
  {
    id: 'sb-2',
    lesson: 1,
    promptEs: 'El Sr. Santos no es estudiante.',
    targetJp: 'サントスさんは 学生じゃ ありません。',
    targetKana: 'サントスさん は がくせい じゃ ありません',
    tokens: ['学生', 'じゃ ありません', 'サントスさん', 'は'],
    correctOrder: ['サントスさん', 'は', '学生', 'じゃ ありません'],
    explanation: 'Sujeto con 〜さん + は + profesión + negación じゃ ありません.'
  },
  {
    id: 'sb-3',
    lesson: 1,
    promptEs: '¿Es el Sr. Miller estadounidense?',
    targetJp: 'ミラーさんは アメリカ人ですか。',
    targetKana: 'ミラーさん は アメリカじん です か',
    tokens: ['アメリカ人', 'ミラーさん', 'ですか', 'は'],
    correctOrder: ['ミラーさん', 'は', 'アメリカ人', 'ですか'],
    explanation: 'Sujeto + は + nacionalidad + partícula interrogativa ですか.'
  },
  {
    id: 'sb-4',
    lesson: 1,
    promptEs: 'El Sr. Gupta también es empleado de empresa.',
    targetJp: 'グプタさんも 会社員です。',
    targetKana: 'グプタさん も かいしゃいん です',
    tokens: ['会社員', 'グプタさん', 'です', 'も'],
    correctOrder: ['グプタさん', 'も', '会社員', 'です'],
    explanation: 'La partícula も sustituye a は para expresar "también".'
  },
  {
    id: 'sb-5',
    lesson: 1,
    promptEs: 'El Sr. Miller es empleado de IMC.',
    targetJp: 'ミラーさんは IMCの 社員です。',
    targetKana: 'ミラーさん は アイエムシー の しゃいん です',
    tokens: ['IMC', '社員です', 'ミラーさんは', 'の'],
    correctOrder: ['ミラーさんは', 'IMC', 'の', '社員です'],
    explanation: 'S1 の S2: Organización (IMC) + の + puesto (社員).'
  },
  {
    id: 'sb-6',
    lesson: 1,
    promptEs: '¿Quién es aquella distinguida persona?',
    targetJp: 'あの方は どなたですか。',
    targetKana: 'あのかた は どなた ですか',
    tokens: ['どなたですか', 'あの方は'],
    correctOrder: ['あの方は', 'どなたですか'],
    explanation: 'あの方 (forma cortés) requiere どなた (quién, cortés).'
  },
  // LECCIÓN 2
  {
    id: 'sb-7',
    lesson: 2,
    promptEs: 'Esto es un diccionario.',
    targetJp: 'これは 辞書です。',
    targetKana: 'これ は じしょ です',
    tokens: ['辞書です', 'これ', 'は'],
    correctOrder: ['これ', 'は', '辞書です'],
    explanation: 'Pronombre demostrativo これ + partícula は + sustantivo + です.'
  },
  {
    id: 'sb-8',
    lesson: 2,
    promptEs: '¿De quién es este paraguas?',
    targetJp: 'これは だれの 傘ですか。',
    targetKana: 'これ は だれ の かさ ですか',
    tokens: ['傘ですか', 'だれ', 'これは', 'の'],
    correctOrder: ['これは', 'だれ', 'の', '傘ですか'],
    explanation: 'だれの傘: ¿De quién es el paraguas?'
  },
  {
    id: 'sb-9',
    lesson: 2,
    promptEs: 'Este libro es mío.',
    targetJp: 'この本は わたしのです。',
    targetKana: 'この ほん は わたし の です',
    tokens: ['わたしのです', 'この本は'],
    correctOrder: ['この本は', 'わたしのです'],
    explanation: 'この本 (este libro) + は + わたしのです (es el mío, sustitución con の).'
  },
  {
    id: 'sb-10',
    lesson: 2,
    promptEs: '¿Aquella maleta es de la Srta. Sato?',
    targetJp: 'あれは 佐藤さんの かばんですか。',
    targetKana: 'あれ は さとうさん の かばん ですか',
    tokens: ['かばんですか', 'あれは', '佐藤さんの'],
    correctOrder: ['あれは', '佐藤さんの', 'かばんですか'],
    explanation: 'あれ (aquello) + は + poseedor (佐藤さんの) + objeto (かばん) + ですか.'
  },
  {
    id: 'sb-11',
    lesson: 2,
    promptEs: 'Este es un libro de computadoras.',
    targetJp: 'これは コンピューターの 本です。',
    targetKana: 'これ は コンピューター の ほん です',
    tokens: ['本です', 'コンピューターの', 'これは'],
    correctOrder: ['これは', 'コンピューターの', '本です'],
    explanation: 'S1 の S2 aquí indica tema o materia (libro acerca de computadoras).'
  },
  {
    id: 'sb-12',
    lesson: 2,
    promptEs: 'No, no es así. Es distinto.',
    targetJp: 'いいえ、違います。',
    targetKana: 'いいえ 、 ちがいます',
    tokens: ['違います', 'いいえ、'],
    correctOrder: ['いいえ、', '違います'],
    explanation: 'Respuesta idiomática estándar para negar una suposición sobre un objeto o situación.'
  },
  // LECCIÓN 3
  {
    id: 'sb-13',
    lesson: 3,
    promptEs: 'Aquí es el comedor.',
    targetJp: 'ここは 食堂です。',
    targetKana: 'ここ は しょくどう です',
    tokens: ['食堂です', 'ここは'],
    correctOrder: ['ここは', '食堂です'],
    explanation: 'ここ (aquí) actúa como sujeto/tema con は, seguido del lugar (食堂です).'
  },
  {
    id: 'sb-14',
    lesson: 3,
    promptEs: 'El ascensor está allí.',
    targetJp: 'エレベーターは あそこです。',
    targetKana: 'エレベーター は あそこ です',
    tokens: ['あそこです', 'エレベーターは'],
    correctOrder: ['エレベーターは', 'あそこです'],
    explanation: 'El sujeto es el ascensor (エレベーターは) y el predicado es su ubicación lejana (あそこです).'
  },
  {
    id: 'sb-15',
    lesson: 3,
    promptEs: '¿Dónde está el servicio / baño?',
    targetJp: 'お手洗いは どこですか。',
    targetKana: 'おてあらい は どこ です か',
    tokens: ['どこですか', 'お手洗いは'],
    correctOrder: ['お手洗いは', 'どこですか'],
    explanation: 'お手洗いは + interrogativo de lugar どこ + ですか.'
  },
  {
    id: 'sb-16',
    lesson: 3,
    promptEs: 'El teléfono está en el segundo piso.',
    targetJp: '電話は 2階です。',
    targetKana: 'でんわ は にかい です',
    tokens: ['2階です', '電話は'],
    correctOrder: ['電話は', '2階です'],
    explanation: '2階 (にかい) indica el piso donde se localiza el objeto.'
  },
  {
    id: 'sb-17',
    lesson: 3,
    promptEs: 'El Sr. Yamada está en la sala de reuniones.',
    targetJp: '山田さんは 会議室です。',
    targetKana: 'やまださん は かいぎしつ です',
    tokens: ['会議室です', '山田さんは'],
    correctOrder: ['山田さんは', '会議室です'],
    explanation: 'Indica la ubicación de una persona sin necesidad de verbo adicional: [Persona] は [Lugar] です.'
  },
  {
    id: 'sb-18',
    lesson: 3,
    promptEs: '¿Por dónde queda la oficina? (forma cortés)',
    targetJp: '事務所は どちらですか。',
    targetKana: 'じむしょ は どちら です か',
    tokens: ['どちらですか', '事務所は'],
    correctOrder: ['事務所は', 'どちらですか'],
    explanation: 'どちら es la forma cortés y de dirección equivalente a どこ.'
  },
  {
    id: 'sb-19',
    lesson: 3,
    promptEs: '¿De qué país es usted? (con cortesía)',
    targetJp: 'お国は どちらですか。',
    targetKana: 'おくに は どちら です か',
    tokens: ['どちらですか', 'お国は'],
    correctOrder: ['お国は', 'どちらですか'],
    explanation: 'お国は + どちらですか es la fórmula refinada y estándar para preguntar la patria o nacionalidad.'
  },
  {
    id: 'sb-20',
    lesson: 3,
    promptEs: 'Esta es una computadora de Japón / japonesa.',
    targetJp: 'これは 日本の コンピューターです。',
    targetKana: 'これ は にほん の コンピューター です',
    tokens: ['コンピューターです', 'これは', '日本の'],
    correctOrder: ['これは', '日本の', 'コンピューターです'],
    explanation: '日本の indica el país de origen/fabricación del producto tecnológico.'
  },
  {
    id: 'sb-21',
    lesson: 3,
    promptEs: '¿Cuánto cuesta este reloj?',
    targetJp: 'この 時計は いくらですか。',
    targetKana: 'この とけい は いくら です か',
    tokens: ['いくらですか', 'この', '時計は'],
    correctOrder: ['この', '時計は', 'いくらですか'],
    explanation: 'この reloj (時計は) + interrogativo de precio (いくらですか).'
  },
  {
    id: 'sb-22',
    lesson: 3,
    promptEs: 'Entonces, deme este, por favor.',
    targetJp: 'じゃ、これを ください。',
    targetKana: 'じゃ 、 これ を ください',
    tokens: ['これを', 'ください', 'じゃ、'],
    correctOrder: ['じゃ、', 'これを', 'ください'],
    explanation: 'Fórmula de compra en tiendas: じゃ (entonces) + これを (este) + ください (déme por favor).'
  }

];

export const PARTICLE_EXERCISES: ParticleExercise[] = [
  {
    id: 'p-1',
    lesson: 1,
    sentencePre: 'わたし',
    sentencePost: 'マイク・ミラーです。',
    translation: 'Yo soy Mike Miller.',
    correctParticle: 'は',
    options: ['は', 'も', 'の', 'か'],
    explanation: 'La partícula は marca el tema principal de la oración (わたし).'
  },
  {
    id: 'p-2',
    lesson: 1,
    sentencePre: 'ミラーさんは 会社員です。グプタさん',
    sentencePost: '会社員です。',
    translation: 'El Sr. Miller es oficinista. El Sr. Gupta también es oficinista.',
    correctParticle: 'も',
    options: ['も', 'は', 'の', 'と'],
    explanation: 'La partícula も se utiliza para indicar "también", reemplazando a は.'
  },
  {
    id: 'p-3',
    lesson: 1,
    sentencePre: 'ミラーさんは IMC',
    sentencePost: '社員です。',
    translation: 'El Sr. Miller es empleado de IMC.',
    correctParticle: 'の',
    options: ['の', 'は', 'も', 'で'],
    explanation: 'La partícula の une la entidad o empresa (IMC) con la pertenencia (社員).'
  },
  {
    id: 'p-4',
    lesson: 1,
    sentencePre: 'ワンさんは 医者です',
    sentencePost: '',
    translation: '¿El Sr. Wang es médico?',
    correctParticle: 'か',
    options: ['か', 'ね', 'よ', 'は'],
    explanation: 'La partícula か al final de la oración forma la interrogación.'
  },
  {
    id: 'p-5',
    lesson: 2,
    sentencePre: 'これ',
    sentencePost: '日本語の 辞書です。',
    translation: 'Esto es un diccionario de japonés.',
    correctParticle: 'は',
    options: ['は', 'の', 'も', 'か'],
    explanation: 'これ funciona como sujeto pronominal marcado por la partícula は.'
  },
  {
    id: 'p-6',
    lesson: 2,
    sentencePre: 'これは だれ',
    sentencePost: '傘ですか。',
    translation: '¿De quién es este paraguas?',
    correctParticle: 'の',
    options: ['の', 'は', 'も', 'と'],
    explanation: 'だれの indica posesión ("de quién").'
  },
  {
    id: 'p-7',
    lesson: 2,
    sentencePre: 'この本は わたし',
    sentencePost: 'です。',
    translation: 'Este libro es mío (el mío).',
    correctParticle: 'の',
    options: ['の', 'は', 'も', 'に'],
    explanation: 'わたしのです utiliza の como sustituto del sustantivo omitido (わたしの本です -> わたしのです).'
  },
  {
    id: 'p-8',
    lesson: 2,
    sentencePre: 'あれは 自動車です。これ',
    sentencePost: '自動車です。',
    translation: 'Aquello es un automóvil. Esto también es un automóvil.',
    correctParticle: 'も',
    options: ['も', 'は', 'の', 'か'],
    explanation: 'Se usa も para agregar otro elemento a la misma categoría (también).'
  },
  {
    id: 'p-9',
    lesson: 3,
    sentencePre: 'ここ',
    sentencePost: '食堂です。',
    translation: 'Aquí es el comedor.',
    correctParticle: 'は',
    options: ['は', 'の', 'も', 'で'],
    explanation: 'は marca el tema del enunciado ("En cuanto a este lugar / aquí, es el comedor").'
  },
  {
    id: 'p-10',
    lesson: 3,
    sentencePre: 'エレベーター',
    sentencePost: 'あそこです。',
    translation: 'El ascensor está allí.',
    correctParticle: 'は',
    options: ['は', 'が', 'の', 'に'],
    explanation: 'は indica el sujeto o elemento del que se señala su ubicación.'
  },
  {
    id: 'p-11',
    lesson: 3,
    sentencePre: 'これは どこ',
    sentencePost: 'ワインですか。',
    translation: '¿De dónde es este vino?',
    correctParticle: 'の',
    options: ['の', 'は', 'も', 'と'],
    explanation: 'どこの conecta con vino para preguntar por su lugar o país de elaboración.'
  },
  {
    id: 'p-12',
    lesson: 3,
    sentencePre: 'イタリア',
    sentencePost: '靴です。',
    translation: 'Son zapatos de Italia.',
    correctParticle: 'の',
    options: ['の', 'は', 'で', 'に'],
    explanation: 'イタリアの靴 expresa el país de origen o fabricación con la partícula の.'
  },
  {
    id: 'p-13',
    lesson: 3,
    sentencePre: 'この時計は いくらです',
    sentencePost: '。',
    translation: '¿Cuánto cuesta este reloj?',
    correctParticle: 'か',
    options: ['か', 'ね', 'よ', 'の'],
    explanation: 'か convierte la afirmación en una oración interrogativa al final de la frase.'
  },
  {
    id: 'p-14',
    lesson: 3,
    sentencePre: 'その ワイン',
    sentencePost: '見せて ください。',
    translation: 'Por favor, muéstreme ese vino.',
    correctParticle: 'を',
    options: ['を', 'は', 'の', 'に'],
    explanation: 'を marca el objeto directo sobre el cual recae la acción de mostrar (見せてください).'
  },
  {
    id: 'p-15',
    lesson: 3,
    sentencePre: 'これ',
    sentencePost: 'ください。',
    translation: 'Déme este, por favor.',
    correctParticle: 'を',
    options: ['を', 'は', 'が', 'で'],
    explanation: 'を señala el objeto que se solicita comprar o recibir (これを ください).'
  }

];

export const DEMONSTRATIVE_SCENARIOS: DemonstrativeScenario[] = [
  {
    id: 'dem-1',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Amigo)',
    objectName: '本 (Libro)',
    objectKana: 'ほん',
    objectSpanish: 'Libro',
    distance: 'near_speaker',
    mode: 'pronoun',
    contextDescription: 'Tienes un libro en tus propias manos y quieres decir: "¿Qué es esto?"',
    correctAnswer: 'これ',
    options: ['これ', 'それ', 'あれ'],
    explanation: 'El objeto está en tus manos o junto a ti (el hablante), por lo que se debe usar これ.'
  },
  {
    id: 'dem-2',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Compañero)',
    objectName: '時計 (Reloj)',
    objectKana: 'とけい',
    objectSpanish: 'Reloj',
    distance: 'near_listener',
    mode: 'pronoun',
    contextDescription: 'Tu compañero lleva un reloj en su muñeca y le preguntas: "¿Es eso un reloj suizo?"',
    correctAnswer: 'それ',
    options: ['これ', 'それ', 'あれ'],
    explanation: 'El objeto está próximo al oyente (tu interlocutor), por lo que se debe usar それ.'
  },
  {
    id: 'dem-3',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Guía)',
    objectName: '車 (Coche)',
    objectKana: 'くるま',
    objectSpanish: 'Automóvil',
    distance: 'far_both',
    mode: 'pronoun',
    contextDescription: 'Ves un automóvil a 50 metros en el estacionamiento, lejos de ti y de la otra persona.',
    correctAnswer: 'あれ',
    options: ['これ', 'それ', 'あれ'],
    explanation: 'El objeto está alejado tanto del que habla como del que escucha, por lo que se debe usar あれ.'
  },
  {
    id: 'dem-4',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Profesor)',
    objectName: 'かばん (Bolso)',
    objectKana: 'かばん',
    objectSpanish: 'Maleta / Bolso',
    distance: 'near_speaker',
    mode: 'adjective',
    contextDescription: 'Sostienes un bolso a tu lado y dices: "_____ bolso es de la Srta. Sato."',
    correctAnswer: 'この',
    options: ['この', 'その', 'あの'],
    explanation: 'Como va seguido inmediatamente del sustantivo "かばん" y está cerca de ti, se usa この.'
  },
  {
    id: 'dem-5',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Compañera)',
    objectName: '傘 (Paraguas)',
    objectKana: 'かさ',
    objectSpanish: 'Paraguas',
    distance: 'near_listener',
    mode: 'adjective',
    contextDescription: 'Tu compañera sostiene un paraguas en la mano. Le preguntas: "¿De quién es _____ paraguas?"',
    correctAnswer: 'その',
    options: ['この', 'その', 'あの'],
    explanation: 'Va seguido del sustantivo "傘" y está cerca de tu oyente, por lo que corresponde その.'
  },
  {
    id: 'dem-6',
    lesson: 2,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Oyente (Colega)',
    objectName: '建物 (Edificio)',
    objectKana: 'たてもの',
    objectSpanish: 'Edificio / Persona',
    distance: 'far_both',
    mode: 'adjective',
    contextDescription: 'Señalan juntos a una persona que está al fondo del pasillo: "¿Quién es _____ persona?"',
    correctAnswer: 'あの',
    options: ['この', 'その', 'あの'],
    explanation: 'Va seguido de sustantivo (人 o 方) y está a distancia de ambos, por lo que corresponde あの.'
  },
  {
    id: 'dem-7',
    lesson: 3,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Compañero (Junto a ti)',
    objectName: '食堂 (Comedor)',
    objectKana: 'しょくどう',
    objectSpanish: 'Comedor',
    distance: 'near_speaker',
    mode: 'place',
    contextDescription: 'Estás entrando al comedor con tu compañero e indicas el recinto en el que ambos acaban de ingresar: "_____ es el comedor."',
    correctAnswer: 'ここ',
    options: ['ここ', 'そこ', 'あそこ'],
    explanation: 'ここ se refiere al lugar donde se encuentra el propio hablante o al territorio compartido de ambos.'
  },
  {
    id: 'dem-8',
    lesson: 3,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Recepcionista (Mostrador)',
    objectName: '受付 (Recepción)',
    objectKana: 'うけつけ',
    objectSpanish: 'Recepción',
    distance: 'near_listener',
    mode: 'place',
    contextDescription: 'Te aproximas al mostrador donde atiende el recepcionista y le consultas si ese sitio es la recepción: "¿_____ es la recepción?"',
    correctAnswer: 'そこ',
    options: ['ここ', 'そこ', 'あそこ'],
    explanation: 'そこ se refiere al lugar donde está situado el oyente.'
  },
  {
    id: 'dem-9',
    lesson: 3,
    speakerLabel: 'Hablante (Tú)',
    listenerLabel: 'Visitante',
    objectName: 'お手洗い (Baño)',
    objectKana: 'おてあらい',
    objectSpanish: 'Baño / Servicio',
    distance: 'far_both',
    mode: 'place',
    contextDescription: 'Un visitante te pide indicaciones para ir al baño. Señalas con la mano al final del corredor, lejos de los dos: "El servicio está _____."',
    correctAnswer: 'あそこ',
    options: ['ここ', 'そこ', 'あそこ'],
    explanation: 'あそこ se refiere a un punto o lugar distante tanto del hablante como del oyente.'
  },
  {
    id: 'dem-10',
    lesson: 3,
    speakerLabel: 'Dependiente (Tienda)',
    listenerLabel: 'Cliente',
    objectName: 'エレベーター (Ascensor)',
    objectKana: 'エレベーター',
    objectSpanish: 'Ascensor',
    distance: 'far_both',
    mode: 'direction',
    contextDescription: 'El dependiente guía educadamente al cliente indicándole la dirección lejana donde se encuentran los elevadores: "El ascensor está _____."',
    correctAnswer: 'あちら',
    options: ['こちら', 'そちら', 'あちら'],
    explanation: 'あちら es la forma cortés de あそこ y expresa la dirección hacia donde queda el ascensor.'
  },
  {
    id: 'dem-11',
    lesson: 3,
    speakerLabel: 'Entrevistador',
    listenerLabel: 'Postulante',
    objectName: '［お］国 (País)',
    objectKana: 'くに',
    objectSpanish: 'País de origen',
    distance: 'near_listener',
    mode: 'direction',
    contextDescription: 'En una conversación formal de negocios, te consultan de qué país provienes con máxima cortesía: "［お］国は _____ですか。"',
    correctAnswer: 'どちら',
    options: ['どこ', 'どちら', 'なん'],
    explanation: 'どちら es la variante refinada y cortés de どこ para indagar el país, compañía o procedencia de una persona.'
  }

];

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: 'dia-1',
    lesson: 1,
    title: 'Autopresentación en la empresa (IMC)',
    description: 'Mike Miller llega a la empresa por primera vez y se presenta ante el personal japonés.',
    lines: [
      {
        id: 'dia-1-1',
        speaker: 'Mike Miller',
        speakerRole: 'Nuevo empleado',
        jp: '初めまして。マイク・ミラーです。',
        kana: 'はじめまして。マイク・ミラーです。',
        romaji: 'Hajimemashite. Maiku Miraa desu.',
        es: 'Mucho gusto. Soy Mike Miller.'
      },
      {
        id: 'dia-1-2',
        speaker: 'Mike Miller',
        speakerRole: 'Nuevo empleado',
        jp: 'アメリカから 来ました。どうぞ よろしく お願いします。',
        kana: 'アメリカから きました。どうぞ よろしく おねがいします。',
        romaji: 'Amerika kara kimashita. Douzo yoroshiku onegaishimasu.',
        es: 'Vengo de Estados Unidos. Encantado de conocerles y cuento con su apoyo.'
      },
      {
        id: 'dia-1-3',
        speaker: 'Satou (佐藤)',
        speakerRole: 'Compañera de trabajo',
        jp: '佐藤です。どうぞ よろしく。',
        kana: 'さとうです。どうぞ よろしく。',
        romaji: 'Satou desu. Douzo yoroshiku.',
        es: 'Soy Sato. Mucho gusto igualmente.'
      },
      {
        id: 'dia-1-4',
        speaker: 'Tu turno',
        speakerRole: 'Preguntar con cortesía',
        jp: '¿Qué le preguntas con cortesía si quieres saber su ocupación o confirmarla?',
        kana: '',
        romaji: '',
        es: '',
        options: [
          {
            textJp: '佐藤さんは 社員ですか。',
            textKana: 'さとうさんは しゃいんですか。',
            textEs: '¿La Srta. Sato es empleada de la empresa?',
            isCorrect: true,
            feedback: '¡Perfecto! Se utiliza el apellido + さん y la partícula interrogativa ですか.'
          },
          {
            textJp: 'あなたは だれですか。',
            textKana: 'あなたは だれですか。',
            textEs: '¿Tú quién eres? (descortés)',
            isCorrect: false,
            feedback: 'Decir あなた y だれ suena demasiado directo y descortés al conocer a un colega.'
          }
        ]
      }
    ]
  },
  {
    id: 'dia-2',
    lesson: 2,
    title: 'Saludo a los nuevos vecinos y entrega del regalo (お土産)',
    description: 'Santos y su esposa se mudan y visitan al vecino de al lado con un pequeño detalle.',
    lines: [
      {
        id: 'dia-2-1',
        speaker: 'Santos',
        speakerRole: 'Nuevo vecino',
        jp: 'はい。どなたですか。……あ、401号室の サントスです。',
        kana: 'はい。どなたですか。……あ、401ごうしつの サントスです。',
        romaji: 'Hai. Donata desu ka? ... A, 401-goushitsu no Santosu desu.',
        es: 'Sí, ¿quién es? ... Ah, soy Santos del departamento 401.'
      },
      {
        id: 'dia-2-2',
        speaker: 'Santos',
        speakerRole: 'Nuevo vecino',
        jp: 'こんにちは。これから お世話に なります。',
        kana: 'こんにちは。これから おせわに なります。',
        romaji: 'Konnichiwa. Korekara osewa ni narimasu.',
        es: 'Buenas tardes. Le agradezco de antemano su buena vecindad y gentil apoyo.'
      },
      {
        id: 'dia-2-3',
        speaker: 'Vecino (Yamada)',
        speakerRole: 'Vecino residente',
        jp: 'こちらこそ どうぞ よろしく お願いします。',
        kana: 'こちらこそ どうぞ よろしく おねがいします。',
        romaji: 'Kochirakoso douzo yoroshiku onegaishimasu.',
        es: 'Al contrario, igualmente encantado de tenerle como vecino.'
      },
      {
        id: 'dia-2-4',
        speaker: 'Santos',
        speakerRole: 'Ofreciendo el detalle',
        jp: 'あのう、これ、コーヒーです。どうぞ。',
        kana: 'あのう、これ、コーヒーです。どうぞ。',
        romaji: 'Anou, kore, koohii desu. Douzo.',
        es: 'Eh... esto es café (de Brasil). Por favor, tómelo.'
      },
      {
        id: 'dia-2-5',
        speaker: 'Vecino (Yamada)',
        speakerRole: 'Agradecimiento',
        jp: 'どうも ありがとう ございます。',
        kana: 'どうも ありがとう ございます。',
        romaji: 'Doumo arigatou gozaimasu.',
        es: 'Muchísimas gracias.'
      }
    ]
  },
  {
    id: 'dia-3',
    lesson: 2,
    title: '¿De quién es este paraguas en el aula?',
    description: 'Al terminar la clase, alguien encuentra un paraguas olvidado en el salón.',
    lines: [
      {
        id: 'dia-3-1',
        speaker: 'Estudiante A',
        speakerRole: 'Preguntando en el salón',
        jp: 'あのう、失礼ですが、これは だれの 傘ですか。',
        kana: 'あのう、しつれいですが、これは だれの かさですか。',
        romaji: 'Anou, shitsurei desu ga, kore wa dare no kasa desu ka.',
        es: 'Disculpen, ¿de quién es este paraguas?'
      },
      {
        id: 'dia-3-2',
        speaker: 'Estudiante B',
        speakerRole: 'Respondiendo',
        jp: 'その傘ですか。……いいえ、わたしのでは ありません。',
        kana: 'そのかさですか。……いいえ、わたしのでは ありません。',
        romaji: 'Sono kasa desu ka? ... Iie, watashi no dewa arimasen.',
        es: '¿Ese paraguas? ... No, no es el mío.'
      },
      {
        id: 'dia-3-3',
        speaker: 'Estudiante C',
        speakerRole: 'Señalando al dueño',
        jp: 'あ、シュミットさんのですよ。',
        kana: 'あ、シュミットさんのですよ。',
        romaji: 'A, Shumitto-san no desu yo.',
        es: '¡Ah! Es del Sr. Schmidt.'
      },
      {
        id: 'dia-3-4',
        speaker: 'Estudiante A',
        speakerRole: 'Comprendiendo',
        jp: 'そうですか。ありがとう ございます。',
        kana: 'そうですか。ありがとう ございます。',
        romaji: 'Sou desu ka. Arigatou gozaimasu.',
        es: 'Ah, ya veo. Muchas gracias.'
      }
    ]
  },
  {
    id: 'dia-4',
    lesson: 3,
    title: 'Deme este, por favor (これを ください)',
    description: 'María visita unos grandes almacenes (デパート) para comprar vino. Localiza la sección en el subsuelo, pide ver una botella, averigua procedencia y precio, y formaliza la compra.',
    lines: [
      {
        id: 'dia-4-1',
        speaker: 'Vendedor A',
        speakerRole: 'Recepción del almacén',
        jp: 'いらっしゃいませ。',
        kana: 'いらっしゃいませ。',
        romaji: 'Irasshaimase.',
        es: '¡Bienvenida!'
      },
      {
        id: 'dia-4-2',
        speaker: 'María',
        speakerRole: 'Cliente',
        jp: 'すみません。ワイン売り場は どこですか。',
        kana: 'すみません。ワインうりばは どこですか。',
        romaji: 'Sumimasen. Wain uriba wa doko desu ka.',
        es: 'Por favor, ¿dónde está la sección de vinos?'
      },
      {
        id: 'dia-4-3',
        speaker: 'Vendedor A',
        speakerRole: 'Dependiente',
        jp: '地下1階で ございます。',
        kana: 'ちかいっかいで ございます。',
        romaji: 'Chika ikkai de gozaimasu.',
        es: 'Está en el primer piso del subsuelo, señora.'
      },
      {
        id: 'dia-4-4',
        speaker: 'María',
        speakerRole: 'Cliente',
        jp: 'どうも。',
        kana: 'どうも。',
        romaji: 'Doumo.',
        es: 'Muchas gracias.'
      },
      {
        id: 'dia-4-5',
        speaker: 'María',
        speakerRole: 'En la sección de vinos',
        jp: 'すみません。その ワインを 見せて ください。',
        kana: 'すみません。その ワインを みせて ください。',
        romaji: 'Sumimasen. Sono wain o misete kudasai.',
        es: 'Por favor, ¿puede mostrarme ese vino?'
      },
      {
        id: 'dia-4-6',
        speaker: 'Vendedor B',
        speakerRole: 'Sommelier',
        jp: 'はい、どうぞ。',
        kana: 'はい、どうぞ。',
        romaji: 'Hai, douzo.',
        es: 'Sí, aquí tiene.'
      },
      {
        id: 'dia-4-7',
        speaker: 'María',
        speakerRole: 'Preguntando origen',
        jp: 'これは どこの ワインですか。',
        kana: 'これは どこの ワインですか。',
        romaji: 'Kore wa doko no wain desu ka.',
        es: '¿De dónde es este vino?'
      },
      {
        id: 'dia-4-8',
        speaker: 'Vendedor B',
        speakerRole: 'Sommelier',
        jp: '日本の ワインです。',
        kana: 'にほんの ワインです。',
        romaji: 'Nihon no wain desu.',
        es: 'Es vino japonés.'
      },
      {
        id: 'dia-4-9',
        speaker: 'María',
        speakerRole: 'Tu turno: Preguntar el precio',
        jp: 'いくらですか。',
        kana: 'いくらですか。',
        romaji: 'Ikura desu ka.',
        es: '¿Cuánto cuesta?',
        options: [
          {
            textJp: 'いくらですか。',
            textKana: 'いくらですか。',
            textEs: '¿Cuánto cuesta?',
            isCorrect: true,
            feedback: '¡Exacto! いくら es la palabra precisa para preguntar por el precio de una mercancía.'
          },
          {
            textJp: 'どちらですか。',
            textKana: 'どちらですか。',
            textEs: '¿Por dónde queda? / ¿Dónde está?',
            isCorrect: false,
            feedback: 'どちら pregunta por dirección o ubicación cortés, no por el precio en dinero.'
          },
          {
            textJp: '何ですか。',
            textKana: 'なんですか。',
            textEs: '¿Qué es?',
            isCorrect: false,
            feedback: '何ですか pregunta por la naturaleza del objeto, no por cuánto vale.'
          }
        ]
      },
      {
        id: 'dia-4-10',
        speaker: 'Vendedor B',
        speakerRole: 'Sommelier',
        jp: '2,500円です。',
        kana: 'にせんごひゃくえんです。',
        romaji: 'Nisen gohyaku en desu.',
        es: '2.500 yenes, señora.'
      },
      {
        id: 'dia-4-11',
        speaker: 'María',
        speakerRole: 'Cerrando la compra',
        jp: 'じゃ、これを ください。',
        kana: 'じゃ、これを ください。',
        romaji: 'Ja, kore o kudasai.',
        es: 'Entonces, deme este, por favor.'
      }
    ]
  },
  {
    id: 'dia-5',
    lesson: 3,
    title: 'Consultando ubicaciones en una empresa',
    description: 'Un cliente llega a las oficinas de 3A Corporation y pregunta cortésmente por la sala de conferencias y por el Sr. Yamada.',
    lines: [
      {
        id: 'dia-5-1',
        speaker: 'Visitante',
        speakerRole: 'Cliente',
        jp: 'すみません。山田さんは どこですか。',
        kana: 'すみません。やまださんは どこですか。',
        romaji: 'Sumimasen. Yamada-san wa doko desu ka.',
        es: 'Disculpe, ¿dónde está el Sr. Yamada?'
      },
      {
        id: 'dia-5-2',
        speaker: 'Recepcionista',
        speakerRole: 'Recepción',
        jp: '山田さんは 会議室です。',
        kana: 'やまださんは かいぎしつです。',
        romaji: 'Yamada-san wa kaigishitsu desu.',
        es: 'El Sr. Yamada está en la sala de reuniones.'
      },
      {
        id: 'dia-5-3',
        speaker: 'Visitante',
        speakerRole: 'Tu turno: Preguntar por la sala con cortesía',
        jp: '会議室は どちらですか。',
        kana: 'かいぎしつは どちらですか。',
        romaji: 'Kaigishitsu wa dochira desu ka.',
        es: '¿Por dónde queda la sala de reuniones?',
        options: [
          {
            textJp: '会議室は どちらですか。',
            textKana: 'かいぎしつは どちらですか。',
            textEs: '¿Por dónde queda la sala de reuniones?',
            isCorrect: true,
            feedback: '¡Excelente! どちら es la forma cortés ideal para un entorno profesional.'
          },
          {
            textJp: '会議室は だれですか。',
            textKana: 'かいぎしつは だれですか。',
            textEs: '¿Quién es la sala de reuniones?',
            isCorrect: false,
            feedback: 'だれ pregunta por personas, no por ubicaciones.'
          }
        ]
      },
      {
        id: 'dia-5-4',
        speaker: 'Recepcionista',
        speakerRole: 'Indicando el camino',
        jp: 'あちらで ございます。エレベーターの 隣です。',
        kana: 'あちらで ございます。エレベーターの となりです。',
        romaji: 'Achira de gozaimasu. Erebeetaa no tonari desu.',
        es: 'Está por allí, junto al ascensor.'
      },
      {
        id: 'dia-5-5',
        speaker: 'Visitante',
        speakerRole: 'Agradeciendo',
        jp: 'どうも ありがとうございます。',
        kana: 'どうも ありがとう ございます。',
        romaji: 'Doumo arigatou gozaimasu.',
        es: 'Muchísimas gracias.'
      }
    ]
  }

];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    lesson: 1,
    type: 'meaning',
    prompt: '¿Qué significa la palabra 「かいしゃいん (会社員)」?',
    options: ['Estudiante universitario', 'Empleado de una compañía / oficinista', 'Médico en un hospital', 'Profesor de escuela'],
    correctIndex: 1,
    explanation: '会社員 (kaishain) significa empleado de empresa. 学生 es estudiante e 医者 es médico.'
  },
  {
    id: 'q-2',
    lesson: 1,
    type: 'grammar',
    prompt: '¿Cómo se niega de forma cortés cotidiana "El Sr. Santos no es médico"?',
    options: [
      'サントスさんは 医者です。',
      'サントスさんは 医者じゃ ありません。',
      'サントスさんも 医者ですか。',
      'サントスさんは 医者ありません。'
    ],
    correctIndex: 1,
    explanation: 'じゃ ありません es la forma negativa cortés de です.'
  },
  {
    id: 'q-3',
    lesson: 1,
    type: 'meaning',
    prompt: '¿Cuál es la forma más cortés y respetuosa de preguntar "¿Quién es aquella persona?"?',
    options: [
      'あの人は だれですか。',
      'あの方は どなたですか。',
      'あなたは だれですか。',
      'あの人は なんさいですか。'
    ],
    correctIndex: 1,
    explanation: 'あの方 (ano kata) y どなた (donata) son las contrapartes corteses de あの人 y だれ.'
  },
  {
    id: 'q-4',
    lesson: 1,
    type: 'fill_blank',
    prompt: 'Completa: ミラーさんは アメリカ人です。スミスさん【 ？ 】アメリカ人です。',
    options: ['は', 'も', 'の', 'か'],
    correctIndex: 1,
    explanation: 'La partícula も significa "también" e indica que Smith-san comparte la misma nacionalidad.'
  },
  {
    id: 'q-5',
    lesson: 2,
    type: 'grammar',
    prompt: 'Si tienes un objeto en TU mano y quieres preguntar qué es, ¿cuál demostrativo usas?',
    options: ['それ', 'これ', 'あれ', 'どれ'],
    correctIndex: 1,
    explanation: 'これ se utiliza para objetos que están en manos o cerca del hablante.'
  },
  {
    id: 'q-6',
    lesson: 2,
    type: 'grammar',
    prompt: '¿Cuál oración es GRAMATICALMENTE CORRECTA?',
    options: [
      'このは 本です。',
      'この本は わたしのです。',
      'これは本は わたしのです。',
      'あれ本は 辞書です。'
    ],
    correctIndex: 1,
    explanation: 'この debe acompañar de inmediato a un sustantivo (この本). これ actúa solo (これは...).'
  },
  {
    id: 'q-7',
    lesson: 2,
    type: 'fill_blank',
    prompt: 'Te preguntan: 「それは 辞書ですか。」 Si NO es un diccionario sino un libro de notas, ¿qué respondes?',
    options: [
      'はい、辞書です。',
      'いいえ、違います。ノートです。',
      'はい、違います。',
      'いいえ、そうです。'
    ],
    correctIndex: 1,
    explanation: 'いいえ、違います。(No, no es así / es distinto) seguido de la corrección ノートです.'
  },
  {
    id: 'q-8',
    lesson: 2,
    type: 'meaning',
    prompt: '¿Qué significa la expresión 「これから お世話に なります」?',
    options: [
      'Mucho gusto en conocerlo por primera vez.',
      'Le agradezco de antemano su gentil apoyo y cooperación.',
      'Hasta luego, que tenga buen viaje.',
      'Disculpe, ¿me puede prestar su paraguas?'
    ],
    correctIndex: 1,
    explanation: 'Se usa típicamente entre vecinos o nuevos integrantes de un equipo de trabajo.'
  },
  {
    id: 'q-9',
    lesson: 2,
    type: 'grammar',
    prompt: '¿Cómo se pregunta "¿Esto es un 9 o un 7?" (pregunta alternativa)?',
    options: [
      'これは「９」ですか、「７」ですか。',
      'これは「９」と「７」ですか。',
      'これは「９」か「７」ですね。',
      'これは「９」じゃ ありませんか。'
    ],
    correctIndex: 0,
    explanation: 'Las preguntas alternativas enprecian 〜ですか、〜ですか y se contestan con la opción elegida.'
  },
  {
    id: 'q-10',
    lesson: 2,
    type: 'meaning',
    prompt: '¿Cuál es la diferencia entre 「ほん」 y 「じしょ」?',
    options: [
      'ほん es periódico y じしょ es revista.',
      'ほん es libro y じしょ es diccionario.',
      'ほん es cuaderno y じしょ es agenda.',
      'ほん es tarjeta y じしょ es bolígrafo.'
    ],
    correctIndex: 1,
    explanation: '本 (ほん) = libro, 辞書 (じしょ) = diccionario.'
  },
  {
    id: 'q-11',
    lesson: 3,
    type: 'meaning',
    prompt: '¿Qué significa la palabra 「じどうはんばいき (自動販売機)」?',
    options: ['Escalera mecánica', 'Máquina de venta automática / expendedora', 'Ascensor o elevador', 'Cajero automático bancario'],
    correctIndex: 1,
    explanation: '自動販売機 (jidouhanbaiki) es la máquina expendedora, omnipresente en todo Japón.'
  },
  {
    id: 'q-12',
    lesson: 3,
    type: 'grammar',
    prompt: 'Si quieres señalar el lugar exacto en el que TÚ te encuentras parado ("aquí"), ¿cuál demostrativo usas?',
    options: ['そこ', 'ここ', 'あそこ', 'どこ'],
    correctIndex: 1,
    explanation: 'ここ indica el lugar del hablante ("aquí"). そこ es cerca del oyente y あそこ lejos de ambos.'
  },
  {
    id: 'q-13',
    lesson: 3,
    type: 'grammar',
    prompt: '¿Cuál es la forma MÁS CORTÉS y respetuosa de preguntar "¿Dónde está el ascensor?" a un cliente?',
    options: [
      'エレベーターは どこですか。',
      'エレベーターは どちらですか。',
      'エレベーターは どれですか。',
      'エレベーターは なんかいですか。'
    ],
    correctIndex: 1,
    explanation: 'どちら es la forma cortés de どこ empleada en atención al público y situaciones formales.'
  },
  {
    id: 'q-14',
    lesson: 3,
    type: 'grammar',
    prompt: '¿Cómo se pregunta en japonés "¿De qué país / fabricante es esta computadora?"?',
    options: [
      'これは だれの コンピューターですか。',
      'これは なんの コンピューターですか。',
      'これは どこの コンピューターですか。',
      'これは いくらの コンピューターですか。'
    ],
    correctIndex: 2,
    explanation: 'どこの [Producto] pregunta por el país de fabricación o por la compañía fabricante.'
  },
  {
    id: 'q-15',
    lesson: 3,
    type: 'meaning',
    prompt: '¿Qué cantidad en yenes expresa la cifra 「18,600円」 pronunciada 「いちまんはっせんろっぴゃくえん」?',
    options: ['1.860 yenes', '18.600 yenes', '186.000 yenes', '180.600 yenes'],
    correctIndex: 1,
    explanation: '一万 (10.000) + 八千 (8.000) + 六百 (600) = 18.600 yenes.'
  },
  {
    id: 'q-16',
    lesson: 3,
    type: 'fill_blank',
    prompt: 'Al decidir comprar un producto que te acaba de enseñar el dependiente, ¿qué frase dices?',
    options: [
      'これを 見せてください。',
      'これを ください。',
      'これを どうぞ。',
      'これを 違います。'
    ],
    correctIndex: 1,
    explanation: '「これを ください」 significa "Déme este, por favor", cerrando la compra formalmente.'
  },
  {
    id: 'q-17',
    lesson: 3,
    type: 'grammar',
    prompt: 'Si te preguntan 「お国は どちらですか」, ¿qué te están preguntando?',
    options: [
      '¿A qué hora sale tu tren a Osaka?',
      '¿De qué país es usted originario?',
      '¿En qué piso está tu habitación?',
      '¿Cuál es el precio de tu pasaporte?'
    ],
    correctIndex: 1,
    explanation: 'お国 (país de usted con prefijo de cortesía) + どちらですか (¿dónde / cuál con cortesía).'
  },
  {
    id: 'q-18',
    lesson: 3,
    type: 'audio',
    prompt: 'Escucha el audio. ¿Qué lugar o dependencia se está indicando?',
    audioText: 'しょくどうは ちかいっかいです。',
    options: [
      'El comedor está en el primer subsuelo (sótano 1).',
      'La oficina está en el segundo piso.',
      'La recepción está en el tercer piso.',
      'Los baños están en la azotea.'
    ],
    correctIndex: 0,
    explanation: '食堂 (しょくどう = comedor) + は + 地下1階 (ちかいっかい = sótano 1) + です.'
  }

];

