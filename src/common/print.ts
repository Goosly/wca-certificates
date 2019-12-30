import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {Certificate} from './Certificate';
import {Event} from '@wca/helpers/lib/models/event';
import {Result} from '@wca/helpers/lib/models/result';
import {formatCentiseconds} from '@wca/helpers/lib/helpers/time';
import {decodeMultiResult, formatMultiResult} from '@wca/helpers/lib/helpers/result';
import {TranslationHelper} from './translation';

declare var pdfMake: any;

@Injectable({
    providedIn: 'root'
})
export class PrintService {

    public language = 'en';
    public pageOrientation : 'landscape' | 'portrait' = 'landscape';
    public showLocalNames = false;
    public background: string = null;
    public countries: string = '';

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
        this.templateJson = TranslationHelper.getTemplate(this.language);
    }

    public getEvent(eventId: string) {
        return this.eventNames.find(e => {
            return e.id === eventId;
        });
    }

    private getNewCertificate(wcif: any, eventId: string, format: string, result: Result): Certificate {
        const certificate: Certificate = new Certificate();
        certificate.delegate = this.getPersonsWithRole(wcif, 'delegate');
        certificate.organizers = this.getPersonsWithRole(wcif, 'organizer');
        certificate.competitionName = wcif.name;
        certificate.name = wcif.persons.filter(p => p.registrantId === result.personId)[0].name;
        certificate.place = this.getPlace(result['rankingAfterFiltering']);
        certificate.event = this.getEvent(eventId).label;
        certificate.resultType = this.getResultType(format, result);
        certificate.result = this.formatResultForEvent(result, eventId);
        certificate.resultUnit = this.getResultUnit(eventId);
        certificate.locationAndDate = ''; // todo
        return certificate;
    }

    private getEmptyCertificate(wcif: any): Certificate {
        const certificate: Certificate = new Certificate();
        certificate.delegate = this.getPersonsWithRole(wcif, 'delegate');
        certificate.organizers = this.getPersonsWithRole(wcif, 'organizer');
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
                return result['average'] > 0 ? this.formatFmcMean(result['average']) : result['best'];
            case '333bf':
            case '444bf':
            case '555bf':
                return formatCentiseconds(result['best']);
            case '333mbf':
                let mbldResult: string = result['best'];
                return formatMultiResult(decodeMultiResult('0' + mbldResult));
            default:
                return formatCentiseconds(result['average'] > 0 ? result['average'] : result['best']);
        }
    }
    
    private formatFmcMean(mean: number) {
      if (mean === null || mean === undefined) {
        return null;
      }
      return mean.toString().substring(0, 2) + '.' + mean.toString().substring(2);
    }

    private getPersonsWithRole(wcif: any, role: string): string {
        let persons = wcif.persons.filter(p => p.roles.includes(role));
        persons.sort((a, b) => a.name.localeCompare(b.name));
        if (persons.length === 1) {
            return this.formatName(persons[0].name);
        } else {
            let last = persons.pop();
            return persons.map(p => this.formatName(p.name)).join(', ')
                + ' ' + TranslationHelper.getAnd(this.language) + ' ' + this.formatName(last.name);
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
        console.warn('Not a podium place');
        return '';
    }

    private getOneCertificateContent(certificate: Certificate) {
        let jsonWithReplacedStrings = this.replaceStringsIn(this.templateJson, certificate);
        let textObject = JSON.parse(jsonWithReplacedStrings);
        return {
            text: textObject,
            alignment: 'center',
            pageBreak: 'after'
        };
    }

    private replaceStringsIn(s: string, certificate: Certificate): string {
        s = s.replace('certificate.delegate', certificate.delegate);
        s = s.replace('certificate.organizers', certificate.organizers);
        s = s.replace('certificate.competitionName', certificate.competitionName);
        s = s.replace('certificate.name', this.formatName(certificate.name));
        s = s.replace('certificate.place', certificate.place);
        s = s.replace('certificate.event', certificate.event);
        s = s.replace('certificate.resultType', certificate.resultType);
        s = s.replace('certificate.result', certificate.result);
        s = s.replace('certificate.resultUnit', certificate.resultUnit);
        s = s.replace('certificate.locationAndDate', certificate.locationAndDate);
        return s;
    }
    
    private formatName(name: string) {
        return this.showLocalNames ? name
                : (name).replace(new RegExp(' \\(.+\\)'), '');
    }

    public printCertificates(wcif: any, events: string[]) {
        let document = this.getDocument();
        let atLeastOneCertificate = false;
        for (let i = 0; i < events.length; i++) {
            let event: Event = wcif.events.filter(e => e.id === events[i])[0];
            let podiumPlaces = event['podiumPlaces'];
            let format = event.rounds[event.rounds.length - 1].format;

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

    public printEmptyCertificate(wcif: any) {
        let document = this.getDocument();
        document.content.push(this.getOneCertificateContent(this.getEmptyCertificate(wcif)));
        this.removeLastPageBreak(document);
        pdfMake.createPdf(document).download('Empty certificate ' + wcif.name + '.pdf');
    }

    public handleBackgroundSelected(files: FileList) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(0));
      reader.onloadend = function (e) {
        this.background = reader.result;
      }.bind(this);
    }

    private removeLastPageBreak(document: any): void {
        document.content[document.content.length - 1].pageBreak = '';
    }

    private getDocument(): any {
        let document = {
            pageOrientation: this.pageOrientation,
            content: [],
            pageMargins: [100, 60, 100, 60],
            defaultStyle: {
                fontSize: 22
            }
        };
        if (this.background !== null) {
          document['background'] = {
            image: this.background,
            width: this.pageOrientation === 'landscape' ? 840 : 594,
            alignment: 'center'
          };
        }
        return document;
    }

    private downloadFile(data: string, filename: string) {
        saveAs(new Blob([data]), filename);
    }

    public loadLanguageTemplate() {
        this.templateJson = TranslationHelper.getTemplate(this.language);
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
}
