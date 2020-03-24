import {Person} from '@wca/helpers';

export class Helpers {

  public static sortCompetitorsByName(persons: Person[]) {
    persons = persons.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

}
