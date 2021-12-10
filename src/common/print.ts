import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {Certificate} from './Certificate';
import {Event} from '@wca/helpers/lib/models/event';
import {Result} from '@wca/helpers/lib/models/result';
import {formatCentiseconds} from '@wca/helpers/lib/helpers/time';
import {decodeMultiResult, formatMultiResult, isDnf} from '@wca/helpers/lib/helpers/result';
import {TranslationHelper} from './translation';
import {getEventName, Person} from '@wca/helpers';
import {Helpers} from './helpers';
import {Backgrounds} from './backgrounds';

declare var pdfMake: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  public language = 'en';
  public participationLanguage = 'en';
  public pageOrientation: 'landscape' | 'portrait' = 'landscape';
  public participationPageOrientation: 'landscape' | 'portrait' = 'landscape';
  public showLocalNames = false;
  public background: 'no' | 'orange' | 'green' | 'color' | 'cubecomps' | 'upload' = 'no';
  public backgroundImage: string = null;
  public participationBackground: string = null;
  public countries: string = '';

  public podiumCertificateJson = '';
  public participationCertificateJson = '';

  constructor() {
    this.podiumCertificateJson = TranslationHelper.getTemplate(this.language);
    this.participationCertificateJson = TranslationHelper.getParticipationTemplate(this.participationLanguage);
  }

  public getEvent(eventId) {
    return getEventName(eventId);
  }

  private getNewCertificate(wcif: any, eventId: string, format: string, result: Result): Certificate {
    const certificate: Certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, 'delegate', this.language);
    certificate.organizers = this.getPersonsWithRole(wcif, 'organizer', this.language);
    certificate.competitionName = wcif.name;
    certificate.name = wcif.persons.filter(p => p.registrantId === result.personId)[0].name;
    certificate.place = this.getPlace(result['rankingAfterFiltering']);
    certificate.event = this.getEvent(eventId);
    certificate.resultType = this.getResultType(format, result);
    certificate.result = this.formatResultForEvent(result, eventId);
    certificate.resultUnit = this.getResultUnit(eventId);
    certificate.locationAndDate = ''; // todo
    return certificate;
  }

  private getEmptyCertificate(wcif: any): Certificate {
    const certificate: Certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, 'delegate', this.language);
    certificate.organizers = this.getPersonsWithRole(wcif, 'organizer', this.language);
    certificate.competitionName = wcif.name;
    certificate.name = '';
    certificate.place = '            ';
    certificate.event = '                        ';
    certificate.resultType = TranslationHelper.getAResult(this.language);
    certificate.result = '            ';
    certificate.resultUnit = '';
    certificate.locationAndDate = ''; // todo
    return certificate;
  }

  private formatResultForEvent(result: Result, eventId: string): string {
    switch (eventId) {
      case '333fm':
        return result['average'] > 0 ? this.formatFmcMean(result['average']) : isDnf(result['best']) ? 'DNF' : result['best'];
      case '333bf':
      case '444bf':
      case '555bf':
        return formatCentiseconds(result['best']);
      case '333mbf':
        const mbldResult: string = result['best'];
        return formatMultiResult(decodeMultiResult('0' + mbldResult));
      default:
        return formatCentiseconds(result['average'] > 0 ? result['average'] : result['best']);
    }
  }

  private formatFmcMean(mean: number) {
    if (mean === -1) {
      return 'DNF';
    }
    if (mean === null || mean === undefined) {
      return null;
    }
    return mean.toString().substring(0, 2) + '.' + mean.toString().substring(2);
  }

  private getPersonsWithRole(wcif: any, role: string, language: string): string {
    const persons = wcif.persons.filter(p => p.roles.includes(role));
    persons.sort((a, b) => a.name.localeCompare(b.name));
    if (persons.length === 1) {
      return this.formatName(persons[0].name);
    } else {
      const last = persons.pop();
      return persons.map(p => this.formatName(p.name)).join(', ')
        + ' ' + TranslationHelper.getAnd(language) + ' ' + this.formatName(last.name);
    }
  }

  private getPlace(place: number) {
    if (place === 1) {
      return TranslationHelper.getFirst(this.language);
    }
    if (place === 2) {
      return TranslationHelper.getSecond(this.language);
    }
    if (place === 3) {
      return TranslationHelper.getThird(this.language);
    }
    console.warn('Not a podium place: ' + place);
    return '';
  }

  private getOneCertificateContent(certificate: Certificate) {
    const jsonWithReplacedStrings = this.replaceStringsIn(this.podiumCertificateJson, certificate);
    const textObject = JSON.parse(jsonWithReplacedStrings);
    return {
      text: textObject,
      alignment: 'center',
      pageBreak: 'after'
    };
  }

  private replaceStringsIn(s: string, certificate: Certificate): string {
    s = s.replace(/certificate.delegate/g, certificate.delegate);
    s = s.replace(/certificate.organizers/g, certificate.organizers);
    s = s.replace(/certificate.competitionName/g, certificate.competitionName);
    s = s.replace(/certificate.name/g, this.formatName(certificate.name));
    s = s.replace(/certificate.place/g, certificate.place);
    s = s.replace(/certificate.event/g, certificate.event);
    s = s.replace(/certificate.resultType/g, certificate.resultType);
    s = s.replace(/certificate.resultUnit/g, certificate.resultUnit);
    s = s.replace(/certificate.result/g, certificate.result);
    s = s.replace(/certificate.locationAndDate/g, certificate.locationAndDate);
    return s;
  }

  private formatName(name: string) {
    return this.showLocalNames ? name
      : (name).replace(new RegExp(' \\(.+\\)'), '');
  }

  public printCertificates(wcif: any, events: string[]) {
    const document = this.getDocument(this.pageOrientation, this.getBackgroundImage());
    let atLeastOneCertificate = false;
    for (let i = 0; i < events.length; i++) {
      const event: Event = wcif.events.filter(e => e.id === events[i])[0];
      const podiumPlaces = event['podiumPlaces'];
      const format = event.rounds[event.rounds.length - 1].format;

      for (let p = 0; p < podiumPlaces.length; p++) {
        document.content.push(this.getOneCertificateContent(this.getNewCertificate(wcif, events[i], format, podiumPlaces[p])));
        atLeastOneCertificate = true;
      }
    }
    if (!atLeastOneCertificate) {
      alert('No results available. Please select at least one event that already has results in the final.');
    }

    this.removeLastPageBreak(document);
    pdfMake.createPdf(document).download('Certificates ' + wcif.name + '.pdf');
  }

  private getBackgroundImage() {
    switch (this.background) {
      case 'no':
        return null;
      case 'orange':
        return this.pageOrientation === 'landscape' ? Backgrounds.orangeLandscape() : Backgrounds.orangePortrait();
      case 'green':
        return this.pageOrientation === 'landscape' ? Backgrounds.greenLandscape() : Backgrounds.greenPortrait();
      case 'color':
        return this.pageOrientation === 'landscape' ? Backgrounds.colorLandscape() : Backgrounds.colorPortrait();
      case 'cubecomps':
        return this.pageOrientation === 'landscape' ? Backgrounds.cubecompsLandscape() : Backgrounds.cubecompsPortrait();
      case 'upload':
        return this.backgroundImage;
    }
  }

  public printEmptyCertificate(wcif: any) {
    const document = this.getDocument(this.pageOrientation, this.getBackgroundImage());
    document.content.push(this.getOneCertificateContent(this.getEmptyCertificate(wcif)));
    this.removeLastPageBreak(document);
    pdfMake.createPdf(document).download('Empty certificate ' + wcif.name + '.pdf');
  }

  public handleBackgroundSelected(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onloadend = function (e) {
      this.backgroundImage = reader.result;
    }.bind(this);
  }

  public handleParticipationBackgroundSelected(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onloadend = function (e) {
      this.participationBackground = reader.result;
    }.bind(this);
  }

  private removeLastPageBreak(document: any): void {
    document.content[document.content.length - 1].pageBreak = '';
  }

  private getDocument(orientation: string, background: string): any {
    const document = {
      pageOrientation: orientation,
      content: [],
      pageMargins: [100, 60, 100, 60],
      styles: {
        tableOverview: {
          lineHeight: 0.8
        }
      },
      defaultStyle: {
        fontSize: 22
      }
    };
    if (background !== null && background !== '') {
      document['background'] = {
        image: background,
        width: orientation === 'landscape' ? 841.89 : 595.28,
        alignment: 'center'
      };
    }
    return document;
  }

  private downloadFile(data: string, filename: string) {
    saveAs(new Blob([data]), filename);
  }

  public loadLanguageTemplate() {
    this.podiumCertificateJson = TranslationHelper.getTemplate(this.language);
  }

  public loadLanguageParticipationTemplate() {
    this.participationCertificateJson = TranslationHelper.getParticipationTemplate(this.participationLanguage);
  }

  private getResultUnit(eventId: string) {
    switch (eventId) {
      case '333fm':
        return TranslationHelper.getMoves(this.language);
      default:
        return '';
    }
  }

  private getResultType(format: string, result: Result) {
    switch (format) {
      case 'a':
        return (result['average'] > 0) ? TranslationHelper.getAnAverage(this.language)
          : TranslationHelper.getASingle(this.language);
      case 'm':
        return (result['average'] > 0) ? TranslationHelper.getAMean(this.language)
          : TranslationHelper.getASingle(this.language);
      case '1':
      case '2':
      case '3':
        return TranslationHelper.getASingle(this.language);
      default:
        return TranslationHelper.getAResult(this.language);
    }
  }

  printParticipationCertificates(wcif: any, personsWithAResult: Person[]) {
    const document = this.getDocument(this.participationPageOrientation, this.participationBackground);
    document.defaultStyle.fontSize = 14;
    Helpers.sortCompetitorsByName(personsWithAResult);
    personsWithAResult.forEach(p => {
      const certificate = this.getParticipationCertificate(wcif, p);
      document.content.push(this.getOneParticipationCertificateFor(certificate));
      document.content.push(this.getResultsTableFor(p, wcif));
    });

    this.removeLastPageBreakFromParticipationCertificates(document);
    pdfMake.createPdf(document).download('Participation certificates ' + wcif.name + '.pdf');
  }

  private getOneParticipationCertificateFor(certificate: Certificate) {
    const jsonWithReplacedStrings = this.replaceStringsIn(this.participationCertificateJson, certificate);
    const textObject = JSON.parse(jsonWithReplacedStrings);
    return {
      text: textObject,
      alignment: 'center'
    };
  }

  private getParticipationCertificate(wcif: any, p: Person) {
    const certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, 'delegate', this.participationLanguage);
    certificate.organizers = this.getPersonsWithRole(wcif, 'organizer', this.participationLanguage);
    certificate.competitionName = wcif.name;
    certificate.name = p.name;
    return certificate;
  }

  private getResultsTableFor(p: Person, wcif: any) {
    const table = {
      width: 'auto',
      style: 'tableOverview',
      table: {
        headerRows: 1,
        paddingLeft: function (i, node) { return 0; },
        paddingRight: function (i, node) { return 0; },
        paddingTop: function (i, node) { return 2; },
        paddingBottom: function (i, node) { return 2; },
        body: []
      },
      layout: 'lightHorizontalLines',
      pageBreak: 'after'
    };

    table.table.body.push([TranslationHelper.getEvent(this.participationLanguage),
      TranslationHelper.getResult(this.participationLanguage),
      TranslationHelper.getPosition(this.participationLanguage)]);
    wcif.events.forEach(event => {
      const array = [getEventName(event.id)];
      const result: Result = this.findResultOfPersonInEvent(p, event);
      if (result !== null) { // if competitor has a result in this event
        array.push(this.formatResultForEvent(result, event.id));
        array.push(result.ranking.toString());
        table.table.body.push(array);
      }
    });

    return {
      columns: [
        {width: '*', text: ''},
        table,
        {width: '*', text: ''},
      ]
    };
  }

  private removeLastPageBreakFromParticipationCertificates(document: any): void {
    document.content[document.content.length - 1].columns[1].pageBreak = '';
  }

  private findResultOfPersonInEvent(p: Person, event: Event) {
    for (let round = event.rounds.length - 1; round >= 0; round--) {
      const index = event.rounds[round].results.findIndex(r => r.personId === p.registrantId);
      if (index > -1) {
        return event.rounds[round].results[index];
      }
    }
    return null;
  }

}
