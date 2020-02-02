export class Helpers {

  public static sortCompetitorsByName(wcif: any) {
    wcif.persons = wcif.persons.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

}
