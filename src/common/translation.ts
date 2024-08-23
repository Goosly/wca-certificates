export class TranslationHelper {

  public static getTemplate(language: string): string {
    switch (language) {
      case 'en':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", on behalf of the ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", and ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", on behalf of the organisation team of ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certify that",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"has placed ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" at ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"with certificate.resultType of ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'en-us':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", on behalf of the ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", and ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", on behalf of the organization team of ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certify that",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"has placed ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" at ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"with certificate.resultType of ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'nl':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", namens de ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", en ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", namens het organisatieteam van ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", verklaren dat",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"de ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" plaats heeft behaald bij ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"met certificate.resultType van ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'fr':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", au nom de la ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", et ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", au nom de l\'équipe d\'organisation du ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certifient que",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"a obtenu la ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" place au ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"avec certificate.resultType de ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'ru':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", со стороны ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", и ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", со стороны команды организаторов ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", подтверждают, что",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"занял ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" место в дисциплине ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"certificate.resultType ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'es-mx':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", en nombre de la ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", y ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", en representación del equipo organizador del ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certifican que",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"ha obtenido el ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" lugar en ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '"\\n",' + '\n' +
          '"con certificate.resultType de ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      case 'de-ch':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '" im Namen der ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", und ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '" im Namen des Organisationsteams von ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '" bestätigen, dass",' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '"den ",' + '\n' +
          '{"text": "certificate.place", "bold": "true"},' + '\n' +
          '" Platz in ",' + '\n' +
          '{"text": "certificate.event", "bold": "true"},' + '\n' +
          '" belegt hat",' + '\n' +
          '"\\n",' + '\n' +
          '"mit certificate.resultType von ",' + '\n' +
          '{"text": "certificate.result", "bold": "true"},' + '\n' +
          '" certificate.resultUnit"' + '\n' +
          ']';
      default:
        return this.getTemplate('en');
    }
  }

  public static getParticipationTemplate(language: string): string {
    switch (language) {
      case 'en':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", on behalf of the ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", and ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", on behalf of the organisation team of ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certify that",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"has participated in ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", obtaining the following results:\\n\\n"' + '\n' +
          ']';
      case 'en-us':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", on behalf of the ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", and ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", on behalf of the organization team of ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certify that",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"has participated in ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", obtaining the following results:\\n\\n"' + '\n' +
          ']';
      case 'nl':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", namens de ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", en ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", namens het organisatieteam van ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", verklaren dat",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"heeft deelgenomen aan ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '" en de volgende resultaten heeft behaald:\\n\\n"' + '\n' +
          ']';
      case 'ru':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", со стороны ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", и ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", со стороны команды организаторов ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", подтверждают, что",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"принял(а) участие в ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", достигнув следующих результатов:\\n\\n"' + '\n' +
          ']';
      case 'es-mx':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '", en nombre de la ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '", y ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '", en representación del equipo organizador del ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", certifican que",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"ha participado en el ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '", obteniendo los siguientes resultados:\\n\\n"' + '\n' +
          ']';
      case 'de-ch':
        return '[' + '\n' +
          '"\\n\\n\\n",' + '\n' +
          '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
          '" im Namen der ",' + '\n' +
          '{"text": "World Cube Association", "bold": "true"},' + '\n' +
          '" und ",' + '\n' +
          '{"text": "certificate.organizers", "bold": "true"},' + '\n' +
          '" im Namen des Organisationsteams von ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '" bestätigen, dass",' + '\n' +
          '"\\n\\n",' + '\n' +
          '{"text": "certificate.name", "fontSize": "32", "bold": "true"},' + '\n' +
          '"\\n\\n",' + '\n' +
          '"teilgenommen hat bei ",' + '\n' +
          '{"text": "certificate.competitionName", "bold": "true"},' + '\n' +
          '" und dabei folgende Ergebnisse erreicht hat:\\n\\n"' + '\n' +
          ']';
      default:
        return this.getParticipationTemplate('en');
    }
  }

  public static getAnd(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'and';
      case 'nl':
        return 'en';
      case 'fr':
        return 'et';
      case 'ru':
        return 'и';
      case 'es-mx':
        return 'y';
      case 'de-ch':
        return 'und';
      default:
        return '';
    }
  }

  public static getFirst(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'first';
      case 'nl':
        return 'eerste';
      case 'fr':
        return 'première';
      case 'ru':
        return 'первое';
      case 'es-mx':
        return 'primer';
      case 'de-ch':
        return 'ersten';
      default:
        return this.getFirst('en');
    }
  }

  public static getSecond(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'second';
      case 'nl':
        return 'tweede';
      case 'fr':
        return 'seconde';
      case 'ru':
        return 'второе';
      case 'es-mx':
        return 'segundo';
      case 'de-ch':
        return 'zweiten';
      default:
        return this.getSecond('en');
    }
  }

  public static getThird(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'third';
      case 'nl':
        return 'derde';
      case 'fr':
        return 'troisième';
      case 'ru':
        return 'третье';
      case 'es-mx':
        return 'tercer';
      case 'de-ch':
        return 'dritten';
      default:
        return this.getThird('en');
    }
  }

  public static getMoves(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'moves';
      case 'nl':
        return 'draaien';
      case 'fr':
        return 'mouvements';
      case 'ru':
        return ''; // Russian has different words depending on the number, too hard :(
      case 'es-mx':
        return 'movimientos';
      case 'de-ch':
        return 'Zügen';
      default:
        return this.getMoves('en');
    }
  }

  public static getAResult(language: string): string {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'a result';
      case 'nl':
        return 'een resultaat';
      case 'fr':
        return 'un résultat';
      case 'ru':
        return 'с результатом';
      case 'es-mx':
        return 'un resultado';
      case 'de-ch':
        return 'einem Ergebnis';
      default:
        return this.getAResult('en');
    }
  }

  static getAnAverage(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'an average';
      case 'nl':
        return 'een gemiddelde';
      case 'fr':
        return 'une moyenne';
      case 'ru':
        return 'со средним';
      case 'es-mx':
        return 'un promedio';
      case 'de-ch':
        return 'einem Durchschnitt';
      default:
        return this.getAnAverage('en');
    }
  }

  static getAMean(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'a mean';
      case 'nl':
        return 'een gemiddelde';
      case 'fr':
        return 'une moyenne';
      case 'ru':
        return 'со средним результатом';
      case 'es-mx':
        return 'una media';
      case 'de-ch':
        return 'einem Mittelwert';
      default:
        return this.getAMean('en');
    }
  }

  static getASingle(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'a best result';
      case 'nl':
        return 'een beste resultaat';
      case 'fr':
        return 'un meilleur';
      case 'ru':
        return 'с лучшим результатом';
      case 'es-mx':
        return 'un mejor resultado';
      case 'de-ch':
        return 'einem besten Ergebnis';
      default:
        return this.getASingle('en');
    }
  }

  static getEvent(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'Event';
      case 'nl':
        return 'Event';
      case 'ru':
        return 'Дисциплина';
      case 'es-mx':
        return 'Evento';
      case 'de-ch':
        return 'Disziplin';
      default:
        return this.getEvent('en');
    }
  }

  static getResult(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'Result';
      case 'nl':
        return 'Resultaat';
      case 'ru':
        return 'Результат';
      case 'es-mx':
        return 'Resultado';
      case 'de-ch':
        return 'Ergebnis';
      default:
        return this.getResult('en');
    }
  }

  static getRanking(language: string) {
    switch (language) {
      case 'en':
      case 'en-us':
        return 'Ranking';
      case 'nl':
        return 'Plaats';
      case 'ru':
        return 'Место';
      case 'es-mx':
        return 'Clasificación';
      case 'de-ch':
        return 'Platzierung';
      default:
        return this.getRanking('en');
    }
  }

}
