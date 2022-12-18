import {Person} from '@wca/helpers';
import {Result} from '@wca/helpers/lib/models/result';

export class Helpers {

  public static sortCompetitorsByName(persons: Person[]) {
    persons.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  public static sortResultsByRanking(results: Result[]) {
    results.sort(function(a, b) {
      return (a.ranking < b.ranking) ? -1 : (a.ranking > b.ranking) ? 1 : 0;
    });
  }

}
