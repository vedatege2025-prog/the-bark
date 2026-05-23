export type WordLevel = "A1" | "A2" | "B1" | "B2" | "C1"

export interface EnrichedWord {
  word: string
  filename: string
  kind: "Adjektiv" | "Verb" | "Verb (refl.)"
  level?: WordLevel      // belirtilmezse "B1" varsayılır
  verbForms?: { praeteritum: string; perfekt: string }
  turkish: string
  examples: Array<{ label: string; de: string }>
}

export function getWordLevel(w: EnrichedWord): WordLevel {
  return w.level ?? "B1"
}

export const enrichedWords: EnrichedWord[] = [
  // ── ADJEKTIVE ──────────────────────────────────────────────────────
  {
    word: "abhängig von", filename: "abhängig von.png", kind: "Adjektiv",
    turkish: "bağımlı (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ist völlig abhängig von seinem Telefon." },
      { label: "Prät.", de: "Sie war früher abhängig von Kaffee." },
      { label: "Perf.", de: "Er ist jahrelang abhängig von seinen Eltern gewesen." },
    ],
  },
  {
    word: "angenehm (für)", filename: "angenehm (für).png", kind: "Adjektiv",
    turkish: "hoş, rahat (— için)",
    examples: [
      { label: "Präs.", de: "Das Wetter ist angenehm für einen Spaziergang." },
      { label: "Prät.", de: "Die Musik war sehr angenehm für uns." },
      { label: "Perf.", de: "Das Gespräch ist angenehm für mich gewesen." },
    ],
  },
  {
    word: "angesehen (bei)", filename: "angesehen (bei).png", kind: "Adjektiv",
    turkish: "saygın, itibar sahibi (— nezdinde)",
    examples: [
      { label: "Präs.", de: "Sie ist sehr angesehen bei ihren Kollegen." },
      { label: "Prät.", de: "Der Arzt war angesehen bei seinen Patienten." },
      { label: "Perf.", de: "Er ist stets angesehen bei der Gemeinde gewesen." },
    ],
  },
  {
    word: "angewiesen (auf)", filename: "angewiesen (auf).png", kind: "Adjektiv",
    turkish: "muhtaç, bağımlı (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist angewiesen auf fremde Hilfe." },
      { label: "Prät.", de: "Er war angewiesen auf sein Gehalt." },
      { label: "Perf.", de: "Die Firma ist auf Investitionen angewiesen gewesen." },
    ],
  },
  {
    word: "befreundet (mit)", filename: "befreundet (mit).png", kind: "Adjektiv",
    turkish: "arkadaş (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er ist seit Jahren befreundet mit ihr." },
      { label: "Prät.", de: "Sie waren befreundet mit unserer Familie." },
      { label: "Perf.", de: "Er ist lange befreundet mit ihm gewesen." },
    ],
  },
  {
    word: "begeistert von", filename: "begeistert von.png", kind: "Adjektiv",
    turkish: "hayran, coşkulu (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Sie ist sehr begeistert von der Idee." },
      { label: "Prät.", de: "Er war begeistert von dem Konzert." },
      { label: "Perf.", de: "Das Publikum ist begeistert von der Show gewesen." },
    ],
  },
  {
    word: "behilflich (bei)", filename: "behilflich (bei).png", kind: "Adjektiv",
    turkish: "yardımcı (—da/—de)",
    examples: [
      { label: "Präs.", de: "Er ist mir gerne behilflich bei der Arbeit." },
      { label: "Prät.", de: "Sie war uns behilflich bei der Suche." },
      { label: "Perf.", de: "Er ist uns beim Umzug behilflich gewesen." },
    ],
  },
  {
    word: "bekannt (mit:für)", filename: "bekannt (mit:für).png", kind: "Adjektiv",
    turkish: "tanıdık (—la); ünlü (— ile)",
    examples: [
      { label: "Präs.", de: "Er ist bekannt für seine Pünktlichkeit." },
      { label: "Prät.", de: "Sie war bekannt mit dem Politiker." },
      { label: "Perf.", de: "Die Stadt ist bekannt für ihre Architektur gewesen." },
    ],
  },
  {
    word: "beliebt (bei)", filename: "beliebt (bei).png", kind: "Adjektiv",
    turkish: "sevilen, popüler (— nezdinde)",
    examples: [
      { label: "Präs.", de: "Die Lehrerin ist sehr beliebt bei den Schülern." },
      { label: "Prät.", de: "Das Café war beliebt bei den Studenten." },
      { label: "Perf.", de: "Das Produkt ist beliebt bei den Kunden gewesen." },
    ],
  },
  {
    word: "bereit zu", filename: "bereit zu.png", kind: "Adjektiv",
    turkish: "hazır (—a/—e; —mak/—mek için)",
    examples: [
      { label: "Präs.", de: "Er ist bereit zu einer Entschuldigung." },
      { label: "Prät.", de: "Sie war bereit zu einem Kompromiss." },
      { label: "Perf.", de: "Er ist bereit zu Verhandlungen gewesen." },
    ],
  },
  {
    word: "berühmt (für)", filename: "berühmt (für).png", kind: "Adjektiv",
    turkish: "ünlü (—yla/—yle)",
    examples: [
      { label: "Präs.", de: "Einstein ist berühmt für seine Relativitätstheorie." },
      { label: "Prät.", de: "Das Restaurant war berühmt für seinen Käsekuchen." },
      { label: "Perf.", de: "Die Sängerin ist berühmt für ihre Stimme gewesen." },
    ],
  },
  {
    word: "beschäftigt (mit)", filename: "beschäftigt (mit).png", kind: "Adjektiv",
    turkish: "meşgul (—la/—le)",
    examples: [
      { label: "Präs.", de: "Sie ist gerade beschäftigt mit dem Projekt." },
      { label: "Prät.", de: "Er war beschäftigt mit der Hausarbeit." },
      { label: "Perf.", de: "Die Firma ist mit einer neuen Aufgabe beschäftigt gewesen." },
    ],
  },
  {
    word: "besorgt um:über", filename: "besorgt um:über.png", kind: "Adjektiv",
    turkish: "endişeli (— için / — hakkında)",
    examples: [
      { label: "Präs.", de: "Er ist sehr besorgt um seine Mutter." },
      { label: "Prät.", de: "Sie war besorgt über die Nachrichten." },
      { label: "Perf.", de: "Die Eltern sind besorgt um die Gesundheit des Kindes gewesen." },
    ],
  },
  {
    word: "besorgt über:um", filename: "besorgt über:um.png", kind: "Adjektiv",
    turkish: "endişeli (— hakkında / — için)",
    examples: [
      { label: "Präs.", de: "Er ist besorgt über die wirtschaftliche Lage." },
      { label: "Prät.", de: "Sie war besorgt um ihren Mann." },
      { label: "Perf.", de: "Die Ärzte sind besorgt über den Befund gewesen." },
    ],
  },
  {
    word: "beteiligt (an)", filename: "beteiligt (an).png", kind: "Adjektiv",
    turkish: "katılmış, dahil (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist beteiligt an dem Projekt." },
      { label: "Prät.", de: "Sie war beteiligt an der Planung." },
      { label: "Perf.", de: "Alle Mitarbeiter sind am Prozess beteiligt gewesen." },
    ],
  },
  {
    word: "beunruhigt über", filename: "beunruhigt über.png", kind: "Adjektiv",
    turkish: "kaygılı, tedirgin (— hakkında)",
    examples: [
      { label: "Präs.", de: "Er ist beunruhigt über die wirtschaftliche Lage." },
      { label: "Prät.", de: "Sie war beunruhigt über das Ergebnis." },
      { label: "Perf.", de: "Die Regierung ist über die Situation beunruhigt gewesen." },
    ],
  },
  {
    word: "böse (auf)", filename: "böse (auf).png", kind: "Adjektiv",
    turkish: "kızgın (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist böse auf ihn." },
      { label: "Prät.", de: "Er war böse auf seine Schwester." },
      { label: "Perf.", de: "Er ist böse auf mich gewesen." },
    ],
  },
  {
    word: "dankbar (für)", filename: "dankbar (für).png", kind: "Adjektiv",
    turkish: "minnettar (— için)",
    examples: [
      { label: "Präs.", de: "Ich bin sehr dankbar für deine Hilfe." },
      { label: "Prät.", de: "Er war dankbar für das Geschenk." },
      { label: "Perf.", de: "Sie ist immer dankbar für Unterstützung gewesen." },
    ],
  },
  {
    word: "eifersüchtig (auf)", filename: "eifersüchtig (auf).png", kind: "Adjektiv",
    turkish: "kıskanç (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist eifersüchtig auf seinen Bruder." },
      { label: "Prät.", de: "Sie war eifersüchtig auf die neue Kollegin." },
      { label: "Perf.", de: "Er ist immer eifersüchtig auf seinen Freund gewesen." },
    ],
  },
  {
    word: "entfernt von", filename: "entfernt von.png", kind: "Adjektiv",
    turkish: "uzak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Das Haus ist weit entfernt von der Stadt." },
      { label: "Prät.", de: "Die Schule war entfernt von seinem Zuhause." },
      { label: "Perf.", de: "Das Dorf ist weit entfernt von der Stadt gewesen." },
    ],
  },
  {
    word: "entscheidend (für)", filename: "entscheidend (für).png", kind: "Adjektiv",
    turkish: "belirleyici, kritik (— için)",
    examples: [
      { label: "Präs.", de: "Diese Prüfung ist entscheidend für die Zulassung." },
      { label: "Prät.", de: "Der Moment war entscheidend für seine Karriere." },
      { label: "Perf.", de: "Die Wahl ist entscheidend für die Zukunft gewesen." },
    ],
  },
  {
    word: "entschlossen zu", filename: "entschlossen zu.png", kind: "Adjektiv",
    turkish: "kararlı (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist entschlossen zu einer Veränderung." },
      { label: "Prät.", de: "Er war entschlossen zu einem Neuanfang." },
      { label: "Perf.", de: "Sie ist entschlossen zu einer Entscheidung gewesen." },
    ],
  },
  {
    word: "entsetzt über", filename: "entsetzt über.png", kind: "Adjektiv",
    turkish: "şoke olmuş, dehşete düşmüş (— karşısında)",
    examples: [
      { label: "Präs.", de: "Er ist entsetzt über das Verhalten seines Chefs." },
      { label: "Prät.", de: "Sie war entsetzt über die schlechten Nachrichten." },
      { label: "Perf.", de: "Das Publikum ist über die Aussagen entsetzt gewesen." },
    ],
  },
  {
    word: "enttäuscht von", filename: "enttäuscht von.png", kind: "Adjektiv",
    turkish: "hayal kırıklığına uğramış (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ist enttäuscht von dem Ergebnis." },
      { label: "Prät.", de: "Sie war enttäuscht von seiner Reaktion." },
      { label: "Perf.", de: "Ich bin enttäuscht von der Leistung gewesen." },
    ],
  },
  {
    word: "erstaunt über ", filename: "erstaunt über .png", kind: "Adjektiv",
    turkish: "şaşırmış, hayrete düşmüş (— karşısında)",
    examples: [
      { label: "Präs.", de: "Sie ist erstaunt über seinen Fortschritt." },
      { label: "Prät.", de: "Er war erstaunt über die Neuigkeit." },
      { label: "Perf.", de: "Alle sind über das Ergebnis erstaunt gewesen." },
    ],
  },
  {
    word: "fähig zu", filename: "fähig zu.png", kind: "Adjektiv",
    turkish: "yetenekli, muktedir (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist fähig zu großen Leistungen." },
      { label: "Prät.", de: "Sie war fähig zu komplizierten Aufgaben." },
      { label: "Perf.", de: "Er ist fähig zu einer solchen Tat gewesen." },
    ],
  },
  {
    word: "fertig (mit)", filename: "fertig (mit).png", kind: "Adjektiv",
    turkish: "bitirmiş, hazır (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er ist fertig mit der Hausaufgabe." },
      { label: "Prät.", de: "Sie war fertig mit dem Kochen." },
      { label: "Perf.", de: "Er ist fertig mit dem Projekt gewesen." },
    ],
  },
  {
    word: "frei von", filename: "frei von.png", kind: "Adjektiv",
    turkish: "özgür, serbest (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Das Produkt ist frei von Zusatzstoffen." },
      { label: "Prät.", de: "Die Stadt war frei von Krankheiten." },
      { label: "Perf.", de: "Er ist frei von jeglicher Schuld gewesen." },
    ],
  },
  {
    word: "freundlich zu", filename: "freundlich zu.png", kind: "Adjektiv",
    turkish: "arkadaşça, nazik (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist immer freundlich zu den Kunden." },
      { label: "Prät.", de: "Er war sehr freundlich zu uns." },
      { label: "Perf.", de: "Die Mitarbeiter sind freundlich zu den Gästen gewesen." },
    ],
  },
  {
    word: "froh über", filename: "froh über.png", kind: "Adjektiv",
    turkish: "memnun, sevinçli (— hakkında)",
    examples: [
      { label: "Präs.", de: "Ich bin froh über deine Ankunft." },
      { label: "Prät.", de: "Sie war froh über das Ergebnis." },
      { label: "Perf.", de: "Er ist froh über die gute Nachricht gewesen." },
    ],
  },
  {
    word: "geeignet (für)", filename: "geeignet (für).png", kind: "Adjektiv",
    turkish: "uygun, elverişli (— için)",
    examples: [
      { label: "Präs.", de: "Das Hotel ist geeignet für Familien." },
      { label: "Prät.", de: "Die Stelle war geeignet für seine Qualifikationen." },
      { label: "Perf.", de: "Das Programm ist geeignet für Anfänger gewesen." },
    ],
  },
  {
    word: "gespannt (auf)", filename: "gespannt (auf).png", kind: "Adjektiv",
    turkish: "meraklı, sabırsız (—a/—e)",
    examples: [
      { label: "Präs.", de: "Ich bin gespannt auf das Ergebnis." },
      { label: "Prät.", de: "Er war gespannt auf den Film." },
      { label: "Perf.", de: "Alle sind gespannt auf die Neuigkeiten gewesen." },
    ],
  },
  {
    word: "gewöhnt (an)", filename: "gewöhnt (an).png", kind: "Adjektiv",
    turkish: "alışmış (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist an das kalte Wetter gewöhnt." },
      { label: "Prät.", de: "Sie war an den Lärm gewöhnt." },
      { label: "Perf.", de: "Er ist an die neue Umgebung gewöhnt gewesen." },
    ],
  },
  {
    word: "glücklich über", filename: "glücklich über.png", kind: "Adjektiv",
    turkish: "mutlu (— hakkında)",
    examples: [
      { label: "Präs.", de: "Sie ist glücklich über den Erfolg." },
      { label: "Prät.", de: "Er war glücklich über das Geschenk." },
      { label: "Perf.", de: "Das Kind ist glücklich über das Spielzeug gewesen." },
    ],
  },
  {
    word: "gut (in:zu)", filename: "gut (in:zu).png", kind: "Adjektiv",
    turkish: "iyi (—da/—de; —a/—e karşı nazik)",
    examples: [
      { label: "Präs.", de: "Sie ist gut in Mathematik." },
      { label: "Prät.", de: "Er war gut zu seinen Mitarbeitern." },
      { label: "Perf.", de: "Er ist gut in seinem Fach gewesen." },
    ],
  },
  {
    word: "gut zu:in ", filename: "gut zu:in .png", kind: "Adjektiv",
    turkish: "nazik (—a/—e); iyi (—da/—de)",
    examples: [
      { label: "Präs.", de: "Er ist gut zu den Kindern." },
      { label: "Prät.", de: "Sie war gut in Sprachen." },
      { label: "Perf.", de: "Er ist gut zu ihr gewesen." },
    ],
  },
  {
    word: "höflich zu", filename: "höflich zu.png", kind: "Adjektiv",
    turkish: "kibar, saygılı (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist höflich zu jedem." },
      { label: "Prät.", de: "Sie war höflich zu den Gästen." },
      { label: "Perf.", de: "Er ist stets höflich zu seinen Lehrern gewesen." },
    ],
  },
  {
    word: "interessiert (an)", filename: "interessiert (an).png", kind: "Adjektiv",
    turkish: "ilgili, meraklı (—la/—le)",
    examples: [
      { label: "Präs.", de: "Sie ist interessiert an Geschichte." },
      { label: "Prät.", de: "Er war interessiert an dem Angebot." },
      { label: "Perf.", de: "Er ist interessiert an Kunst und Kultur gewesen." },
    ],
  },
  {
    word: "lieb zu", filename: "lieb zu.png", kind: "Adjektiv",
    turkish: "sevecen, şefkatli (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist immer lieb zu ihren Freunden." },
      { label: "Prät.", de: "Er war lieb zu dem kleinen Kind." },
      { label: "Perf.", de: "Sie ist sehr lieb zu ihm gewesen." },
    ],
  },
  {
    word: "misstrauisch (gegenüber)", filename: "misstrauisch (gegenüber).png", kind: "Adjektiv",
    turkish: "şüpheci, güvensiz (—a/—e karşı)",
    examples: [
      { label: "Präs.", de: "Er ist misstrauisch gegenüber fremden Leuten." },
      { label: "Prät.", de: "Sie war misstrauisch gegenüber dem Angebot." },
      { label: "Perf.", de: "Er ist misstrauisch gegenüber seinen Kollegen gewesen." },
    ],
  },
  {
    word: "müde von", filename: "müde von.png", kind: "Adjektiv",
    turkish: "yorgun (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Ich bin müde von der langen Reise." },
      { label: "Prät.", de: "Er war müde von der Arbeit." },
      { label: "Perf.", de: "Sie ist müde von dem anstrengenden Tag gewesen." },
    ],
  },
  {
    word: "neidisch (auf)", filename: "neidisch (auf).png", kind: "Adjektiv",
    turkish: "kıskanç, çekemez (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist neidisch auf den Erfolg seines Bruders." },
      { label: "Prät.", de: "Sie war neidisch auf ihre Kollegin." },
      { label: "Perf.", de: "Er ist neidisch auf seine Freunde gewesen." },
    ],
  },
  {
    word: "nett zu", filename: "nett zu.png", kind: "Adjektiv",
    turkish: "nazik, iyi kalpli (—a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist immer nett zu den Nachbarn." },
      { label: "Prät.", de: "Er war nett zu dem kleinen Jungen." },
      { label: "Perf.", de: "Sie ist immer nett zu uns gewesen." },
    ],
  },
  {
    word: "neugierig (auf)", filename: "neugierig (auf).png", kind: "Adjektiv",
    turkish: "meraklı (—a/—e)",
    examples: [
      { label: "Präs.", de: "Das Kind ist neugierig auf alles." },
      { label: "Prät.", de: "Sie war neugierig auf das Ergebnis." },
      { label: "Perf.", de: "Er ist sehr neugierig auf die neue Stadt gewesen." },
    ],
  },
  {
    word: "offen (für)", filename: "offen (für).png", kind: "Adjektiv",
    turkish: "açık (— için)",
    examples: [
      { label: "Präs.", de: "Er ist offen für neue Ideen." },
      { label: "Prät.", de: "Sie war offen für Kritik." },
      { label: "Perf.", de: "Er ist stets offen für Vorschläge gewesen." },
    ],
  },
  {
    word: "reich (an)", filename: "reich (an).png", kind: "Adjektiv",
    turkish: "zengin (—la/—le; açısından)",
    examples: [
      { label: "Präs.", de: "Das Land ist reich an Bodenschätzen." },
      { label: "Prät.", de: "Die Region war reich an Traditionen." },
      { label: "Perf.", de: "Die Stadt ist reich an Geschichte gewesen." },
    ],
  },
  {
    word: "schuld (an)", filename: "schuld (an).png", kind: "Adjektiv",
    turkish: "suçlu (—dan/—den dolayı)",
    examples: [
      { label: "Präs.", de: "Er ist schuld an dem Unfall." },
      { label: "Prät.", de: "Sie war schuld an dem Missverständnis." },
      { label: "Perf.", de: "Er ist schuld an dem Fehler gewesen." },
    ],
  },
  {
    word: "schädlich (für)", filename: "schädlich (für).png", kind: "Adjektiv",
    turkish: "zararlı (— için)",
    examples: [
      { label: "Präs.", de: "Rauchen ist schädlich für die Gesundheit." },
      { label: "Prät.", de: "Das Produkt war schädlich für die Umwelt." },
      { label: "Perf.", de: "Die Chemikalie ist schädlich für Pflanzen gewesen." },
    ],
  },
  {
    word: "schwierig (für)", filename: "schwierig (für).png", kind: "Adjektiv",
    turkish: "zor, güç (— için)",
    examples: [
      { label: "Präs.", de: "Die Aufgabe ist schwierig für Anfänger." },
      { label: "Prät.", de: "Die Situation war schwierig für alle." },
      { label: "Perf.", de: "Die Prüfung ist sehr schwierig für ihn gewesen." },
    ],
  },
  {
    word: "sicher vor ", filename: "sicher vor .png", kind: "Adjektiv",
    turkish: "güvende (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Das Kind ist sicher vor der Kälte." },
      { label: "Prät.", de: "Niemand war sicher vor der Krankheit." },
      { label: "Perf.", de: "Die Bevölkerung ist sicher vor dem Hochwasser gewesen." },
    ],
  },
  {
    word: "stolz (auf)", filename: "stolz (auf).png", kind: "Adjektiv",
    turkish: "gururlu (—la/—le)",
    examples: [
      { label: "Präs.", de: "Die Mutter ist stolz auf ihren Sohn." },
      { label: "Prät.", de: "Er war stolz auf seine Leistung." },
      { label: "Perf.", de: "Die Eltern sind stolz auf ihre Tochter gewesen." },
    ],
  },
  {
    word: "typisch (für)", filename: "typisch (für).png", kind: "Adjektiv",
    turkish: "tipik, karakteristik (— için)",
    examples: [
      { label: "Präs.", de: "Das ist typisch für das deutsche Wetter." },
      { label: "Prät.", de: "Das Verhalten war typisch für ihn." },
      { label: "Perf.", de: "Diese Reaktion ist typisch für solche Situationen gewesen." },
    ],
  },
  {
    word: "unabhängig von", filename: "unabhängig von.png", kind: "Adjektiv",
    turkish: "bağımsız (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Sie ist unabhängig von der Meinung anderer." },
      { label: "Prät.", de: "Er war finanziell unabhängig von seinen Eltern." },
      { label: "Perf.", de: "Sie ist unabhängig von fremder Hilfe gewesen." },
    ],
  },
  {
    word: "unangenehm (für)", filename: "unangenehm (für).png", kind: "Adjektiv",
    turkish: "nahoş, rahatsız edici (— için)",
    examples: [
      { label: "Präs.", de: "Die Situation ist unangenehm für alle." },
      { label: "Prät.", de: "Das Gespräch war unangenehm für sie." },
      { label: "Perf.", de: "Die Begegnung ist unangenehm für mich gewesen." },
    ],
  },
  {
    word: "unbeliebt (bei)", filename: "unbeliebt (bei).png", kind: "Adjektiv",
    turkish: "sevilmeyen (— nezdinde)",
    examples: [
      { label: "Präs.", de: "Er ist unbeliebt bei seinen Kollegen." },
      { label: "Prät.", de: "Die Maßnahme war unbeliebt bei der Bevölkerung." },
      { label: "Perf.", de: "Der Politiker ist unbeliebt bei den Wählern gewesen." },
    ],
  },
  {
    word: "unerfahren (in)", filename: "unerfahren (in).png", kind: "Adjektiv",
    turkish: "deneyimsiz (—da/—de)",
    examples: [
      { label: "Präs.", de: "Er ist noch unerfahren in diesem Bereich." },
      { label: "Prät.", de: "Sie war unerfahren in der Führung." },
      { label: "Perf.", de: "Er ist unerfahren in der Verhandlung gewesen." },
    ],
  },
  {
    word: "ungeeignet (für)", filename: "ungeeignet (für).png", kind: "Adjektiv",
    turkish: "uygunsuz, elverişsiz (— için)",
    examples: [
      { label: "Präs.", de: "Das Klima ist ungeeignet für den Anbau." },
      { label: "Prät.", de: "Das Produkt war ungeeignet für den Einsatz." },
      { label: "Perf.", de: "Die Software ist ungeeignet für das Gerät gewesen." },
    ],
  },
  {
    word: "unglücklich über", filename: "unglücklich über.png", kind: "Adjektiv",
    turkish: "mutsuz (— hakkında)",
    examples: [
      { label: "Präs.", de: "Sie ist unglücklich über die Entscheidung." },
      { label: "Prät.", de: "Er war unglücklich über das Ergebnis." },
      { label: "Perf.", de: "Sie ist unglücklich über den Ausgang gewesen." },
    ],
  },
  {
    word: "unschuldig (an)", filename: "unschuldig (an).png", kind: "Adjektiv",
    turkish: "masum (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ist unschuldig an dem Verbrechen." },
      { label: "Prät.", de: "Sie war unschuldig an dem Vorfall." },
      { label: "Perf.", de: "Er ist unschuldig an der Tat gewesen." },
    ],
  },
  {
    word: "unzufrieden (mit)", filename: "unzufrieden (mit).png", kind: "Adjektiv",
    turkish: "memnuniyetsiz (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er ist unzufrieden mit dem Ergebnis." },
      { label: "Prät.", de: "Sie war unzufrieden mit der Leistung." },
      { label: "Perf.", de: "Er ist unzufrieden mit der Situation gewesen." },
    ],
  },
  {
    word: "verantwortlich (für)", filename: "verantwortlich (für).png", kind: "Adjektiv",
    turkish: "sorumlu (— için)",
    examples: [
      { label: "Präs.", de: "Er ist verantwortlich für das Projekt." },
      { label: "Prät.", de: "Sie war verantwortlich für das Team." },
      { label: "Perf.", de: "Er ist verantwortlich für den Fehler gewesen." },
    ],
  },
  {
    word: "verärgert über", filename: "verärgert über.png", kind: "Adjektiv",
    turkish: "sinirlenmiş, kızgın (— hakkında)",
    examples: [
      { label: "Präs.", de: "Sie ist verärgert über das Verhalten." },
      { label: "Prät.", de: "Er war verärgert über die Entscheidung." },
      { label: "Perf.", de: "Sie ist verärgert über die Nachricht gewesen." },
    ],
  },
  {
    word: "verheiratet (mit)", filename: "verheiratet (mit).png", kind: "Adjektiv",
    turkish: "evli (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er ist seit zehn Jahren verheiratet mit ihr." },
      { label: "Prät.", de: "Sie war verheiratet mit einem Arzt." },
      { label: "Perf.", de: "Er ist dreimal verheiratet gewesen." },
    ],
  },
  {
    word: "verliebt (in)", filename: "verliebt (in).png", kind: "Adjektiv",
    turkish: "aşık (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er ist verliebt in seine Nachbarin." },
      { label: "Prät.", de: "Sie war verliebt in ihren Schulkameraden." },
      { label: "Perf.", de: "Er ist tief verliebt in sie gewesen." },
    ],
  },
  {
    word: "verrückt nach", filename: "verrückt nach.png", kind: "Adjektiv",
    turkish: "çıldırmış, deli (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ist verrückt nach Schokolade." },
      { label: "Prät.", de: "Sie war verrückt nach diesem Sänger." },
      { label: "Perf.", de: "Er ist verrückt nach dem neuen Spiel gewesen." },
    ],
  },
  {
    word: "verwandt mit", filename: "verwandt mit.png", kind: "Adjektiv",
    turkish: "akraba (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er ist verwandt mit dem Bürgermeister." },
      { label: "Prät.", de: "Sie war verwandt mit einer berühmten Sängerin." },
      { label: "Perf.", de: "Er ist mit ihr verwandt gewesen." },
    ],
  },
  {
    word: "wichtig (für)", filename: "wichtig (für).png", kind: "Adjektiv",
    turkish: "önemli (— için)",
    examples: [
      { label: "Präs.", de: "Bildung ist wichtig für die Zukunft." },
      { label: "Prät.", de: "Die Entscheidung war wichtig für das Team." },
      { label: "Perf.", de: "Das Gespräch ist wichtig für den Prozess gewesen." },
    ],
  },
  {
    word: "wütend (auf:über)", filename: "wütend (auf:über).png", kind: "Adjektiv",
    turkish: "öfkeli (—a/—e; — hakkında)",
    examples: [
      { label: "Präs.", de: "Er ist wütend auf seinen Bruder." },
      { label: "Prät.", de: "Sie war wütend über die Lüge." },
      { label: "Perf.", de: "Er ist wütend auf mich gewesen." },
    ],
  },
  {
    word: "wütend über:auf ", filename: "wütend über:auf .png", kind: "Adjektiv",
    turkish: "öfkeli (— hakkında / —a/—e)",
    examples: [
      { label: "Präs.", de: "Sie ist wütend über seine Aussage." },
      { label: "Prät.", de: "Er war wütend auf den Fahrer." },
      { label: "Perf.", de: "Sie ist wütend über die Entscheidung gewesen." },
    ],
  },
  {
    word: "zufrieden mit", filename: "zufrieden mit.png", kind: "Adjektiv",
    turkish: "memnun (—la/—le)",
    examples: [
      { label: "Präs.", de: "Sie ist zufrieden mit dem Ergebnis." },
      { label: "Prät.", de: "Er war zufrieden mit seiner Arbeit." },
      { label: "Perf.", de: "Das Team ist zufrieden mit dem Projekt gewesen." },
    ],
  },
  {
    word: "zuständig (für)", filename: "zuständig (für).png", kind: "Adjektiv",
    turkish: "yetkili, sorumlu (— için)",
    examples: [
      { label: "Präs.", de: "Er ist zuständig für den Kundenservice." },
      { label: "Prät.", de: "Sie war zuständig für die Organisation." },
      { label: "Perf.", de: "Er ist zuständig für das Projekt gewesen." },
    ],
  },
  {
    word: "überzeugt von", filename: "überzeugt von.png", kind: "Adjektiv",
    turkish: "ikna olmuş, emin (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ist überzeugt von seiner Idee." },
      { label: "Prät.", de: "Sie war überzeugt von dem Plan." },
      { label: "Perf.", de: "Er ist überzeugt von der Lösung gewesen." },
    ],
  },

  // ── VERBEN ─────────────────────────────────────────────────────────
  {
    word: "beitragen (zu)", filename: "beitragen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er trug bei", perfekt: "hat beigetragen" },
    turkish: "katkıda bulunmak (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er trägt zum Schutz der Umwelt bei." },
      { label: "Prät.", de: "Sie trug viel zur Lösung des Problems bei." },
      { label: "Perf.", de: "Er hat zum Erfolg des Teams beigetragen." },
    ],
  },
  {
    word: "drängen (zu)", filename: "drängen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er drängte", perfekt: "hat gedrängt" },
    turkish: "zorlamak, baskı yapmak (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er drängt sie zu einer schnellen Entscheidung." },
      { label: "Prät.", de: "Sie drängte ihn zu einem Geständnis." },
      { label: "Perf.", de: "Er hat sie zu einer Unterschrift gedrängt." },
    ],
  },
  {
    word: "einladen (zu)", filename: "einladen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er lud ein", perfekt: "hat eingeladen" },
    turkish: "davet etmek (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er lädt sie zu seiner Party ein." },
      { label: "Prät.", de: "Sie lud uns zum Abendessen ein." },
      { label: "Perf.", de: "Er hat sie zu einem Gespräch eingeladen." },
    ],
  },
  {
    word: "erwärmen (für)", filename: "erwärmen (für).png", kind: "Verb",
    verbForms: { praeteritum: "er erwärmte sich", perfekt: "hat sich erwärmt" },
    turkish: "ısınmak, ilgi duymaya başlamak (— için)",
    examples: [
      { label: "Präs.", de: "Er erwärmt sich für das neue Projekt." },
      { label: "Prät.", de: "Sie erwärmte sich allmählich für die Idee." },
      { label: "Perf.", de: "Er hat sich für den Vorschlag erwärmt." },
    ],
  },
  {
    word: "flüchten (vor)", filename: "flüchten (vor).png", kind: "Verb",
    verbForms: { praeteritum: "er flüchtete", perfekt: "ist geflüchtet" },
    turkish: "kaçmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er flüchtet vor der Verantwortung." },
      { label: "Prät.", de: "Sie flüchtete vor dem Regen ins Café." },
      { label: "Perf.", de: "Er ist vor dem Krieg nach Deutschland geflüchtet." },
    ],
  },
  {
    word: "gehören (zu)", filename: "gehören (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er gehörte", perfekt: "hat gehört" },
    turkish: "ait olmak, dahil olmak (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er gehört zu den besten Spielern der Liga." },
      { label: "Prät.", de: "Sie gehörte zu unserer Gruppe." },
      { label: "Perf.", de: "Er hat zu den Gründern des Unternehmens gehört." },
    ],
  },
  {
    word: "gratulieren (zu)", filename: "gratulieren (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er gratulierte", perfekt: "hat gratuliert" },
    turkish: "tebrik etmek (—den dolayı)",
    examples: [
      { label: "Präs.", de: "Er gratuliert ihr zum Geburtstag." },
      { label: "Prät.", de: "Sie gratulierte mir zur Beförderung." },
      { label: "Perf.", de: "Er hat ihr zum Erfolg gratuliert." },
    ],
  },
  {
    word: "halten (für:von)", filename: "halten (für:von).png", kind: "Verb",
    verbForms: { praeteritum: "er hielt", perfekt: "hat gehalten" },
    turkish: "saymak (— olarak); değer vermek (—dan)",
    examples: [
      { label: "Präs.", de: "Er hält ihn für sehr klug." },
      { label: "Prät.", de: "Sie hielt nicht viel davon." },
      { label: "Perf.", de: "Er hat ihn für einen Experten gehalten." },
    ],
  },
  {
    word: "hören von", filename: "hören von.png", kind: "Verb",
    verbForms: { praeteritum: "er hörte", perfekt: "hat gehört" },
    turkish: "duymak, haber almak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Ich höre nichts von ihr." },
      { label: "Prät.", de: "Er hörte von dem Unfall durch die Zeitung." },
      { label: "Perf.", de: "Sie hat von dem neuen Projekt gehört." },
    ],
  },
  {
    word: "kämpfen (für:gegen)", filename: "kämpfen (für:gegen).png", kind: "Verb",
    verbForms: { praeteritum: "er kämpfte", perfekt: "hat gekämpft" },
    turkish: "mücadele etmek (— için / —a karşı)",
    examples: [
      { label: "Präs.", de: "Er kämpft für die Gerechtigkeit." },
      { label: "Prät.", de: "Sie kämpfte gegen die Krankheit." },
      { label: "Perf.", de: "Er hat für seine Rechte gekämpft." },
    ],
  },
  {
    word: "kommen (zu:auf)", filename: "kommen (zu:auf).png", kind: "Verb",
    verbForms: { praeteritum: "er kam", perfekt: "ist gekommen" },
    turkish: "gelmek; ulaşmak (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er kommt zu einer Einigung mit ihr." },
      { label: "Prät.", de: "Sie kam auf eine brillante Idee." },
      { label: "Perf.", de: "Er ist endlich zu einem Ergebnis gekommen." },
    ],
  },
  {
    word: "meinen (zu)", filename: "meinen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er meinte", perfekt: "hat gemeint" },
    turkish: "kastetmek, demek istemek",
    examples: [
      { label: "Präs.", de: "Er meint es gut mit uns." },
      { label: "Prät.", de: "Sie meinte es nicht böse." },
      { label: "Perf.", de: "Er hat das vollkommen ernst gemeint." },
    ],
  },
  {
    word: "passen (zu)", filename: "passen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er passte", perfekt: "hat gepasst" },
    turkish: "uymak, yakışmak (—a/—e)",
    examples: [
      { label: "Präs.", de: "Das Hemd passt gut zu der Hose." },
      { label: "Prät.", de: "Die Farbe passte nicht zu dem Zimmer." },
      { label: "Perf.", de: "Das Angebot hat gut zu uns gepasst." },
    ],
  },
  {
    word: "profitieren von", filename: "profitieren von.png", kind: "Verb",
    verbForms: { praeteritum: "er profitierte", perfekt: "hat profitiert" },
    turkish: "yararlanmak, kazanç elde etmek (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er profitiert von der neuen Regelung." },
      { label: "Prät.", de: "Sie profitierte vom Kursanstieg." },
      { label: "Perf.", de: "Das Unternehmen hat von der Krise profitiert." },
    ],
  },
  {
    word: "reden von:mit:über", filename: "reden von:mit:über.png", kind: "Verb",
    verbForms: { praeteritum: "er redete", perfekt: "hat geredet" },
    turkish: "konuşmak (—dan; —la; — hakkında)",
    examples: [
      { label: "Präs.", de: "Er redet gerne von seiner Kindheit." },
      { label: "Prät.", de: "Sie redete mit ihm über das Problem." },
      { label: "Perf.", de: "Er hat lange über das Thema geredet." },
    ],
  },
  {
    word: "schützen (vor)", filename: "schützen (vor).png", kind: "Verb",
    verbForms: { praeteritum: "er schützte", perfekt: "hat geschützt" },
    turkish: "korumak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Der Mantel schützt vor dem Regen." },
      { label: "Prät.", de: "Sie schützte das Kind vor der Kälte." },
      { label: "Perf.", de: "Er hat die Umwelt vor Schäden geschützt." },
    ],
  },
  {
    word: "schwärmen von ", filename: "schwärmen von .png", kind: "Verb",
    verbForms: { praeteritum: "er schwärmte", perfekt: "hat geschwärmt" },
    turkish: "hayran olmak, coşkuyla anlatmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er schwärmt von seiner Reise nach Italien." },
      { label: "Prät.", de: "Sie schwärmte von dem neuen Restaurant." },
      { label: "Perf.", de: "Er hat den ganzen Abend von seinem Urlaub geschwärmt." },
    ],
  },
  {
    word: "sorgen (für)", filename: "sorgen (für).png", kind: "Verb",
    verbForms: { praeteritum: "er sorgte", perfekt: "hat gesorgt" },
    turkish: "ilgilenmek, bakmak (— için)",
    examples: [
      { label: "Präs.", de: "Er sorgt für seine alte Mutter." },
      { label: "Prät.", de: "Sie sorgte für ausreichend Verpflegung." },
      { label: "Perf.", de: "Er hat sein ganzes Leben für seine Familie gesorgt." },
    ],
  },
  {
    word: "sprechen von:mit:über", filename: "sprechen von:mit:über.png", kind: "Verb",
    verbForms: { praeteritum: "er sprach", perfekt: "hat gesprochen" },
    turkish: "konuşmak (—dan; —la; — hakkında)",
    examples: [
      { label: "Präs.", de: "Er spricht von einer neuen Lösung." },
      { label: "Prät.", de: "Sie sprach mit dem Direktor über das Problem." },
      { label: "Perf.", de: "Er hat lange über das Thema gesprochen." },
    ],
  },
  {
    word: "stimmen (für:gegen)", filename: "stimmen (für:gegen).png", kind: "Verb",
    verbForms: { praeteritum: "er stimmte", perfekt: "hat gestimmt" },
    turkish: "oy vermek (— lehine / —a karşı)",
    examples: [
      { label: "Präs.", de: "Er stimmt für den neuen Kandidaten." },
      { label: "Prät.", de: "Sie stimmte gegen den Vorschlag." },
      { label: "Perf.", de: "Das Parlament hat für das Gesetz gestimmt." },
    ],
  },
  {
    word: "träumen von ", filename: "träumen von .png", kind: "Verb",
    verbForms: { praeteritum: "er träumte", perfekt: "hat geträumt" },
    turkish: "hayal etmek (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er träumt von einem eigenen Haus." },
      { label: "Prät.", de: "Sie träumte von einer Weltreise." },
      { label: "Perf.", de: "Er hat von einer besseren Zukunft geträumt." },
    ],
  },
  {
    word: "warnen (vor)", filename: "warnen (vor).png", kind: "Verb",
    verbForms: { praeteritum: "er warnte", perfekt: "hat gewarnt" },
    turkish: "uyarmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er warnt vor den Gefahren des Rauschens." },
      { label: "Prät.", de: "Sie warnte ihn vor dem Betrug." },
      { label: "Perf.", de: "Der Arzt hat vor den Risiken gewarnt." },
    ],
  },
  {
    word: "wählen (zu)", filename: "wählen (zu).png", kind: "Verb",
    verbForms: { praeteritum: "er wählte", perfekt: "hat gewählt" },
    turkish: "seçmek; (göreve) seçmek",
    examples: [
      { label: "Präs.", de: "Sie wählen ihn zum Präsidenten." },
      { label: "Prät.", de: "Die Mitglieder wählten ihn zum Vorsitzenden." },
      { label: "Perf.", de: "Sie haben ihn zum Bürgermeister gewählt." },
    ],
  },
  {
    word: "wissen (von)", filename: "wissen (von).png", kind: "Verb",
    verbForms: { praeteritum: "er wusste", perfekt: "hat gewusst" },
    turkish: "bilmek, haberdar olmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er weiß von dem Problem schon lange." },
      { label: "Prät.", de: "Sie wusste von dem geheimen Plan." },
      { label: "Perf.", de: "Er hat von dem Vorhaben gewusst." },
    ],
  },

  // ── VERBEN (REFL.) ─────────────────────────────────────────────────
  {
    word: "sich aufraffen (zu)", filename: "sich aufraffen (zu).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er raffte sich auf", perfekt: "hat sich aufgerafft" },
    turkish: "kendini toplayıp (bir şeyi) yapmak",
    examples: [
      { label: "Präs.", de: "Er rafft sich endlich zur Arbeit auf." },
      { label: "Prät.", de: "Sie raffte sich zu einem Spaziergang auf." },
      { label: "Perf.", de: "Er hat sich zu einer Entscheidung aufgerafft." },
    ],
  },
  {
    word: "sich ekeln (vor)", filename: "sich ekeln (vor).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er ekelte sich", perfekt: "hat sich geekelt" },
    turkish: "iğrenmek (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er ekelt sich vor Spinnen." },
      { label: "Prät.", de: "Sie ekelte sich vor dem Geruch." },
      { label: "Perf.", de: "Er hat sich vor dem Essen geekelt." },
    ],
  },
  {
    word: "sich engagieren (für)", filename: "sich engagieren (für).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er engagierte sich", perfekt: "hat sich engagiert" },
    turkish: "adanmak, aktif olmak (— için)",
    examples: [
      { label: "Präs.", de: "Er engagiert sich für den Umweltschutz." },
      { label: "Prät.", de: "Sie engagierte sich für Benachteiligte." },
      { label: "Perf.", de: "Er hat sich für die Gemeinschaft engagiert." },
    ],
  },
  {
    word: "sich entscheiden (für)", filename: "sich entscheiden (für).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er entschied sich", perfekt: "hat sich entschieden" },
    turkish: "karar vermek (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er entscheidet sich für das rote Auto." },
      { label: "Prät.", de: "Sie entschied sich für ein neues Leben." },
      { label: "Perf.", de: "Er hat sich für die Stelle entschieden." },
    ],
  },
  {
    word: "sich entschuldigen (für)", filename: "sich entschuldigen (für).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er entschuldigte sich", perfekt: "hat sich entschuldigt" },
    turkish: "özür dilemek (— için)",
    examples: [
      { label: "Präs.", de: "Er entschuldigt sich für sein Verhalten." },
      { label: "Prät.", de: "Sie entschuldigte sich für die Verspätung." },
      { label: "Perf.", de: "Er hat sich für seinen Fehler entschuldigt." },
    ],
  },
  {
    word: "sich entwickeln (zu)", filename: "sich entwickeln (zu).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er entwickelte sich", perfekt: "hat sich entwickelt" },
    turkish: "gelişmek, dönüşmek (—a/—e)",
    examples: [
      { label: "Präs.", de: "Er entwickelt sich zu einem guten Spieler." },
      { label: "Prät.", de: "Sie entwickelte sich zu einer Führungspersönlichkeit." },
      { label: "Perf.", de: "Er hat sich zu einem Experten entwickelt." },
    ],
  },
  {
    word: "sich fürchten (vor)", filename: "sich fürchten (vor).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er fürchtete sich", perfekt: "hat sich gefürchtet" },
    turkish: "korkmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er fürchtet sich vor dem Dunkeln." },
      { label: "Prät.", de: "Sie fürchtete sich vor dem Hund." },
      { label: "Perf.", de: "Er hat sich vor der Prüfung gefürchtet." },
    ],
  },
  {
    word: "sich losreißen von", filename: "sich losreißen von.png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er riss sich los", perfekt: "hat sich losgerissen" },
    turkish: "kendini koparmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er reißt sich kaum vom Bildschirm los." },
      { label: "Prät.", de: "Sie riss sich von ihrer Familie los." },
      { label: "Perf.", de: "Er hat sich von alten Gewohnheiten losgerissen." },
    ],
  },
  {
    word: "sich rechtfertigen (vor)", filename: "sich rechtfertigen (vor).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er rechtfertigte sich", perfekt: "hat sich gerechtfertigt" },
    turkish: "kendini savunmak, mazur göstermek",
    examples: [
      { label: "Präs.", de: "Er rechtfertigt sich vor dem Chef." },
      { label: "Prät.", de: "Sie rechtfertigte sich vor dem Gericht." },
      { label: "Perf.", de: "Er hat sich vor der Kommission gerechtfertigt." },
    ],
  },
  {
    word: "sich trennen (von)", filename: "sich trennen (von).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er trennte sich", perfekt: "hat sich getrennt" },
    turkish: "ayrılmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er trennt sich von seiner Freundin." },
      { label: "Prät.", de: "Sie trennte sich nach drei Jahren von ihm." },
      { label: "Perf.", de: "Er hat sich von seiner Frau getrennt." },
    ],
  },
  {
    word: "sich unterscheiden (von)", filename: "sich unterscheiden (von).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er unterschied sich", perfekt: "hat sich unterschieden" },
    turkish: "farklı olmak (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er unterscheidet sich sehr von seinem Bruder." },
      { label: "Prät.", de: "Die Preise unterschieden sich stark voneinander." },
      { label: "Perf.", de: "Das Produkt hat sich von der Konkurrenz unterschieden." },
    ],
  },
  {
    word: "sich verabschieden (von)", filename: "sich verabschieden (von).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er verabschiedete sich", perfekt: "hat sich verabschiedet" },
    turkish: "vedalaşmak (—la/—le)",
    examples: [
      { label: "Präs.", de: "Er verabschiedet sich von seinen Freunden." },
      { label: "Prät.", de: "Sie verabschiedete sich von ihrer Familie." },
      { label: "Perf.", de: "Er hat sich von allen Kollegen verabschiedet." },
    ],
  },
  {
    word: "sich zurückziehen (von:aus)", filename: "sich zurückziehen (von:aus).png", kind: "Verb (refl.)",
    verbForms: { praeteritum: "er zog sich zurück", perfekt: "hat sich zurückgezogen" },
    turkish: "çekilmek, geri çekilmek (—dan/—den)",
    examples: [
      { label: "Präs.", de: "Er zieht sich von der Öffentlichkeit zurück." },
      { label: "Prät.", de: "Sie zog sich aus dem Geschäftsleben zurück." },
      { label: "Perf.", de: "Er hat sich aus dem Berufsleben zurückgezogen." },
    ],
  },
]
