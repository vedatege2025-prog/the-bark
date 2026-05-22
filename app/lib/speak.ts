export function speak(text: string, lang = "de-DE") {
  if (typeof window === "undefined") return
  const synth = window.speechSynthesis
  if (!synth) return

  synth.cancel()

  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = lang
  utt.rate = 0.9

  utt.onerror = (e) => {
    // "interrupted" fires when cancel() cuts off a previous utterance — not a real error
    if (e.error === "interrupted") return
    console.error("[speak] error:", e.error, "—", text)
  }

  // Chrome bug: speaking=true can linger briefly after cancel().
  // Wait one tick so the engine settles before queuing the new utterance.
  if (synth.speaking || synth.pending) {
    setTimeout(() => synth.speak(utt), 80)
  } else {
    synth.speak(utt)
  }
}
