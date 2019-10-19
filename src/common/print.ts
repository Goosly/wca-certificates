import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Certificate } from './Certificate';
import { Event } from '@wca/helpers/lib/models/event';
import { Result } from '@wca/helpers/lib/models/result';
import { formatCentiseconds } from '@wca/helpers/lib/helpers/time';
import { decodeMultiResult, formatMultiResult } from '@wca/helpers/lib/helpers/result';
declare var pdfMake: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  
  public language = 'en';
  
  public templateJson = '';
  
  public eventNames = [
    {id: '222', label: '2x2x2 Cube'},
    {id: '333', label: '3x3x3 Cube'},
    {id: '444', label: '4x4x4 Cube'},
    {id: '555', label: '5x5x5 Cube'},
    {id: '666', label: '6x6x6 Cube'},
    {id: '777', label: '7x7x7 Cube'},
    {id: '333bf', label: '3x3x3 Blindfolded'},
    {id: '333oh', label: '3x3x3 One-Handed'},
    {id: '333ft', label: '3x3x3 With Feet'},
    {id: 'clock', label: 'Clock'},
    {id: 'minx', label: 'Megaminx'},
    {id: 'pyram', label: 'Pyraminx'},
    {id: 'skewb', label: 'Skewb'},
    {id: 'sq1', label: 'Square-1'},
    {id: '444bf', label: '4x4x4 Blindfolded'},
    {id: '555bf', label: '5x5x5 Blindfolded'},
    {id: '333mbf', label: '3x3x3 Multi-Blind'},
    {id: '333fm', label: '3x3x3 Fewest Moves'}
  ];

  constructor() {
    this.templateJson = this.getTemplate(this.language);
  }
  
  public getEvent(eventId: string) {
    return this.eventNames.find(e => {
      return e.id === eventId;
    });
  }
  
  private getNewCertificate(wcif: any, eventId: string, result: Result): Certificate {
    let certificate: Certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, "delegate");
    certificate.organizers = this.getPersonsWithRole(wcif, "organizer");
    certificate.competitionName = wcif.name;
    certificate.name = wcif.persons.filter(p => p.registrantId === result.personId)[0].name;
    certificate.place = this.getPlace(result.ranking);
    certificate.event = this.getEvent(eventId).label;
    certificate.result = this.formatResultForEvent(result, eventId);
    certificate.locationAndDate = ''; // todo
    return certificate;
  }
  
  private getEmptyCertificate(wcif: any, ): Certificate {
    let certificate: Certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, "delegate");
    certificate.organizers = this.getPersonsWithRole(wcif, "organizer");
    certificate.competitionName = wcif.name;
    certificate.name = '';
    certificate.place = '            ';
    certificate.event = '                        ';
    certificate.result = '            ';
    certificate.locationAndDate = ''; // todo
    return certificate;
  }
  
  private formatResultForEvent(result: Result, eventId: string): string {
    switch(eventId) {
      case '333fm':
        return result['average'] || result['best'];
      case '333bf':
      case '444bf':
      case '555bf':
        return formatCentiseconds(result['best']);
      case '333mbf':
        let mbldResult: string = result['best'];
        return formatMultiResult(decodeMultiResult('0' + mbldResult));
      default:
        return formatCentiseconds(result['average'] || result['best']);
    }
  }
  
  private getPersonsWithRole(wcif: any, role: string): string {
    let persons = wcif.persons.filter(p => p.roles.includes(role));
    persons.sort((a, b) => a.name.localeCompare(b.name));
    if (persons.length === 1) {
      return persons[0].name;
    } else {
      let last = persons.pop();
      return persons.map(p => p.name).join(', ') + ' ' + this.getAnd(this.language) + ' ' + last.name;
    }
  }
  
  private getPlace (place: number) {
    if (place === 1)
      return this.getFirst(this.language);
    if (place === 2)
      return this.getSecond(this.language);
    if (place === 3)
      return this.getThird(this.language);
    console.warn('Not a podium place');
    return '';
  }
  
  getOneCertificateContent(certificate: Certificate) {
    let jsonWithReplacedStrings = this.replaceStringsIn(this.templateJson, certificate);
    let textObject = JSON.parse(jsonWithReplacedStrings);
    return {
      text: textObject,
      alignment: 'center',
      pageBreak: 'after'
    };
  }
  
  private replaceStringsIn(s: string, certificate: Certificate): string {
    s = s.replace("certificate.delegate", certificate.delegate);
    s = s.replace("certificate.organizers", certificate.organizers);
    s = s.replace("certificate.competitionName", certificate.competitionName);
    s = s.replace("certificate.name", certificate.name);
    s = s.replace("certificate.place", certificate.place);
    s = s.replace("certificate.event", certificate.event);
    s = s.replace("certificate.result", certificate.result);
    s = s.replace("certificate.locationAndDate", certificate.locationAndDate);
    return s;
  }

  public printCertificates(wcif: any, events: string[]) {
    let document = this.getDocument();
    let atLeastOneCertificate = false;
    for (let i = 0; i < events.length; i++) {
      let event: Event = wcif.events.filter(e => e.id === events[i])[0];
      let results: Result[] = event.rounds[event.rounds.length - 1].results;
      let podiumPlaces = results.filter(r => r.ranking !== null && r.ranking <= 3);
      
      for(let p = 0; p < podiumPlaces.length; p++) {
        document.content.push(this.getOneCertificateContent(this.getNewCertificate(wcif, events[i], podiumPlaces[p])));
        atLeastOneCertificate = true;
      }
    }
    if (! atLeastOneCertificate) {
      alert('No results available. Please select at least one event that already has results in the final.');
    }
    
    this.removeLastPageBreak(document);
    pdfMake.createPdf(document).download('Certificates ' + wcif.name + '.pdf');
  }
  
  public printEmptyCertificate(wcif: any) {
    let document = this.getDocument();
    document.content.push(this.getOneCertificateContent(this.getEmptyCertificate(wcif)));
    this.removeLastPageBreak(document);
    pdfMake.createPdf(document).download('Empty certificate - ' + wcif.name + '.pdf');
  }
  
  private removeLastPageBreak(document: any): void {
    document.content[document.content.length - 1].pageBreak = '';
  }
  
  private getDocument(): any {
    return {
      pageOrientation: 'landscape',
      content: [],
      pageMargins: [ 100, 60, 100, 60 ],
      defaultStyle: {
        fontSize: 22
      }
    };
  }

  private downloadFile(data: string, filename: string){
    let blob = new Blob([data]);
    saveAs(blob, filename);
  }
  
  public loadLanguageTemplate() {
    this.templateJson = this.getTemplate(this.language);
  }
  
  private getTemplate(language: string): string {
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
            '"with a result of ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
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
            '"with a result of ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
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
            '"met een resultaat van ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
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
            '"avec un résultat de ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
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
            '"с результатом ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
        ']';
      default:
        return this.getTemplate('en');
    }
  }
  
  private getAnd(language: string): string {
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
  
  private getFirst(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'first';
      case 'nl':
        return 'eerste';
      case 'fr':
        return 'première';
      case 'ru':
        return 'первый';
      default:
        return this.getFirst('en');
     }
  }
  
  private getSecond(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'second';
      case 'nl':
        return 'tweede';
      case 'fr':
        return 'seconde';
      case 'ru':
        return 'второй';
      default:
        return this.getSecond('en');
     }
  }
  
  private getThird(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'third';
      case 'nl':
        return 'derde';
      case 'fr':
        return 'troisième';
      case 'ru':
        return 'третий';
      default:
        return this.getThird('en');
     }
  }

}
