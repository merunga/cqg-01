import { statsData, filterData, orderData, suggestedChampions } from '../src/data.js';

const data = {
  Ahri: {
    name: 'Ahri',
    info: {
      attack: 5,
      defense: 3,
      magic: 7,
      difficulty: 6,
    },
    tags: ["Mage", "Assassin", "Marksman"],
    stats:{
      hp: 504,
      mp: 207,
      armor: 380,
      attackdamage: 300,
    }
  },
  Zyra: {
    name: 'Zyra',
    info: {
      attack: 5,
      defense: 10,
      magic: 3,
      difficulty: 7,
    },
    tags:["Mage", "Support"],
    stats:{
      hp: 400,
      mp: 500,
      armor: 380,
      attackdamage: 370,
    }
  },
  Aatrox: {
    name: 'Aatrox',
    info: {
      attack: 7,
      defense: 3,
      magic: 1,
      difficulty: 6,
    },
    tags:["Fighter", "Tank", "Support"],
    stats:{
      hp: 302,
      mp: 307,
      armor: 480,
      attackdamage: 100,
    }
  }
}


//Test orderData => function sort
describe('orderData', () => {
  it('is a function', () => {
    expect(typeof orderData).toBe('function');

  })

  it('sort Z-A', () => {

    let dataOrder = orderData(Object.values(data), 'Z-A');

    expect(dataOrder[0]).toEqual(data.Zyra)
    expect(dataOrder[2]).toEqual(data.Aatrox)

  })

  it('sort A-Z', () => {

    let dataOrder = orderData(Object.values(data), 'A-Z');

    expect(dataOrder[0]).toEqual(data.Aatrox)
    expect(dataOrder[2]).toEqual(data.Zyra)

  })
  
  it('sort by MAX ATTACK', () => {
    let dataOrder = orderData(Object.values(data), 'MAX ATTACK');
    expect(dataOrder[0]).toEqual(data.Aatrox)
    expect(dataOrder[2]).toEqual(data.Zyra)
  })
  
  it('sort by MAX DEFENSE', () => {
    let dataOrder = orderData(Object.values(data), 'MAX DEFENSE');
    expect(dataOrder[0]).toEqual(data.Zyra)
    expect(dataOrder[2]).toEqual(data.Aatrox)
  })

  it('sort by MAX MAGIC', () => {
    let dataOrder = orderData(Object.values(data), 'MAX MAGIC');
    expect(dataOrder[0]).toEqual(data.Ahri)
    expect(dataOrder[2]).toEqual(data.Aatrox)
  })

  it('sort by MAX DIFFICULTY', () => {
    let dataOrder = orderData(Object.values(data), 'MAX DIFFICULTY');
    expect(dataOrder[0]).toEqual(data.Zyra)
    expect(dataOrder[2]).toEqual(data.Aatrox)
  })

  it('sort by other value', () => {
    let dataOrder = orderData(Object.values(data), 'SORT BY');
    expect(dataOrder[0]).toEqual(data.Aatrox)
    expect(dataOrder[1]).toEqual(data.Ahri)
    expect(dataOrder[2]).toEqual(data.Zyra)
  })
});

//Test filterData => function filter
describe('filterData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');

  })

  it('filter by Fighter', () => {
    let dataFilter = filterData(Object.values(data), 'Fighter');
    expect(dataFilter[0]).toEqual(data.Aatrox)
  })

  it('filter by Assassin', () => {
    let dataFilter = filterData(Object.values(data), 'Assassin');
    expect(dataFilter[0]).toEqual(data.Ahri)
  })

  it('filter by Marksman', () => {
    let dataFilter = filterData(Object.values(data), 'Marksman');
    expect(dataFilter[0]).toEqual(data.Ahri)
  })

  it('filter by Support', () => {
    let dataFilter = filterData(Object.values(data), 'Support');
    expect(dataFilter[0]).toEqual(data.Zyra)
    expect(dataFilter[1]).toEqual(data.Aatrox)
  })

  it('filter by Mage', () => {
    let dataFilter = filterData(Object.values(data), 'Mage');
    expect(dataFilter[0]).toEqual(data.Ahri)
    expect(dataFilter[1]).toEqual(data.Zyra)
  })

  it('filter by Tank', () => {
    let dataFilter = filterData(Object.values(data), 'Tank');
    expect(dataFilter[0]).toEqual(data.Aatrox)
  })

  it('filter by other value', () => {
    let dataFilter = filterData(Object.values(data), 'FILTER BY');
    expect(dataFilter[0]).toEqual(data.Aatrox)
    expect(dataFilter[1]).toEqual(data.Ahri)
    expect(dataFilter[2]).toEqual(data.Zyra)
  })
});

describe('statsData', () => {
  it('is a function', () => {
    expect(typeof statsData).toBe('function');
  })
  it('Calculate prom', () => {
    expect(statsData(Object.values(data))).toEqual({
      hp: 402,
      mp: 338,
      armor: 413,
      attackdamage: 257,
    });
  })
});

describe('suggestedChampions', () => {
  it('is a function', () => {
    expect(typeof suggestedChampions).toBe('function');
  })
  it('Calculate best champions...', () => {
    expect(suggestedChampions(Object.values(data))).toStrictEqual(['Ahri','Zyra','Aatrox']);
  })

  const dataNull = {
    Ahri: {
      name: 'Ahri',
      stats:{
        hp: 0,
        mp: 0,
        armor: 0,
        attackdamage: 0,
      }
    },
    Zyra: {
      name: 'Zyra',
      stats:{
        hp: 0,
        mp: 0,
        armor: 0,
        attackdamage: 0,
      }
    },
    Aatrox: {
      name: 'Aatrox',
      stats:{
        hp: 0,
        mp: 0,
        armor: 0,
        attackdamage: 0,
      }
    }
  }

  it('If not have best champion...', () => {
    expect(suggestedChampions(Object.values(dataNull))).toBe("Lo sentimos, en esta temporada los campeones estas super competitivos! escoge el que desees");
  })
});