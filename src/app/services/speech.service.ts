import { Service, signal } from '@angular/core';

@Service()
export class SpeechService {
  private readonly isSpeakingSignal = signal(false);
  private readonly isSlowSignal = signal(false);

  readonly isSpeaking = this.isSpeakingSignal.asReadonly();
  readonly isSlow = this.isSlowSignal.asReadonly();

  toggleSpeed(): void {
    this.isSlowSignal.update(s => !s);
  }

  speak(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text of brackets or hints (e.g. [お] -> お)
    const cleanText = text.replace(/\[(.*?)\]/g, '$1').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = this.isSlowSignal() ? 0.72 : 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onstart = () => this.isSpeakingSignal.set(true);
    utterance.onend = () => this.isSpeakingSignal.set(false);
    utterance.onerror = () => this.isSpeakingSignal.set(false);

    window.speechSynthesis.speak(utterance);
  }
}

