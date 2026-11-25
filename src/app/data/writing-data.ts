import { WritingCategory, WritingExercise } from '../models/japanese.models';

export interface KosoadoOptionItem {
  key: string;
  label: string;
  sublabel: string;
}

export interface KosoadoEntry {
  prefix: 'ko' | 'so' | 'a' | 'do';
  series: 're' | 'no' | 'koko' | 'chira';
  word: string;
  romaji: string;
  meaning: string;
  grammarNote: string;
  exampleJp: string;
  exampleKana: string;
  exampleRomaji: string;
  exampleEs: string;
  isIrregular?: boolean;
}

export interface ParticleBlueprint {
  particle: 'は' | 'の' | 'も' | 'か' | 'を';
  imeKey: string;
  pronunciation: string;
  title: string;
  formula: string;
  summary: string;
  exampleJp: string;
  exampleKana: string;
  exampleRomaji: string;
  exampleEs: string;
  commonMistake: string;
}

export interface WordBuildingRecipe {
  id: string;
  title: string;
  pattern: string;
  explanation: string;
  parts: { label: string; value: string; role: string }[];
  resultJp: string;
  resultKana: string;
  resultRomaji: string;
  resultEs: string;
}

export const WRITING_CATEGORY_LABELS: Record<WritingCategory, string> = {
  kosoado: 'これ・それ・あれ (Ko-So-A-Do)',
  particles: 'Partículas (は・の・も・か・を)',
  word_building: 'Armar Palabras',
  sentences: 'Frases Completas'
};

export const KOSOADO_PREFIXES: KosoadoOptionItem[] = [
  { key: 'ko', label: 'こ (Ko)', sublabel: 'Cerca de mí (hablante)' },
  { key: 'so', label: 'そ (So)', sublabel: 'Cerca de ti (oyente)' },
  { key: 'a', label: 'あ (A)', sublabel: 'Lejos de ambos' },
  { key: 'do', label: 'ど (Do)', sublabel: 'Pregunta (¿cuál/dónde?)' }
];

export const KOSOADO_SERIES: KosoadoOptionItem[] = [
  { key: 're', label: '+ れ', sublabel: 'Objeto (va solo)' },
  { key: 'no', label: '+ の + Sustantivo', sublabel: 'Modificador (acompaña)' },
  { key: 'koko', label: 'Lugar (ここ)', sublabel: 'Sitio físico' },
  { key: 'chira', label: '+ ちら', sublabel: 'Dirección / Muy cortés' }
];

export const KOSOADO_MATRIX: KosoadoEntry[] = [
  // Serie -れ (Pronombres de objeto)
  {
    prefix: 'ko',
    series: 're',
    word: 'これ',
    romaji: 'kore',
    meaning: 'esto / éste / ésta (objeto cerca de mí)',
    grammarNote: 'Va solo como sujeto o complemento, nunca pegado directamente a un sustantivo.',
    exampleJp: 'これは 本です。',
    exampleKana: 'これは ほんです。',
    exampleRomaji: 'Kore wa hon desu.',
    exampleEs: 'Esto es un libro.'
  },
  {
    prefix: 'so',
    series: 're',
    word: 'それ',
    romaji: 'sore',
    meaning: 'eso / ése / ésa (objeto cerca de ti)',
    grammarNote: 'Se refiere a un objeto que sostiene o tiene cerca la persona con la que hablas.',
    exampleJp: 'それは 辞書ですか。',
    exampleKana: 'それは じしょですか。',
    exampleRomaji: 'Sore wa jisho desu ka.',
    exampleEs: '¿Eso es un diccionario?'
  },
  {
    prefix: 'a',
    series: 're',
    word: 'あれ',
    romaji: 'are',
    meaning: 'aquello / aquél / aquélla (lejos de ambos)',
    grammarNote: 'Señala algo distante tanto para ti como para tu interlocutor.',
    exampleJp: 'あれは 車です。',
    exampleKana: 'あれは くるまです。',
    exampleRomaji: 'Are wa kuruma desu.',
    exampleEs: 'Aquello es un automóvil.'
  },
  {
    prefix: 'do',
    series: 're',
    word: 'どれ',
    romaji: 'dore',
    meaning: '¿cuál? (entre tres o más cosas)',
    grammarNote: 'Pregunta por un objeto específico dentro de un grupo visible.',
    exampleJp: 'あなたの 傘は どれですか。',
    exampleKana: 'あなたの かさは どれですか。',
    exampleRomaji: 'Anata no kasa wa dore desu ka.',
    exampleEs: '¿Cuál es tu paraguas?'
  },

  // Serie -の (Modificadores + Sustantivo)
  {
    prefix: 'ko',
    series: 'no',
    word: 'この + [Sustantivo]',
    romaji: 'kono + S',
    meaning: 'este / esta + [objeto cerca de mí]',
    grammarNote: 'SIEMPRE lleva un sustantivo justo después. Nunca digas "このは...".',
    exampleJp: 'この本は わたしのです。',
    exampleKana: 'このほんは わたしのです。',
    exampleRomaji: 'Kono hon wa watashi no desu.',
    exampleEs: 'Este libro es mío.'
  },
  {
    prefix: 'so',
    series: 'no',
    word: 'その + [Sustantivo]',
    romaji: 'sono + S',
    meaning: 'ese / esa + [objeto cerca de ti]',
    grammarNote: 'Acompaña al sustantivo que está junto al oyente.',
    exampleJp: 'その傘は 佐藤さんのですか。',
    exampleKana: 'そのかさは さとうさんのですか。',
    exampleRomaji: 'Sono kasa wa Satou-san no desu ka.',
    exampleEs: '¿Ese paraguas es de Sato?'
  },
  {
    prefix: 'a',
    series: 'no',
    word: 'あの + [Sustantivo]',
    romaji: 'ano + S',
    meaning: 'aquel / aquella + [objeto o persona lejana]',
    grammarNote: 'También se usa con personas: あの人 (aquella persona) o あの方 (cortés).',
    exampleJp: 'あの方は どなたですか。',
    exampleKana: 'あのかたは どなたですか。',
    exampleRomaji: 'Ano kata wa donata desu ka.',
    exampleEs: '¿Quién es aquella persona?'
  },
  {
    prefix: 'do',
    series: 'no',
    word: 'どの + [Sustantivo]',
    romaji: 'dono + S',
    meaning: '¿qué / cuál + [sustantivo]?',
    grammarNote: 'Forma interrogativa que acompaña a un sustantivo.',
    exampleJp: 'どの 本ですか。',
    exampleKana: 'どの ほんですか。',
    exampleRomaji: 'Dono hon desu ka.',
    exampleEs: '¿Cuál libro es?'
  },

  // Serie Lugar (ここ・そこ・あそこ・どこ)
  {
    prefix: 'ko',
    series: 'koko',
    word: 'ここ',
    romaji: 'koko',
    meaning: 'aquí (lugar donde estoy yo)',
    grammarNote: 'Señala el espacio actual del hablante o el área que comparten ambos.',
    exampleJp: 'ここは 食堂です。',
    exampleKana: 'ここは しょくどうです。',
    exampleRomaji: 'Koko wa shokudou desu.',
    exampleEs: 'Aquí es el comedor.'
  },
  {
    prefix: 'so',
    series: 'koko',
    word: 'そこ',
    romaji: 'soko',
    meaning: 'ahí (lugar donde estás tú)',
    grammarNote: 'Señala el sitio donde se encuentra la otra persona.',
    exampleJp: '受付は そこですか。',
    exampleKana: 'うけつけは そこですか。',
    exampleRomaji: 'Uketsuke wa soko desu ka.',
    exampleEs: '¿Ahí es la recepción?'
  },
  {
    prefix: 'a',
    series: 'koko',
    word: 'あそこ',
    romaji: 'asoko',
    meaning: 'allí / allá (lugar lejos de ambos)',
    grammarNote: '¡Atención! Es irregular: no se dice "あこ", sino あそこ (asoko).',
    exampleJp: 'お手洗いは あそこです。',
    exampleKana: 'おてあらいは あそこです。',
    exampleRomaji: 'Otearai wa asoko desu.',
    exampleEs: 'El baño está allí.',
    isIrregular: true
  },
  {
    prefix: 'do',
    series: 'koko',
    word: 'どこ',
    romaji: 'doko',
    meaning: '¿dónde?',
    grammarNote: 'Sirve tanto para lugares físicos como para preguntar el nombre de una escuela o empresa.',
    exampleJp: 'トイレは どこですか。',
    exampleKana: 'トイレは どこですか。',
    exampleRomaji: 'Toire wa doko desu ka.',
    exampleEs: '¿Dónde está el baño?'
  },

  // Serie -ちら (Dirección y Cortesía)
  {
    prefix: 'ko',
    series: 'chira',
    word: 'こちら',
    romaji: 'kochira',
    meaning: 'por aquí / aquí (muy cortés)',
    grammarNote: 'También se usa para presentar a alguien: こちらは ミラーさんです.',
    exampleJp: '電話は こちらです。',
    exampleKana: 'でんわは こちらです。',
    exampleRomaji: 'Denwa wa kochira desu.',
    exampleEs: 'El teléfono está por aquí.'
  },
  {
    prefix: 'so',
    series: 'chira',
    word: 'そちら',
    romaji: 'sochira',
    meaning: 'por ahí / ahí (muy cortés)',
    grammarNote: 'Indica dirección o ubicación junto al oyente con respeto.',
    exampleJp: 'エスカレーターは そちらです。',
    exampleKana: 'エスカレーターは そちらです。',
    exampleRomaji: 'Esukareetaa wa sochira desu.',
    exampleEs: 'La escalera mecánica está por ahí.'
  },
  {
    prefix: 'a',
    series: 'chira',
    word: 'あちら',
    romaji: 'achira',
    meaning: 'por allí / allá (muy cortés)',
    grammarNote: 'Muy usada en tiendas, hoteles y oficinas para guiar al visitante.',
    exampleJp: 'エレベーターは あちらです。',
    exampleKana: 'エレベーターは あちらです。',
    exampleRomaji: 'Erebeetaa wa achira desu.',
    exampleEs: 'El ascensor está por allí.'
  },
  {
    prefix: 'do',
    series: 'chira',
    word: 'どちら',
    romaji: 'dochira',
    meaning: '¿por dónde? / ¿dónde? (forma cortés)',
    grammarNote: 'Imprescindible para preguntar con respeto el país (お国) o empresa (会社).',
    exampleJp: 'お国は どちらですか。',
    exampleKana: 'おくには どちらですか。',
    exampleRomaji: 'Okuni wa dochira desu ka.',
    exampleEs: '¿De qué país es usted?'
  }
];

export const PARTICLE_BLUEPRINTS: ParticleBlueprint[] = [
  {
    particle: 'は',
    imeKey: 'Teclea "ha"',
    pronunciation: 'Se pronuncia "wa"',
    title: 'Partícula de Tema (Marcador principal)',
    formula: '[Tema de quien hablamos] + は + [Información] + です',
    summary:
      'Presenta el tema de la oración ("en cuanto a..."). Va justo después de la palabra que quieres describir.',
    exampleJp: 'これは 本です。',
    exampleKana: 'これは ほんです。',
    exampleRomaji: 'Kore wa hon desu.',
    exampleEs: 'Esto es un libro.',
    commonMistake: 'Nunca escribas わ para la partícula; siempre se escribe は aunque suene "wa".'
  },
  {
    particle: 'の',
    imeKey: 'Teclea "no"',
    pronunciation: 'Se pronuncia "no"',
    title: 'Partícula Conectora (Posesión, Origen y Contenido)',
    formula: '[Dueño / País / Materia] + の + [Objeto o Puesto]',
    summary:
      'Une dos sustantivos como el "de" en español, pero en orden inverso: primero va lo que modifica y al final el objeto principal.',
    exampleJp: 'わたしの 本 / 日本の ワイン',
    exampleKana: 'わたしの ほん / にほんの ワイン',
    exampleRomaji: 'Watashi no hon / Nihon no wain',
    exampleEs: 'Mi libro / Vino de Japón',
    commonMistake: 'Invertir el orden: en japonés el dueño o país siempre va ANTES de の.'
  },
  {
    particle: 'も',
    imeKey: 'Teclea "mo"',
    pronunciation: 'Se pronuncia "mo"',
    title: 'Partícula de Inclusión ("También")',
    formula: '[Otro sujeto] + も + [Misma característica] + です',
    summary:
      'Reemplaza completamente a は cuando el nuevo sujeto comparte exactamente la misma condición que el anterior.',
    exampleJp: 'わたしも 学生です。',
    exampleKana: 'わたしも がくせいです。',
    exampleRomaji: 'Watashi mo gakusei desu.',
    exampleEs: 'Yo también soy estudiante.',
    commonMistake: 'No pongas は y も juntas (nunca "はも"). も sustituye a は.'
  },
  {
    particle: 'か',
    imeKey: 'Teclea "ka"',
    pronunciation: 'Se pronuncia "ka"',
    title: 'Partícula Interrogativa (Signo de pregunta)',
    formula: '[Oración afirmativa] + か',
    summary:
      'Transforma cualquier afirmación en una pregunta al colocarse al final. No cambia el orden de las palabras.',
    exampleJp: 'それは 辞書ですか。',
    exampleKana: 'それは じしょですか。',
    exampleRomaji: 'Sore wa jisho desu ka.',
    exampleEs: '¿Eso es un diccionario?',
    commonMistake: 'Olvidar escribir か al final cuando traduces una pregunta.'
  },
  {
    particle: 'を',
    imeKey: 'Teclea "wo"',
    pronunciation: 'Se pronuncia "o"',
    title: 'Partícula de Objeto Directo',
    formula: '[Objeto que pides o muestras] + を + [ください / 見せてください]',
    summary:
      'Señala el objeto directo sobre el que recae una acción, como pedir algo en una tienda (ください) o pedir que te lo muestren.',
    exampleJp: 'これを ください。',
    exampleKana: 'これを ください。',
    exampleRomaji: 'Kore o kudasai.',
    exampleEs: 'Deme este, por favor.',
    commonMistake: 'No la confundas con la vocal お ("o"); para la partícula teclea siempre "wo".'
  }
];

export const WORD_BUILDING_RECIPES: WordBuildingRecipe[] = [
  {
    id: 'wb-jin',
    title: 'Nacionalidad: País + じん',
    pattern: '[País] + じん (人)',
    explanation: 'Añade じん al nombre de cualquier país para decir la nacionalidad de una persona.',
    parts: [
      { label: 'País', value: 'にほん', role: 'Japón' },
      { label: 'Sufijo', value: 'じん', role: 'persona de' }
    ],
    resultJp: '日本人',
    resultKana: 'にほんじん',
    resultRomaji: 'Nihon-jin',
    resultEs: 'Japonés / japonesa (persona)'
  },
  {
    id: 'wb-go',
    title: 'Idioma: País + ご',
    pattern: '[País] + ご (語)',
    explanation: 'Añade ご al nombre del país para formar el nombre del idioma.',
    parts: [
      { label: 'País', value: 'にほん', role: 'Japón' },
      { label: 'Sufijo', value: 'ご', role: 'idioma' }
    ],
    resultJp: '日本語',
    resultKana: 'にほんご',
    resultRomaji: 'Nihongo',
    resultEs: 'Idioma japonés'
  },
  {
    id: 'wb-o-prefix',
    title: 'Cortesía: お + Sustantivo',
    pattern: 'お + [Palabra]',
    explanation:
      'El prefijo お añade respeto y elegancia cuando te refieres a cosas del oyente o palabras de cortesía.',
    parts: [
      { label: 'Prefijo', value: 'お', role: 'cortesía' },
      { label: 'Base', value: 'くに', role: 'país' }
    ],
    resultJp: 'お国',
    resultKana: 'おくに',
    resultRomaji: 'okuni',
    resultEs: 'su país (de usted)'
  },
  {
    id: 'wb-no-chain',
    title: 'Sustantivos compuestos: S1 の S2',
    pattern: '[Modificador] + の + [Objeto]',
    explanation:
      'Une dos sustantivos. El segundo sustantivo (S2) es el objeto principal; el primero (S1) dice de quién es, de qué trata o de dónde viene.',
    parts: [
      { label: 'S1', value: 'わたし', role: 'yo' },
      { label: 'Partícula', value: 'の', role: 'de' },
      { label: 'S2', value: 'ほん', role: 'libro' }
    ],
    resultJp: 'わたしの 本',
    resultKana: 'わたしの ほん',
    resultRomaji: 'watashi no hon',
    resultEs: 'mi libro'
  },
  {
    id: 'wb-neg',
    title: 'Negación cortés: じゃ ありません',
    pattern: '[Sustantivo] + じゃ ありません',
    explanation:
      'Para decir "no es...", simplemente sustituye です al final por じゃ ありません.',
    parts: [
      { label: 'Sustantivo', value: 'がくせい', role: 'estudiante' },
      { label: 'Negación', value: 'じゃありません', role: 'no es' }
    ],
    resultJp: '学生じゃ ありません',
    resultKana: 'がくせいじゃ ありません',
    resultRomaji: 'gakusei ja arimasen',
    resultEs: 'no es estudiante'
  },
  {
    id: 'wb-no-pronoun',
    title: 'Pronombre posesivo: わたしの',
    pattern: '[Persona] + の + です',
    explanation:
      'Si el objeto ya se mencionó antes, puedes omitirlo después de の para decir "el mío / el de...".',
    parts: [
      { label: 'Poseedor', value: 'わたし', role: 'yo' },
      { label: 'Sustituto', value: 'の', role: 'el de' },
      { label: 'Cópula', value: 'です', role: 'es' }
    ],
    resultJp: 'わたしのです',
    resultKana: 'わたしのです',
    resultRomaji: 'watashi no desu',
    resultEs: 'es el mío / es mío'
  }
];

export const KANA_WRITING_TIPS: Record<string, string> = {
  こ: '2 trazos horizontales suaves: el superior con un ligero gancho al final, el inferior curvo como una sonrisa.',
  そ: '1 solo trazo continuo en zigzag: empieza arriba a la derecha, cruza hacia abajo y termina en curva.',
  あ: '3 trazos: línea horizontal corta, línea vertical curva y un lazo amplio que rodea la base.',
  れ: '2 trazos: barra vertical izquierda y una línea que sube en pico y cae suave hacia la derecha.',
  の: '1 solo trazo circular: empieza arriba, baja por la izquierda y da la vuelta amplia hacia la derecha.',
  は: '3 trazos: barra vertical izquierda con gancho leve, barra horizontal y vertical derecha con lazo inferior.',
  も: '3 trazos: primero la curva vertical en forma de J y luego dos líneas horizontales que la cruzan.',
  か: '3 trazos: curva con gancho abajo, línea diagonal que la cruza y un trazo corto a la derecha.',
  を: '3 trazos: línea horizontal, trazo curvo en forma de "h" y gancho inferior que envuelve.',
  で: '1 trazo continuo en curva tipo C seguido de dos comillas (dakuten ゛) arriba a la derecha.',
  す: '2 trazos: línea horizontal larga y vertical que hace un pequeño bucle en el centro antes de bajar.',
  ん: '1 trazo fluido parecido a una letra "h" cursiva: baja inclinado, sube y termina hacia arriba.',
  わ: '2 trazos: barra vertical izquierda y una curva en forma de Z que se abre y cae redondeada.',
  い: '2 trazos verticales ligeramente curvos: el izquierdo un poco más largo con gancho hacia el derecho.',
  た: '4 trazos: cruz izquierda (horizontal + vertical inclinada) y dos curvas cortas tipo こ a la derecha.',
  し: '1 trazo simple en forma de gancho o anzuelo suave hacia la derecha.',
  ど: '2 trazos base (vertical inclinada + curva en C) más dakuten (゛) arriba a la derecha.',
  ほ: '4 trazos: parecido a は pero con dos barras horizontales arriba a la derecha.'
};

export interface KanaKeypadRow {
  label: string;
  chars: string[];
}

export const HIRAGANA_QUICK_ROWS: KanaKeypadRow[] = [
  { label: 'Vocales', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'K', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { label: 'S', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { label: 'T', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { label: 'N', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'H', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { label: 'M', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'Y / R', chars: ['や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'W / N', chars: ['わ', 'を', 'ん', 'っ', 'ゃ', 'ゅ', 'ょ'] },
  { label: 'Sonoros ゛', chars: ['が', 'ぎ', 'ぐ', 'じ', 'ぞ', 'だ', 'で', 'ど', 'ば', 'ぶ'] }
];

export const WRITING_EXERCISES: WritingExercise[] = [
  // ================= KOSOADO (11 ejercicios) =================
  {
    id: 'w-koso-1',
    lesson: 2,
    category: 'kosoado',
    difficulty: 1,
    promptEs: 'Esto (objeto que tienes en la mano)',
    contextHint: 'Solo la palabra demostrativa (cerca del hablante).',
    formula: '[こ (cerca de mí)] + [れ (objeto)]',
    targetJp: 'これ',
    targetKana: 'これ',
    targetRomaji: 'kore',
    acceptedAnswers: ['これ'],
    focusDemonstrative: 'これ',
    breakdown: [
      {
        text: 'こ',
        kana: 'こ',
        romaji: 'ko',
        role: 'Prefijo de cercanía',
        meaning: 'cerca de mí (hablante)',
        highlight: 'demonstrative'
      },
      {
        text: 'れ',
        kana: 'れ',
        romaji: 're',
        role: 'Terminación pronominal',
        meaning: 'cosa / objeto (va solo)',
        highlight: 'affix'
      }
    ],
    writingTip: 'Teclea "kore". こ indica cercanía al hablante y れ forma el pronombre independiente.'
  },
  {
    id: 'w-koso-2',
    lesson: 2,
    category: 'kosoado',
    difficulty: 1,
    promptEs: 'Eso (objeto cerca de la persona que escucha)',
    contextHint: 'Solo la palabra demostrativa (cerca del oyente).',
    formula: '[そ (cerca de ti)] + [れ (objeto)]',
    targetJp: 'それ',
    targetKana: 'それ',
    targetRomaji: 'sore',
    acceptedAnswers: ['それ'],
    focusDemonstrative: 'それ',
    breakdown: [
      {
        text: 'そ',
        kana: 'そ',
        romaji: 'so',
        role: 'Prefijo de distancia media',
        meaning: 'cerca de ti (oyente)',
        highlight: 'demonstrative'
      },
      {
        text: 'れ',
        kana: 'れ',
        romaji: 're',
        role: 'Terminación pronominal',
        meaning: 'cosa / objeto',
        highlight: 'affix'
      }
    ],
    writingTip: 'Teclea "sore". Úsalo cuando el objeto lo tiene tu interlocutor.'
  },
  {
    id: 'w-koso-3',
    lesson: 2,
    category: 'kosoado',
    difficulty: 1,
    promptEs: 'Aquello (objeto lejos de ambos)',
    contextHint: 'Solo la palabra demostrativa (lejos de los dos).',
    formula: '[あ (lejos de ambos)] + [れ (objeto)]',
    targetJp: 'あれ',
    targetKana: 'あれ',
    targetRomaji: 'are',
    acceptedAnswers: ['あれ'],
    focusDemonstrative: 'あれ',
    breakdown: [
      {
        text: 'あ',
        kana: 'あ',
        romaji: 'a',
        role: 'Prefijo de lejanía',
        meaning: 'lejos de ambos',
        highlight: 'demonstrative'
      },
      {
        text: 'れ',
        kana: 'れ',
        romaji: 're',
        role: 'Terminación pronominal',
        meaning: 'cosa / objeto',
        highlight: 'affix'
      }
    ],
    writingTip: 'Teclea "are". Señala algo distante para ambos hablantes.'
  },
  {
    id: 'w-koso-4',
    lesson: 2,
    category: 'kosoado',
    difficulty: 1,
    promptEs: 'Esto es un libro.',
    contextHint: 'Usa ほん (hon) para "libro".',
    formula: 'これ + は + ほん + です',
    targetJp: 'これは 本です。',
    targetKana: 'これは ほんです。',
    targetRomaji: 'kore wa hon desu',
    acceptedAnswers: ['これは本です', 'これはほんです'],
    focusParticle: 'は',
    focusDemonstrative: 'これ',
    breakdown: [
      {
        text: 'これ',
        kana: 'これ',
        romaji: 'kore',
        role: 'Demostrativo',
        meaning: 'esto',
        highlight: 'demonstrative'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (teclea ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: '本',
        kana: 'ほん',
        romaji: 'hon',
        role: 'Sustantivo',
        meaning: 'libro',
        highlight: 'noun'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula cortés',
        meaning: 'es',
        highlight: 'copula'
      }
    ],
    writingTip: 'Recuerda escribir la partícula は tecleando "ha" (nunca わ).'
  },
  {
    id: 'w-koso-5',
    lesson: 2,
    category: 'kosoado',
    difficulty: 2,
    promptEs: '¿Eso es un diccionario?',
    contextHint: 'Usa じしょ (jisho) para "diccionario".',
    formula: 'それ + は + じしょ + です + か',
    targetJp: 'それは 辞書ですか。',
    targetKana: 'それは じしょですか。',
    targetRomaji: 'sore wa jisho desu ka',
    acceptedAnswers: ['それは辞書ですか', 'それはじしょですか'],
    focusParticle: 'は',
    focusDemonstrative: 'それ',
    breakdown: [
      {
        text: 'それ',
        kana: 'それ',
        romaji: 'sore',
        role: 'Demostrativo',
        meaning: 'eso (cerca de ti)',
        highlight: 'demonstrative'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: '辞書',
        kana: 'じしょ',
        romaji: 'jisho',
        role: 'Sustantivo',
        meaning: 'diccionario',
        highlight: 'noun'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'es',
        highlight: 'copula'
      },
      {
        text: 'か',
        kana: 'か',
        romaji: 'ka',
        role: 'Partícula interrogativa',
        meaning: 'convierte en pregunta',
        highlight: 'particle'
      }
    ],
    writingTip: 'Para じしょ teclea "jisho". Agrega か al final para formar la pregunta.'
  },
  {
    id: 'w-koso-6',
    lesson: 2,
    category: 'kosoado',
    difficulty: 2,
    promptEs: 'Este libro es mío.',
    contextHint: 'Modificador + sustantivo: usa この + ほん.',
    formula: 'この + ほん + は + わたし + の + です',
    targetJp: 'この本は わたしのです。',
    targetKana: 'このほんは わたしのです。',
    targetRomaji: 'kono hon wa watashi no desu',
    acceptedAnswers: ['この本はわたしのです', 'このほんはわたしのです', 'この本は私のです'],
    focusParticle: 'は',
    focusDemonstrative: 'この',
    breakdown: [
      {
        text: 'この',
        kana: 'この',
        romaji: 'kono',
        role: 'Modificador demostrativo',
        meaning: 'este (siempre + sustantivo)',
        highlight: 'demonstrative'
      },
      {
        text: '本',
        kana: 'ほん',
        romaji: 'hon',
        role: 'Sustantivo',
        meaning: 'libro',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'わたし',
        kana: 'わたし',
        romaji: 'watashi',
        role: 'Pronombre',
        meaning: 'yo',
        highlight: 'noun'
      },
      {
        text: 'の',
        kana: 'の',
        romaji: 'no',
        role: 'Partícula posesiva',
        meaning: 'el mío (omite "libro")',
        highlight: 'particle'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'es',
        highlight: 'copula'
      }
    ],
    writingTip: 'Cuando acompañas un sustantivo ("este libro"), usa この本, no これ.'
  },
  {
    id: 'w-koso-7',
    lesson: 2,
    category: 'kosoado',
    difficulty: 2,
    promptEs: '¿Ese paraguas es suyo / de usted?',
    contextHint: 'Usa かさ (kasa = paraguas) y あなた (anata = usted).',
    formula: 'その + かさ + は + あなた + の + ですか',
    targetJp: 'その傘は あなたのですか。',
    targetKana: 'そのかさは あなたのですか。',
    targetRomaji: 'sono kasa wa anata no desu ka',
    acceptedAnswers: ['その傘はあなたのですか', 'そのかさはあなたのですか'],
    focusParticle: 'は',
    focusDemonstrative: 'その',
    breakdown: [
      {
        text: 'その',
        kana: 'その',
        romaji: 'sono',
        role: 'Modificador demostrativo',
        meaning: 'ese (cerca de ti)',
        highlight: 'demonstrative'
      },
      {
        text: '傘',
        kana: 'かさ',
        romaji: 'kasa',
        role: 'Sustantivo',
        meaning: 'paraguas',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'あなたの',
        kana: 'あなたの',
        romaji: 'anata no',
        role: 'Posesivo',
        meaning: 'tuyo / el de usted',
        highlight: 'particle'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Cópula + Pregunta',
        meaning: '¿es?',
        highlight: 'copula'
      }
    ],
    writingTip: 'その va pegado directamente a かさ ("ese paraguas").'
  },
  {
    id: 'w-koso-8',
    lesson: 1,
    category: 'kosoado',
    difficulty: 2,
    promptEs: 'Aquella persona (forma cortés)',
    contextHint: 'Sustantivo cortés para persona: かた (kata).',
    formula: 'あの + かた',
    targetJp: 'あの方',
    targetKana: 'あのかた',
    targetRomaji: 'ano kata',
    acceptedAnswers: ['あの方', 'あのかた'],
    focusDemonstrative: 'あの',
    breakdown: [
      {
        text: 'あの',
        kana: 'あの',
        romaji: 'ano',
        role: 'Modificador demostrativo',
        meaning: 'aquel / aquella',
        highlight: 'demonstrative'
      },
      {
        text: '方',
        kana: 'かた',
        romaji: 'kata',
        role: 'Sustantivo cortés',
        meaning: 'persona (respetuoso)',
        highlight: 'noun'
      }
    ],
    writingTip: 'Para hablar con respeto de alguien a distancia se usa あのかた (o estándar あのひと).'
  },
  {
    id: 'w-koso-9',
    lesson: 3,
    category: 'kosoado',
    difficulty: 2,
    promptEs: 'Aquí es el comedor.',
    contextHint: 'Comedor se dice しょくどう (shokudou).',
    formula: 'ここ + は + しょくどう + です',
    targetJp: 'ここは 食堂です。',
    targetKana: 'ここは しょくどうです。',
    targetRomaji: 'koko wa shokudou desu',
    acceptedAnswers: ['ここは食堂です', 'ここはしょくどうです'],
    focusParticle: 'は',
    focusDemonstrative: 'ここ',
    breakdown: [
      {
        text: 'ここ',
        kana: 'ここ',
        romaji: 'koko',
        role: 'Demostrativo de lugar',
        meaning: 'aquí',
        highlight: 'demonstrative'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el lugar',
        highlight: 'particle'
      },
      {
        text: '食堂',
        kana: 'しょくどう',
        romaji: 'shokudou',
        role: 'Sustantivo',
        meaning: 'comedor',
        highlight: 'noun'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'es',
        highlight: 'copula'
      }
    ],
    writingTip: 'Para しょくどう teclea "shokudou" (la vocal larga "ou" se escribe う).'
  },
  {
    id: 'w-koso-10',
    lesson: 3,
    category: 'kosoado',
    difficulty: 2,
    promptEs: 'El baño está allí.',
    contextHint: 'Usa おてあらい (otearai) y el lugar lejano あそこ (asoko).',
    formula: 'おてあらい + は + あそこ + です',
    targetJp: 'お手洗いは あそこです。',
    targetKana: 'おてあらいは あそこです。',
    targetRomaji: 'otearai wa asoko desu',
    acceptedAnswers: ['お手洗いはあそこです', 'おてあらいはあそこです'],
    focusParticle: 'は',
    focusDemonstrative: 'あそこ',
    breakdown: [
      {
        text: 'お手洗い',
        kana: 'おてあらい',
        romaji: 'otearai',
        role: 'Sustantivo cortés',
        meaning: 'baño / servicio',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'あそこ',
        kana: 'あそこ',
        romaji: 'asoko',
        role: 'Demostrativo de lugar',
        meaning: 'allí (irregular)',
        highlight: 'demonstrative'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'está / es',
        highlight: 'copula'
      }
    ],
    writingTip: 'Recuerda la forma irregular あそこ (asoko) para "allí" lejos de ambos.'
  },
  {
    id: 'w-koso-11',
    lesson: 3,
    category: 'kosoado',
    difficulty: 3,
    promptEs: 'El ascensor está por allí (forma cortés).',
    contextHint: 'Usa エレベーター (o えれべーたー) y あちら (achira).',
    formula: 'エレベーター + は + あちら + です',
    targetJp: 'エレベーターは あちらです。',
    targetKana: 'えれべーたーは あちらです。',
    targetRomaji: 'erebeetaa wa achira desu',
    acceptedAnswers: [
      'エレベーターはあちらです',
      'えれべーたーはあちらです',
      'えれべえたあはあちらです'
    ],
    focusParticle: 'は',
    focusDemonstrative: 'あちら',
    breakdown: [
      {
        text: 'エレベーター',
        kana: 'えれべーたー',
        romaji: 'erebeetaa',
        role: 'Sustantivo (Katakana)',
        meaning: 'ascensor',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'あちら',
        kana: 'あちら',
        romaji: 'achira',
        role: 'Dirección cortés',
        meaning: 'por allí',
        highlight: 'demonstrative'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'está',
        highlight: 'copula'
      }
    ],
    writingTip: 'あちら es la versión educada de あそこ para indicar dirección.'
  },

  // ================= PARTÍCULAS (8 ejercicios) =================
  {
    id: 'w-part-1',
    lesson: 1,
    category: 'particles',
    difficulty: 1,
    promptEs: 'Yo soy estudiante.',
    contextHint: 'Usa わたし (watashi) y がくせい (gakusei).',
    formula: 'わたし + は + がくせい + です',
    targetJp: 'わたしは 学生です。',
    targetKana: 'わたしは がくせいです。',
    targetRomaji: 'watashi wa gakusei desu',
    acceptedAnswers: ['わたしは学生です', 'わたしはがくせいです', '私は学生です', '私はがくせいです'],
    focusParticle: 'は',
    breakdown: [
      {
        text: 'わたし',
        kana: 'わたし',
        romaji: 'watashi',
        role: 'Tema / Pronombre',
        meaning: 'yo',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'indica de quién se habla',
        highlight: 'particle'
      },
      {
        text: '学生',
        kana: 'がくせい',
        romaji: 'gakusei',
        role: 'Sustantivo',
        meaning: 'estudiante',
        highlight: 'noun'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula cortés',
        meaning: 'soy',
        highlight: 'copula'
      }
    ],
    writingTip: 'Teclea "watashi ha gakusei desu" para obtener la partícula は correcta.'
  },
  {
    id: 'w-part-2',
    lesson: 1,
    category: 'particles',
    difficulty: 1,
    promptEs: 'Yo también soy estudiante.',
    contextHint: 'Sustituye は por la partícula も (mo = también).',
    formula: 'わたし + も + がくせい + です',
    targetJp: 'わたしも 学生です。',
    targetKana: 'わたしも がくせいです。',
    targetRomaji: 'watashi mo gakusei desu',
    acceptedAnswers: ['わたしも学生です', 'わたしもがくせいです', '私も学生です', '私もがくせいです'],
    focusParticle: 'も',
    breakdown: [
      {
        text: 'わたし',
        kana: 'わたし',
        romaji: 'watashi',
        role: 'Pronombre',
        meaning: 'yo',
        highlight: 'noun'
      },
      {
        text: 'も',
        kana: 'も',
        romaji: 'mo',
        role: 'Partícula de inclusión',
        meaning: 'también (reemplaza a は)',
        highlight: 'particle'
      },
      {
        text: '学生',
        kana: 'がくせい',
        romaji: 'gakusei',
        role: 'Sustantivo',
        meaning: 'estudiante',
        highlight: 'noun'
      },
      {
        text: 'です',
        kana: 'です',
        romaji: 'desu',
        role: 'Cópula',
        meaning: 'soy',
        highlight: 'copula'
      }
    ],
    writingTip: 'La partícula も reemplaza por completo a は. Nunca escribas はも.'
  },
  {
    id: 'w-part-3',
    lesson: 1,
    category: 'particles',
    difficulty: 2,
    promptEs: 'Yo no soy profesor.',
    contextHint: 'Usa せんせい (sensei) + negación じゃ ありません.',
    formula: 'わたし + は + せんせい + じゃ ありません',
    targetJp: 'わたしは 先生じゃ ありません。',
    targetKana: 'わたしは せんせいじゃ ありません。',
    targetRomaji: 'watashi wa sensei ja arimasen',
    acceptedAnswers: [
      'わたしは先生じゃありません',
      'わたしはせんせいじゃありません',
      '私は先生じゃありません',
      'わたしは先生ではありません',
      'わたしはせんせいではありません'
    ],
    focusParticle: 'は',
    breakdown: [
      {
        text: 'わたし',
        kana: 'わたし',
        romaji: 'watashi',
        role: 'Pronombre',
        meaning: 'yo',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: '先生',
        kana: 'せんせい',
        romaji: 'sensei',
        role: 'Sustantivo',
        meaning: 'profesor',
        highlight: 'noun'
      },
      {
        text: 'じゃ ありません',
        kana: 'じゃ ありません',
        romaji: 'ja arimasen',
        role: 'Cópula negativa',
        meaning: 'no soy / no es',
        highlight: 'copula'
      }
    ],
    writingTip: 'Para じゃ teclea "ja" (o "jya"). También se acepta la forma formal では ありません.'
  },
  {
    id: 'w-part-4',
    lesson: 1,
    category: 'particles',
    difficulty: 2,
    promptEs: '¿El Sr. Wang es médico?',
    contextHint: 'Usa ワンさん (Wan-san) e いしゃ (isha = médico).',
    formula: 'ワンさん + は + いしゃ + です + か',
    targetJp: 'ワンさんは 医者ですか。',
    targetKana: 'ワンさんは いしゃですか。',
    targetRomaji: 'wan san wa isha desu ka',
    acceptedAnswers: ['ワンさんは医者ですか', 'ワンさんはいしゃですか', 'わんさんはいしゃですか'],
    focusParticle: 'か',
    breakdown: [
      {
        text: 'ワンさん',
        kana: 'わんさん',
        romaji: 'Wan-san',
        role: 'Persona',
        meaning: 'Sr. Wang',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: '医者',
        kana: 'いしゃ',
        romaji: 'isha',
        role: 'Sustantivo',
        meaning: 'médico',
        highlight: 'noun'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Cópula + Pregunta',
        meaning: '¿es?',
        highlight: 'particle'
      }
    ],
    writingTip: 'Recuerda que か al final transforma la afirmación en pregunta.'
  },
  {
    id: 'w-part-5',
    lesson: 2,
    category: 'particles',
    difficulty: 2,
    promptEs: '¿De quién es este bolso?',
    contextHint: 'Usa これ, だれ (dare = quién) y かばん (kaban = bolso).',
    formula: 'これ + は + だれ + の + かばん + ですか',
    targetJp: 'これは だれの かばんですか。',
    targetKana: 'これは だれの かばんですか。',
    targetRomaji: 'kore wa dare no kaban desu ka',
    acceptedAnswers: ['これはだれのかばんですか', 'これは誰のかばんですか'],
    focusParticle: 'の',
    focusDemonstrative: 'これ',
    breakdown: [
      {
        text: 'これは',
        kana: 'これは',
        romaji: 'kore wa',
        role: 'Demostrativo + は',
        meaning: 'en cuanto a esto',
        highlight: 'demonstrative'
      },
      {
        text: 'だれ',
        kana: 'だれ',
        romaji: 'dare',
        role: 'Interrogativo',
        meaning: 'quién',
        highlight: 'noun'
      },
      {
        text: 'の',
        kana: 'の',
        romaji: 'no',
        role: 'Partícula posesiva',
        meaning: 'de (pertenencia)',
        highlight: 'particle'
      },
      {
        text: 'かばん',
        kana: 'かばん',
        romaji: 'kaban',
        role: 'Sustantivo',
        meaning: 'bolso / maleta',
        highlight: 'noun'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Cópula + Pregunta',
        meaning: '¿es?',
        highlight: 'copula'
      }
    ],
    writingTip: 'だれの significa literalmente "de quién" y va justo delante del objeto.'
  },
  {
    id: 'w-part-6',
    lesson: 2,
    category: 'particles',
    difficulty: 2,
    promptEs: 'Eso es un libro de idioma japonés.',
    contextHint: 'Usa それ, にほんご (nihongo) + の + ほん.',
    formula: 'それ + は + にほんご + の + ほん + です',
    targetJp: 'それは 日本語の 本です。',
    targetKana: 'それは にほんごの ほんです。',
    targetRomaji: 'sore wa nihongo no hon desu',
    acceptedAnswers: ['それは日本語の本です', 'それはにほんごのほんです'],
    focusParticle: 'の',
    focusDemonstrative: 'それ',
    breakdown: [
      {
        text: 'それは',
        kana: 'それは',
        romaji: 'sore wa',
        role: 'Demostrativo + は',
        meaning: 'eso',
        highlight: 'demonstrative'
      },
      {
        text: '日本語',
        kana: 'にほんご',
        romaji: 'nihongo',
        role: 'Sustantivo (tema)',
        meaning: 'idioma japonés',
        highlight: 'noun'
      },
      {
        text: 'の',
        kana: 'の',
        romaji: 'no',
        role: 'Partícula conectora',
        meaning: 'de (contenido)',
        highlight: 'particle'
      },
      {
        text: '本です',
        kana: 'ほんです',
        romaji: 'hon desu',
        role: 'Sustantivo + Cópula',
        meaning: 'es un libro',
        highlight: 'noun'
      }
    ],
    writingTip: 'S1 の S2 conecta la materia (にほんご) con el objeto (ほん).'
  },
  {
    id: 'w-part-7',
    lesson: 3,
    category: 'particles',
    difficulty: 2,
    promptEs: 'Deme este, por favor.',
    contextHint: 'Usa これ + partícula を (wo) + ください (kudasai).',
    formula: 'これ + を + ください',
    targetJp: 'これを ください。',
    targetKana: 'これを ください。',
    targetRomaji: 'kore o kudasai',
    acceptedAnswers: ['これをください'],
    focusParticle: 'を',
    focusDemonstrative: 'これ',
    breakdown: [
      {
        text: 'これ',
        kana: 'これ',
        romaji: 'kore',
        role: 'Demostrativo',
        meaning: 'este',
        highlight: 'demonstrative'
      },
      {
        text: 'を',
        kana: 'を',
        romaji: 'o (teclea wo)',
        role: 'Partícula objeto directo',
        meaning: 'marca lo que se pide',
        highlight: 'particle'
      },
      {
        text: 'ください',
        kana: 'ください',
        romaji: 'kudasai',
        role: 'Expresión de pedido',
        meaning: 'deme, por favor',
        highlight: 'copula'
      }
    ],
    writingTip: 'Para escribir la partícula を debes teclear "wo" (no "o").'
  },
  {
    id: 'w-part-8',
    lesson: 3,
    category: 'particles',
    difficulty: 3,
    promptEs: 'Por favor, muéstreme ese vino.',
    contextHint: 'Usa その + ワイン (o わいん) + を + みせて ください.',
    formula: 'その + ワイン + を + みせて ください',
    targetJp: 'その ワインを 見せて ください。',
    targetKana: 'その ワインを みせて ください。',
    targetRomaji: 'sono wain o misete kudasai',
    acceptedAnswers: [
      'そのワインを見せてください',
      'そのワインをみせてください',
      'そのわいんをみせてください'
    ],
    focusParticle: 'を',
    focusDemonstrative: 'その',
    breakdown: [
      {
        text: 'その',
        kana: 'その',
        romaji: 'sono',
        role: 'Modificador',
        meaning: 'ese',
        highlight: 'demonstrative'
      },
      {
        text: 'ワイン',
        kana: 'わいん',
        romaji: 'wain',
        role: 'Sustantivo',
        meaning: 'vino',
        highlight: 'noun'
      },
      {
        text: 'を',
        kana: 'を',
        romaji: 'o (wo)',
        role: 'Partícula objeto directo',
        meaning: 'marca el objeto mostrado',
        highlight: 'particle'
      },
      {
        text: '見せてください',
        kana: 'みせてください',
        romaji: 'misete kudasai',
        role: 'Verbo de petición',
        meaning: 'muéstreme por favor',
        highlight: 'copula'
      }
    ],
    writingTip: 'その + sustantivo (ワイン) + partícula を ("wo") + みせてください.'
  },

  // ================= ARMAR PALABRAS (7 ejercicios) =================
  {
    id: 'w-word-1',
    lesson: 1,
    category: 'word_building',
    difficulty: 1,
    promptEs: 'Persona japonesa / japonés (nacionalidad)',
    contextHint: 'Arma la palabra: País (にほん) + sufijo de persona (じん).',
    formula: 'にほん + じん',
    targetJp: '日本人',
    targetKana: 'にほんじん',
    targetRomaji: 'nihonjin',
    acceptedAnswers: ['日本人', 'にほんじん'],
    breakdown: [
      {
        text: '日本',
        kana: 'にほん',
        romaji: 'nihon',
        role: 'País',
        meaning: 'Japón',
        highlight: 'noun'
      },
      {
        text: '人',
        kana: 'じん',
        romaji: 'jin',
        role: 'Sufijo de nacionalidad',
        meaning: 'persona de ~',
        highlight: 'affix'
      }
    ],
    writingTip: 'Para formar cualquier nacionalidad solo pega じん detrás del país.'
  },
  {
    id: 'w-word-2',
    lesson: 1,
    category: 'word_building',
    difficulty: 1,
    promptEs: 'Persona estadounidense',
    contextHint: 'País (アメリカ) + sufijo de nacionalidad (じん).',
    formula: 'アメリカ + じん',
    targetJp: 'アメリカ人',
    targetKana: 'アメリカじん',
    targetRomaji: 'amerikajin',
    acceptedAnswers: ['アメリカ人', 'アメリカじん', 'あめりかじん'],
    breakdown: [
      {
        text: 'アメリカ',
        kana: 'あめりか',
        romaji: 'amerika',
        role: 'País (Katakana)',
        meaning: 'Estados Unidos',
        highlight: 'noun'
      },
      {
        text: '人',
        kana: 'じん',
        romaji: 'jin',
        role: 'Sufijo de nacionalidad',
        meaning: 'persona de ~',
        highlight: 'affix'
      }
    ],
    writingTip: 'Incluso en hiragana (あめりかじん) puedes practicar cómo se une el país con じん.'
  },
  {
    id: 'w-word-3',
    lesson: 2,
    category: 'word_building',
    difficulty: 1,
    promptEs: 'Idioma japonés',
    contextHint: 'Arma la palabra: País (にほん) + sufijo de idioma (ご).',
    formula: 'にほん + ご',
    targetJp: '日本語',
    targetKana: 'にほんご',
    targetRomaji: 'nihongo',
    acceptedAnswers: ['日本語', 'にほんご'],
    breakdown: [
      {
        text: '日本',
        kana: 'にほん',
        romaji: 'nihon',
        role: 'País',
        meaning: 'Japón',
        highlight: 'noun'
      },
      {
        text: '語',
        kana: 'ご',
        romaji: 'go',
        role: 'Sufijo de idioma',
        meaning: 'lengua / idioma',
        highlight: 'affix'
      }
    ],
    writingTip: 'País + ご forma idiomas: にほんご (japonés), えいご (inglés).'
  },
  {
    id: 'w-word-4',
    lesson: 1,
    category: 'word_building',
    difficulty: 1,
    promptEs: 'Su nombre (con prefijo de cortesía お)',
    contextHint: 'Prefijo お + なまえ (namae = nombre).',
    formula: 'お + なまえ',
    targetJp: 'お名前',
    targetKana: 'おなまえ',
    targetRomaji: 'onamae',
    acceptedAnswers: ['お名前', 'おなまえ'],
    breakdown: [
      {
        text: 'お',
        kana: 'お',
        romaji: 'o',
        role: 'Prefijo de cortesía',
        meaning: 'muestra respeto al oyente',
        highlight: 'affix'
      },
      {
        text: '名前',
        kana: 'なまえ',
        romaji: 'namae',
        role: 'Sustantivo',
        meaning: 'nombre',
        highlight: 'noun'
      }
    ],
    writingTip: 'El prefijo お se añade cuando preguntas por el nombre o país de otra persona.'
  },
  {
    id: 'w-word-5',
    lesson: 2,
    category: 'word_building',
    difficulty: 2,
    promptEs: 'Recuerdo de viaje / regalo de cortesía',
    contextHint: 'Prefijo お + みやげ (miyage).',
    formula: 'お + みやげ',
    targetJp: 'お土産',
    targetKana: 'おみやげ',
    targetRomaji: 'omiyage',
    acceptedAnswers: ['お土産', 'おみやげ'],
    breakdown: [
      {
        text: 'お',
        kana: 'お',
        romaji: 'o',
        role: 'Prefijo embellecedor',
        meaning: 'cortesía',
        highlight: 'affix'
      },
      {
        text: '土産',
        kana: 'みやげ',
        romaji: 'miyage',
        role: 'Sustantivo',
        meaning: 'regalo / souvenir',
        highlight: 'noun'
      }
    ],
    writingTip: 'Teclea "omiyage". Es una palabra muy usada al visitar vecinos o colegas.'
  },
  {
    id: 'w-word-6',
    lesson: 2,
    category: 'word_building',
    difficulty: 2,
    promptEs: 'Mi libro (construcción posesiva)',
    contextHint: 'Poseedor (わたし) + partícula の + objeto (ほん).',
    formula: 'わたし + の + ほん',
    targetJp: 'わたしの 本',
    targetKana: 'わたしの ほん',
    targetRomaji: 'watashi no hon',
    acceptedAnswers: ['わたしの本', 'わたしのほん', '私の本', '私のほん'],
    focusParticle: 'の',
    breakdown: [
      {
        text: 'わたし',
        kana: 'わたし',
        romaji: 'watashi',
        role: 'Poseedor',
        meaning: 'yo',
        highlight: 'noun'
      },
      {
        text: 'の',
        kana: 'の',
        romaji: 'no',
        role: 'Partícula de posesión',
        meaning: 'de',
        highlight: 'particle'
      },
      {
        text: '本',
        kana: 'ほん',
        romaji: 'hon',
        role: 'Objeto poseído',
        meaning: 'libro',
        highlight: 'noun'
      }
    ],
    writingTip: 'Primero quién posee (わたし), luego の, y al final el objeto (ほん).'
  },
  {
    id: 'w-word-7',
    lesson: 3,
    category: 'word_building',
    difficulty: 2,
    promptEs: '¿De qué país / marca es el reloj? (solo el bloque "reloj de dónde")',
    contextHint: 'Interrogativo どこ (doko) + の + とけい (tokei = reloj).',
    formula: 'どこ + の + とけい',
    targetJp: 'どこの 時計',
    targetKana: 'どこの とけい',
    targetRomaji: 'doko no tokei',
    acceptedAnswers: ['どこの時計', 'どこのとけい'],
    focusParticle: 'の',
    focusDemonstrative: 'どこ',
    breakdown: [
      {
        text: 'どこ',
        kana: 'どこ',
        romaji: 'doko',
        role: 'Interrogativo de lugar',
        meaning: 'dónde / qué país',
        highlight: 'demonstrative'
      },
      {
        text: 'の',
        kana: 'の',
        romaji: 'no',
        role: 'Partícula de origen',
        meaning: 'de (procedencia)',
        highlight: 'particle'
      },
      {
        text: '時計',
        kana: 'とけい',
        romaji: 'tokei',
        role: 'Sustantivo',
        meaning: 'reloj',
        highlight: 'noun'
      }
    ],
    writingTip: 'どこの + [objeto] pregunta por el país o empresa que fabricó ese objeto.'
  },

  // ================= FRASES COMPLETAS (7 ejercicios) =================
  {
    id: 'w-sent-1',
    lesson: 1,
    category: 'sentences',
    difficulty: 2,
    promptEs: '¿Quién es aquella distinguida persona?',
    contextHint: 'Usa あのかた (ano kata) y どなた (donata).',
    formula: 'あの + かた + は + どなた + ですか',
    targetJp: 'あの方は どなたですか。',
    targetKana: 'あのかたは どなたですか。',
    targetRomaji: 'ano kata wa donata desu ka',
    acceptedAnswers: ['あの方はどなたですか', 'あのかたはどなたですか'],
    focusParticle: 'は',
    focusDemonstrative: 'あの',
    breakdown: [
      {
        text: 'あの方',
        kana: 'あのかた',
        romaji: 'ano kata',
        role: 'Demostrativo + Sustantivo cortés',
        meaning: 'aquella persona',
        highlight: 'demonstrative'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'どなた',
        kana: 'どなた',
        romaji: 'donata',
        role: 'Interrogativo cortés',
        meaning: 'quién',
        highlight: 'noun'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Cópula + Pregunta',
        meaning: '¿es?',
        highlight: 'copula'
      }
    ],
    writingTip: 'あの方 combina siempre con どなた para mantener el mismo nivel de cortesía.'
  },
  {
    id: 'w-sent-2',
    lesson: 1,
    category: 'sentences',
    difficulty: 3,
    promptEs: 'Yo no soy japonés.',
    contextHint: 'Combina わたし + は + にほんじん + negación.',
    formula: 'わたし + は + にほんじん + じゃ ありません',
    targetJp: 'わたしは 日本人じゃ ありません。',
    targetKana: 'わたしは にほんじんじゃ ありません。',
    targetRomaji: 'watashi wa nihonjin ja arimasen',
    acceptedAnswers: [
      'わたしは日本人じゃありません',
      'わたしはにほんじんじゃありません',
      '私は日本人じゃありません',
      'わたしは日本人ではありません',
      'わたしはにほんじんではありません'
    ],
    focusParticle: 'は',
    breakdown: [
      {
        text: 'わたしは',
        kana: 'わたしは',
        romaji: 'watashi wa',
        role: 'Tema + は',
        meaning: 'yo',
        highlight: 'particle'
      },
      {
        text: '日本人',
        kana: 'にほんじん',
        romaji: 'nihonjin',
        role: 'Nacionalidad',
        meaning: 'japonés',
        highlight: 'noun'
      },
      {
        text: 'じゃ ありません',
        kana: 'じゃ ありません',
        romaji: 'ja arimasen',
        role: 'Negación cortés',
        meaning: 'no soy',
        highlight: 'copula'
      }
    ],
    writingTip: 'Combina armado de nacionalidad (にほん + じん) con la negación じゃありません.'
  },
  {
    id: 'w-sent-3',
    lesson: 2,
    category: 'sentences',
    difficulty: 3,
    promptEs: '¿Aquello es el bolso de la Srta. Sato?',
    contextHint: 'Usa あれ, さとうさん (Satou-san) y かばん.',
    formula: 'あれ + は + さとうさん + の + かばん + ですか',
    targetJp: 'あれは 佐藤さんの かばんですか。',
    targetKana: 'あれは さとうさんの かばんですか。',
    targetRomaji: 'are wa satou san no kaban desu ka',
    acceptedAnswers: ['あれは佐藤さんのかばんですか', 'あれはさとうさんのかばんですか'],
    focusParticle: 'は',
    focusDemonstrative: 'あれ',
    breakdown: [
      {
        text: 'あれは',
        kana: 'あれは',
        romaji: 'are wa',
        role: 'Demostrativo + は',
        meaning: 'aquello',
        highlight: 'demonstrative'
      },
      {
        text: '佐藤さんの',
        kana: 'さとうさんの',
        romaji: 'Satou-san no',
        role: 'Poseedor + の',
        meaning: 'de Sato-san',
        highlight: 'particle'
      },
      {
        text: 'かばんですか',
        kana: 'かばんですか',
        romaji: 'kaban desu ka',
        role: 'Objeto + Pregunta',
        meaning: '¿es un bolso?',
        highlight: 'noun'
      }
    ],
    writingTip: 'Para さとう teclea "satou". Recuerda colocar の después de さとうさん.'
  },
  {
    id: 'w-sent-4',
    lesson: 2,
    category: 'sentences',
    difficulty: 2,
    promptEs: 'No, no es así (es distinto).',
    contextHint: 'Expresión de rechazo amable: いいえ、ちがいます.',
    formula: 'いいえ + 、 + ちがいます',
    targetJp: 'いいえ、違います。',
    targetKana: 'いいえ、ちがいます。',
    targetRomaji: 'iie chigaimasu',
    acceptedAnswers: ['いいえ違います', 'いいえちがいます'],
    breakdown: [
      {
        text: 'いいえ',
        kana: 'いいえ',
        romaji: 'iie',
        role: 'Negación',
        meaning: 'no',
        highlight: 'copula'
      },
      {
        text: '違います',
        kana: 'ちがいます',
        romaji: 'chigaimasu',
        role: 'Verbo cortés',
        meaning: 'es distinto / no es así',
        highlight: 'copula'
      }
    ],
    writingTip: 'Teclea "iie chigaimasu". Es la respuesta estándar al corregir algo.'
  },
  {
    id: 'w-sent-5',
    lesson: 3,
    category: 'sentences',
    difficulty: 2,
    promptEs: '¿Cuánto cuesta este reloj?',
    contextHint: 'Usa この + とけい + は + いくら (ikura) + ですか.',
    formula: 'この + とけい + は + いくら + ですか',
    targetJp: 'この 時計は いくらですか。',
    targetKana: 'この とけいは いくらですか。',
    targetRomaji: 'kono tokei wa ikura desu ka',
    acceptedAnswers: ['この時計はいくらですか', 'このとけいはいくらですか'],
    focusParticle: 'は',
    focusDemonstrative: 'この',
    breakdown: [
      {
        text: 'この時計',
        kana: 'このとけい',
        romaji: 'kono tokei',
        role: 'Modificador + Sustantivo',
        meaning: 'este reloj',
        highlight: 'demonstrative'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'いくら',
        kana: 'いくら',
        romaji: 'ikura',
        role: 'Interrogativo de precio',
        meaning: 'cuánto cuesta',
        highlight: 'noun'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Pregunta cortés',
        meaning: '¿es?',
        highlight: 'copula'
      }
    ],
    writingTip: 'いくら siempre pregunta el precio en dinero.'
  },
  {
    id: 'w-sent-6',
    lesson: 3,
    category: 'sentences',
    difficulty: 2,
    promptEs: '¿Dónde está el baño? (cortés: おてあらい)',
    contextHint: 'Usa おてあらい + は + どこ + ですか.',
    formula: 'おてあらい + は + どこ + ですか',
    targetJp: 'お手洗いは どこですか。',
    targetKana: 'おてあらいは どこですか。',
    targetRomaji: 'otearai wa doko desu ka',
    acceptedAnswers: [
      'お手洗いはどこですか',
      'おてあらいはどこですか',
      'お手洗いはどちらですか',
      'おてあらいはどちらですか'
    ],
    focusParticle: 'は',
    focusDemonstrative: 'どこ',
    breakdown: [
      {
        text: 'お手洗い',
        kana: 'おてあらい',
        romaji: 'otearai',
        role: 'Sustantivo cortés',
        meaning: 'baño / servicio',
        highlight: 'noun'
      },
      {
        text: 'は',
        kana: 'は',
        romaji: 'wa (ha)',
        role: 'Partícula de tema',
        meaning: 'marca el tema',
        highlight: 'particle'
      },
      {
        text: 'どこ',
        kana: 'どこ',
        romaji: 'doko',
        role: 'Interrogativo de lugar',
        meaning: 'dónde',
        highlight: 'demonstrative'
      },
      {
        text: 'ですか',
        kana: 'ですか',
        romaji: 'desu ka',
        role: 'Pregunta cortés',
        meaning: '¿está?',
        highlight: 'copula'
      }
    ],
    writingTip: 'También puedes usar どちら (dochira) para sonar aún más cortés.'
  },
  {
    id: 'w-sent-7',
    lesson: 3,
    category: 'sentences',
    difficulty: 3,
    promptEs: 'Bueno, entonces deme este, por favor.',
    contextHint: 'Conector じゃ (ja) + これ + を + ください.',
    formula: 'じゃ、 + これ + を + ください',
    targetJp: 'じゃ、これを ください。',
    targetKana: 'じゃ、これを ください。',
    targetRomaji: 'ja kore o kudasai',
    acceptedAnswers: ['じゃこれをください', 'じゃあこれをください'],
    focusParticle: 'を',
    focusDemonstrative: 'これ',
    breakdown: [
      {
        text: 'じゃ',
        kana: 'じゃ',
        romaji: 'ja',
        role: 'Conector',
        meaning: 'bueno, entonces',
        highlight: 'affix'
      },
      {
        text: 'これ',
        kana: 'これ',
        romaji: 'kore',
        role: 'Demostrativo',
        meaning: 'este',
        highlight: 'demonstrative'
      },
      {
        text: 'を',
        kana: 'を',
        romaji: 'o (wo)',
        role: 'Partícula objeto directo',
        meaning: 'marca la compra',
        highlight: 'particle'
      },
      {
        text: 'ください',
        kana: 'ください',
        romaji: 'kudasai',
        role: 'Petición',
        meaning: 'deme, por favor',
        highlight: 'copula'
      }
    ],
    writingTip: 'Frase clave de compras: teclea "ja kore wo kudasai".'
  }
];

