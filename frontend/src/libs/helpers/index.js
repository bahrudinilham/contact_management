export default class Helper {
  static groupContactsByAlphabet(data = []) {
    const grouped = {};

    data.forEach((item) => {
      const firstLatterOfName = item.first_name[0].toUpperCase();
      const letter = firstLatterOfName;
      //   const letter = /^[A-Z]$/.test(firstLatterOfName)
      //     ? firstLatterOfName
      //     : '#';

      if (!grouped[letter]) {
        grouped[letter] = [];
      }

      grouped[letter].push(item);
    });

    return grouped;
  }

  static getAlphabet(data) {
    const result = [...Object.keys(data).sort()];

    return result;
  }
}
