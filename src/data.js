// estas funciones son de ejemplo
export const orderData = (data, parameter) => {

  let sortChampions;

  switch (parameter) {
    case 'A-Z':
      sortChampions = data.sort((a, b) => ((a.name <= b.name) ? -1 : 1));
      break;
    case 'Z-A':
      sortChampions = data.sort((a, b) => ((b.name <= a.name) ? -1 : 1))
      break;
    case 'MAX ATTACK':
      sortChampions = data.sort((a, b) => b.info.attack-a.info.attack);      
      break;
    case 'MAX DEFENSE':
      sortChampions = data.sort((a, b) => b.info.defense-a.info.defense);
      break;
    case 'MAX MAGIC':
      sortChampions = data.sort((a, b) => b.info.magic-a.info.magic);
      break;
    case 'MAX DIFFICULTY':
      sortChampions = data.sort((a, b) => b.info.difficulty-a.info.difficulty);
      break;
    default:
      sortChampions = data.sort((a, b) => ((a.name <= b.name) ? -1 : 1));
      break;
  }
  return sortChampions;
};


export const filterData = (data, parameter) => {
  let filterChampions;
  switch (parameter) {
    case 'Fighter':
      filterChampions = data.filter(((data) => (data.tags).includes('Fighter')));
      break;
    case 'Tank':
      filterChampions = data.filter(((data) => (data.tags).includes('Tank')))
      break;
    case 'Mage':
      filterChampions = data.filter(((data) => (data.tags).includes('Mage')));
      break;
    case 'Assassin':
      filterChampions = data.filter(((data) => (data.tags).includes('Assassin')));
      break;
    case 'Support':
      filterChampions = data.filter(((data) => (data.tags).includes('Support')));
      break;
    case 'Marksman':
      filterChampions = data.filter(((data) => (data.tags).includes('Marksman')));
      break;
    default:
      filterChampions = data.sort((a, b) => ((a.name <= b.name) ? -1 : 1));
      break;
  }
  return filterChampions
};

export const statsData = (data) => {

   let statsChampions = {
    hp:0,
    mp:0,
    armor:0,
    attackdamage:0,
   };

   data.forEach(data => {
      statsChampions.hp += data.stats.hp;
      statsChampions.mp += data.stats.mp;
      statsChampions.armor += data.stats.armor;
      statsChampions.attackdamage += data.stats.attackdamage;
   });
   
   statsChampions.hp = Math.round(statsChampions.hp/data.length);
   statsChampions.mp = Math.round(statsChampions.mp/data.length);
   statsChampions.armor = Math.round(statsChampions.armor/data.length);
   statsChampions.attackdamage = Math.round(statsChampions.attackdamage/data.length);

   return statsChampions;
}

export const suggestedChampions = (data) =>{
  let compare = statsData(data);
  let  championsOption= [];
  data.forEach(data =>{
    if(data.stats.hp >= (compare.hp +100)){
      championsOption.push(data.name);
    }
    if(data.stats.mp >= (compare.mp +100)){
      championsOption.push(data.name);
    }
    if(data.stats.armor >= (compare.armor +8)){
      championsOption.push(data.name);
    }
    if(data.stats.attackdamage >= (compare.attackdamage+6)){
      championsOption.push(data.name);
    }
  })

  
  const bestChampions = [];
  championsOption.forEach((champion)=>{
    if(!bestChampions.includes(champion)){
      bestChampions.push(champion);
    }
  })
  
  if(bestChampions.length == []){
    return 'Lo sentimos, en esta temporada los campeones estas super competitivos! escoge el que desees'
  }
  return bestChampions;
}

