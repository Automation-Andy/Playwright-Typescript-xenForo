export class StringHelpers {
  static getIdFromUrl(url: string): number | null {
    const match = url.match(/(\d+)\/?$/);

    if (match) {
      return parseInt(match[1], 10);
    } else {
      return null;
    }
  }
}
