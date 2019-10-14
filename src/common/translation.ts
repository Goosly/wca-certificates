import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  
  public getTemplate(language: string): string {
    switch (language) {
      case 'en':
        return '[' + '\n' +
            '"\\n\\n\\n",' + '\n' +
            '{"text": "certificate.delegate", "bold": "true"},' + '\n' +
            '", on behalf of the ",' + '\n' +
            '{"text": "World Cube Association", "bold": "true"},' + '\n' +
            '", and ",' + '\n' +
            '{"text": "certificate.organisers", "bold": "true"},' + '\n' +
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
            '" with a result of ",' + '\n' +
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
            '" with a result of ",' + '\n' +
            '{"text": "certificate.result", "bold": "true"}' + '\n' +
        ']';
      default:
        return this.getTemplate('en');
    }
  }
  
  public getAnd(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'and';
      default:
        return '';
     }
  }
  
  public getFirst(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'first';
      default:
        return this.getFirst('en');
     }
  }
  
  public getSecond(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'second';
      default:
        return this.getSecond('en');
     }
  }
  
  public getThird(language: string): string {
     switch (language) {
      case 'en':
      case 'en-us':
        return 'third';
      default:
        return this.getThird('en');
     }
  }
  
}