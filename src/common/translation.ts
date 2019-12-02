
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
            default:
                return this.getTemplate('en');
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
                return 'ходов';
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
                return 'со средним';
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
                return 'с лучшим';
            default:
                return this.getASingle('en');
        }
    }

}
