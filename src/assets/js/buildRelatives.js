// prettier-ignore-file 
// tblArray holds ids and names of each relative
const bldRels = (tblKeys, infoTable, rec) => {
  const {
  id,
  name,
  pic,
  born_died,
  birthplace,
  bio,
  father,
  mother,
  spouse,
  sib1,
  sib2,
  sib3,
  sib4,
  sib5,
  sib6,
  child1,
  child2,
  child3,
  child4,
  child5,
  child6,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  famSrchLink,
  familypage,
  posx,
  posy,
  gender,
} = rec;

  var tblArray = []
  var i = 0;
  for (i = 0; i < tblKeys.length; i++) {
    if (tblKeys[i] == "spouse" && !(spouse === null || spouse === "")) {
      tblArray.push({ id: 0, name: "Spouse:" });
      tblArray.push({
        ...infoTable[findId(spouse) - 1],
        id: findId(spouse),
        name: spouse,
      });
    }

    if (tblKeys[i] == "father" && !( father === "" || father === null)) {
      tblArray.push({ id: 0, name: "Parents:" });
      tblArray.push({
        ...infoTable[findId(father) - 1],
        id: findId(father),
        name: father,
      });
      tblArray.push({
        ...infoTable[findId(mother) - 1],
        id: findId(mother),
        name: mother,
      });
    }
    if (tblKeys[i] === "sib1" && !( sib1 === "" || sib1 === null)) {
      tblArray.push({ id: 0, name: "Siblings:" });
      tblArray.push({
        ...infoTable[findId(sib1) - 1],
        id: findId(sib1),
        name: sib1,
      });
      tblArray.push({
        ...infoTable[findId(sib2) - 1],
        id: findId(sib2),
        name: sib2,
      });
      tblArray.push({
        ...infoTable[findId(sib3) - 1],
        id: findId(sib3),
        name: sib3,
      });
      tblArray.push({
        ...infoTable[findId(sib4) - 1],
        id: findId(sib4),
        name: sib4,
      });
      tblArray.push({
        ...infoTable[findId(sib5) - 1],
        id: findId(sib5),
        name: sib5,
      });
      tblArray.push({
        ...infoTable[findId(sib6) - 1],
        id: findId(sib6),
        name: sib6,
      });
    }

    if (tblKeys[i] == "child1" && !(child1 === "" || child1 === null)) {
      tblArray.push({ id: 0, name: "Children:" });
      tblArray.push({
        ...infoTable[findId(child1) - 1],
        id: findId(child1),
        name: child1,
      });
      tblArray.push({
        ...infoTable[findId(child2) - 1],
        id: findId(child2),
        name: child2,
      });
      tblArray.push({
        ...infoTable[findId(child3) - 1],
        id: findId(child3),
        name: child3,
      });
      tblArray.push({
        ...infoTable[findId(child4) - 1],
        id: findId(child4),
        name: child4,
      });
      tblArray.push({
        ...infoTable[findId(child5) - 1],
        id: findId(child5),
        name: child5,
      });
      tblArray.push({
        ...infoTable[findId(child6) - 1],
        id: findId(child6),
        name: child6,
      });
    }
  }

  // filter out blank fields
  tblArray = tblArray.filter((item) => {
    return item.name != "";
  });

  // find correct id for each relative
  function findId(name) {
    for (let i = 0; i < infoTable.length; i++) {
      if (name == infoTable[i].name) {
        return infoTable[i].id;
      }
    }
  }
  
  // filter out relatives without database records
  for (i = 0; i < tblArray.length; i++) {
    if (tblArray[i].id === undefined) {
      tblArray[i].id = 1; // use dummy id
    }
  }

  const cleanedArray = tblArray.filter(item => item.name !== null);
  return cleanedArray;
}

export default bldRels