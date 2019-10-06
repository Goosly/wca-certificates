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
  
  public getEvent(eventId: string) {
    return this.eventNames.find(e => {
      return e.id === eventId
    });
  }

  constructor() {}
  
  private getNewCertificate(wcif: any, eventId: string, place: number): Certificate {
    let event: Event = wcif.events.filter(e => e.id === eventId)[0];
    let results: Result[] = event.rounds[event.rounds.length - 1].results;
    let result: Result = results.filter(r => r.ranking === place)[0];
    if (result === null || result === undefined) {
      console.error('No result available for ' + eventId + ' at place ' + place + '!');
      return new Certificate();
    }
    
    let certificate: Certificate = new Certificate();
    certificate.delegate = this.getPersonsWithRole(wcif, "delegate");
    certificate.organizers = this.getPersonsWithRole(wcif, "organizer");
    certificate.competitionName = wcif.name;
    certificate.name = wcif.persons.filter(p => p.registrantId === result.personId)[0].name;
    certificate.place = this.getPlace(place);
    certificate.event = this.getEvent(eventId).label;
    certificate.result = this.formatResultForEvent(result, eventId);
    certificate.locationAndDate = ''; // todo
    return certificate;
  }
  
  private formatResultForEvent(result: Result, eventId: string): string {
    switch(eventId) {
      case '333fm':
        return result['average'];
      case '333bf':
      case '444bf':
      case '555bf':
        return formatCentiseconds(result['best']);
      case '333mbf':
        let mbldResult = decodeMultiResult(result['best']);
        return formatMultiResult(mbldResult);
      default:
        return formatCentiseconds(result['average']);
    }
  }
  
  private getPersonsWithRole(wcif: any, role: string): string {
    let persons = wcif.persons.filter(p => p.roles.includes(role));
    if (persons.length === 1) {
      return persons[0].name;
    } else {
      let last = persons.pop();
      return persons.map(p => p.name).join(', ') + ' and ' + last.name;
    }
  }
  
  private getPlace (place: number) {
    if (place === 1)
      return 'first';
    if (place === 2)
      return 'second';
    if (place === 3)
      return 'third';
    console.warn('Not a podium place');
    return '';
  }
  
  getOneCertificateContent(certificate: Certificate) {
    return {
      text: [
          '\n\n\n',
          {text: certificate.delegate, bold: true},
          ', on behalf of the ',
          {text: 'World Cube Association', bold: true},
          ', and ',
          {text: certificate.organizers, bold: true},
          ', on behalf of the organisation team of ',
          {text: certificate.competitionName, bold: true},
          ', certify that',
          '\n\n\n',
          {text: certificate.name, fontSize: 36, bold: true},
          '\n\n\n',
          
          'has placed ',
          {text: certificate.place, bold: true},
          ' at ',
          {text: certificate.event, bold: true},
          ' with a result of ',
          {text: certificate.result, bold: true},
          '\n\n\n\n\n',
          {text: certificate.locationAndDate, fontSize: 17}
      ],
      alignment: 'center',
      pageBreak: 'after'
    };
  }

  public printCertificates(wcif: any, events: string[]) {
    var document = {
      pageOrientation: 'landscape',
      content: [],
      pageMargins: [ 100, 60, 100, 60 ],
      defaultStyle: {
        fontSize: 22
      }
    };
    
    for (let i = 0; i < events.length; i++) {
      document.content.push(this.getOneCertificateContent(this.getNewCertificate(wcif, events[i], 1)));
      document.content.push(this.getOneCertificateContent(this.getNewCertificate(wcif, events[i], 2)));
      document.content.push(this.getOneCertificateContent(this.getNewCertificate(wcif, events[i], 3)));
    }
    document.content[document.content.length - 1].pageBreak = '';

    let filename = 'certificates.pdf';
    pdfMake.createPdf(document).download(filename);
  }

  private downloadFile(data: string, filename: string){
    let blob = new Blob([data]);
    saveAs(blob, filename);
  }

}
