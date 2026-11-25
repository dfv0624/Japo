import { WritingEvaluationResult, WritingExercise } from '../models/japanese.models';

const THREE_CHAR_MAP: Record<string, string> = {
  sha: 'しゃ',
  shi: 'し',
  shu: 'しゅ',
  sho: 'しょ',
  chi: 'ち',
  cha: 'ちゃ',
  chu: 'ちゅ',
  cho: 'ちょ',
  tsu: 'つ',
  kya: 'きゃ',
  kyu: 'きゅ',
  kyo: 'きょ',
  gya: 'ぎゃ',
  gyu: 'ぎゅ',
  gyo: 'ぎょ',
  nya: 'にゃ',
  nyu: 'にゅ',
  nyo: 'にょ',
  hya: 'ひゃ',
  hyu: 'ひゅ',
  hyo: 'ひょ',
  bya: 'びゃ',
  byu: 'びゅ',
  byo: 'びょ',
  pya: 'ぴゃ',
  pyu: 'ぴゅ',
  pyo: 'ぴょ',
  mya: 'みゃ',
  myu: 'みゅ',
  myo: 'みょ',
  rya: 'りゃ',
  ryu: 'りゅ',
  ryo: 'りょ',
  jya: 'じゃ',
  jyu: 'じゅ',
  jyo: 'じょ',
  sya: 'しゃ',
  syu: 'しゅ',
  syo: 'しょ',
  tya: 'ちゃ',
  tyu: 'ちゅ',
  tyo: 'ちょ',
  zya: 'じゃ',
  zyu: 'じゅ',
  zyo: 'じょ',
  dya: 'ぢゃ',
  dyu: 'ぢゅ',
  dyo: 'ぢょ'
};

const TWO_CHAR_MAP: Record<string, string> = {
  ka: 'か',
  ki: 'き',
  ku: 'く',
  ke: 'け',
  ko: 'こ',
  sa: 'さ',
  si: 'し',
  su: 'す',
  se: 'せ',
  so: 'そ',
  ta: 'た',
  ti: 'ち',
  tu: 'つ',
  te: 'て',
  to: 'と',
  na: 'な',
  ni: 'に',
  nu: 'ぬ',
  ne: 'ね',
  no: 'の',
  ha: 'は',
  hi: 'ひ',
  hu: 'ふ',
  fu: 'ふ',
  he: 'へ',
  ho: 'ほ',
  ma: 'ま',
  mi: 'み',
  mu: 'む',
  me: 'め',
  mo: 'も',
  ya: 'や',
  yu: 'ゆ',
  yo: 'よ',
  ra: 'ら',
  ri: 'り',
  ru: 'る',
  re: 'れ',
  ro: 'ろ',
  wa: 'わ',
  wo: 'を',
  ga: 'が',
  gi: 'ぎ',
  gu: 'ぐ',
  ge: 'げ',
  go: 'ご',
  za: 'ざ',
  zi: 'じ',
  ji: 'じ',
  zu: 'ず',
  ze: 'ぜ',
  zo: 'ぞ',
  da: 'だ',
  di: 'ぢ',
  du: 'づ',
  de: 'で',
  do: 'ど',
  ba: 'ば',
  bi: 'び',
  bu: 'ぶ',
  be: 'べ',
  bo: 'ぼ',
  pa: 'ぱ',
  pi: 'ぴ',
  pu: 'ぷ',
  pe: 'ぺ',
  po: 'ぽ',
  ja: 'じゃ',
  ju: 'じゅ',
  jo: 'じょ',
  nn: 'ん',
  "n'": 'ん'
};

const ONE_CHAR_MAP: Record<string, string> = {
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'お'
};

const VOWEL_SET = new Set(['a', 'i', 'u', 'e', 'o']);
const SOKUON_CONSONANTS = new Set([
  'k',
  's',
  't',
  'p',
  'g',
  'z',
  'd',
  'b',
  'c',
  'f',
  'h',
  'j',
  'm',
  'r',
  'w'
]);

const DEMONSTRATIVES_LIST = [
  'こちら',
  'そちら',
  'あちら',
  'どちら',
  'あそこ',
  'これ',
  'それ',
  'あれ',
  'どれ',
  'この',
  'その',
  'あの',
  'どの',
  'ここ',
  'そこ',
  'どこ'
];

function isAsciiLetter(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

/**
 * Convierte romaji a hiragana de forma progresiva (estilo IME).
 * Cuando flushTrailingN es false, una 'n' final queda sin convertir para permitir 'na/ni/nu/ne/no'.
 */
export function convertRomajiToHiragana(input: string, flushTrailingN = false): string {
  if (!input) return '';

  let result = '';
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    // Solo transformamos letras latinas y apóstrofe después de 'n'; preservamos kana/kanji/espacios
    if (!isAsciiLetter(ch)) {
      result += ch;
      i += 1;
      continue;
    }

    const lower1 = ch.toLowerCase();
    const lower2 = i + 1 < input.length ? input.slice(i, i + 2).toLowerCase() : '';
    const lower3 = i + 2 < input.length ? input.slice(i, i + 3).toLowerCase() : '';

    // 1. Manejo especial de 'n'
    if (lower1 === 'n') {
      if (lower2 === 'nn' || lower2 === "n'") {
        result += 'ん';
        i += 2;
        continue;
      }

      if (i + 1 < input.length) {
        const nextChar = input[i + 1].toLowerCase();
        // Si sigue otra vocal o 'y', se resolverá en el mapa de 2/3 letras (na..no, nya..nyo)
        if (!VOWEL_SET.has(nextChar) && nextChar !== 'y' && nextChar !== 'n') {
          result += 'ん';
          i += 1;
          continue;
        }
      } else if (flushTrailingN) {
        result += 'ん';
        i += 1;
        continue;
      } else {
        // Es la 'n' final en escritura en vivo: conservar hasta el siguiente carácter
        result += ch;
        i += 1;
        continue;
      }
    }

    // 2. Consonante doble (sokuon っ), por ejemplo 'zasshi', 'ikkai', 'chotto'
    if (
      lower2.length === 2 &&
      lower2[0] === lower2[1] &&
      SOKUON_CONSONANTS.has(lower2[0])
    ) {
      result += 'っ';
      i += 1;
      continue;
    }

    // 3. Secuencias de 3 caracteres
    if (lower3.length === 3 && THREE_CHAR_MAP[lower3]) {
      result += THREE_CHAR_MAP[lower3];
      i += 3;
      continue;
    }

    // 4. Secuencias de 2 caracteres
    if (lower2.length === 2 && TWO_CHAR_MAP[lower2]) {
      result += TWO_CHAR_MAP[lower2];
      i += 2;
      continue;
    }

    // 5. Vocales sueltas
    if (ONE_CHAR_MAP[lower1]) {
      result += ONE_CHAR_MAP[lower1];
      i += 1;
      continue;
    }

    // Si es consonante pendiente (ej. 'k', 'sh', 'ts'), conservar tal cual
    result += ch;
    i += 1;
  }

  return result;
}

/**
 * Convierte caracteres Katakana (ァ..ヶ) a Hiragana (ぁ..ゖ) para comparaciones flexibles.
 */
export function katakanaToHiragana(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 0x30a1 && code <= 0x30f6) {
      out += String.fromCharCode(code - 0x60);
    } else {
      out += text[i];
    }
  }
  return out;
}

/**
 * Normaliza la entrada del usuario: aplica conversión IME final y quita espacios y puntuación.
 */
export function normalizeJapaneseInput(text: string): string {
  const converted = convertRomajiToHiragana(text.trim(), true);
  return converted
    .replace(/[\s\u3000。、.,?？!！「」・\-〜~]/g, '')
    .toLowerCase();
}

function replaceAllOccurrences(source: string, search: string, replacement: string): string {
  return source.split(search).join(replacement);
}

/**
 * Evalúa la respuesta escrita por el estudiante y detecta errores típicos de principiantes.
 */
export function evaluateWritingAnswer(
  rawInput: string,
  exercise: WritingExercise
): WritingEvaluationResult {
  const normalizedInput = normalizeJapaneseInput(rawInput);
  if (!normalizedInput) {
    return {
      isCorrect: false,
      normalizedInput: '',
      feedbackType: 'mismatch',
      hintMessage: 'Escribe tu respuesta en japonés antes de comprobar.'
    };
  }

  const normalizedAccepted = exercise.acceptedAnswers.map(ans => normalizeJapaneseInput(ans));

  if (normalizedAccepted.includes(normalizedInput)) {
    return {
      isCorrect: true,
      normalizedInput,
      feedbackType: 'exact',
      hintMessage: '¡Excelente escritura! Construiste la forma correcta.'
    };
  }

  // Coincidencia flexible pasando katakana a hiragana (ej. わいん vs ワイン)
  const inputAsHiragana = katakanaToHiragana(normalizedInput);
  const acceptedAsHiragana = normalizedAccepted.map(ans => katakanaToHiragana(ans));

  if (acceptedAsHiragana.includes(inputAsHiragana)) {
    return {
      isCorrect: true,
      normalizedInput,
      feedbackType: 'kana_accepted',
      hintMessage:
        '¡Correcto en lectura! Recuerda que los préstamos extranjeros como ワイン o コンピューター se escriben habitualmente en Katakana.'
    };
  }

  // Diagnóstico 1: Uso de わ en vez de la partícula は
  const targetKanaNorm = normalizeJapaneseInput(exercise.targetKana);
  if (exercise.focusParticle === 'は' || targetKanaNorm.includes('は')) {
    const fixedWa = replaceAllOccurrences(inputAsHiragana, 'わ', 'は');
    const hasCommonWaMistake =
      /(これ|それ|あれ|この.+|その.+|あの.+|わたし|ここ|そこ|あそこ|おてあらい|でんわ|とけい|さん)わ/.test(
        inputAsHiragana
      );

    if (
      fixedWa !== inputAsHiragana &&
      (acceptedAsHiragana.includes(fixedWa) || hasCommonWaMistake)
    ) {
      return {
        isCorrect: false,
        normalizedInput,
        feedbackType: 'particle_wa_error',
        hintMessage:
          '¡Casi! La partícula de tema se pronuncia "wa", pero SIEMPRE se escribe con el carácter は (teclea "ha").'
      };
    }
  }

  // Diagnóstico 2: Uso de お en vez de la partícula を
  if (exercise.focusParticle === 'を' || targetKanaNorm.includes('を')) {
    const fixedWo = replaceAllOccurrences(inputAsHiragana, 'お', 'を');
    if (fixedWo !== inputAsHiragana && acceptedAsHiragana.includes(fixedWo)) {
      return {
        isCorrect: false,
        normalizedInput,
        feedbackType: 'particle_wo_error',
        hintMessage:
          '¡Muy cerca! La partícula de objeto directo se pronuncia "o", pero se escribe を (teclea "wo").'
      };
    }
  }

  // Diagnóstico 3: Falta la partícula interrogativa か al final
  if (targetKanaNorm.endsWith('ですか') && !inputAsHiragana.endsWith('か')) {
    if (acceptedAsHiragana.includes(`${inputAsHiragana}か`)) {
      return {
        isCorrect: false,
        normalizedInput,
        feedbackType: 'missing_question_ka',
        hintMessage:
          '¡Te falta solo una letra! Para hacer una pregunta en japonés, agrega la partícula か al final de です (ですか).'
      };
    }
  }

  // Diagnóstico 4: Confusión dentro del sistema Ko-So-A-Do
  if (exercise.focusDemonstrative) {
    const expectedDem = exercise.focusDemonstrative;
    const foundOtherDem = DEMONSTRATIVES_LIST.find(
      dem => dem !== expectedDem && inputAsHiragana.includes(dem)
    );

    if (foundOtherDem) {
      return {
        isCorrect: false,
        normalizedInput,
        feedbackType: 'demonstrative_confusion',
        hintMessage: `Revisa el demostrativo: escribiste「${foundOtherDem}」en lugar de「${expectedDem}」. Recuerda: これ/それ/あれ van solos; この/その/あの acompañan a un sustantivo; こ = cerca de mí, そ = cerca de ti, あ = lejos de ambos.`
      };
    }
  }

  return {
    isCorrect: false,
    normalizedInput,
    feedbackType: 'mismatch',
    hintMessage:
      'Aún no coincide exactamente. Revisa las partículas y el orden, o toca "Ver pista" para revisar la fórmula paso a paso.'
  };
}

